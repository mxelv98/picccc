# Pluxo SaaS Platform

Professional trading signal prediction platform with a "Secret Case" security architecture.

## 📁 Repository Structure

- **`/frontend`**: React/Vite/Tailwind UI.
- **`/backend`**: Node.js/Express API with isolated sensitive logic.
- **`/database`**: SQL schemas and migration files.
- **`/docs`**: Security policies and system guides.

## 🚀 Quick Start (Development)

### 1. Backend Setup
```bash
cd backend
cp .env.example .env.local
npm install
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🛡 Security (The "Secret Case")
All sensitive logic (prediction algorithms, VIP validation, admin roles) is processed strictly on the server side. The frontend only consumes sanitized API responses. 

Refer to [SECURITY.md](docs/SECURITY.md) for more details.

## 🔑 Environment Variables
You MUST define these in your `.env.local` to run the project.
See [.env.example](.env.example) for the list of required keys.
