/*
 * @lc app=leetcode.cn id=35 lang=javascript
 *
 * [35] 搜索插入位置
 */

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
  // 二分查找
  let low = 0,
    high = nums.length - 1
  while (low <= high) {
    // let mid = left + (right - left) / 2;
    // mid = Math.floor(mid);
    let mid = low + ((high - low) >> 1)
    if (nums[mid] < target) {
      low = mid + 1
    } else if (target < nums[mid]) {
      high = mid - 1
    } else if (nums[mid] === target) {
      return mid
    }
  }
  return high + 1
  // 如果说是找一个位置，return left ;   return right + 1
}
// @lc code=end
