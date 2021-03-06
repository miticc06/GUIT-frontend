module.exports = {
  parser: 'babel-eslint',
  ignorePatterns: ['node_modules/', '*.json', 'dist/', 'src/serviceWorker.js', 'config-overrides.js'],
  env: {
    browser: true,
    jest: true,
    es6: true
  },
  extends: ['eslint:recommended', 'airbnb'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      experimentalDecorators: true
    },
    ecmaVersion: 10,
    sourceType: 'module'
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    semi: [
      2,
      'never',
      {
        beforeStatementContinuationChars: 'never'
      }
    ],
    'import/no-extraneous-dependencies': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'jsx-quotes': 'off',
    'comma-dangle': 'off',
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off',
    'import/no-unresolved': 'off',
    quotes: 'off',
    'arrow-body-style': 'off',
    'no-extra-boolean-cast': 'off',
    'react/no-array-index-key': 'off',
    'no-unused-expressions': 'off',
    'react/jsx-props-no-spreading': 'off',
    'max-len': [
      2,
      {
        code: 150,
        tabWidth: 2,
        comments: 350
      }
    ],
    'object-curly-newline': 'off',
    'jsx-a11y/tabindex-no-positive': 'off',
    'no-return-assign': 'off',
    'arrow-parens': 'off',
    'no-restricted-syntax': 'off',
    'lines-between-class-members': 'off',
    'no-useless-constructor': 'off',
    'react/no-unused-state': 'off',
    'space-before-function-paren': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'max-lines': [
      2,
      {
        max: 350,
        skipComments: true
      }
    ],
    'no-underscore-dangle': 0,
    'no-unused-vars': 1,
    'react/jsx-indent': 1
  }
}
