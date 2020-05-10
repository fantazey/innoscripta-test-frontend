module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  setupFiles: ['./__tests__/setup.js'],
  modulePathIgnorePatterns: ["setup.js"],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  coverageReporters: ['text'],
  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/vendor/**"
  ]
};

