module.exports = ({ types: t }) => {
  return {
    visitor: {
      Identifier(path) {
        // console.log('path', path.node.name);
        const parentIsIf = t.isIfStatement(path.parentPath);
        const isDebug = path.node.name === 'DEBUG';
        // console.log('parentIsIf, isDebug', parentIsIf, isDebug);
        if(parentIsIf && isDebug) {
          // 把 Identifier 转换成字符串
          const stringNode = t.stringLiteral("DEBUG");
          path.replaceWith(stringNode);
        }
      },

      StringLiteral(path, state) {
        const parentIsIf = t.isIfStatement(path.parentPath);
        const isDebug = path.node.value === 'DEBUG';
        console.log('state', state)
        if(parentIsIf && isDebug) {
          console.log('state', state)
          if (process.env.NODE_ENV === 'production')
          path.parentPath.remove();
        }
      }
    }
  }
}