module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'vue/no-unused-components': 0,
    'no-console': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-mixed-spaces-and-tabs": 0, // disable rule

  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
