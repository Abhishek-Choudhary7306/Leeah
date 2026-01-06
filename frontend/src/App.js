import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProblemList from './pages/ProblemList';
import ProblemDetail from './pages/ProblemDetail';
import SubmissionHistory from './pages/SubmissionHistory';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors">
            <Navbar />
            <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/problems"
              element={
                <PrivateRoute>
                  <ProblemList />
                </PrivateRoute>
              }
            />
            <Route
              path="/problems/:id"
              element={
                <PrivateRoute>
                  <ProblemDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/submissions"
              element={
                <PrivateRoute>
                  <SubmissionHistory />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

