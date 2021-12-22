/*
 * @Author: your name
 * @Date: 2021-08-12 09:49:09
 * @LastEditTime: 2021-08-12 11:24:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /template/.eslintrc.js
 */
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    // singleQuote: true,

    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // Vue组件
    'vue/html-indent': [
      'error',
      // 基础缩进
      2,
      {
        // 属性的缩进比例
        attribute: 1,
        // 顶层元素的缩进比例
        baseIndent: 1,
        // 右括号相对于左括号的缩进倍数
        closeBracket: 0,
        // 是否允许属性换行对齐
        alignAttributesVertically: true,
        ignores: [],
      },
    ],
    // 设置每行的最大属性数，此处为关闭
    'vue/max-attribute-per-line': 'off',
    'vue/html-self-closing': [
      'error',
      {
        // any: 可选,always: 内容为空时始终自必合,never: 不允许自闭合
        html: {
          // 常见的空元素
          void: 'any',
          // 常见的元素
          normal: 'any',
          // 自定义组件
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    // 组件prop是否必须要有默认值，此处为不限制
    'vue/require-default-prop': 'off',
    // 元素不强制换行
    'vue/singleline-html-element-content-newline': 'off',
    // 组件必须使用大驼峰命名
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    // 不允许缺失结束标签
    'vue/html-end-tags': 'off',
    // 组件的data属性不允许是对象
    'vue/no-shared-component-data': 'error',
    // 组件的属性必须为一定的顺序，方便阅读
    'vue/order-in-components': 'error',
    // 组件的标签属性必须为一定的顺序，方便阅读
    'vue/attributes-order': 'error',
    // 必须使用 === 或 !==， 除非比较 null
    'vue/eqeqeq': ['error', 'always', { null: 'ignore' }],
    // 箭头函数箭头前后必须添加空格
    'vue/arrow-spacing': 'error',
    // 开始括号、结束括号与内容之间强制加括号
    'vue/block-spacing': 'error',
    // 前后括号保持一致
    'vue/brace-style': 'error',
    // 对象的键值之间必须加空格
    'vue/key-spacing': 'error',
    // 括号之间强制加空格
    'vue/object-curly-spacing': ['error', 'always'],
    // 一元操作符前后强制添加空格
    'vue/space-unary-ops': 'error',
    // 模版内不允许使用this
    'vue/this-in-template': ['error', 'never'],
    // 禁止在v-for或scope属性中进行隐式的变量声明
    'vue/no-template-shadow': 'off',

    // js部分
    // 不允许使用eval,with,var
    'no-eval': 'error',
    // 'no-with': 'error',
    'no-var': 'error',
    // 必须使用 === 或 !==， 除非比较 null
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    // 数组的方法除了 forEach 之外，回调函数必须有返回值
    'array-callback-return': 'error',
    // 禁止函数的循环复杂度超过 20, 例如连续 20 个 if 判断
    complexity: 'error',
    // 禁止使用位运算符，除非 !!, +
    'no-implicit-coercion': ['error', { allow: ['!!', '+'] }],
    // 禁用标签语句
    'no-labels': 'error',
    // 禁止对 Function 对象使用 new 操作符
    'no-new-func': 'error',
    // 禁止在循环内的函数中, 出现循环体条件语句中定义的变量
    'no-loop-func': 'error',
    // 要求或禁止使用命名的 function 表达式
    'func-names': 'off',
    // new 后面必须大写
    'new-cap': 'error',
    // 禁止使用不带 await 表达式的 async 函数
    'require-await': 'off',
    // 禁止使用 javascript: url
    'no-script-url': 'error',
    // for in 内部必须有 hasOwnProperty
    'guard-for-in': 'error',
    // 禁止修改原生对象
    'no-extend-native': 'error',
    // 禁止无用的表达式
    'no-unused-expressions': 'off',
    // 禁止无用变量
    'no-unused-vars': 'warn',
    // 避免使用简单的三元运算符
    'no-unneeded-ternary': 'error',
    // 禁止 new String Boolean 等
    'no-new-wrappers': 'error',
    // 属性方法缩写
    'object-shorthand': 'warn',
    // 箭头函数的函数体只有一句时，省略 {}
    'arrow-body-style': 'warn',
    // 使用 . 而不是 []
    'dot-notation': 'error',
  },
};
