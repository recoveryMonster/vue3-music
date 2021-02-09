module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 9,
    parser: 'babel-eslint',
    ecmaFeatures: {
      jsx: true,
    }
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  plugins: ['vue'],
  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
    'prettier',
    'prettier/vue'
  ],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    eqeqeq: [2, 'smart'],
    "vue/no-unused-components": 1,
    "vue/no-unused-vars": 1,
  }
}