# Chatify Frontend

Chatify is a full-featured AI-powered real-time chat application with modern UI and smooth user experience. The frontend is built using **Next.js**, **React**, and **Tailwind CSS**, and communicates with a Node.js backend through REST APIs and WebSockets (Socket.IO).

---

## 🚀 Features

- 🔐 **Authentication**
  - OTP-based verification
  - JWT token authentication

- 💬 **Real-time Chat**
  - Instant messaging using Socket.IO
  - Typing indicators
  - Message delivery status (sent, delivered, seen)

- 🧠 **AI-Powered Chat**
  - Auto-translation of messages
  - AI responses from language models
  - Text-to-speech and speech-to-text (multilingual)

- 🧷 **Safe Link Previews**
  - Built-in link classification
  - Previews for links sent in chat

- 📸 **User Stories**
  - 24-hour disappearing user statuses

- 🛠️ **Settings**
  - Privacy settings
  - Language and theme options

---

## 🧱 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **UI**: React.js, Tailwind CSS, ShadCN
- **Real-time**: Socket.IO
- **APIs**: RESTful endpoints to Node.js backend
- **Audio Processing**: Browser APIs + backend endpoints
- **State Management**: React Hooks, Context API
- **Routing**: Next.js Pages/Router

---

## 📁 Project Structure

```
/components      → Reusable UI components
/pages           → Next.js routes (chat, auth, settings)
/styles          → Global styles
/public          → Static assets
/lib             → Utilities and helpers
```

---

## ⚙️ Installation

1. **Clone the repo**

```bash
git clone https://github.com/ahmed-H20/Chatify-project-Frontend.git
cd Chatify-project-Frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Create environment variables**

Add a `.env.local` file:

```env
NEXT_PUBLIC_TTS_LANGUAGE=en
```

4. **Run the development server**

```bash
npm run dev
```

The app should now be running on [http://localhost:3000](http://localhost:3000)

---

## 🔄 Deployment

The project is optimized for deployment on **Vercel**.

No extra configuration is required. On push to GitHub:
- Vercel auto-detects Next.js
- Builds using `next build`
- Deploys live to your domain

---

## 🤝 Contributors

- Ahmed Hesham (Developer)

---

## 📃 License

This project is licensed for private use for developer. For public/commercial use, please contact the author.