/*
 * @lc app=leetcode.cn id=70 lang=javascript
 *
 * [70] 爬楼梯
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
// 爬楼梯
// n 阶到达楼顶
// 每次爬 1 或 2 个台阶，多少种不同的方法
var climbStairs = function (n) {
  // 备忘录
  let memo = new Array(n + 1).fill(0)

  // 定义：爬到第 n 级
  function dp(n) {
    if (n <= 2) return n

    if (memo[n] > 0) return memo[n]

    // 状态转移方程
    // 爬到第 n 级台阶的方法个数等于爬到 n - 1 的方法个数和 爬到 n-2 的方法个数之和
    memo[n] = dp(n - 1) + dp(n - 2)
    return memo[n]
  }

  return dp(n)
}
// @lc code=end
