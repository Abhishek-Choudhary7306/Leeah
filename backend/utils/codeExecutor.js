const axios = require('axios');

// Helper function to parse input string to actual values
// Handles cases like "[2,7,11,15], 9" by parsing as multiple arguments
const parseInput = (inputStr) => {
  try {
    // Remove leading/trailing whitespace
    const trimmed = inputStr.trim();
    
    // Try to parse as comma-separated arguments
    // Input format: "[2,7,11,15], 9" should become [[2,7,11,15], 9]
    // We'll use a safer approach: try to evaluate as an array of arguments
    try {
      // Wrap in array brackets to handle multiple arguments
      const result = eval(`[${trimmed}]`);
      return Array.isArray(result) ? result : [result];
    } catch (e) {
      // If that fails, try parsing as a single value
      try {
        return [eval(trimmed)];
      } catch (e2) {
        // If all fails, return as string wrapped in array
        return [trimmed];
      }
    }
  } catch (e) {
    // If eval fails, return as string wrapped in array
    return [inputStr];
  }
};

// Helper function to format output for comparison
const formatOutput = (value) => {
  if (value === null) {
    return 'null';
  }
  if (value === undefined) {
    return 'undefined';
  }
  if (Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }
  if (typeof value === 'boolean') {
    return String(value);
  }
  if (typeof value === 'number') {
    return String(value);
  }
  // For strings, trim whitespace
  return String(value).trim();
};

// Mock code executor for development (can be replaced with Judge0 API)
const executeCode = async (code, language, testCases) => {
  const results = [];

  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i];
    const startTime = Date.now();
    
    try {
      if (language === 'javascript') {
        let actualOutput;
        let error = null;
        
        try {
          // Parse input from string - handles multiple arguments
          // Input format: "[2,7,11,15], 9" becomes array of arguments
          const parsedArgs = parseInput(testCase.input);
          
          // Create execution context with the user's code
          // We need to ensure the solution function is available in the scope
          const executionCode = `
            ${code}
            
            // Call solution with parsed arguments
            let result;
            try {
              if (Array.isArray(parsedArgs) && parsedArgs.length > 0) {
                // Spread arguments if we have multiple
                if (parsedArgs.length === 1) {
                  result = solution(parsedArgs[0]);
                } else {
                  result = solution(...parsedArgs);
                }
              } else {
                result = solution(parsedArgs);
              }
            } catch (e) {
              throw e;
            }
            return result;
          `;
          
          // Use Function constructor to execute code
          // This creates an isolated scope
          const func = new Function('parsedArgs', executionCode);
          const result = func(parsedArgs);
          
          // Format output
          actualOutput = formatOutput(result);
        } catch (execError) {
          error = execError.message || String(execError);
          actualOutput = '';
        }

        const executionTime = Date.now() - startTime;
        const expectedOutput = testCase.expectedOutput.trim();
        // Compare outputs (handle both string and array comparisons)
        let passed = false;
        if (!error) {
          // Try to parse both as JSON for array/object comparison
          try {
            const expectedParsed = JSON.parse(expectedOutput);
            const actualParsed = JSON.parse(actualOutput);
            passed = JSON.stringify(expectedParsed) === JSON.stringify(actualParsed);
          } catch (e) {
            // If parsing fails, do string comparison
            passed = actualOutput === expectedOutput;
          }
        }

        results.push({
          testCaseIndex: i,
          passed,
          input: testCase.input,
          expectedOutput,
          actualOutput,
          executionTime,
          error
        });
      }
    } catch (error) {
      results.push({
        testCaseIndex: i,
        passed: false,
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        actualOutput: '',
        executionTime: Date.now() - startTime,
        error: error.message
      });
    }
  }

  return results;
};

// Judge0 API integration (optional - uncomment and configure to use)
/*
const executeCodeWithJudge0 = async (code, language, testCases) => {
  const languageIds = {
    javascript: 63, // Node.js
    python: 71      // Python 3
  };

  const results = [];
  
  for (const testCase of testCases) {
    try {
      const response = await axios.post(
        `${process.env.JUDGE0_API_URL}/submissions`,
        {
          source_code: code,
          language_id: languageIds[language],
          stdin: testCase.input,
          expected_output: testCase.expectedOutput
        },
        {
          headers: {
            'X-RapidAPI-Key': process.env.JUDGE0_API_KEY,
            'Content-Type': 'application/json'
          }
        }
      );

      const token = response.data.token;
      
      // Poll for result
      let result;
      do {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const statusResponse = await axios.get(
          `${process.env.JUDGE0_API_URL}/submissions/${token}`,
          {
            headers: {
              'X-RapidAPI-Key': process.env.JUDGE0_API_KEY
            }
          }
        );
        result = statusResponse.data;
      } while (result.status.id <= 2);

      results.push({
        passed: result.status.id === 3,
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        actualOutput: result.stdout || result.stderr || '',
        executionTime: result.time || 0,
        error: result.stderr || null
      });
    } catch (error) {
      results.push({
        passed: false,
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        actualOutput: '',
        executionTime: 0,
        error: error.message
      });
    }
  }

  return results;
};
*/

module.exports = { executeCode };

