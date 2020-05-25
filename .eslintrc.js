module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
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
    'no-plusplus': 'off'
  },
  overrides: [
    {
      files: [
        "**/*.test.js",
        "**/__tests_/setup.js"
      ],
      env: {
        jest: true
      },
      plugins: ['jest'],
      globals: {
        mount: "readonly",
        shallow: "readonly",
        render: "readonly"
      },
      rules: {
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error",
        "react/react-in-jsx-scope": "off",
        "react/jsx-filename-extension": "off",
        "react/jsx-props-no-spreading": "off",
      }
    }
  ],
};
