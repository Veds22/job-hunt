from django.db import models

class Job(models.Model):
    # Core Info
    title                = models.CharField(max_length=255)
    company              = models.CharField(max_length=255)
    company_logo         = models.URLField(blank=True, null=True)

    # Role & Categorization
    job_type             = models.CharField(max_length=50, choices=[('Internship', 'Internship'), ('Full-time', 'Full-time')], default='Internship')   # e.g. Internship, Full‑time
    category             = models.CharField(max_length=100, null=True, blank=True)  # e.g. Web Dev, ML

    # Compensation & Duration
    stipend_or_pay       = models.CharField(max_length=100, blank=True)  # e.g. “₹20k/month”
    duration             = models.CharField(max_length=50, blank=True)   # e.g. “3 months”

    # Location & Platform
    location             = models.CharField(max_length=100)
    platform_posted_on   = models.CharField(max_length=100)  # e.g. LinkedIn

    # Timing
    posted_at            = models.DateField()
    deadline             = models.DateField(blank=True, null=True)
    is_expired           = models.BooleanField(default=False)
    created_at           = models.DateTimeField(auto_now_add=True)

    # Details & Filtering
    link                 = models.URLField()
    description          = models.TextField(null=True, blank=True)
    skills               = models.TextField(null=True, blank=True)  # store CSV or JSON list

    # Signature to avoid de-duplication
    signature            = models.CharField(unique=True, max_length=64, default="")
    
    def __str__(self):
        return f"{self.title} at {self.company}"
