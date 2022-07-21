Babel的配置文件主要有
### .babelrc、.babelrc.js、babel.config.js和package.json，

他们的配置选项都是相同的，作用也是一样，主要区别在于格式语法的不同，在项目中只需要选择其中一种即可。

.babelrc，它的配置主要是JSON格式的

.babelrc.js和babel.config.js同样都是JS语法，通过module.exports输出配置

在package.json中，需要增加babel的属性：

`

{
  
  "name": "demo",
  
  "version": "1.0.0",
  
  "babel": {
  
    "presets": [ ... ],
    
    "plugins": [ ... ],
    
  }

}
`
