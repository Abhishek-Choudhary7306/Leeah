# LEEAHH - LeetCode-like Coding Platform

LEEAHH is a full-stack coding platform inspired by LeetCode, built with React and Node.js. Practice coding problems, track your progress, and earn points as you solve challenges.

## Features

- 🔐 **User Authentication** - Secure signup and login with JWT
- 💻 **10 Coding Problems** - Each with 10 test cases
- 🎯 **Code Submission** - Submit solutions in JavaScript or Python
- 📊 **Submission History** - View all your past submissions
- 🏆 **Points System** - Earn points for solving problems
- 📈 **Dashboard** - Track your progress and statistics
- ⚡ **Fast UI** - Clean, modern interface built with React and Tailwind CSS

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
cd Leeahh
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
MONGODB_URI=mongodb://localhost:27017/leeahh
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

**Note:** For production, use a strong, random JWT_SECRET.

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

## Project Structure

```
Leeahh/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Problem.js
│   │   └── Submission.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── problems.js
│   │   ├── submissions.js
│   │   └── users.js
│   ├── middleware/
│   │   └── auth.js
│   ├── utils/
│   │   └── codeExecutor.js
│   ├── scripts/
│   │   └── seedProblems.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   └── PrivateRoute.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── Landing.js
│   │   │   ├── Signup.js
│   │   │   ├── Login.js
│   │   │   ├── ProblemList.js
│   │   │   ├── ProblemDetail.js
│   │   │   ├── SubmissionHistory.js
│   │   │   └── Dashboard.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user

### Problems
- `GET /api/problems` - Get all problems
- `GET /api/problems/:id` - Get a specific problem

### Submissions
- `POST /api/submissions` - Submit a solution (requires auth)
- `GET /api/submissions/user` - Get user's submissions (requires auth)
- `GET /api/submissions/problem/:problemId` - Get submissions for a problem (requires auth)

### Users
- `GET /api/users/profile` - Get user profile and stats (requires auth)

## Code Execution

Currently, the platform uses a mock code executor for JavaScript. For production use:

1. **Judge0 API**: Uncomment and configure the Judge0 integration in `backend/utils/codeExecutor.js`
2. **Docker**: Set up a secure code execution environment using Docker containers
3. **Other Services**: Integrate with services like HackerRank API, Sphere Engine, etc.

**Note**: The current mock executor works for basic JavaScript problems but should be replaced with a proper sandboxed execution environment for production.

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod` or check service status
- Verify connection string in `.env` file
- Check if MongoDB is listening on the default port (27017)

### Port Already in Use
- Backend: Change `PORT` in `backend/.env`
- Frontend: Set `PORT=3001` in environment or use `set PORT=3001 && npm start` (Windows)

### CORS Issues
- Ensure backend CORS is configured (already set up in `server.js`)
- Check that backend URL matches frontend API calls

### Authentication Issues
- Clear browser localStorage: `localStorage.clear()`
- Check JWT_SECRET in backend `.env`
- Verify token is being sent in request headers

## Development

### Adding New Problems

1. Edit `backend/scripts/seedProblems.js`
2. Add your problem object to the `problems` array
3. Run `node scripts/seedProblems.js` (this will clear existing problems)

Or add directly via MongoDB/Mongoose:

```javascript
const Problem = require('./models/Problem');
const problem = new Problem({
  title: "Your Problem Title",
  description: "Problem description...",
  difficulty: "Easy", // or "Medium", "Hard"
  points: 100,
  testCases: [
    { input: "...", expectedOutput: "..." },
    // ... more test cases
  ],
  // ... other fields
});
await problem.save();
```

### Customizing the UI

- Edit Tailwind classes in React components
- Modify `frontend/tailwind.config.js` for theme customization
- Update `frontend/src/index.css` for global styles

## Future Enhancements

- [ ] Real code execution engine (Judge0/Docker)
- [ ] More programming languages support
- [ ] Leaderboard
- [ ] Discussion forums
- [ ] Problem categories/tags
- [ ] User profiles and avatars
- [ ] Dark mode
- [ ] Code syntax highlighting
- [ ] Test case visibility toggle
- [ ] Time and space complexity tracking

## License

This project is open source and available for educational purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and questions, please open an issue on the repository.

---

**Happy Coding! 🚀**

