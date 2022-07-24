const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  coverageProvider: 'v8',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.js'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/', 
    '<rootDir>/e2e/',
    '<rootDir>/.next/',
    '<rootDir>/db',
    '<rootDir>/public',
    '<rootDir>/playwright.config.ts',
    '<rootDir>/tests-examples/',
],
coveragePathIgnorePatterns: [
  '<rootDir>/node_modules/', 
  '<rootDir>/e2e/',
  '<rootDir>/.next/',
  '<rootDir>/db',
  '<rootDir>/public',
  '<rootDir>/playwright.config.ts',
  '<rootDir>/tests-examples/',
  '<rootDir>/types/',
],
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!<rootDir>/e2e/**',
    '!<rootDir>/node_modules/**',
    '!**/node_modules/**',
    '!<rootDir>/tests-examples/**',
    '!<rootDir>/out/**',
    '!<rootDir>/.next/**',
    '!<rootDir>/*.config.js',
    '!<rootDir>/coverage/**',
    '!<rootDir>/db',
    '!<rootDir>/public',
  ],
  "coverageReporters": ["clover", "json", "lcov", ["text", {"skipFull": true}]],
  "transformIgnorePatterns": [
    "node_modules/(?!spacetime)"
  ]
}

module.exports = createJestConfig(customJestConfig)