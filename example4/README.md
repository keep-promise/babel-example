### Babel插件和预设

Babel的插件大致可以分为语法插件和转换插件：

语法插件：作用于解析阶段，使得babel能够解析更多的语法，官方的语法插件以babel-plugin-syntax开头。

转换插件：在转换这一步把源码转换并输出，官方的转换插件以babel-plugin-transform（正式）或 babel-plugin-proposal（提案）开头。

在命令行中配置各种插件（plugins）或者预设（presets，也就是一组插件），

但是这样并不利于后期的查看或者维护，

而且大多时候babel都是结合webpack或者gulp等打包工具开发，不会直接通过命令行的方式；

Babel推荐通过配置文件的方式来进行管理。

Babel官网提供了近一百个插件，但是如果我们的代码中一个一个的配置插件就需要对每一个插件有所了解，

这样必然会耗费大量的时间精力；Babel提供了预设（presets）的概念，意思就是预先设置好的一系列插件包；

这就相当于肯德基中的套餐，将众多产品进行搭配组合，适合不同的人群需要；总有一款适合我们的套餐

比如@babel/preset-es2015就是用来将部分ES6语法转换成ES5语法，

@babel/preset-stage-x可以将处于某一阶段的js语法编译为正式版本的js代码，

@babel/preset-stage-x也已经被Babel废弃了

实际会用到的预设有以下：

@babel/preset-env

@babel/preset-flow

@babel/preset-react

@babel/preset-typescript

根据名字我们可以大致猜出每个预设的使用场景，

### @babel/preset-env

它的作用是根据环境来转换代码。

执行顺序

插件和预设都是通过数组的形式在配置文件中配置，如果插件和预设都要处理同一个代码片段，那么会根据一下执行规则来判定：

插件比预设先执行

插件执行顺序是插件数组从前向后执行

预设执行顺序是预设数组从后向前执行

@babel/preset-env

@babel/preset-env是一个智能预设，可让您使用最新的JavaScript，而无需微观管理目标环境所需的语法转换（以及可选的浏览器polyfill）

JavaScript包更小！在项目中不会关心Babel用了哪些插件，支持哪些ES6语法；我们更多关心的是支持哪些浏览器版本这个层面，

比如我们在项目中使用了箭头函数、Class、Const和模板字符串：
