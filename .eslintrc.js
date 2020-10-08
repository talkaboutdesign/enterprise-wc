module.exports = {
  env: {
    browser: true,
    es6: true // All source code is at least ES6 friendly
  },
  extends: [
    // Import some AirBNB rules and some web component and jsdoc rules
    // https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base/rules
    'airbnb-base',
    'plugin:wc/recommended',
    'plugin:jsdoc/recommended'
  ],
  globals: {
    page: true,
    browser: true,
    context: true,
    jestPuppeteer: true,
    jest: true,
    it: true,
    describe: true,
    beforeAll: true,
    afterAll: true,
    afterEach: true,
    beforeEach: true,
    expect: true,
    test: true
  },
  parser: 'babel-eslint',
  plugins: [
    'import'
  ],
  // Add `ecmaVersion: 9` for Object spread syntax
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module'
  },
  rules: {
    // Dont force a new line after comments
    'jsdoc/newline-after-description': 0,
    // Allow a few custom jsdoc tags
    'jsdoc/check-tag-names': ['error', { definedTags: ['jest-environment'] }],
    // require trailing commas in multiline object literals
    'comma-dangle': ['off', {
      arrays: 'never',
      objects: 'never',
      imports: 'never',
      exports: 'never',
      functions: 'never'
    }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/prefer-default-export': ['off', { }],
    // Allow clases to be set on the web components
    'wc/no-self-class': 0,
    // Allow methods to return static content
    // https://eslint.org/docs/rules/class-methods-use-this
    'class-methods-use-this': ['error', { exceptMethods: ['template', 'settings'] }],
    // Allow Ids Imports to be unsed in index.js files
    'no-unused-vars': ['error', { varsIgnorePattern: '[Ids]' }],
    // Allow Arrow functions to be on the next line or below
    'implicit-arrow-linebreak': ['off', { }],
    // Allow single quotes only or template literals
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    // Allow Arrow functions to be on the next line or below
    'no-useless-constructor': ['off', { }],
    // Allow hasOwnProperty
    'no-prototype-builtins': ['off', { }],
    // Don't require array destructuring
    'prefer-destructuring': ['off', { }],
    // Allow i++
    'no-plusplus': ['off', { }],
  }
};
