/*
 * @lc app=leetcode.cn id=45 lang=javascript
 *
 * [45] 跳跃游戏 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// nums[i] 表示从索引 i 向前跳转的最大长度
// nums[i] 处，可以跳转到 任意 nums[i + j] 处:
// 0 <= j <= nums[i]
// i + j < n
var jump = function (nums) {
  let curIndex = 0 // 当前覆盖的最远的下标
  let nextIndex = 0 // 下一步覆盖的最远的下标
  let steps = 0

  for (let i = 0; i < nums.length - 1; i++) {
    nextIndex = Math.max(nums[i] + i, nextIndex) // 最远跳到的下标，下一步
    if (i === curIndex) {
      curIndex = nextIndex
      steps++
    }
  }
  return steps
}
// @lc code=end
