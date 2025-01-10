/*
 * @lc app=leetcode.cn id=35 lang=javascript
 *
 * [35] 搜索插入位置
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// 排序数组 nums & 目标值 target
// 找到目标值，返回索引
// 不存在，返回它被按顺序插入的位置。
var searchInsert = function (nums, target) {
  // 寻找排序数组中的目标值，并返回索引
  // 目标值不存在于数组中，返回它将会被按顺序插入的位置
  // 二分搜索
  let left = 0,
    right = nums.length - 1
  while (left <= right) {
    let mid = left + ((right - left) >> 1)
    if (nums[mid] < target) {
      left = mid + 1
    } else if (target < nums[mid]) {
      right = mid - 1
    } else if (nums[mid] === target) {
      return mid
    }
  }
  return left
  // return right + 1
}
// @lc code=end
