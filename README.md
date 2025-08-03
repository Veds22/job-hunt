# 📌 **JobScrapper – AI-Enhanced Job & Internship Aggregator**

**JobScrapper** is a full-stack web application built with **Django** and **React**. It scrapes job and internship listings from platforms like **Internshala** and **Wellfound**, and curates **personalized recommendations** based on user preferences. Users can save jobs, track applications, and receive email alerts — all from a **clean, modern dashboard**.

---

## 🚀 **Key Features**

* 🔍 **Live Job Scraping:** Real-time job data collection using **BeautifulSoup** and Django management commands.
* 🎯 **User Preferences:** Set preferences like **domain** (Web Dev, AI/ML, etc.) and **location** (Remote, Delhi, etc.) to tailor job recommendations.
* 📬 **Email Alerts:** Receive scheduled job alerts via email — choose between **Daily** or **Weekly**.
* 🔐 **JWT Authentication:** Secure login, registration, and session handling using **Django REST Framework** and **React**.
* 💾 **Saved Jobs:** Save jobs for later and manage your personal job list.
* 🧠 **(Planned)**: AI-powered **LLM Recommendations** using **OpenAI embeddings** for semantic job matching.

---

## 🛠 **Tech Stack**

* **Frontend:** React + Vite + TailwindCSS
* **Backend:** Django + Django REST Framework
* **Scraping:** BeautifulSoup, Requests
* **Authentication:** JWT (via `djangorestframework-simplejwt`)
* **Database:** SQLite (dev) → PostgreSQL (prod-ready)
* **Deployment:** Docker (planned)

---

## 💡 **Future Enhancements**

* 🌐 Add more platforms (LinkedIn, Foundit, HackerEarth)
* 🤖 AI chatbot to guide and recommend jobs
* 📊 Admin dashboard for insights and analytics
* 🧠 Resume screening & skill-based job matching
* ↺ Scheduled scraping using **Celery** or **cron jobs**

---

## 🥪 **Running the Project Locally**

```bash
# Backend
cd job_alerts/
python manage.py runserver

# Frontend
cd frontend/
npm install
npm run dev
```

---
