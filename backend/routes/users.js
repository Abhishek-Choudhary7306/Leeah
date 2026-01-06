const express = require('express');
const User = require('../models/User');
const Submission = require('../models/Submission');
const auth = require('../middleware/auth');
const router = express.Router();

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('solvedProblems.problemId', 'title difficulty points')
      .select('-password');
    
    const totalSubmissions = await Submission.countDocuments({ userId: req.user._id });
    const acceptedSubmissions = await Submission.countDocuments({
      userId: req.user._id,
      status: 'Accepted'
    });

    res.json({
      user,
      stats: {
        totalSubmissions,
        acceptedSubmissions,
        solvedProblems: user.solvedProblems.length
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

