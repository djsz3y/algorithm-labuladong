/*
 * @lc app=leetcode.cn id=34 lang=javascript
 *
 * [34] 在排序数组中查找元素的第一个和最后一个位置
 */

// @lc code=start
/*
 * 1.读懂题目：
 * nums 整数数组
 * 非递减顺序排列，
 * 目标值 target
 * 找出给定目标值在数组中的开始位置和结束位置。
 * 数组不存在目标值 target ，返回 [-1, -1]
 * 必须设计并实现时间复杂度为 O(log n) 算法解决此问题。
 *
 * 2.写出思路：
 * 二分查找模板：
 * left_bound : 左侧边界二分搜索（左闭右开的写法）
 * right_bound : 右侧边界二分搜索（左闭右开的写法）
 *
 * 3.代码实现： searchRange
 *
 * 4.测试用例：
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  function left_bound(nums, target) {
    let left = 0,
      right = nums.length - 1;
    while (left <= right) {
      let mid = Math.floor(left + (right - left) / 2);

      if (nums[mid] < target) {
        left = mid + 1;
      } else if (nums[mid] > target) {
        right = mid - 1;
      } else if (nums[mid] == target) {
        right = mid - 1;
      }
    }
    // 检查出界情况
    if (left >= nums.length || nums[left] != target) {
      return -1;
    }
    return left;
  }

  function right_bound(nums, target) {
    if (nums.length == 0) return -1;
    let left = 0,
      right = nums.length;
    while (left < right) {
      let mid = Math.floor(left + (right - left) / 2);

      if (nums[mid] == target) {
        left = mid + 1;
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else if (nums[mid] > target) {
        right = mid;
      }
    }
    return left - 1; //注意
  }

  const l_b = left_bound(nums, target);
  const r_b = right_bound(nums, target);

  if (l_b == -1 || r_b == -1) {
    return [-1, -1];
  }

  return [l_b, r_b];
};
const nums = [5, 7, 7, 8, 8, 10],
  target = 8,
  nums2 = [5, 7, 7, 8, 8, 10],
  target2 = 6,
  nums3 = [],
  target3 = 0;
const res = searchRange(nums, target),
  res2 = searchRange(nums2, target2),
  res3 = searchRange(nums3, target3);
console.log(res, res2, res3);
// @lc code=end
