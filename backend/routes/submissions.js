const express = require('express');
const Submission = require('../models/Submission');
const Problem = require('../models/Problem');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { executeCode } = require('../utils/codeExecutor');
const router = express.Router();

// Submit solution
router.post('/', auth, async (req, res) => {
  try {
    const { problemId, code, language } = req.body;

    if (!problemId || !code || !language) {
      return res.status(400).json({ message: 'Please provide problemId, code, and language' });
    }

    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    // Execute code against test cases
    const testResults = await executeCode(code, language, problem.testCases);
    
    const passedTests = testResults.filter(r => r.passed).length;
    const totalTests = testResults.length;
    const pointsPerTest = problem.points / totalTests;
    const pointsEarned = Math.floor(passedTests * pointsPerTest);

    // Determine status
    let status = 'Accepted';
    
    // Check for runtime errors first
    const hasError = testResults.some(r => r.error && r.error.trim() !== '');
    if (hasError) {
      status = 'Runtime Error';
    } else if (passedTests === 0) {
      status = 'Wrong Answer';
    } else if (passedTests < totalTests) {
      status = 'Wrong Answer';
    } else {
      status = 'Accepted';
    }

    // Create submission
    const submission = new Submission({
      userId: req.user._id,
      problemId,
      code,
      language,
      testResults,
      passedTests,
      totalTests,
      pointsEarned,
      status
    });

    await submission.save();

    // Update user points if all tests passed
    if (passedTests === totalTests && pointsEarned > 0) {
      const user = await User.findById(req.user._id);
      const alreadySolved = user.solvedProblems.some(
        sp => sp.problemId.toString() === problemId
      );
      
      if (!alreadySolved) {
        user.totalPoints += pointsEarned;
        user.solvedProblems.push({ problemId });
        await user.save();
      }
    }

    res.json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's submissions
router.get('/user', auth, async (req, res) => {
  try {
    const submissions = await Submission.find({ userId: req.user._id })
      .populate('problemId', 'title difficulty points')
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get submissions for a specific problem
router.get('/problem/:problemId', auth, async (req, res) => {
  try {
    const submissions = await Submission.find({
      userId: req.user._id,
      problemId: req.params.problemId
    })
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

