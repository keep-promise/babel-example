# Babel 是一个 JavaScript 编译器

Babel 是一个工具链，主要用于将采用 ECMAScript 2015+ 语法编写的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。

babel 工作：

1. 语法转换
2. 通过 Polyfill 方式在目标环境中添加缺失的特性（通过第三方 polyfill 模块，例如 core-js，实现）
3. 源码转换 (codemods)

## 语法编译器

众所周知，JavaScript 是一门解释型语言
他并不像 Java 一样通过代码编译器和解释器混合模式将代码字节化运行，**JavaScript 本身在浏览器中就是边解释边运行的**。
那么为什么还需要 babel 语法编译器？

**babel 是一门静态语法编译器，他并不是在程序运行时参与工作，而是在程序运行前先执行语法**

**需要 babel 的主要原因是 ECMA 规范的定制和落实的流程繁琐而漫长，在一个规范落地实现前主流浏览器还无法通过内置 JavaScript 引擎来识别并运行新的代码规范，而 babel 可以实现将新的代码规范提前在 babel 中进行编译并将生成的结果输出为指定的 ES 版本，这样浏览器可以运行通过还未支持的 ES 规范开发的 JavaScript 代码**。

babel 经过了漫长的发展历程并持续针对 ECMA 的新规范提供对应的实现，而且尽力的实现将新规范的输出范围支持较早的浏览器版本，让开发者可以无需关注 JavaScript 运行环境的问题。到现在 babel 已经更新到了第 7 个大版本，并且从 7 版本开始彻底与 6 之前的版本分离。

ES6（2015）：新增了 class、ES Module、箭头函数、参数默认值、模版字符串、解构赋值、展开运算符、对象属性简写、Promise 和 let const 声明符。

ES7（2016）：Array.prototype.includes()和指数操作符。

ES8（2017）：async/await、 Object.values()、Object.entries()、String padding、函数参数列表结尾允许逗号、Object.getOwnPropertyDescriptors()、SharedArrayBuffer 对象和 Atomics 对象

ES9（2018） ：异步迭代、Promise.finally()、Rest/Spread 属性、正则表达式命名捕获组、正则表达式反向断言和正则表达式 dotAll 模式

ES10（2019）：Array.flat()和 Array.flatMap()、String.trimStart()和 String.trimEnd()、String.prototype.matchAll、Symbol.prototype.description、Object.fromEntries()和可选 Catch

ES11（2020）：Nullish coalescing Operator(空值处理)、Optional chaining（可选链）、Promise.allSettled、import()、新基本数据类型 BigInt 和 globalThis

ES12（2021）： replaceAll、Promise.any、WeakRefs、逻辑运算符和赋值表达式和数字分隔符

### 在浏览器中使用 babel

babel 在编程使用中有很多种，最简单的方式是通过在浏览器中使用 babel 提供的 browser 实现并且配合 type 为 text/babel 的 script 标签中编写新的代码。但是这种方式仅仅适用于学习阶段，如果你在浏览器中直接使用 babel 运行 JavaScript 那是完全不适合生产环境的。因为它在执行 polyfill 时会大量的消耗资源，所以推荐在本地的开发环境中通过 Webpack 结合 babel 库来进行代码的处理。

## 介绍-使用场景

我们的项目需要支持 IE10，因此我们需要修改.babelrc：

```json
{
  "presets": ["@babel/preset-env"]
}
```

或者对它进行缩写：

```js
{
  "presets": ["@babel/env"]
}
```

通过 Babel 编译后输出：

```js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var fun = function () {
  return console.log("hello babel.js");
};

var Person = /*#__PURE__*/ (function () {
  function Person(name) {
    _classCallCheck(this, Person);

    this.name = name;
  }

  _createClass(Person, [
    {
      key: "say",
      value: function say() {
        console.log("my name is\uFF1A".concat(this.name));
      },
    },
  ]);

  return Person;
})();

var tom = new Person("tom");
tom.say();
```

可以发现虽然我们没有配置任何转换插件，但是上面写的的箭头函数、Class、Const 和模板字符串语法都已经被转换了；
默认情况下
**@babel/env** 等于
**@babel/preset-es2015**
**@babel/preset-es2016**
**@babel/preset-es2017**
三个套餐的叠加

那如果我们只需要支持最新的 Chrome 了，可以继续修改.babelrc：

```js
{
  "presets": [
    [
      "@babel/env",
      {
        "targets": "last 2 Chrome versions"
      }
    ]
  ]
}
```

targets 中的含义是最新的两个 Chrome 版本，Babel 再次编译输出：

```js
"use strict";

let fun = () => console.log("hello babel.js");
class Person {
  constructor(name) {
    this.name = name;
  }

  say() {
    console.log(`my name is：${this.name}`);
  }
}
const tom = new Person("tom");
tom.say();
```

而最新版本的 Chrome 已经支持箭头函数、Class、Const 和模板字符串，所以在编译时不会在进行转换，相关代码在 demo3。

上面的 target 字段不少同学肯定看着很眼熟，这个工具能够根据项目中指定的目标浏览器自动来进行配置，这里我们就不展开深入讨论了；
**它也可以单独在项目中配置一个.browserslistrc 文件**：

last 2 Chrome versions
这样和 targets 字段的使用效果是一样的；正常情况下，推荐使用 browserslist 的配置而很少单独配置@babel/preset-env 的 targets；@babel/preset-env 有一些常用的配置项让我们来看一下：

### targets 它是用来描述我们在项目中想要支持的目标浏览器环境

虽然 targets 不推荐使用，但是我们还是来了解一下它的用法，它是用来描述我们在项目中想要支持的目标浏览器环境，它可以是 Browserslist 格式的查询：

```JS
{
  "targets": "> 0.25%, not dead"
}
```

或者可以是一个对象，用来描述支持的最低版本的浏览器：

```JS
{
  "targets": {
    "chrome": "58",
    "ie": "11"
  }
}
```

其他的浏览器版本还可以是：opera、edge、firefox、safari、ios、android、node、electron 等

### spec

这个属性主要是给其他插件传递参数，比如
**@babel/plugin-transform-arrow-functions**，
默认是 false，设为 true 后，我们的箭头函数会有以下改变：

**将箭头函数生成的函数用.bind(this)包裹一下，以便在函数内部继续使用 this，而不是重命名 this**。
**加一个检查防止函数被实例化**
**给箭头函数加一个名字**

### loose

这个属性也主要是给其他插件传递参数（比如@babel/plugin-transform-classes），默认是 false，类的方法直接定义在构造函数上；而设置为 true 后，类的方法被定义到了原型上面，这样在类的继承时可能会引起问题。

### include

转换时总是会启用插件的数组，格式是 Array<string|RegExp>，它可以是一下两种值：

### Babel 插件

内置的 core-js，比如 es.map，es.set 等
比如我们在 last 2 Chrome versions 目标浏览器环境下，不会转换箭头函数和 Class，但是我们可以将转换箭头函数的插件配置到 include 中，这样不管我们的目标浏览器怎么更换，箭头函数语法总是会转换：

```js
{
  "presets": [
    [
      "@babel/env",
      {
        "targets": "last 2 Chrome versions",
        "include": ["@babel/plugin-transform-arrow-functions"]
      }
    ]
  ]
}
```

### useBuiltIns 和 corejs

useBuiltIns 这个属性决定是否引入 polyfill，可以配置三个值：false（不引入）、usage（按需引入）和 entry（项目入口处引入）；corejs 表示引入哪个版本的 core-js，可以选择 2（默认）或者 3，只有当 useBuiltIns 不为 false 时才会生效。

### @babel/polyfill【解决@babel/preset-env 不能解决的问题】

虽然@babel/preset-env 可以转换大多高版本的 JS 语法，但是一些 ES6 原型链上的函数（比如数组实例上的的 filter、fill、find 等函数）以及新增的内置对象（比如 Promise、Proxy 等对象），是低版本浏览器本身内核就不支持，
因此@babel/preset-env 面对他们时也无能为力

比如我们常用的 filter 函数，在 IE 浏览器上就会出现兼容性问题，因此我们通过 polyfill（垫片）的方式来解决，下面是 filter 函数简单的兼容代码：

```js
if (!Array.prototype.filter) {
  Array.prototype.filter = function (fun /_, thisp_/ ) {
    var len = this.length;
    if (typeof fun != "function") {
      throw new TypeError();
    }
    var res = new Array();
    var thisp = arguments[1];
    for (var i = 0; i < len; i++) {
      if (i in this) {
        var val = this[i];
        if (fun.call(thisp, val, i, this)) {
          res.push(val);
        }
      }
    }
    return res;
  };
}
```

但是 ES 有那么多函数和内置对象，我们不可能一个一个都手写来解决，这就到了@babel/polyfill 用武之处了；首先我们需要在项目中安装它：
```js
npm install --save @babel/polyfill
```
安装完成后在需要转换的文件入口加入引用代码：
```js
import '@babel/polyfill'
```
或者我们也可以在 Webpack 入口处进行引入：
```js
module.exports = {
  entry: ["@babel/polyfill", "./src/index.js"],
};
```
然后通过 webpack 来打包，这样就能看到在我们的代码中加入了很多的兼容代码，相关代码在 example4

### babel/polyfill的问题
发现我们数组的 fill、filter 和 findIndex 等方法都打包进去了，但是看到这么多密密麻麻的兼容代码，眼尖的童鞋肯定会发现以下两个问题：

打包出来生成的文件非常的大；有一些语法特性可能是我们没用到的，但是 Webpack 不管三七二十一全都引用进去了，导致打包出来的文件非常庞大。
污染全局变量；polyfill 给很多类的原型链上添加函数，如果我们开发的是一个类库给其他开发者使用，这种情况会非常不可控。
因此从 Babel7.4 开始@babel/polyfill 就不推荐使用了，而是直接引入 **core-js 与 regenerator-runtime** 两个包；而@babel/polyfill 本身也是这两个包的集合；在上面 webpack 打包出来的 dist 文件我们也可以看到，引用的也是这两个包。那 core-js 到底是什么呢？
**通过配置babelrc文件usebuiltIns为usage 和 corejs 可以解决该问题**

**useBuiltIns 设置为 entry 的情况则会将 core-js 中的模块在入口处全部引入**


## core-js
**它是 JavaScript 标准库的 polyfill**
**它尽可能的进行模块化，让你能选择你需要的功能**
它和 babel 高度集成，可以对 core-js 的引入进行最大程度的优化
目前我们使用的默认都是 core-js@2，但它已经封锁了分支，在此之后的特性都只会添加到 core-js@3，
因此也是推荐使用最新的 core-js@3。

### @babel/preset-env 与 core-js
在上面@babel/preset-env 配置中有 **useBuiltIns 和 corejs**s 两个属性，是用来控制所需的 core-js 版本；我们以 Object.assign、filter 和 Promise 为例，相关代码在 demo5：
```js
Object.assign({}, {});

[(1, 5, 10, 15)].filter(function (value) {
  return value > 9;
});

let promise = new Promise((resolve, reject) => {
  resolve(1);
});
```
然后修改配置文件，如果我们将 useBuiltIns 配置为非 false 而没有指定 corejs 的版本，Babel 会提示我们需要配置 corejs 的版本：

秉承着用新不用旧的原则，毅然选择 core-js@3：
```js
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ]
  ]
}
```
可以看到我们的打包的文件自动引入了 core-js 中的模块：
```js
"use strict";

require("core-js/modules/es.array.filter");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

Object.assign({}, {});
[(1, 5, 10, 15)].filter(function (value) {
  return value > 9;
});
var promise = new Promise(function (resolve, reject) {
  resolve(1);
});
```
而且我们发现它只引入了部分模块；这就比较厉害了，它不仅会考虑到代码中用到的新特性，还会参考目标浏览器的环境来进行按需引入；
**useBuiltIns 设置为 entry 的情况则会将 core-js 中的模块在入口处全部引入**

​
### @babel/runtime【解决辅助函数重复的问题】
我们在上面通过@babel/preset-env 转换 Class 类时发现输出文件的头部多了\_classCallCheck、\_defineProperties 和\_createClass 三个函数声明，这就是注入的函数，称为辅助函数；@babel/preset-env 在转换时注入了函数声明，以便语法转换后使用。

但是我们开发项目时，文件少则几十个，多个上百个，如果每个文件都注入了函数声明，再通过打包工具打包后输出文件又会非常庞大，影响性能。

**因此，Babel 提供的解决思路是把这些辅助函数都放到一个 npm 包里面，在每次需要使用的时候就从这个包里把函数 require 出来；这样即使有几千个文件，也都是对函数进行引用，而不是复制代码；最后通过 webpack 等工具打包时，只会将 npm 包中引用到的函数打包一次，这样就复用了代码，减少打包文件的大小**

@babel/runtime 就是这些辅助函数的集合包，我们查看@babel/runtime 下面的 helpers，可以发现导出了很多函数，以及我们上面提及到的\_classCallCheck 函数：

首先当然是需要安装@babel/runtime 这个包，除此之外还需要安装@babel/plugin-transform-runtime，这个插件的作用是移除辅助函数，将其替换为@babel/runtime/helpers 中函数的引用。
```js
npm install --save @babel/runtime
npm install --save-dev @babel/plugin-transform-runtime
```
然后修改我们的配置文件，相关代码在 demo6：
```js
{
  "presets": ["@babel/env"],
  "plugins": ["@babel/transform-runtime"]
}
```
再次打包发现我们的辅助函数已经变成下面的引用方式了：
```js
var \_interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var \_classCallCheck2 = \_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var \_createClass2 = \_interopRequireDefault(require("@babel/runtime/helpers/createClass"));
```

### @babel/plugin-transform-runtime【解决polyfill全局变量的污染问题，通过重命名的方式】
上面我们说到@babel/polyfill 会建立一个完整的 ES2015 环境，因此造成了全局变量的污染；虽然使用 core-js 不会引入全部模块，但是也会污染部分全局变量。

而@babel/plugin-transform-runtime 除了能够转换上面的辅助函数，还能对代码中的新特性 API 进行一个转换，还是以我们的 filter 函数和 Promise 对象为例，相关代码在 demo7：
```js
[1, 5, 10, 15].filter((value) => {
  return value > 9;
});
let promise = new Promise((resolve, reject) => {
  resolve(1);
});
```
然后修改我们的配置文件.babelrc：
```js
{
  "presets": ["@babel/env"],
  "plugins": [
    [
      "@babel/transform-runtime",
      {
        "corejs": 3
      }
    ]
  ]
}
```
再次查看打包出来的文件发现 filter 和 Promise 已经转换成了引用的方式：

```js
"use strict";

var \_interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var \_promise = \_interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var \_filter = \_interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));

var \_context;

(0, \_filter["default"])(\_context = [1, 5, 10, 15]).call(\_context, function (value) {
  return value > 9;
});
var promise = new \_promise["default"](function (resolve, reject) {
  resolve(1);
});
```
我们发现打包出来的模块是从@babel/runtime-corejs3 这个包里面引用的；经过查看，发现它下面包含了三个文件夹：core-js、helpers 和 regenerator，因此我们可以发现：

@babel/runtime-corejs2 ≈ 
@babel/runtime+core-js+regenerator ≈ 
@babel/runtime+@babel/polyfill

## @babel/polyfill 和@babel/runtime 的区别
@babel/polyfill 和@babel/runtime 的区别：
前者改造目标浏览器，让你的浏览器拥有本来不支持的特性；
后者改造你的代码，让你的代码能在所有目标浏览器上运行，但不改造浏览器。

一个显而易见的区别就是打开 IE11 浏览器，如果引入了@babel/polyfill，在控制台我们可以执行 Object.assign({}, {})；而如果引入了@babel/runtime，会提示你报错，因为 Object 上没有 assign 函数。
