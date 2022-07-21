比如不支持箭头函数的浏览器（IE11浏览器）
运行的话会出现报错；
经过Babel编译之后的代码就可以运行在IE11以及更低版本的浏览器中了

`
let fun = () => console.log('hello babel')
`
babel编译之后

let fun = function () {
  return console.log('hello babel.js');
};

ES6箭头函数，就是通过@babel/plugin-transform-arrow-functions这个插件来转换
