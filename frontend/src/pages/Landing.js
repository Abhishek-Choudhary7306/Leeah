import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import ThemeContext from '../context/ThemeContext';

const Landing = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Welcome to <span className="text-yellow-400">LEEAH</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            A LeetCode-like coding platform where you can practice coding problems,
            improve your skills, and compete with others.
          </p>
          <div className="flex justify-center space-x-4">
            {isAuthenticated ? (
              <Link
                to="/problems"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg text-lg font-medium"
              >
                Start Coding
              </Link>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-lg text-lg font-medium"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="bg-transparent hover:bg-red-600 text-yellow-400 hover:text-white px-8 py-3 rounded-lg text-lg font-medium border-2 border-yellow-400"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="bg-gray-900 border-2 border-yellow-400 p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">💻</div>
            <h3 className="text-xl font-semibold text-yellow-400 mb-2">Practice Coding</h3>
            <p className="text-gray-300">
              Solve coding problems across different difficulty levels and improve your problem-solving skills.
            </p>
          </div>
          <div className="bg-gray-900 border-2 border-red-600 p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-red-600 mb-2">Track Progress</h3>
            <p className="text-gray-300">
              Monitor your submissions, view your history, and track your points as you solve problems.
            </p>
          </div>
          <div className="bg-gray-900 border-2 border-yellow-400 p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">🏆</div>
            <h3 className="text-xl font-semibold text-yellow-400 mb-2">Earn Points</h3>
            <p className="text-gray-300">
              Earn points for each problem you solve and compete with others on the leaderboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;

