/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  // 数组长度范围判断
  // 数字在范围内
  // 目标数字在范围内
  // for in loop nums
  // for in loop nums
  // 对比 和为target return
  // console.log(nums, Math.pow(10, 4), -Math.pow(10, 4),typeof -Math.pow(10, 4));
  if (
    nums.length <= Math.pow(10, 4) &&
    nums.length >= 2 &&
    target <= Math.pow(10, 9) &&
    target >= -Math.pow(10, 9)
  ) {
    console.log(nums, target);
    for (let i = 0; i < nums.length; i++) {
      const element_i = nums[i];
      console.log(element_i);
      if (element_i <= Math.pow(10, 9) && element_i >= -Math.pow(10, 9)) {
        for (let j = 0; j < nums.length; j++) {
          let element_j;
          if (i !== j) {
            element_j = nums[j];
            if (element_j <= Math.pow(10, 9) && element_j >= -Math.pow(10, 9)) {
              const sum = element_i + element_j;
              if (sum === target) {
                return [i, j];
                break;
              }
            }
          }
        }
      }
    }
  }
};
// const res1 = twoSum([2, 7, 11, 15], 9);
// const res2 = twoSum([3, 2, 4], 6);
// const res3 = twoSum([3, 3], 6);
// console.log(res1, res2, res3);
// @lc code=end
