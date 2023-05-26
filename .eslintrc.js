const prettierConfig = require('./.prettierrc.js');

module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'react', 'jsx-a11y'],
  parser: '@typescript-eslint/parser',
  rules: {
    'comma-dangle': ['warn', 'always-multiline'],
    'no-unused-vars': ['warn', { args: 'after-used', argsIgnorePattern: '^_' }],
    'no-unreachable': 1,
    'prettier/prettier': ['warn', prettierConfig],
    'react/display-name': 0,
    'react/jsx-uses-vars': 1,
    'react/no-unknown-property': 0,
    'react/no-debugger': 'off',
    'react/no-deprecated': 0,
    'react/prop-types': 'off',
    'require-yield': 'off',
    semi: ['error', 'always'],
    'semi-spacing': ['error', { before: false, after: true }],
    // Turn off all typescript rules by default
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars-experimental': 'off',
    '@typescript-eslint/no-var-requires': 'off',
  },
  overrides: [
    {
      // Enable typescript rules for ts files only
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          { args: 'after-used', argsIgnorePattern: '^_' },
        ],
      },
    },
  ],
};
