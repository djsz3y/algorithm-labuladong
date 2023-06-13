/*
 * @lc app=leetcode.cn id=53 lang=javascript
 *
 * [53] 最大子数组和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let sum = 0
  let result = nums[0]
  for (let i = 0; i < nums.length; i++) {
    if (sum > 0) {
      sum = sum + nums[i]
    } else {
      sum = nums[i]
    }
    result = Math.max(sum, result)
  }
  return result
}
// @lc code=end
