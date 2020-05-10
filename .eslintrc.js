module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'arrow-parens': 'off',
    'comma-dangle': 'off',
    'quotes': ['error', 'single'],
    'no-prototype-builtins': 'off',
    'one-var': ['error', 'consecutive'],
    'react/destructuring-assignment': 'off',
  },
};
