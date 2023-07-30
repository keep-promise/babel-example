// 导入model1模块公开的对象
import user1 from './model_es.js'
// 导入model模块公开的对象
const user = require('./model')
console.log('Hello Node！')
console.log(user)
console.log(user1)
