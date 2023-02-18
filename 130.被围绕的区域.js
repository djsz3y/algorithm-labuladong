/*
 * @lc app=leetcode.cn id=130 lang=javascript
 *
 * [130] 被围绕的区域
 */

// @lc code=start
/*
 * # 1.读懂题目：
 * 二维矩阵 M * N ，找四面被 X 围住的 O ,并替换成 X 。
 * 岛屿系列问题使用 DFS 算法解决。
 * 
 * # 2.写出思路：
 * 2.1 是什么
 * Union-Find算法（并查集算法）：
 * 主要解决图论中动态连通性问题。
 * 主要实现的API：
 * class UF {
 *   constructor(n){
 *    ...
 *   } // 构造函数
 *   union(p, q){...} // p q 连接
 *   connected(p, q){...} // 判断 p q 连通吗
 *   count(){...} // 判断连通分量数量
 * }
 * 连通性：自反性、对称性、传递性。
 * 动态连通性：边连边判断某两节点是否连通。
 * 判断节点连通要根据连通性。
 * 判断节点动态连通要根据动态连通性（两个节点用union(p,q)连上了才连通的，所以判断动态连通性）。
 * 比如：0-9共10个节点，任意两个都不连通，connected全返回false，连通分量为 10
 * 调用 union(0, 1) -> 0 和 1 被连通，连通分量降为 9 个。
 * 再调用 union(1, 2) -> 0、1、2 都被连通，conneted(0, 2) 返回 true，连通分量变为 8个。
 * 应用（判断这种连通的等价关系有什么用？）：
 * 编译器判断同一个变量的不同引用；
 * 社交网络中朋友圈计算等等。
 * 2.2 基本实现
 * 使用森林（若干棵树）【模型】表示图的动态连通性，用数组【具体的数据结构】具体实现这个森林。
 * 
 * 
 * # 3.代码实现： solve
 * 
 * # 4.测试用例：
 */
class UF {
  // // 连通分量个数
  // this.count = 0;
  // // 存储每个节点的父节点
  // this.parent = [];

  // n 为图中节点的个数
  constructor( n) {
      this.count = n;
      this.parent = new Array(n);
      for (let i = 0; i < n; i++) {
          this.parent[i] = i;
      }
  }
  
  // 将节点 p 和节点 q 连通
  union(p, q) {
      let rootP = this.find(p);
      let rootQ = this.find(q);
      
      if (rootP == rootQ)
          return;
      
      this.parent[rootQ] = rootP;
      // 两个连通分量合并成一个连通分量
      this.count--;
  }

  // 判断节点 p 和节点 q 是否连通
  connected( p,  q) {
      let rootP = this.find(p);
      let rootQ = this.find(q);
      return rootP == rootQ;
  }

  find(x) {
      if (this.parent[x] != x) {
          this.parent[x] = this.find(this.parent[x]);
      }
      return this.parent[x];
  }

  // 返回图中的连通分量个数
  count() {
      return this.count;
  }
}

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function(board) {
  if (board.length == 0) return;

  let m = board.length;
  let n = board[0].length;
  // 给 dummy 留一个额外位置
  let uf = new UF(m * n + 1);
  let dummy = m * n;
  // 将首列和末列的 O 与 dummy 连通
  for (let i = 0; i < m; i++) {
      if (board[i][0] == 'O')
          uf.union(i * n, dummy);
      if (board[i][n - 1] == 'O')
          uf.union(i * n + n - 1, dummy);
  }
  // 将首行和末行的 O 与 dummy 连通
  for (let j = 0; j < n; j++) {
      if (board[0][j] == 'O')
          uf.union(j, dummy);
      if (board[m - 1][j] == 'O')
          uf.union(n * (m - 1) + j, dummy);
  }
  // 方向数组 d 是上下左右搜索的常用手法
  let d = new Array([1,0], [0,1], [0,-1], [-1,0]);
  for (let i = 1; i < m - 1; i++) 
      for (let j = 1; j < n - 1; j++) 
          if (board[i][j] == 'O')
              // 将此 O 与上下左右的 O 连通
              for (let k = 0; k < 4; k++) {
                  let x = i + d[k][0];
                  let y = j + d[k][1];
                  if (board[x][y] == 'O')
                      uf.union(x * n + y, i * n + j);
              }
  // 所有不和 dummy 连通的 O，都要被替换
  for (let i = 1; i < m - 1; i++) 
      for (let j = 1; j < n - 1; j++) 
          if (!uf.connected(dummy, i * n + j))
              board[i][j] = 'X';
};

const board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]],
  result = solve(board);
console.log(248, "测试用例1：result：", result);
const board2 = [["X"]],
  result2 = solve(board2);
console.log(251, "测试用例2：result2：", result2);
// @lc code=end

