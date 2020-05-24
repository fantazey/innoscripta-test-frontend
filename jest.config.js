module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  setupFiles: ['<rootDir>/__tests__/setup.js'],
  modulePathIgnorePatterns: [
    'setup.js',
    '<rootDit>/public/',
    '<rootDit>/__tests__/coverage'
  ],
  snapshotSerializers: [
    'enzyme-to-json/serializer'
  ],
  coverageReporters: [
    'text'
  ],
  coverageDirectory: '<rootDir>/__tests__/coverage/',
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**'
  ]
};

