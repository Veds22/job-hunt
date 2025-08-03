from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from django.contrib.auth import authenticate, update_session_auth_hash
from django.utils import timezone
from .models import CustomUser
from .serializers import (
    UserSerializer, 
    RegisterSerializer,
    LoginSerializer,
    SavedJobSerializer,
    )

class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]
    
    def create(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user = serializer.save()
            
            refresh = RefreshToken.for_user(user)
            return Response({
                'success': True,
                'message': 'Registration successful! Welcome to JobHunt Assistant',
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
            })
            
        except Exception as e:
            return Response({
                'success': False,
                'message': 'Registrations failed. Please try again.',
                'errors': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)
      
  
class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [permissions.AllowAny]
    
    def post(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user = serializer.validated_data['user']
            user.last_login = timezone.now()
            
            user.save(update_fields=['last_login'])
            token = RefreshToken.for_user(user)
            
            return Response({
                'success': True,
                'message': f'Welcome Back, {user.get_short_name()}!',
                'tokens': {
                    'refresh': str(token),
                    'access': str(token.access_token),
                }
            }, status=status.HTTP_200_OK )
            
        except Exception as e:
            return Response({
                'success': False,
                'message': 'Login failed. Please check your credentials.',
                'errors': str(e)
            }, status=status.HTTP_401_UNAUTHORIZED)
            
@api_view(['POST'])
def logout_view(request):
    try:
        refresh_token = request.data.get('refresh')
        if not refresh_token:
            return Response({
                'success': False,
                'message': 'Refresh token is required for logout.'
            }, status=status.HTTP_400_BAD_REQUEST)
            
        token = RefreshToken(refresh_token)
        token.blacklist()
        
        return Response({
            'success': True, 
            'message': 'Successfully logged out'
        }, status=status.HTTP_200_OK)
        
    except TokenError:
        return Response({
            'success': False,
            'message': 'Invalid or expired token'
        }, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({
            'success': False,
            'message': 'Logout failed',
            'errors': str(e)
        }, status=status.HTTP_400_BAD_REQUEST)
        
class SavedJobView(generics.ListAPIView):
    serializer_class = SavedJobSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        queryset = user.saved_jobs.all()
        return queryset