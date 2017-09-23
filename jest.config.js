// jest.config.js
module.exports = {
  'testEnvironment': 'node',
  'setupTestFrameworkScriptFile': '<rootDir>/test/setup.js',
  'roots': [
    '<rootDir>/test'
  ],
  'modulePaths': [
    '<rootDir>/src'
  ],
  'coverageDirectory': './coverage/',
  'collectCoverage': true,
  'coverageReporters': ['json', 'lcov', 'text']
};
