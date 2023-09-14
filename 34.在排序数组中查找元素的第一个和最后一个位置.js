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
  // 1. search fromLow
  const search = function (fromLow) {
    // 3. 左右指针
    let low = 0
    let high = nums.length - 1
    // 4. while 循环
    while (low <= high) {
      // 5. 二分查找 找 mid
      let mid = low + ((high - low) >> 1)
      // 6. 二分查找 if判
      if (nums[mid] < target) {
        low = mid + 1
      } else if (nums[mid] > target) {
        high = mid - 1
      } else {
        // 找到 target 的范围区间内的值的时候——
        // 需要根据 true / false ——

        // - 左移右指针找（target 区间的）左边界，
        // - 右移左指针找（target 区间的）右边界；

        // 从而找到左右边界；

        // 7. fromLow 判断——>相同值判断，移动边界
        if (fromLow) {
          // 值，在左区间
          if (nums[mid] === nums[mid - 1]) {
            // 左边还有-相同的-目标值
            high = mid - 1
          } else {
            return mid
          }
        } else {
          if (nums[mid] === nums[mid + 1]) {
            // 右边还有-相同的-目标值
            low = mid + 1
          } else {
            return mid
          }
        }
      }
    }
    return -1
  }
  // 2. return [s..., s...]
  return [search(true), search(false)]
}
// @lc code=end
