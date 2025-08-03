from django.db import models
from django.contrib.auth.models import AbstractUser


class Role(models.Model):
    name = models.CharField(max_length=100, unique=True)
    category = models.CharField(
        max_length=50,
        choices=[
            ('tech', 'Technology'),
            ('design', 'Design'),
            ('marketing', 'Marketing'),
            ('sales', 'Sales'),
            ('finance', 'Finance'),
            ('hr', 'Human Resources'),
            ('operations', 'Operations'),
            ('content', 'Content & Writing'),
            ('other', 'Other')
        ],
        default='other',
        help_text="Role catgory for better organization"
    )
    is_active = models.BooleanField(default=True, help_text="Is this role currently available")
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['category', 'name']
        verbose_name = 'Job Role'
        verbose_name_plural = 'Job Roles'

    def __str__(self):
        return f"{self.name} ({self.get_category_display()})"
        

class Location(models.Model):
    name = models.CharField(max_length=100, unique=True)
    country = models.CharField(max_length=50, default='India')
    is_remote = models.BooleanField(default=False, help_text="Is this a remote location option")
    is_active = models.BooleanField(default=True, help_text="Is this location currently available")
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['country', 'name']
        verbose_name = 'Work Location'
        verbose_name_plural = 'Work Locations'
        
    def __str__(self):
        if self.is_remote:
            return f"{self.name} (Remote)"
        else:
            return self.name


class CustomUser(AbstractUser):
    
    # Basic User Info
    email = models.EmailField(unique=True, help_text="Primary email for login")
    full_name = models.CharField(max_length=255, blank=True, help_text="Full display name")
    
    # Job Prefernces
    JOB_TYPE_CHOICES = [
        ('internship', 'Internship'),
        ('job', 'Full-time Job'),
        ('part_time', 'Part-time Job'),
        ('both', 'both Internship & job')
    ]
    
    preferred_job_type = models.CharField(
        max_length=20,
        choices=JOB_TYPE_CHOICES,
        default='both',
        help_text='Types of opportunities user is looking for'
    )
    
    role_preference = models.ManyToManyField(
        Role,
        blank=True,
        related_name='interested_users',
        help_text='Preferred job role/domains'
    )
    
    location_preference = models.ManyToManyField(
        Location, 
        blank=True,
        related_name='interested_users',
        help_text="Preferred work locations"
    )
    
    email_frequency = models.CharField(
        max_length=20,
        choices=[
            ('daily', 'Daily'), 
            ('weekly', 'Weekly'),
            ('bi_weekly', 'Bi-weekly'),
            ('monthly', 'Monthly'),
            ('never', 'Never')
        ],
        default='weekly',
        help_text="How often to send job notifications"
    )
    
    # Saved Jobs
    saved_jobs = models.ManyToManyField(
        'jobs.Job',
        blank=True,
        related_name='saved_by_users',
        help_text='Jobs this user has saved'
    )

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_login = models.DateTimeField(null=True, blank=True)
    
    # For logging
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'full_name']
    
    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.full_name or self.username} ({self.email})"
    
    def get_full_name(self):
        return self.full_name or self.username
    
    def get_short_name(self):
        if self.full_name:
            return self.full_name.split()[0]
        return self.username