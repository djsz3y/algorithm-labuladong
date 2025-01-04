/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  // 找出 和为目标值 target 的 两个整数，并返回数组下标
  // [2, 7, 11, 15]
  // 7 2 -2 -6
  let valToIndex = new Map()
  for (let i = 0; i < nums.length; i++) {
    let need = target - nums[i]
    if (valToIndex.has(need)) {
      return [valToIndex.get(need), i]
    }
    valToIndex.set(nums[i], i)
  }
  return null
}
// @lc code=end

// @after-stub-for-debug-begin
module.exports = twoSum
// @after-stub-for-debug-end
