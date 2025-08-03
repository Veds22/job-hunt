#📌 JobScrapper – AI-Enhanced Job & Internship Aggregator
A full-stack Django + React web application that scrapes job and internship listings from platforms like Internshala and Wellfound, and curates personalized recommendations based on user preferences. Users can save jobs, track applications, and receive email alerts—all from a clean, modern dashboard.

#🚀 Key Features
🔍 Live Job Scraping: Real-time job data collection using BeautifulSoup and Django management commands.

🎯 User Preferences: Users can register and set their preferred domains (Web Dev, AI/ML, etc.), locations (Remote, Delhi, etc.), and update them anytime.

💌 Email Alerts: Scheduled newsletters based on user-defined frequency (Daily / Weekly).

🔐 JWT Authentication: Secure login, registration, and session handling using Django REST Framework and React.

💾 Saved Jobs: Users can save and manage jobs they’re interested in.

🧠 (Planned) LLM-Powered Recommendations: Personalized job suggestions using semantic matching with OpenAI embeddings.

#🛠 Tech Stack
Frontend: React + Vite + TailwindCSS

Backend: Django + Django REST Framework

Scraping: BeautifulSoup, Requests

Authentication: JWT (djangorestframework-simplejwt)

Database: SQLite (dev) / PostgreSQL (prod-ready)

Deployment-Ready: Configurable for Docker & production

#💡 Future Enhancements
🌐 More job sources (LinkedIn, Foundit, HackerEarth)

🤖 Chatbot for job recommendations

📊 Admin dashboard with analytics

🧠 AI-powered resume screening & job matching

🔄 Cron or Celery-based background scraping

🧪 Running the Project Locally
bash
Copy
Edit
# Backend
cd job_alerts/
python manage.py runserver

# Frontend
cd frontend/
npm install
npm run dev
