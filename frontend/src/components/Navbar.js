import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import ThemeContext from '../context/ThemeContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white dark:bg-black shadow-md border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600 dark:text-yellow-400">LEEAH</span>
            </Link>
            {isAuthenticated && (
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/problems"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 dark:text-red-400 hover:text-blue-600 dark:hover:text-yellow-400 transition-colors"
                >
                  Problems
                </Link>
                <Link
                  to="/submissions"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 dark:text-red-400 hover:text-blue-600 dark:hover:text-yellow-400 transition-colors"
                >
                  Submissions
                </Link>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 dark:text-red-400 hover:text-blue-600 dark:hover:text-yellow-400 transition-colors"
                >
                  Dashboard
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700 dark:text-yellow-400 font-medium">
                  {user?.username} ({user?.totalPoints || 0} pts)
                </span>
                <button
                  onClick={toggleTheme}
                  className="bg-yellow-500 dark:bg-yellow-600 hover:bg-yellow-600 dark:hover:bg-yellow-500 text-black dark:text-black px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                  {isDark ? '☀️' : '🌙'}
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleTheme}
                  className="bg-yellow-500 dark:bg-yellow-600 hover:bg-yellow-600 dark:hover:bg-yellow-500 text-black dark:text-black px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                  {isDark ? '☀️' : '🌙'}
                </button>
                <Link
                  to="/login"
                  className="text-gray-700 dark:text-red-400 hover:text-blue-600 dark:hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 dark:bg-red-600 hover:bg-blue-700 dark:hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

