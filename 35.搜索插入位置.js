/*
 * @lc app=leetcode.cn id=35 lang=javascript
 *
 * [35] 搜索插入位置
 */

// @lc code=start
/*
 * 1.读懂题目：
 * 排序数组nums
 * 目标值target
 * 数组中找到target并返回索引index，不存在返回被按顺序 插入的位置。
 * 注意：
 * nums是排序数组，插入后也是排好序的数组。
 * time o(log n)
 *
 * 2.写出思路：
 * 用一个指针fast，从0开始，判断nums[fast]>=target,
 * 通过则判断是否等于，等于返回索引fast，否则fast即为插入的位置。
 *
 * 3.代码实现： searchInsert
 *
 * 4.测试用例：
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  let fast = 0;
  while (fast < nums.length) {
    if (nums[fast] >= target) {
      return fast;
    }
    fast++;
  }
  return nums.length;
};
// let nums = [1, 3, 5, 6],
//   target = 5,
//   nums2 = [1, 3, 5, 6],
//   target2 = 2,
//   nums3 = [1, 3, 5, 6],
//   target3 = 7;
// let res = searchInsert(nums, target),
//   res2 = searchInsert(nums2, target2),
//   res3 = searchInsert(nums3, target3);
// console.log(res, res2, res3);
// @lc code=end
