import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/profile');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Set empty stats to prevent crashes
      setStats({ user: { totalPoints: 0, solvedProblems: [] }, stats: { totalSubmissions: 0, acceptedSubmissions: 0, solvedProblems: 0 } });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-yellow-400 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-800">
          <div className="text-2xl font-bold text-blue-600 dark:text-red-400 mb-2">
            {stats?.user?.totalPoints || 0}
          </div>
          <div className="text-gray-600 dark:text-yellow-400">Total Points</div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-800">
          <div className="text-2xl font-bold text-green-600 dark:text-red-400 mb-2">
            {stats?.stats?.solvedProblems || 0}
          </div>
          <div className="text-gray-600 dark:text-yellow-400">Problems Solved</div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-800">
          <div className="text-2xl font-bold text-purple-600 dark:text-red-400 mb-2">
            {stats?.stats?.totalSubmissions || 0}
          </div>
          <div className="text-gray-600 dark:text-yellow-400">Total Submissions</div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-yellow-400">Statistics</h2>
        <div className="space-y-2">
          <div className="flex justify-between text-gray-700 dark:text-red-400">
            <span>Accepted Submissions:</span>
            <span className="font-semibold dark:text-yellow-400">{stats?.stats?.acceptedSubmissions || 0}</span>
          </div>
          <div className="flex justify-between text-gray-700 dark:text-red-400">
            <span>Total Submissions:</span>
            <span className="font-semibold dark:text-yellow-400">{stats?.stats?.totalSubmissions || 0}</span>
          </div>
          <div className="flex justify-between text-gray-700 dark:text-red-400">
            <span>Success Rate:</span>
            <span className="font-semibold dark:text-yellow-400">
              {stats?.stats?.totalSubmissions > 0
                ? Math.round(
                    (stats?.stats?.acceptedSubmissions / stats?.stats?.totalSubmissions) * 100
                  )
                : 0}
              %
            </span>
          </div>
        </div>
      </div>

      {stats?.user?.solvedProblems && stats.user.solvedProblems.length > 0 && (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-yellow-400">Solved Problems</h2>
          <div className="space-y-2">
            {stats.user.solvedProblems
              .filter(solved => solved.problemId && solved.problemId._id)
              .map((solved, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                  <Link
                    to={`/problems/${solved.problemId._id}`}
                    className="text-blue-600 dark:text-red-400 hover:text-blue-800 dark:hover:text-yellow-400 font-medium"
                  >
                    {solved.problemId?.title || 'Unknown Problem'}
                  </Link>
                  <span className="text-sm text-gray-500 dark:text-yellow-400">
                    {new Date(solved.solvedAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}

      <div className="mt-6">
        <Link
          to="/problems"
          className="bg-blue-600 dark:bg-red-600 hover:bg-blue-700 dark:hover:bg-red-700 text-white px-6 py-2 rounded-md font-medium inline-block transition-colors"
        >
          Start Solving Problems
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;

