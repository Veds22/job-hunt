from django.utils import timezone
import requests
from bs4 import BeautifulSoup
from ..models import Job 
import hashlib
import dateparser


LOCAL_BASE = 'https://internshala.com/'
JOB_META={
    'Internship' :[
        {
            'category': 'Data Science',
            'link': 'internships/data-science-internship',
        },
        {
            'category': 'Python Development',
            'link': 'internships/python-django-internship'
        }
    ]
}

def fetch_jobs():
    jobs = []
    for role, role_list in JOB_META.items():
        for item in role_list:
            url = f'{LOCAL_BASE}{item['link']}'
            resp = requests.get(url)
            soup = BeautifulSoup(resp.text, 'html.parser')
            
            for card in soup.select('.internship_meta'):
                title = card.select_one('.job-title-href').get_text(strip=True)
                company = card.select_one('.company-name').get_text(strip=True)
                
                link = 'https://internshala.com' + card.select_one('a')['href']
                location = card.select_one('.locations').get_text(strip=True).split(',')
                posted_at_raw = dateparser.parse((card.select_one('.status-success') or 
                             card.select_one('.status-inactive') or 
                             card.select_one('.status-info')
                            ).get_text(strip=True))
                if posted_at_raw:
                    posted_at = posted_at_raw.date()
                else:
                    posted_at = timezone.now().date()
                    
                duration = card.select('.row-1-item')[-1].get_text(strip=True)
                stipend = card.select_one('.stipend').get_text(strip=True)
                
                jobs.append({
                    'title': title,
                    'company': company,
                    'link': link,
                    'job_type': role,
                    'category': item['category'],
                    'posted_at': posted_at,
                    'location': location,
                    'stipend': stipend,
                    'duration': duration,
                })

    return jobs

def save_jobs():
    for item in fetch_jobs():
        sig_str = item['title'] + item['company'] + item['job_type'] + item['category']
        sig = hashlib.md5(sig_str.encode())
        Job.objects.update_or_create(
            signature=sig,
            defaults={
                'title': item['title'],
                'company': item['company'],
                'link': item['link'],
                'platform_posted_on': 'Internshala',
                'job_type': item['job_type'],
                'category': item['category'],
                'posted_at': item['posted_at'],
                'location': item['location'],
                'stipend_or_pay': item['stipend'],
                'duration': item.get('duration')
            }
        )

