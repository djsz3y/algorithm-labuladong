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
var searchRange = function (nums, target) {
  const search = function (fromLow) {
    let low = 0,
      high = nums.length - 1;
    while (low <= high) {
      let mid = low + ((high - low) >> 1);
      if (nums[mid] < target) {
        low = mid + 1;
      } else if (nums[mid] > target) {
        high = mid - 1;
      } else {
        if (fromLow) {
          // 我的值，在我的左区间
          if (nums[mid] === nums[mid - 1]) {
            high = mid - 1;
          } else {
            return mid;
          }
        } else {
          if (nums[mid] === nums[mid + 1]) {
            low = mid + 1;
          } else {
            return mid;
          }
        }
      }
    }
    return -1;
  };
  return [search(true), search(false)];
};
// @lc code=end
