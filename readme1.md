## 测试使用babel

## node 环境运行js
```js
console.log('Hello Node！')
```
运行js
```js
node ./index.js
```

## node 环境运行commonjs模块
```js
// model.js
// commonjs模块
module.exports = {
  name:'小明',
  age:18
}


// index.js使用model模块
const user = require('./model')
console.log('Hello Node！')
console.log(user)

```
module.exports和require是NodeJS的默认CommonJS模块的导出和导入方式


## node 环境测试ES Module

```js
// model_es.js 
// esm模块
export default {
  name:'小花',
  age:18
}
// 导入model1模块公开的对象
import user1 from './model_es.js'
// 导入model模块公开的对象
const user = require('./model')
console.log('Hello Node！')
console.log(user)
console.log(user1)
```

运行报错：
```js
import user1 from './model_es.js'
^^^^^^
SyntaxError: Cannot use import statement outside a module
...
```
错误原因是NodeJS会默认以CommonJS的规范来执行JavaScript代码，所以NodeJS的语法与ECMAScript的语法规范不同，Node的模块特色时module.exports和require模式，而ES Module的模块关键字为 export和import。
Node控制台提出了这个问题的解决方案
1. **在packpage.json中定义type为module**
2. 使用mjs为后缀定义使用ES Module的文件


### 1. 在packpage.json中定义type为module
新的错误应运而生：
```js
const user = require('./model')
^
ReferenceError: require is not defined in ES module scope, you can use import instead
```

新的错误出现，这个错误告诉我们当前的js文件中包含了未识别的require关键字，这个关键字时CommonJS规范的模块导入，在ES Module中不支持。想要解决这个问题
可以将文件命名为.cjs结尾，或者将package.json中的type去掉

## babel解决方案
针对这种场景，NodeJS无法处理既包含ES Module模块又包含CommonJS的模块规范，鱼和熊掌的问题来了。为了迎合全新的编程风格，NodeJS中往往也需要大量按照ES规范去进行编程，这样既想保持Node本来的规范，又想使用完整的ECMA规范，就需要将babel追加到Node项目中。
```js
"devDependencies": {
  "@babel/cli": "^7.15.7",
  "@babel/core": "^7.15.8",
  "@babel/preset-env": "^7.15.8"
},
"dependencies": {
  "core-js": "^3.18.3"
}
```

在根目录中创建文件名为.babelrc文件并在其中声明如下配置
```js
{
  "presets": [//将preset-env管理插件安装到babel中
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs":"3"
      }
    ]
  ]
}
```

增加命令
```js
"babel-build": "babel src --out-dir lib"//使用babel中的编译整个文件夹命令将当前的src文件夹输出到lib中
```