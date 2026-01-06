import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Landing = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">LEEAHH</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A LeetCode-like coding platform where you can practice coding problems,
            improve your skills, and compete with others.
          </p>
          <div className="flex justify-center space-x-4">
            {isAuthenticated ? (
              <Link
                to="/problems"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium"
              >
                Start Coding
              </Link>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="bg-white hover:bg-gray-50 text-blue-600 px-8 py-3 rounded-lg text-lg font-medium border-2 border-blue-600"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">💻</div>
            <h3 className="text-xl font-semibold mb-2">Practice Coding</h3>
            <p className="text-gray-600">
              Solve coding problems across different difficulty levels and improve your problem-solving skills.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
            <p className="text-gray-600">
              Monitor your submissions, view your history, and track your points as you solve problems.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">🏆</div>
            <h3 className="text-xl font-semibold mb-2">Earn Points</h3>
            <p className="text-gray-600">
              Earn points for each problem you solve and compete with others on the leaderboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;

