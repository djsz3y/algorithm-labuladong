/*
 * @lc app=leetcode.cn id=122 lang=javascript
 *
 * [122] 买卖股票的最佳时机 II
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
// 贪心贪在哪里？
// 只要涨我就卖，只要跌我就不买。
var maxProfit = function (prices) {
  let result = 0
  for (let i = 1; i < prices.length; i++) {
    result += prices[i] > prices[i - 1] ? prices[i] - prices[i - 1] : 0
  }
  return result
}
// @lc code=end
