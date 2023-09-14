/*
 * @lc app=leetcode.cn id=34 lang=javascript
 *
 * [34] 在排序数组中查找元素的第一个和最后一个位置
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// 题目要求：
// - 非递减顺序排列的整数数组 nums
// - 目标值 target
// - 开始位置和结束位置
// - 不存在 target，返回 [-1, -1]。
// - O(log n) 的算法
// nums = [5,7,7,8,8,10], target = 8
var searchRange = function (nums, target) {
  // 思路：题目要求 and 8 步（1 2 3 4 5 6 7 8）
  // 1. search fromLow
  const search = function (fromLow) {
    // 3. 左右指针
    let low = 0
    let high = nums.length - 1
    // 4. while循环
    while (low <= high) {
      // 5. 二分查找 mid
      let mid = low + ((high - low) >> 1)
      // 6. 二分查找 if
      if (nums[mid] < target) {
        low = mid + 1
      } else if (target < nums[mid]) {
        high = mid - 1
      } else {
        // 找到 target 的范围区间内的值的时候——
        // 需要根据 true / false ——

        // - 左移右指针找（target 区间的）左边界，
        // - 右移左指针找（target 区间的）右边界；

        // 从而找到左右边界；

        // 7. fromLow
        if (fromLow) {
          // 找左边界
          if (nums[mid] === nums[mid - 1]) {
            high = mid - 1
          } else {
            return mid
          }
        } else {
          // 找右边界
          if (nums[mid] === nums[mid + 1]) {
            low = mid + 1
          } else {
            return mid
          }
        }
      }
    }
    // 8. -1
    return -1
  }
  // 2. return [s..., s...]
  return [search(true), search(false)]
}
// @lc code=end
