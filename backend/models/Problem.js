const mongoose = require('mongoose');

const testCaseSchema = new mongoose.Schema({
  input: {
    type: String,
    required: true
  },
  expectedOutput: {
    type: String,
    required: true
  },
  isHidden: {
    type: Boolean,
    default: false
  }
});

const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  points: {
    type: Number,
    required: true,
    default: 100
  },
  starterCode: {
    javascript: {
      type: String,
      default: 'function solution() {\n    // Your code here\n    return;\n}'
    }
  },
  testCases: [testCaseSchema],
  constraints: {
    type: String,
    default: ''
  },
  examples: [{
    input: String,
    output: String,
    explanation: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Problem', problemSchema);

