## babel 原理 --- 3个阶段
1. parse 解析：将代码解析生成抽象语法树 AST, 就是词法分析和语法分析的过程 babylon
2. transform 转换：对于 AST 进行一系列操作，babel接受得到 AST 并通过 babel-traverse
对其进行遍历，再次过程中进行增删改查操作
3. generate 生成：使用babel-generator 转换 AST 为js代码