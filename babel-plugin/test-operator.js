const babel = require('@babel/core');

const sourceCode = 'const a = 1 + 2'

const result = babel.transform(sourceCode, {
  plugins: [
    require('./operator-plugin')
  ]
});

console.log(result.code); // const a = 3;
