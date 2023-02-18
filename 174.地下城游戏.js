/*
 * @lc app=leetcode.cn id=174 lang=javascript
 *
 * [174] 地下城游戏
 */

// @lc code=start
/**
 * @param {number[][]} dungeon
 * @return {number}
 */
/*
 * # 1.读懂题目：
 * P:公主（右下角）
 * M * N: 地下城房间数
 * K：英勇骑士（左上角）
 * K 点 从左上角去右下角 P 点
 * K 初始权值>0
 * 房间值 负数 损失 K的权值，
 * 房间值 正整数或零 增加 K的权值，
 * K 只能 向右/下 移动一步，
 *
 * 函数 calculateMinimumHP 计算 K 初始权值的最小值 能到 P 点。
 *
 * 即：
 * 骑士K有初始权值，房间有自己的权值，
 * 只能向右/下移动，骑士从左上且过程中权值大于0到右下角，
 * 求 k 初始值最低多少？
 *
 * # 2.写出思路：
 * 最小路径和：左上角到右下角的最小路径和是多少？
 * 举一反三：
 * 推论：最小化骑士初始生命值
 *  -> 最大化骑士行进路线上血瓶
 *  -> 求「最大路径和」
 *  -> 直接套用计算「最小路径和」的思路 ?
 * 推论不成立。
 * 血瓶吃得多不一定获得最小初始生命值
 * -> 比如：
 * [
 *   [0, -10, 20],
 *   [0, 0, 100],
 *   [-1, -1, 0],
 * ];
 * 关键在于如何损失最少的生命值。
 * 求最值借助动态规划子乔，合理设计 dp 数组/函数的定义，类比最小路径和问题
 * ...
 *
 * # 3.代码实现： calculateMinimumHP
 *
 * # 4.测试用例：
 */
var calculateMinimumHP = function (grid) {
  let memo = [[]]; // 备忘录，消除重叠子问题

  let m = grid.length;
  let n = grid[0].length;
  // 备忘录中都初始化为 -1

  memo = Array.from({ length: n }, () => new Array(m).fill(-1));
  console.log(memo);
  // for (let row of memo) {
  //     row.fill(-1);
  // }
  
  /* 定义：从 (i, j) 到达右下角，需要的初始血量至少是多少 */
  const dp = function(grid, i, j) {
    let m = grid.length;
    let n = grid[0].length;
    // base case
    if (i == m - 1 && j == n - 1) {
        return grid[i][j] >= 0 ? 1 : -grid[i][j] + 1;
    }
    if (i == m || j == n) {
        return Number.MAX_VALUE;
    }
    // 避免重复计算
    if (memo[i][j] != -1) {
        return memo[i][j];
    }
    // 状态转移逻辑
    let res = Math.min(
            dp(grid, i, j + 1),
            dp(grid, i + 1, j)
        ) - grid[i][j];
    // 骑士的生命值至少为 1
    memo[i][j] = res <= 0 ? 1 : res;

    return memo[i][j];
  }

  return dp(grid, 0, 0);
};
const M_N = [
  [-2, -3, 3],
  [-5, -10, 1],
  [10, 30, -5],
];
const res = calculateMinimumHP(M_N);
console.log(res);
// @lc code=end
