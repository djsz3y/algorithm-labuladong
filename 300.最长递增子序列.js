/*
 * @lc app=leetcode.cn id=300 lang=javascript
 *
 * [300] 最长递增子序列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  // 假如我第 i 个值，大于 第 j 个值。
  // 那么，我的 dp[i] 的值。等于 j 从 0 到 i-1 各个位置的最长上升子序列+1 的最大值。
  let dp = []
  let max = 1
  dp[0] = 1

  for (let i = 1; i < nums.length; i++) {
    dp[i] = 1
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[j] + 1, dp[i])
      }
    }
    max = Math.max(dp[i], max)
  }

  return max
}
// @lc code=end
