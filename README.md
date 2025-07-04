# MERN Notebook 📝

A full-stack **note-taking web app** built with the **MERN** stack (MongoDB, Express, React, Node.js). Users can register, log in, and manage notes with authentication and role-based access control.

<img width="514" alt="image" src="https://github.com/user-attachments/assets/7d1e63ee-dedb-463e-99aa-e796235a0a16" />


## 🌐 Live Demo

- **Frontend**: [https://technotes.onrender.com](https://technotes.onrender.com)
- **Backend API**: [https://technotes-api.onrender.com](https://technotes-api.onrender.com)

---

## 🚀 Features

- ✅ User registration & login
- 🔐 JWT-based authentication with access/refresh tokens
- 🍪 Secure HTTP-only cookies
- 👥 Role-based access control (Admin/Manager/User)
- 🗂 Create, read, update, and delete notes
- 💡 Intuitive UI built with React & Redux Toolkit
- 🌍 Deployed on Render

---

## 🛠 Tech Stack

### Frontend
- React + Vite
- Redux Toolkit + RTK Query
- React Router
- Tailwind CSS

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- Cookie-Parser
- dotenv

### Deployment
- Render (for both frontend & backend)

---


## 🚧 Setup & Run Locally

### Clone the Repo
```bash
git clone https://github.com/Nanastrike/MERN-Notebook.git
cd MERN-Notebook

cd backend
npm install
cp .env.example .env
# Fill in MongoDB URI & JWT secrets
npm run dev

cd client
npm install
npm run dev
```

## 📄 License
This project is licensed under the MIT License.

