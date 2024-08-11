/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testPathIgnorePatterns: ['/node_modules/'],
  watchPathIgnorePatterns: ['/node_modules/'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true
};