import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProblemList = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/problems');
      console.log('Problems fetched:', response.data);
      setProblems(response.data || []);
    } catch (error) {
      console.error('Error fetching problems:', error);
      console.error('Error details:', error.response?.data || error.message);
      if (error.code === 'ECONNREFUSED') {
        alert('Cannot connect to backend server. Make sure it is running on port 5000.');
      }
      setProblems([]);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-600 bg-green-100';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'Hard':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredProblems = filter === 'all' 
    ? problems 
    : problems.filter(p => p.difficulty.toLowerCase() === filter.toLowerCase());

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading problems...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-yellow-400 mb-4">Problems</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md transition-colors ${
              filter === 'all' ? 'bg-blue-600 dark:bg-red-600 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-yellow-400'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('easy')}
            className={`px-4 py-2 rounded-md transition-colors ${
              filter === 'easy' ? 'bg-green-600 dark:bg-red-600 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-yellow-400'
            }`}
          >
            Easy
          </button>
          <button
            onClick={() => setFilter('medium')}
            className={`px-4 py-2 rounded-md transition-colors ${
              filter === 'medium' ? 'bg-yellow-600 dark:bg-red-600 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-yellow-400'
            }`}
          >
            Medium
          </button>
          <button
            onClick={() => setFilter('hard')}
            className={`px-4 py-2 rounded-md transition-colors ${
              filter === 'hard' ? 'bg-red-600 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-yellow-400'
            }`}
          >
            Hard
          </button>
        </div>
      </div>

      {filteredProblems.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-8 text-center border border-gray-200 dark:border-gray-800">
          <p className="text-gray-600 dark:text-red-400 text-lg mb-4">
            {problems.length === 0 
              ? 'No problems found. Make sure the backend server is running and the database is seeded.'
              : `No ${filter === 'all' ? '' : filter} problems found.`}
          </p>
          {problems.length === 0 && (
            <div className="text-sm text-gray-500 mt-4">
              <p>To seed the database, run:</p>
              <code className="bg-gray-100 px-2 py-1 rounded mt-2 inline-block">
                cd backend && node scripts/seedProblems.js
              </code>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-yellow-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-yellow-400 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-yellow-400 uppercase tracking-wider">
                  Difficulty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-yellow-400 uppercase tracking-wider">
                  Points
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredProblems.map((problem) => (
                <tr key={problem._id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-400 dark:text-yellow-400">○</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={`/problems/${problem._id}`}
                      className="text-blue-600 dark:text-red-400 hover:text-blue-800 dark:hover:text-yellow-400 font-medium transition-colors"
                    >
                      {problem.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(
                        problem.difficulty
                      )}`}
                    >
                      {problem.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-yellow-400">
                    {problem.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProblemList;

