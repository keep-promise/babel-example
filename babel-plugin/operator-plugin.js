// 实现运算优化
// 1. var a = 1 + 2; --> var a = 3;
// 2. var a = 1 - 2; --> var a = -1;
// 1. var a = 1 * 2; --> var a = 2;
// 1. var a = 2/1; --> var a = 2;
const t = require('babel-types');

const visitor = {
  BinaryExpression(path) {
    const node = path.node;

    let result;

    if (t.isNumericLiteral(node.left) && t.isNumericLiteral(node.right)) {
      switch(node.operator) {
        case '+':
          result = node.left.value + node.right.value;
          break;
        case '-':
          result = node.left.value - node.right.value;
          break;
        case '*':
          result = node.left.value * node.right.value;
          break;
        case '/':
          result = node.left.value / node.right.value;
          break;
      }
    }
    if (result !== undefined) {
      path.replaceWith(t.numericLiteral(result));
    }
  }
}

module.exports = function(babel) {
  return {
    visitor
  }
}