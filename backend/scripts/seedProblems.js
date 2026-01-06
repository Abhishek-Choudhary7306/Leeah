const mongoose = require('mongoose');
const Problem = require('../models/Problem');
require('dotenv').config();

const problems = [
  {
    title: "Two Sum",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    difficulty: "Easy",
    points: 100,
    starterCode: {
      javascript: `function solution(nums, target) {
    // Your code here
    return [];
}`
    },
    testCases: [
      { input: "[2,7,11,15], 9", expectedOutput: "[0,1]" },
      { input: "[3,2,4], 6", expectedOutput: "[1,2]" },
      { input: "[3,3], 6", expectedOutput: "[0,1]" },
      { input: "[1,5,3,7,2], 9", expectedOutput: "[3,4]" },
      { input: "[1,1,1,1], 2", expectedOutput: "[0,1]" }
    ],
    constraints: "2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      }
    ]
  },
  {
    title: "Reverse String",
    description: `Write a function that reverses a string. The input string is given as an array of characters s.

You must do this by modifying the input array in-place with O(1) extra memory.`,
    difficulty: "Easy",
    points: 100,
    starterCode: {
      javascript: `function solution(s) {
    // Your code here
    return s;
}`,
    },
    testCases: [
      { input: "['h','e','l','l','o']", expectedOutput: "['o','l','l','e','h']" },
      { input: "['H','a','n','n','a','h']", expectedOutput: "['h','a','n','n','a','H']" },
      { input: "['a']", expectedOutput: "['a']" },
      { input: "['a','b']", expectedOutput: "['b','a']" },
      { input: "['1','2','3']", expectedOutput: "['3','2','1']" }
    ],
    constraints: "1 <= s.length <= 10^5\ns[i] is a printable ascii character.",
    examples: [
      {
        input: "s = ['h','e','l','l','o']",
        output: "['o','l','l','e','h']",
        explanation: "The string is reversed in place."
      }
    ]
  },
  {
    title: "Valid Palindrome",
    description: `A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.

Given a string s, return true if it is a palindrome, or false otherwise.`,
    difficulty: "Easy",
    points: 100,
    starterCode: {
      javascript: `function solution(s) {
    // Your code here
    return false;
}`,
    },
    testCases: [
      { input: "'A man, a plan, a canal: Panama'", expectedOutput: "true" },
      { input: "'race a car'", expectedOutput: "false" },
      { input: "' '", expectedOutput: "true" },
      { input: "'a'", expectedOutput: "true" },
      { input: "'ab'", expectedOutput: "false" }
    ],
    constraints: "1 <= s.length <= 2 * 10^5\ns consists only of printable ASCII characters.",
    examples: [
      {
        input: "s = 'A man, a plan, a canal: Panama'",
        output: "true",
        explanation: "'amanaplanacanalpanama' is a palindrome."
      }
    ]
  },
  {
    title: "Maximum Subarray",
    description: `Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

A subarray is a contiguous part of an array.`,
    difficulty: "Medium",
    points: 200,
    starterCode: {
      javascript: `function solution(nums) {
    // Your code here
    return 0;
}`,
    },
    testCases: [
      { input: "[-2,1,-3,4,-1,2,1,-5,4]", expectedOutput: "6" },
      { input: "[1]", expectedOutput: "1" },
      { input: "[5,4,-1,7,8]", expectedOutput: "23" },
      { input: "[-1]", expectedOutput: "-1" },
      { input: "[-2,-1]", expectedOutput: "-1" }
    ],
    constraints: "1 <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4",
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "[4,-1,2,1] has the largest sum = 6."
      }
    ]
  },
  {
    title: "Best Time to Buy and Sell Stock",
    description: `You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.`,
    difficulty: "Easy",
    points: 100,
    starterCode: {
      javascript: `function solution(prices) {
    // Your code here
    return 0;
}`,
    },
    testCases: [
      { input: "[7,1,5,3,6,4]", expectedOutput: "5" },
      { input: "[7,6,4,3,1]", expectedOutput: "0" },
      { input: "[1,2]", expectedOutput: "1" },
      { input: "[2,4,1]", expectedOutput: "2" },
      { input: "[1,2,3,4,5]", expectedOutput: "4" }
    ],
    constraints: "1 <= prices.length <= 10^5\n0 <= prices[i] <= 10^4",
    examples: [
      {
        input: "prices = [7,1,5,3,6,4]",
        output: "5",
        explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5."
      }
    ]
  },
  {
    title: "Contains Duplicate",
    description: `Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.`,
    difficulty: "Easy",
    points: 100,
    starterCode: {
      javascript: `function solution(nums) {
    // Your code here
    return false;
}`,
    },
    testCases: [
      { input: "[1,2,3,1]", expectedOutput: "true" },
      { input: "[1,2,3,4]", expectedOutput: "false" },
      { input: "[1,1,1,3,3,4,3,2,4,2]", expectedOutput: "true" },
      { input: "[1]", expectedOutput: "false" },
      { input: "[1,1]", expectedOutput: "true" }
    ],
    constraints: "1 <= nums.length <= 10^5\n-10^9 <= nums[i] <= 10^9",
    examples: [
      {
        input: "nums = [1,2,3,1]",
        output: "true",
        explanation: "1 appears twice in the array."
      }
    ]
  },
  {
    title: "Product of Array Except Self",
    description: `Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and without using the division operator.`,
    difficulty: "Medium",
    points: 200,
    starterCode: {
      javascript: `function solution(nums) {
    // Your code here
    return [];
}`,
    },
    testCases: [
      { input: "[1,2,3,4]", expectedOutput: "[24,12,8,6]" },
      { input: "[-1,1,0,-3,3]", expectedOutput: "[0,0,9,0,0]" },
      { input: "[2,3]", expectedOutput: "[3,2]" },
      { input: "[1,0]", expectedOutput: "[0,1]" },
      { input: "[0,0]", expectedOutput: "[0,0]" }
    ],
    constraints: "2 <= nums.length <= 10^5\n-30 <= nums[i] <= 30\nThe product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.",
    examples: [
      {
        input: "nums = [1,2,3,4]",
        output: "[24,12,8,6]",
        explanation: "answer[0] = 2*3*4 = 24, answer[1] = 1*3*4 = 12, etc."
      }
    ]
  },
  {
    title: "Longest Substring Without Repeating Characters",
    description: `Given a string s, find the length of the longest substring without repeating characters.`,
    difficulty: "Medium",
    points: 200,
    starterCode: {
      javascript: `function solution(s) {
    // Your code here
    return 0;
}`,
    },
    testCases: [
      { input: "'abcabcbb'", expectedOutput: "3" },
      { input: "'bbbbb'", expectedOutput: "1" },
      { input: "'pwwkew'", expectedOutput: "3" },
      { input: "''", expectedOutput: "0" },
      { input: "'dvdf'", expectedOutput: "3" }
    ],
    constraints: "0 <= s.length <= 5 * 10^4\ns consists of English letters, digits, symbols and spaces.",
    examples: [
      {
        input: "s = 'abcabcbb'",
        output: "3",
        explanation: "The answer is 'abc', with the length of 3."
      }
    ]
  },
  {
    title: "3Sum",
    description: `Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.`,
    difficulty: "Medium",
    points: 200,
    starterCode: {
      javascript: `function solution(nums) {
    // Your code here
    return [];
}`,
    },
    testCases: [
      { input: "[-1,0,1,2,-1,-4]", expectedOutput: "[[-1,-1,2],[-1,0,1]]" },
      { input: "[0,1,1]", expectedOutput: "[]" },
      { input: "[0,0,0]", expectedOutput: "[[0,0,0]]" },
      { input: "[-2,0,1,1,2]", expectedOutput: "[[-2,0,2],[-2,1,1]]" },
      { input: "[-1,0,1]", expectedOutput: "[[-1,0,1]]" }
    ],
    constraints: "3 <= nums.length <= 3000\n-10^5 <= nums[i] <= 10^5",
    examples: [
      {
        input: "nums = [-1,0,1,2,-1,-4]",
        output: "[[-1,-1,2],[-1,0,1]]",
        explanation: "nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0."
      }
    ]
  },
  {
    title: "Binary Tree Inorder Traversal",
    description: `Given the root of a binary tree, return the inorder traversal of its nodes' values.

For this problem, you'll receive the tree as an array representation where null represents an empty node.`,
    difficulty: "Easy",
    points: 100,
    starterCode: {
      javascript: `function solution(root) {
    // Your code here
    // root is an array representation: [1,null,2,3] means:
    //   1
    //    \\
    //     2
    //    /
    //   3
    return [];
}`,
    },
    testCases: [
      { input: "[1,null,2,3]", expectedOutput: "[1,3,2]" },
      { input: "[]", expectedOutput: "[]" },
      { input: "[1]", expectedOutput: "[1]" },
      { input: "[1,2]", expectedOutput: "[2,1]" },
      { input: "[1,null,2]", expectedOutput: "[1,2]" }
    ],
    constraints: "The number of nodes in the tree is in the range [0, 100].\n-100 <= Node.val <= 100",
    examples: [
      {
        input: "root = [1,null,2,3]",
        output: "[1,3,2]",
        explanation: "Inorder: left -> root -> right"
      }
    ]
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/leeah');
    console.log('Connected to MongoDB');

    // Clear existing problems
    await Problem.deleteMany({});
    console.log('Cleared existing problems');

    // Insert problems
    await Problem.insertMany(problems);
    console.log(`Seeded ${problems.length} problems`);

    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding problems:', error);
    process.exit(1);
  }
}

seed();

