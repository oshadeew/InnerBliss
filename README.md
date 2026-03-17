# 🌸 Inner Bliss - Mental Wellness Platform

A full-stack mental wellness application built with React, Node.js, Express, and MongoDB.

## ✨ Features

- **🌸 Mood Tracker** - Daily mood logging with flower icons and monthly calendar view
- **🌬️ Breathing Exercise** - Guided 4-4-4-2 breathing animation
- **💬 Affirmations** - Add, edit, and delete positive quotes
- **📖 Stories** - Curated stories across a few categories 
- **❤️ PulseMate** - Simulated heart rate checker with reading history
- **📌 Priority Sorter** - Drag-and-drop task prioritization
- **🎧 Music Player** - Calming tracks with playlist management
- **🧠 Neuro Tests** - Self-assessments for 7 mental health areas with scoring and recommendations
- **👨‍⚕️ Doctor Directory** - Mental health professional contacts
- **👤 Profile** - Editable user profile
- **🚨 Emergency Contacts** - CRUD for personal emergency contacts
- **🔐 JWT Authentication** - Secure signup/login

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS 3 |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcrypt |

## 📋 Prerequisites

- **Node.js** v18+
- **MongoDB** running locally on `mongodb://localhost:27017` or a remote URI

## 🚀 Setup & Run

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd InnerBliss
```

### 2. Install dependencies
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Configure environment
Edit `server/.env` if needed:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/innerbliss
JWT_SECRET=innerbliss_jwt_secret_2024_wellness
```

### 4. Seed sample data (optional)
```bash
cd server
npm run seed
```

### 5. Start the application
```bash
# Terminal 1 — Start the backend
cd server
npm run dev

# Terminal 2 — Start the frontend
cd client
npm run dev
```

### 6. Open in browser
Navigate to `http://localhost:5173`

## 📁 Project Structure

```
InnerBliss/
├── client/                    # React frontend
│   ├── src/
│   │   ├── api/axios.js       # API client with JWT interceptor
│   │   ├── context/           # Auth context
│   │   ├── components/        # Reusable widget components
│   │   │   ├── Layout.jsx
│   │   │   ├── MoodTracker.jsx
│   │   │   ├── BreathingExercise.jsx
│   │   │   ├── Affirmations.jsx
│   │   │   ├── StorySection.jsx
│   │   │   ├── PulseMate.jsx
│   │   │   ├── PrioritySorter.jsx
│   │   │   └── MusicPlayer.jsx
│   │   └── pages/             # Page components
│   │       ├── Dashboard.jsx
│   │       ├── LoginPage.jsx
│   │       ├── SignupPage.jsx
│   │       ├── NeuroTestsPage.jsx
│   │       ├── QuizPage.jsx
│   │       ├── ResultPage.jsx
│   │       ├── DoctorsPage.jsx
│   │       ├── ProfilePage.jsx
│   │       └── EmergencyContactsPage.jsx
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/                    # Express backend
│   ├── models/                # Mongoose schemas
│   ├── routes/                # REST API routes
│   ├── middleware/auth.js     # JWT verification
│   ├── seed/seedData.js       # Sample data seeder
│   └── server.js              # Entry point
└── README.md
```

## ⚠️ Disclaimer

This application does not provide medical diagnosis. The self-assessment tests are for awareness purposes only. Please consult a qualified healthcare professional for proper evaluation and treatment.

## 📄 License

MIT
