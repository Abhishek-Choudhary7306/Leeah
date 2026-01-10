import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProblemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  useEffect(() => {
    fetchProblem();
  }, [id]);

  const fetchProblem = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/problems/${id}`);
      if (response.data) {
        setProblem(response.data);
        setCode(response.data.starterCode?.[language] || '');
      }
    } catch (error) {
      console.error('Error fetching problem:', error);
      if (error.response?.status === 404) {
        setProblem(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (problem) {
      setCode(problem.starterCode[language] || '');
    }
  }, [language, problem]);

  const handleSubmit = async () => {
    if (!code.trim()) {
      alert('Please write some code before submitting');
      return;
    }

    setSubmitting(true);
    setSubmissionResult(null);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/submissions`, {
        problemId: id,
        code,
        language
      });

      setSubmissionResult(response.data);
    } catch (error) {
      console.error('Error submitting code:', error);
      alert('Error submitting code. Please try again.');
    } finally {
      setSubmitting(false);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading problem...</div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Problem not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Problem Description */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-yellow-400">{problem.title}</h1>
            <span
              className={`px-3 py-1 text-sm font-semibold rounded-full ${getDifficultyColor(
                problem.difficulty
              )}`}
            >
              {problem.difficulty}
            </span>
          </div>
          <p className="text-gray-600 dark:text-yellow-400 mb-4">{problem.points} points</p>

          <div className="prose max-w-none mb-6">
            <p className="text-gray-700 dark:text-red-400 whitespace-pre-line">{problem.description}</p>
          </div>

          {problem.examples && problem.examples.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-yellow-400">Examples:</h3>
              {problem.examples.map((example, idx) => (
                <div key={idx} className="bg-gray-50 dark:bg-gray-800 p-4 rounded mb-2 border border-gray-200 dark:border-gray-700">
                  <p className="font-semibold text-gray-900 dark:text-yellow-400">Example {idx + 1}:</p>
                  <p className="text-gray-700 dark:text-red-400"><strong>Input:</strong> {example.input}</p>
                  <p className="text-gray-700 dark:text-red-400"><strong>Output:</strong> {example.output}</p>
                  {example.explanation && (
                    <p className="text-gray-700 dark:text-red-400"><strong>Explanation:</strong> {example.explanation}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {problem.constraints && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-yellow-400">Constraints:</h3>
              <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded text-sm whitespace-pre-line text-gray-700 dark:text-red-400 border border-gray-200 dark:border-gray-700">
                {problem.constraints}
              </pre>
            </div>
          )}
        </div>

        {/* Code Editor */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-yellow-400">Code Editor</h2>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border border-gray-300 dark:border-gray-700 rounded-md px-3 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-yellow-400"
            >
              <option value="javascript">JavaScript</option>
            </select>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-96 p-4 border border-gray-300 dark:border-gray-700 rounded-md font-mono text-sm bg-white dark:bg-black text-gray-900 dark:text-red-400"
            placeholder="Write your code here..."
          />

          <div className="mt-4 flex space-x-4">
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-blue-600 dark:bg-red-600 hover:bg-blue-700 dark:hover:bg-red-700 text-white px-6 py-2 rounded-md font-medium disabled:opacity-50 transition-colors"
            >
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
            <button
              onClick={() => navigate('/problems')}
              className="bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-yellow-400 px-6 py-2 rounded-md font-medium transition-colors"
            >
              Back to Problems
            </button>
          </div>

          {/* Submission Results */}
          {submissionResult && (
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-yellow-400">Submission Result</h3>
              <div className="mb-2">
                <span className={`font-semibold ${
                  submissionResult.status === 'Accepted' ? 'text-green-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  Status: {submissionResult.status}
                </span>
              </div>
              <div className="mb-2 text-gray-700 dark:text-red-400">
                <span>
                  Passed: {submissionResult.passedTests} / {submissionResult.totalTests} test cases
                </span>
              </div>
              <div className="mb-2 text-gray-700 dark:text-red-400">
                <span>Points Earned: {submissionResult.pointsEarned}</span>
              </div>

              {submissionResult.testResults && submissionResult.testResults.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-yellow-400">Test Cases:</h4>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {submissionResult.testResults.map((result, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded border ${
                          result.passed 
                            ? 'bg-green-100 dark:bg-green-900 border-green-200 dark:border-green-800' 
                            : 'bg-red-100 dark:bg-red-900 border-red-200 dark:border-red-800'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-gray-900 dark:text-yellow-400">
                            Test Case {idx + 1}: {result.passed ? '✓ Passed' : '✗ Failed'}
                          </span>
                        </div>
                        {!result.passed && (
                          <div className="text-sm mt-2 text-gray-700 dark:text-red-400">
                            <p><strong>Input:</strong> {result.input}</p>
                            <p><strong>Expected:</strong> {result.expectedOutput}</p>
                            <p><strong>Got:</strong> {result.actualOutput || 'N/A'}</p>
                            {result.error && (
                              <p className="text-red-600 dark:text-red-400"><strong>Error:</strong> {result.error}</p>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;

