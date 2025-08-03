from django.urls import path
from .views import AllJobs

urlpatterns = [
   path('browse/', AllJobs.as_view(), name='browse-jobs'),
   path('users-browse/', AllJobs.as_view(), name='users-jobs'),
]
