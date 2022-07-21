# babel-example
babel入门学习


我们的项目需要支持IE10，因此我们需要修改.babelrc：

{

  "presets": ["@babel/preset-env"]
  
}

或者对它进行缩写：

{
  "presets": ["@babel/env"]
}

通过Babel编译后输出：

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var fun = function fun() {
  return console.log('hello babel.js');
};

var Person = /*#__PURE__*/function () {
  function Person(name) {
    _classCallCheck(this, Person);

    this.name = name;
  }

  _createClass(Person, [{
    key: "say",
    value: function say() {
      console.log("my name is\uFF1A".concat(this.name));
    }
  }]);

  return Person;
}();

var tom = new Person('tom');
tom.say();
可以发现虽然我们没有配置任何转换插件，但是上面写的的箭头函数、Class、Const和模板字符串语法都已经被转换了；默认情况下，@babel/env等于@babel/preset-es2015、@babel/preset-es2016和@babel/preset-es2017三个套餐的叠加。

那如果我们只需要支持最新的Chrome了，可以继续修改.babelrc：

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
targets中的含义是最新的两个Chrome版本，Babel再次编译输出：

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
而最新版本的Chrome已经支持箭头函数、Class、Const和模板字符串，所以在编译时不会在进行转换，相关代码在demo3。

上面的target字段不少同学肯定看着很眼熟，这个工具能够根据项目中指定的目标浏览器自动来进行配置，这里我们就不展开深入讨论了；它也可以单独在项目中配置一个.browserslistrc文件：

last 2 Chrome versions
这样和targets字段的使用效果是一样的；正常情况下，推荐使用browserslist的配置而很少单独配置@babel/preset-env的targets；@babel/preset-env有一些常用的配置项让我们来看一下：

targets
虽然targets不推荐使用，但是我们还是来了解一下它的用法，它是用来描述我们在项目中想要支持的目标浏览器环境，它可以是Browserslist格式的查询：

{
  "targets": "> 0.25%, not dead"
}
或者可以是一个对象，用来描述支持的最低版本的浏览器：

{
  "targets": {
    "chrome": "58",
    "ie": "11"
  }
}
其他的浏览器版本还可以是：opera、edge、firefox、safari、ios、android、node、electron等

spec
这个属性主要是给其他插件传递参数（比如@babel/plugin-transform-arrow-functions），默认是false，设为true后，我们的箭头函数会有以下改变：

将箭头函数生成的函数用.bind(this)包裹一下，以便在函数内部继续使用this，而不是重命名this。
加一个检查防止函数被实例化
给箭头函数加一个名字
loose
这个属性也主要是给其他插件传递参数（比如@babel/plugin-transform-classes），默认是false，类的方法直接定义在构造函数上；而设置为true后，类的方法被定义到了原型上面，这样在类的继承时可能会引起问题。

include
转换时总是会启用插件的数组，格式是Array<string|RegExp>，它可以是一下两种值：

Babel插件
内置的core-js，比如es.map，es.set等
比如我们在last 2 Chrome versions目标浏览器环境下，不会转换箭头函数和Class，但是我们可以将转换箭头函数的插件配置到include中，这样不管我们的目标浏览器怎么更换，箭头函数语法总是会转换：

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
useBuiltIns和corejs
useBuiltIns这个属性决定是否引入polyfill，可以配置三个值：false（不引入）、usage（按需引入）和entry（项目入口处引入）；corejs表示引入哪个版本的core-js，可以选择2（默认）或者3，只有当useBuiltIns不为false时才会生效。

@babel/polyfill
虽然@babel/preset-env可以转换大多高版本的JS语法，但是一些ES6原型链上的函数（比如数组实例上的的filter、fill、find等函数）以及新增的内置对象（比如Promise、Proxy等对象），是低版本浏览器本身内核就不支持，因此@babel/preset-env面对他们时也无能为力。

比如我们常用的filter函数，在IE浏览器上就会出现兼容性问题，因此我们通过polyfill（垫片）的方式来解决，下面是filter函数简单的兼容代码：

if (!Array.prototype.filter) {
  Array.prototype.filter = function (fun /*, thisp*/ ) {
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
但是ES有那么多函数和内置对象，我们不可能一个一个都手写来解决，这就到了@babel/polyfill用武之处了；首先我们需要在项目中安装它：

npm install --save @babel/polyfill
安装完成后在需要转换的文件入口加入引用代码：

import '@babel/polyfill'
或者我们也可以在Webpack入口处进行引入：

module.exports = {
  entry: ["@babel/polyfill", "./src/index.js"],
};
然后通过webpack来打包，这样就能看到在我们的代码中加入了很多的兼容代码，相关代码在demo4：






发现我们数组的fill、filter和findIndex等方法都打包进去了，但是看到这么多密密麻麻的兼容代码，眼尖的童鞋肯定会发现以下两个问题：

打包出来生成的文件非常的大；有一些语法特性可能是我们没用到的，但是Webpack不管三七二十一全都引用进去了，导致打包出来的文件非常庞大。
污染全局变量；polyfill给很多类的原型链上添加函数，如果我们开发的是一个类库给其他开发者使用，这种情况会非常不可控。
因此从Babel7.4开始@babel/polyfill就不推荐使用了，而是直接引入core-js与regenerator-runtime两个包；而@babel/polyfill本身也是这两个包的集合；在上面webpack打包出来的dist文件我们也可以看到，引用的也是这两个包。那core-js到底是什么呢？

它是JavaScript标准库的polyfill
它尽可能的进行模块化，让你能选择你需要的功能
它和babel高度集成，可以对core-js的引入进行最大程度的优化
目前我们使用的默认都是core-js@2，但它已经封锁了分支，在此之后的特性都只会添加到core-js@3，因此也是推荐使用最新的core-js@3。

@babel/preset-env与core-js
在上面@babel/preset-env配置中有useBuiltIns和corejs两个属性，是用来控制所需的core-js版本；我们以Object.assign、filter和Promise为例，相关代码在demo5：

Object.assign({}, {});

[(1, 5, 10, 15)].filter(function (value) {
  return value > 9;
});

let promise = new Promise((resolve, reject) => {
  resolve(1);
});
然后修改配置文件，如果我们将useBuiltIns配置为非false而没有指定corejs的版本，Babel会提示我们需要配置corejs的版本：






秉承着用新不用旧的原则，毅然选择core-js@3：

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
可以看到我们的打包的文件自动引入了core-js中的模块：

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
而且我们发现它只引入了部分模块；这就比较厉害了，它不仅会考虑到代码中用到的新特性，还会参考目标浏览器的环境来进行按需引入；而useBuiltIns设置为entry的情况则会将core-js中的模块在入口处全部引入，这里就不再演示。


React全栈：Redux+Flux+webpack+Babel整合开发
京东
¥17.25
去购买
​
@babel/runtime
我们在上面通过@babel/preset-env转换Class类时发现输出文件的头部多了_classCallCheck、_defineProperties和_createClass三个函数声明，这就是注入的函数，称为辅助函数；@babel/preset-env在转换时注入了函数声明，以便语法转换后使用。

但是我们开发项目时，文件少则几十个，多个上百个，如果每个文件都注入了函数声明，再通过打包工具打包后输出文件又会非常庞大，影响性能。

因此，Babel提供的解决思路是把这些辅助函数都放到一个npm包里面，在每次需要使用的时候就从这个包里把函数require出来；这样即使有几千个文件，也都是对函数进行引用，而不是复制代码；最后通过webpack等工具打包时，只会将npm包中引用到的函数打包一次，这样就复用了代码，减少打包文件的大小。

@babel/runtime就是这些辅助函数的集合包，我们查看@babel/runtime下面的helpers，可以发现导出了很多函数，以及我们上面提及到的_classCallCheck函数：






首先当然是需要安装@babel/runtime这个包，除此之外还需要安装@babel/plugin-transform-runtime，这个插件的作用是移除辅助函数，将其替换为@babel/runtime/helpers中函数的引用。

npm install --save @babel/runtime
npm install --save-dev @babel/plugin-transform-runtime
然后修改我们的配置文件，相关代码在demo6：

{
  "presets": ["@babel/env"],
  "plugins": ["@babel/transform-runtime"]
}
再次打包发现我们的辅助函数已经变成下面的引用方式了：

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
@babel/plugin-transform-runtime
上面我们说到@babel/polyfill会建立一个完整的ES2015环境，因此造成了全局变量的污染；虽然使用core-js不会引入全部模块，但是也会污染部分全局变量。

而@babel/plugin-transform-runtime除了能够转换上面的辅助函数，还能对代码中的新特性API进行一个转换，还是以我们的filter函数和Promise对象为例，相关代码在demo7：

[1, 5, 10, 15].filter((value) => {
  return value > 9;
});
let promise = new Promise((resolve, reject) => {
  resolve(1);
});
然后修改我们的配置文件.babelrc：

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
再次查看打包出来的文件发现filter和Promise已经转换成了引用的方式：

"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));

var _context;

(0, _filter["default"])(_context = [1, 5, 10, 15]).call(_context, function (value) {
  return value > 9;
});
var promise = new _promise["default"](function (resolve, reject) {
  resolve(1);
});
我们发现打包出来的模块是从@babel/runtime-corejs3这个包里面引用的；经过查看，发现它下面包含了三个文件夹：core-js、helpers和regenerator，因此我们可以发现：

@babel/runtime-corejs2 ≈ @babel/runtime+core-js+regenerator ≈ @babel/runtime+@babel/polyfill
@babel/polyfill和@babel/runtime的区别
经过下面这么多例子，总结一下@babel/polyfill和@babel/runtime的区别：前者改造目标浏览器，让你的浏览器拥有本来不支持的特性；后者改造你的代码，让你的代码能在所有目标浏览器上运行，但不改造浏览器。

一个显而易见的区别就是打开IE11浏览器，如果引入了@babel/polyfill，在控制台我们可以执行Object.assign({}, {})；而如果引入了@babel/runtime，会提示你报错，因为Object上没有assign函数。


