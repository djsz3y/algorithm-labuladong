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
  // const dp = []
  // let res = 0
  // dp[0] = 1

  const dp = Array(nums.length).fill(1)
  let res = 0

  for (let i = 0; i < nums.length; i++) {
    // dp[i] = 1
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[j] + 1, dp[i])
      }
    }
    res = Math.max(dp[i], res)
  }

  return res
}
// @lc code=end
