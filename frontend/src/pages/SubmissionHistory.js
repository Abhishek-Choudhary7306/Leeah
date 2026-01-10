import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SubmissionHistory = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/submissions/user`);
      setSubmissions(response.data || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      setSubmissions([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted':
        return 'text-green-600 bg-green-100';
      case 'Wrong Answer':
        return 'text-red-600 bg-red-100';
      case 'Runtime Error':
        return 'text-orange-600 bg-orange-100';
      case 'Time Limit Exceeded':
        return 'text-yellow-600 bg-yellow-100';
      case 'Compilation Error':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading submissions...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-yellow-400 mb-6">Submission History</h1>

      {submissions.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-8 text-center border border-gray-200 dark:border-gray-800">
          <p className="text-gray-600 dark:text-red-400">No submissions yet. Start solving problems!</p>
          <Link
            to="/problems"
            className="mt-4 inline-block bg-blue-600 dark:bg-red-600 hover:bg-blue-700 dark:hover:bg-red-700 text-white px-6 py-2 rounded-md transition-colors"
          >
            View Problems
          </Link>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-yellow-400 uppercase tracking-wider">
                  Problem
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-yellow-400 uppercase tracking-wider">
                  Language
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-yellow-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-yellow-400 uppercase tracking-wider">
                  Test Cases
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-yellow-400 uppercase tracking-wider">
                  Points
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-yellow-400 uppercase tracking-wider">
                  Submitted
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {submissions
                .filter(submission => submission.problemId)
                .map((submission) => (
                <tr key={submission._id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={`/problems/${submission.problemId?._id || submission.problemId || ''}`}
                      className="text-blue-600 dark:text-red-400 hover:text-blue-800 dark:hover:text-yellow-400 font-medium transition-colors"
                    >
                      {submission.problemId?.title || 'Unknown Problem'}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-yellow-400">
                    {submission.language}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        submission.status
                      )}`}
                    >
                      {submission.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-yellow-400">
                    {submission.passedTests} / {submission.totalTests}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-yellow-400">
                    {submission.pointsEarned}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-yellow-400">
                    {new Date(submission.createdAt).toLocaleString()}
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

export default SubmissionHistory;

