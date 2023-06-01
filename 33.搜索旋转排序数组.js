/*
 * @lc app=leetcode.cn id=33 lang=javascript
 *
 * [33] 搜索旋转排序数组
 */

// @lc code=start
/**
 * # 读懂题目：
 * 1. 首先：整数升序元素互不相同数组 nums ，
 *    未知下标 k 位置，元素旋转 180° 。
 * 2. 比如：[0,1,2,4,5,6,7] 下标 3 处 -> [4,5,6,7,0,1,2]
 * 3. 已知：旋转后数组 nums ，整数 target
 * 4. 求： search(nums, target) 函数，
 *    target 在 nums ，
 * - 存在返回下标，
 * - 不存在返回-1 。
 * 5. 时间复杂度 O(log n) 。
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let low = 0;
  let high = nums.length - 1;
  while (low <= high) {
    let mid = low + ((high - low) >> 1);
    if (nums[mid] === target) {
      return mid;
    }
    if (nums[mid] >= nums[high]) {
      // 左边有序
      if (nums[low] <= target && target < nums[mid]) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    } else if (nums[mid] < nums[high]) {
      // 右边有序
      if (nums[mid] < target && target <= nums[high]) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
  }
  return -1;
};

// @lc code=end
