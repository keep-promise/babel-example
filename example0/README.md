### 能够将高版本的ES6转为低版本的ES5代码
Babel 是一个 JavaScript 编译器

babel-cli，babel命令行界面

babel-core，包括了Node有关的API和require钩子

babel-polyfill，可以建立一个完整的ES2015环境

@babel/core我们在很多地方都看到，它是Babel进行转码的核心依赖包，我们常用的babel-cli和babel-node都依赖于它

Babel的运行方式总共可以分为三个阶段：解析（parsing）、转换（transforming）和生成（generating）；

负责解析阶段的插件是@babel/parser，其作用就是将源码解析成AST；

负责生成阶段的插件是@babel/generator，其作用就是将转好好的AST重新生成代码。


