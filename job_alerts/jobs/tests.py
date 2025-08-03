from django.test import TestCase
from jobs.scrapers.internshala import fetch_jobs

class ScraperTest(TestCase):  
    def test_fetch_jobs_returns_list(self):
        data = fetch_jobs()
        self.assertIsInstance(data, list)
        self.assertTrue('title' in data[0])