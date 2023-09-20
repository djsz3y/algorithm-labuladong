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
// 非负整数数组 nums ，
// 你最初位于数组的 第一个下标
// 每个元素-该位置可以跳跃的最大长度。
// 判断你是否能够到达最后一个下标

// nums        [2,   3,    1,    1,    4]
// nums[i] + i  2+0, 3+1,  1+2,  1+3,  4+4
// nums[i] + i  2,   4,    3,    4,    8
// max          2    4     4     4     8 stop
//                                     >=4 true

// nums        [3,   2,    1,    0,    4]
// nums[i] + i  3+0, 2+1,  1+2,  0+3,  4+4
// nums[i] + i  3    3     3     3     8
// max          3    3     3     3 stop
//                               >=4 false
var canJump = function (nums) {
  const len = nums.length - 1 // 注意
  let max = 0
  // 为什么是 max， 不是len， 因为当我跳到 max 时，没法往下跳了，后面是不能继续的。
  for (let i = 0; i <= max; i++) {
    max = Math.max(max, nums[i] + i)
    if (max >= len) return true
  }
  return false
}
// @lc code=end
