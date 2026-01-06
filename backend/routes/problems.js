const express = require('express');
const Problem = require('../models/Problem');
const router = express.Router();

// Get all problems
router.get('/', async (req, res) => {
  try {
    const problems = await Problem.find().select('-testCases -starterCode');
    res.json(problems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single problem
router.get('/:id', async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    res.json(problem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

