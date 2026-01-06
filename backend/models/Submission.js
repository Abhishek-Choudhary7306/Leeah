const mongoose = require('mongoose');

const testResultSchema = new mongoose.Schema({
  testCaseIndex: Number,
  passed: Boolean,
  input: String,
  expectedOutput: String,
  actualOutput: String,
  executionTime: Number,
  error: String
});

const submissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem',
    required: true
  },
  code: {
    type: String,
    required: true
  },
  language: {
    type: String,
    enum: ['javascript'],
    required: true
  },
  testResults: [testResultSchema],
  passedTests: {
    type: Number,
    default: 0
  },
  totalTests: {
    type: Number,
    default: 0
  },
  pointsEarned: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['Accepted', 'Wrong Answer', 'Runtime Error', 'Time Limit Exceeded', 'Compilation Error'],
    default: 'Wrong Answer'
  },
  executionTime: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Submission', submissionSchema);

