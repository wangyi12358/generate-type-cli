module.exports = {
  'parser': '@typescript-eslint/parser',
  'plugins': [
    '@typescript-eslint'
  ],
  rules: {
    'object-curly-spacing': ['error', 'always'],
    'no-multi-spaces': 'error',
    '@typescript-eslint/no-invalid-this': ['off'],
    'indent': [
      'error',
      2,
      {
        'SwitchCase': 1
      }
    ],
    'no-param-reassign': 0,
    'space-before-blocks': ['error', 'always'],
    'space-in-parens': ['error', 'never'],
    'quotes': [1, 'single'], // 引号类型 `` "" ''
    'space-before-function-paren': [0, 'always'] //函数定义时括号前面要不要有空格
  }
};
