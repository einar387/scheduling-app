module.exports = {
  parser: 'typescript',
  printWidth: 80,
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  bracketSpacing: true,
  bracketSameLine: false,
  trailingComma: 'es5',
  arrowParens: 'avoid',
  overrides: [
    {
      files: '*.css',
      options: {
        parser: 'css',
      },
    },
    {
      files: '*.scss',
      options: {
        parser: 'css',
      },
    },
  ],
};
