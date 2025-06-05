module.exports = {
  extends: [
    'google',
    'plugin:prettier/recommended' // Enables eslint-plugin-prettier and displays prettier errors
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  rules: {
    'require-jsdoc': 'off', // Google enforces this by default
    'quotes': ['error', 'single'],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'none',
        bracketSpacing: true,
        printWidth: 80,
        tabWidth: 2,
        semi: true
      }
    ]
  }
};
