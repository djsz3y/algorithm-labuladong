/*
 * @lc app=leetcode.cn id=26 lang=javascript
 *
 * [26] 删除有序数组中的重复项
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// 升序排列数组nums
// 原地删除重复元素
// 返回新长度
// 元素相对顺序保持一致


  // // console.log(3 * Math.pow(10, 4));
  // let length = nums.length;
  // if (length <= 3 * Math.pow(10, 4) && length >= 0) {
  //   nums = Array.from(new Set(nums));
  //   return nums.length;
  // }
  /**
   * --------------------------------------
   * 看了labuladong的第26题题解，得知 ：
   * 我之前的做法是：不原地修改的题解。
   * 现在是原地修改的题解，才是对的。
   */
var removeDuplicates = function (nums) {
  if (nums.length == 0) {
    return 0;
  }
  let slow = 0,
    fast = 0;
  while (fast < nums.length) {
    if (nums[fast] != nums[slow]) {
      slow++;
      nums[slow] = nums[fast];
    }
    fast++;
  }
  // console.log(fast,slow)
  return slow + 1;
};
// let nums = [1, 1, 2];
// let res = removeDuplicates(nums);
// let nums2 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
// let res2 = removeDuplicates(nums2);
// console.log(res, nums, res2, nums2);
// @lc code=end
