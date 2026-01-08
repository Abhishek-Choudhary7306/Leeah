# LEEAH - LeetCode-like Coding Platform

LEEAH is a full-stack coding platform inspired by LeetCode, built with React and Node.js. Practice coding problems, track your progress, and earn points as you solve challenges.

## Tech Stack

### Frontend
- React 18
- React Router DOM
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Leeah
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/leeah
JWT_SECRET=your_super_secret_jwt_key
```



### 3. Start MongoDB

Make sure MongoDB is running on your system:

**Windows:**
```bash
# If MongoDB is installed as a service, it should start automatically
# Or start it manually:
mongod
```

**macOS (with Homebrew):**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

### 4. Seed the Database

Run the seed script to populate the database with 10 coding problems:

```bash
cd backend
node scripts/seedProblems.js
```

You should see:
```
Connected to MongoDB
Cleared existing problems
Seeded 10 problems
```

### 5. Start the Backend Server

```bash
cd backend
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

The backend server will run on `http://localhost:5000`

### 6. Frontend Setup

Open a new terminal, navigate to the frontend directory, and install dependencies:

```bash
cd frontend
npm install
```

### 7. Start the Frontend

```bash
npm start
```

The frontend will run on `http://localhost:3000` and automatically open in your browser.

## Usage

### Getting Started

1. **Sign Up**: Create a new account at `http://localhost:3000/signup`
2. **Login**: Sign in with your credentials
3. **Browse Problems**: Navigate to the Problems page to see all available coding challenges
4. **Solve Problems**: Click on any problem to view details and start coding
5. **Submit Solutions**: Write your code in the editor and click Submit
6. **View Results**: See test case results and points earned
7. **Track Progress**: Check your Dashboard and Submission History

### Problem Solving Workflow

1. Select a problem from the Problems list
2. Read the problem description, examples, and constraints
3. Write your solution in the code editor (JavaScript or Python)
4. Click "Submit" to run your code against all test cases
5. Review the results:
   - ✅ Green: Test case passed
   - ❌ Red: Test case failed (shows expected vs actual output)
6. Earn points based on how many test cases pass

### Points System

- Each problem has a base point value (100 for Easy, 200 for Medium/Hard)
- Points are distributed evenly across all test cases
- Full points if all test cases pass
- Partial points for partial success
- Points are only awarded once per problem (best submission counts)
