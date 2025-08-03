from django.core.management.base import BaseCommand
from jobs.scrapers import internshala

class Command(BaseCommand):
    help = 'Run all job scrapers and save to DB'
    
    def handle(self, *args, **options):
        scrapers = [internshala]
        for scraper in scrapers:
            self.stdout.write(f"scraping {scraper.__name__}...")
            scraper.save_jobs()
        self.stdout.write(self.style.SUCCESS('All scrapers completed'))