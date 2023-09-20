/*
 * @lc app=leetcode.cn id=121 lang=javascript
 *
 * [121] 买卖股票的最佳时机
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  // 1.边缘检测
  if (prices.length === 0) return 0
  // 2.最低买点
  let min = prices[0]
  // 3.最大利润
  let max = 0
  for (let i = 0; i < prices.length; i++) {
    // 4.每个拐点计算适合的最低买入值和最大利润
    min = Math.min(min, prices[i])
    max = Math.max(max, prices[i] - min)
  }
  return max
}
// @lc code=end
