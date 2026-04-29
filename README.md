# 📚 Smart Study Planner System

A full-stack MERN productivity application designed to help students organize subjects, manage units, generate smart study schedules, and track academic progress efficiently.

---

# 🚀 Features

## 🔐 Authentication
- User Registration & Login
- JWT Authentication
- Protected Routes
- Persistent Login using Local Storage

---

## 📘 Subject Management
- Add Subjects
- Delete Subjects
- Organize academic workflow

---

## 📖 Unit Management
- Add Units
- Delete Units
- Mark Units as Complete/Pending

---

## 🧠 Smart Planner
- Auto-generate study plans
- Calendar-based schedule
- Dynamic roadmap generation
- Overdue task handling
- Planner regeneration system

---

## 📊 Dashboard Analytics
- Total Tasks
- Completed Tasks
- Pending Tasks
- Progress Tracking
- Visual Charts

---

## 🌙 UI/UX Features
- Dark Mode
- Responsive Dashboard
- Mobile Sidebar
- Toast Notifications
- Loading States
- Empty State UI
- Form Validation

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Tailwind CSS
- Axios
- React Router DOM
- React Toastify
- Recharts
- Lucide React

---

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

# 🏗️ Project Architecture

Frontend communicates with backend APIs using Axios.

Backend controllers handle:
- authentication
- planner generation
- task management
- analytics logic

MongoDB stores:
- users
- subjects
- units
- tasks

Tasks act as the central source of truth for planner progress and dashboard analytics.

---

# 📅 Planner Logic

The planner automatically:
1. Fetches incomplete units
2. Calculates available days before exam
3. Generates daily study tasks
4. Stores generated tasks in MongoDB
5. Displays roadmap using calendar UI

---

# 🔒 Security Features
- JWT verification middleware
- Protected API routes
- Backend validation
- Frontend validation

---

# 📱 Responsive Design
The application supports:
- Desktop
- Tablet
- Mobile devices

with a responsive sidebar and adaptive layout.

---

# ⚡ Future Improvements
- Difficulty-based scheduling
- Real-time notifications
- AI-powered study recommendations
- Pomodoro Timer
- Real-time collaboration

---

# 🧪 Installation

## Clone Repository

```bash
git clone https://github.com/jaismeetcoder45/smart-study-planner.git