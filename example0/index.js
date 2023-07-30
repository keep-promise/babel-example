var babelCore = require("@babel/core");

var sourceCode = `let fn = (a) => a+ 1`;

var options = {
  //是否生成解析的代码
  code: true,
  //是否生成抽象语法树
  ast: true,
  //是否生成sourceMap
  sourceMaps: true,
  plugins: [],
  presets: [],
};
// 转换
babelCore.transform(sourceCode, options, function (err, result) {
  console.log("source code：");
  console.log(sourceCode);
  console.log("==========");
  console.log("result code：");
  console.log(result.code);
  console.log("==========");
  console.log("result map：");
  console.log(result.map);
  console.log("==========");
  console.log("result ast：");
  console.log(result.ast);
});
