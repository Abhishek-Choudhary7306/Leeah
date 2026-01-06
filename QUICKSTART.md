# Quick Start Guide

## Prerequisites
- Node.js installed
- MongoDB installed and running

## Step-by-Step Setup

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Configure Backend
Create `backend/.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/leeah
JWT_SECRET=your_secret_key_here
```

### 3. Start MongoDB
Make sure MongoDB is running on your system.

### 4. Seed Database
```bash
cd backend
node scripts/seedProblems.js
```

### 5. Start Backend Server
```bash
cd backend
npm start
```
Server runs on http://localhost:5000

### 6. Install Frontend Dependencies
Open a new terminal:
```bash
cd frontend
npm install
```

### 7. Start Frontend
```bash
npm start
```
Frontend runs on http://localhost:3000

## First Steps

1. Open http://localhost:3000 in your browser
2. Click "Sign Up" to create an account
3. Login with your credentials
4. Browse problems and start coding!

## Troubleshooting

- **MongoDB not running**: Start MongoDB service
- **Port already in use**: Change PORT in backend/.env
- **CORS errors**: Ensure backend is running on port 5000

