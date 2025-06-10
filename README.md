# 🌈 Embrace Spectrum

Embrace Spectrum is an inclusive, AI-powered platform designed to empower neurodiverse individuals by supporting emotional well-being, communication, creativity, and career development. Built with state-of-the-art technologies like Google Gemini, Gemini Live, and Firebase, the platform offers a personalized and sensory-friendly experience.

---

## ✨ Features

- 💬 **Solace** – Gemini-powered AI chatbot for emotional support and daily check-ins.
- 🗣️ **Human Connect** – Real-time human-like communication using Gemini Live.
- 🧠 **Speech Coach** – Practice and receive feedback on speech, tone, and clarity with live metrics and filler word detection.
- 📄 **Feel Reader** – Emotion detection in PDFs and documents, with sentiment analysis and visual feedback.
- 🎨 **SketchTales** – Turn drawings into AI-generated stories, fostering creativity and self-expression.
- 📔 **Journal** – Mood tracking, reflection, and gratitude journaling with a calming, accessible UI.
- 🏆 **Life Skill Tracker** – Personalized daily tasks, XP, badges, and progress tracking for building life skills.
- 🛣️ **Learning Path** – Custom learning journeys and routines, tailored to user goals and neurodiversity profile.
- 📚 **Quiz & Games** – Interactive quizzes and sensory-friendly games for cognitive growth and relaxation.
- 💼 **Job & Community Hub** – Curated employment opportunities, peer connection, and workplace accommodations guidance.
- 🧩 **Onboarding Flow** – Smart onboarding that adapts the platform to each user’s needs, goals, and sensory preferences.
- 🦻 **Audio Description** – Toggleable audio descriptions for all major features, supporting diverse learning styles.
- 🌙 **Calm Mode** – Sensory-friendly UI toggle for reduced motion, softer colors, and minimal distractions.
- 🔒 **Secure Authentication** – Clerk and Firebase-powered sign-in, with onboarding status tracking and user data privacy.
- 🔄 **Google Calendar Integration** – Sync tasks and events with Google Calendar for seamless daily planning.
- 🛠️ **Admin & Developer Tools** – Modular React components, Vite for fast builds, and robust error handling for production.
- 🌐 **Fully Responsive** – Accessible design with keyboard navigation and ARIA support.

---

## 🧠 Problem It Solves

Neurodiverse individuals often face:
- Emotional isolation  
- Communication difficulties  
- Limited creative expression tools  
- Barriers in employment
- Lack of personalized, adaptive digital support
- Overwhelming or inaccessible digital environments

Embrace Spectrum solves this through an all-in-one AI-powered, multimodal platform that adapts to diverse cognitive needs and encourages independence.

---

## 🧩 Tech Stack

| Area             | Tech Used                   |
|------------------|-----------------------------|
| Frontend         | React.js, Tailwind CSS       |
| Backend          | Express.js                  |
| Authentication   | Clerk                       |
| Database & Hosting | Firebase                  |
| AI & Live Communication | Google Gemini & Gemini Live |
| Creative Tools   | Canvas / Drawing libraries  |
| State Management | React Context, LocalStorage |
| Deployment       | Vercel                      |

---

## 🚀 Getting Started

### Prerequisites

- Node.js & npm
- Git (optional but recommended)

### Clone the Repository

```bash
git clone https://github.com/your-username/embrace-spectrum-neuro.git
cd embrace-spectrum
```

### 🔧 Run Frontend

```bash
cd frontend
npm install
npm run dev
```

### 🔧 Run Backend (in a separate terminal)

```bash
cd backend
npm install
npm run dev
```

Frontend usually runs on: `http://localhost:5173`  
Backend usually runs on: `http://localhost:3000`

---

## 🛡️ Authentication

Powered by Clerk Authentication:
- Secure login (Email/Password, Google Sign-In, Social Auth)
- Onboarding status tracking and user profile management
- Privacy-first: user data is never shared without consent

---

## 🌐 Live Demo

Try the live version of Embrace Spectrum:  
🔗 [https://embrace-spectrum-neuro.vercel.app/]

---

## 🧑‍💻 Developer Experience & Complexity

- 🏗️ **Modular Architecture** – All features are built as independent, reusable React components for easy extension.
- ⚡ **Vite-Powered** – Lightning-fast local development and hot module reloads.
- 🧪 **Robust Error Handling** – Production-safe routing, onboarding, and authentication logic.
- 🧩 **Context Providers** – Global state for Calm Mode, Audio Description, and Auth, with easy-to-use hooks.
- 🧬 **Dynamic Routing** – React Router v6 for clean, maintainable navigation and onboarding flows.
- 🧹 **Accessibility First** – ARIA roles, keyboard navigation, and screen reader support throughout.
- 🛡️ **Security** – All sensitive operations protected by authentication and Firestore rules.
- 🔄 **Sync & Persistence** – User progress, onboarding, and preferences are synced across devices.
