/*
 * @lc app=leetcode.cn id=55 lang=javascript
 *
 * [55] 跳跃游戏
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  const len = nums.length - 1
  let max = 0
  for (let i = 0; i <= max; i++) {
    max = Math.max(max, nums[i] + i)
    if (max >= len) return true
  }
  return false
}
// @lc code=end
