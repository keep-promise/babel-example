const { transformSync } = require('@babel/core');

// 需求：开发环境下列代码能够执行，生产环境删除console.log('1111')后面的代码
const sourceCode = `
console.log('1111');
if(DEBUG) {
  const a = 10;
  const b = 20;
  console.log(a+b);
}
`
// const babelConfig = {
//   plugins: ["./index.js"]
// };
const babelConfig = {
  plugins: [
    [
      "./index.js",
      {
        name: '测试'
      }
    ]
  ]
};
const output = transformSync(sourceCode, babelConfig);
// console.log('output.code:\n', output.code)
