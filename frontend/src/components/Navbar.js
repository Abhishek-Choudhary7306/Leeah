import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import ThemeContext from '../context/ThemeContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <nav className="bg-white dark:bg-black shadow-md border-b border-gray-200 dark:border-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold text-blue-600 dark:text-yellow-400">LEEAH</span>
              </Link>
              {isAuthenticated && (
                <>
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
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="sm:hidden ml-4 p-2 rounded-md text-gray-900 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </>
              )}
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              {isAuthenticated ? (
                <>
                  <span className="hidden sm:inline text-sm text-gray-700 dark:text-yellow-400 font-medium">
                    {user?.username} ({user?.totalPoints || 0} pts)
                  </span>
                  <button
                    onClick={toggleTheme}
                    className="bg-yellow-500 dark:bg-yellow-600 hover:bg-yellow-600 dark:hover:bg-yellow-500 text-black dark:text-black px-2 sm:px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                  >
                    {isDark ? '☀️' : '🌙'}
                  </button>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={toggleTheme}
                    className="bg-yellow-500 dark:bg-yellow-600 hover:bg-yellow-600 dark:hover:bg-yellow-500 text-black dark:text-black px-2 sm:px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                  >
                    {isDark ? '☀️' : '🌙'}
                  </button>
                  <Link
                    to="/login"
                    className="text-gray-700 dark:text-red-400 hover:text-blue-600 dark:hover:text-yellow-400 px-2 sm:px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-blue-600 dark:bg-red-600 hover:bg-blue-700 dark:hover:bg-red-700 text-white px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {isAuthenticated && mobileMenuOpen && (
        <div className="sm:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="px-4 py-3 space-y-2">
            <Link
              to="/problems"
              onClick={closeMobileMenu}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Problems
            </Link>
            <Link
              to="/submissions"
              onClick={closeMobileMenu}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Submissions
            </Link>
            <Link
              to="/dashboard"
              onClick={closeMobileMenu}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Dashboard
            </Link>
            <div className="px-3 py-2 text-sm text-gray-700 dark:text-yellow-400 font-medium">
              {user?.username} ({user?.totalPoints || 0} pts)
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

