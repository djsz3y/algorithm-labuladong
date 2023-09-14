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
// 贪心贪在哪里？
// 只要你有负数，你就会拉低我的值，我就不要你。
// [-2,1,-3,4,-1,2,1,-5,4]
// result = 4-1+2+1 = 6
var maxSubArray = function (nums) {
  let result = nums[0]
  let sum = 0
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
