/*
 * @lc app=leetcode.cn id=509 lang=javascript
 *
 * [509] 斐波那契数
 */

// @lc code=start
/*
 * # 1.读懂题目：
 * F(0) = 0，F(1) = 1
 * F(n) = F(n - 1) + F(n - 2)，其中 n > 1
 * 给定 n ，请计算 F(n) 。
 * 
 * # 2.写出思路：
 * 
 * 
 * # 3.代码实现： fib
 * 
 * # 4.测试用例：
 */
/**
 * @param {number} n
 * @return {number}
 */
var fib = function(n) {
  if (n == 0 || n == 1) {
      // base case
      return n;
  }
  // 分别代表 dp[i - 1] 和 dp[i - 2]
  let dp_i_1 = 1, dp_i_2 = 0;
  for (let i = 2; i <= n; i++) {
      // dp[i] = dp[i - 1] + dp[i - 2];
      let dp_i = dp_i_1 + dp_i_2;
      // 滚动更新
      dp_i_2 = dp_i_1;
      dp_i_1 = dp_i;
  }
  return dp_i_1;
};
const n = 2, res = fib(n)
console.log(res)
const n2 = 3, res2 = fib(n2)
console.log(res2)
// @lc code=end

