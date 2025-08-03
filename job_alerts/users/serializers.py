from rest_framework import serializers
from .models import CustomUser, Role, Location
from jobs.models import Job
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password


class RoleSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Role
        fields = ['id', 'name', 'category']
        
class LocationSerializer(serializers.ModelSerializer):
    
    display_name = serializers.SerializerMethodField()
    
    class Meta:
        model = Location
        fields = ['id', 'name', 'country', 'is_remote', 'display_name']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        validators=[validate_password],
        style={'input_type': 'password'}
    )
    password_confirm = serializers.CharField(
        write_only=True,
        style={'input_type': 'password'}
    )
    
    class Meta:
        model = CustomUser
        fields = (
            'email', 'full_name', 'username', 'password', 'password_confirm'
        ) 
        extra_kwargs = {
            'email': {'required': True},
            'username': {'required': True},
            'full_name': {'required': True},
        }
        
    def validate_email(self, value):
            if CustomUser.objects.filter(email=value.lower()).exists():
                raise serializers.ValidationError('User already exists')
            return value.lower()
        
    def validate_username(self, value):
            if CustomUser.objects.filter(username=value.lower()).exists():
                raise serializers.ValidationError('Username already exists')
            return value.lower()
        
    def validate(self, attrs):
            if attrs['password'] != attrs['password_confirm']:
                raise serializers.ValidationError({
                    "password_confirm": "Password confirmation doesn't match"
                })
            return attrs
        
    def create(self, validated_data):
            validated_data.pop('password_confirm')
            user = CustomUser.objects.create_user(
                email=validated_data['email'],
                username=validated_data['username'],
                full_name=validated_data['full_name'],
                password=validated_data['password'],
            )
            return user
        
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(
        style={'input_type': 'password'},
        write_only=True
    )
    
    def validate(self, attrs):
        email = attrs.get('email', '').lower()
        password = attrs.get('password')
        
        if not email or not password:
            raise serializers.ValidationError('Email and password are required')
        
        user = authenticate(username=email, password=password)
        
        if not user:
            raise serializers.ValidationError('Invalid email or password.')
        
        if not user.is_active:
            raise serializers.ValidationError('User account is disabled')
        
        attrs['user'] = user
        return attrs

class UserSerializer(serializers.ModelSerializer):
    
    preferred_roles = RoleSerializer(source='role_preference', many=True, read_only=True)
    preferred_locations = LocationSerializer(source='location_preference', many=True, read_only=True)
    
    class Meta:
        model = CustomUser
        fields = (
            'id', 'email', 'username', 'full_name', 'preferred_job_type',
            'preferred_roles', 'preferred_locations', 'email_frequency',
            'created_at', 'last_login'
        )
        
        read_only_fields = (
            'id', 'email', 'created_at'
        )

class UserPreferenceSerializer(serializers.ModelSerializer):
    role_preference = serializers.PrimaryKeyRelatedField(
        queryset=Role.objects.filter(is_active=True),
        many=True,
        required=False
    )
    location_preference = serializers.PrimaryKeyRelatedField(
        queryset=Location.objects.filter(is_active=True),
        many=True,
        required=False
    )
    
    class Meta:
        model = CustomUser
        fields = (
            'preferred_job_type', 'role_preference', 'location_preference',
            'email_frequency'
        ) 
       
class SavedJobSerializer(serializers.ModelSerializer):
    is_saved = serializers.SerializerMethodField()
    save_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Job
        fields = [
            'id', 'title', 'company', 'company_logo', 'job_type', 'category',
            'stipend_or_pay', 'duration', 'location', 'platform_posted_on',
            'posted_at', 'deadline', 'is_expired', 'link', 'description',
            'skills', 'is_saved', 'save_count'
        ]
    

