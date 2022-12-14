/*
 * @lc app=leetcode.cn id=283 lang=javascript
 *
 * [283] 移动零
 */

// @lc code=start
/*
 * 1.读懂题目：
 * 27.removeElement题目：
 * 数组nums，
 * 值val，
 * 原地移除nums里等于val的值，并返回移除后数组的新长度。
 * 注意：不能使用额外数组空间，必须o(1)额外空间并原地修改输入数组。
 * 元素顺序可以改变，不需要考虑数组中超出新长度后面的元素。
 * 本题目：
 * 数组nums
 * val = 0
 * 0移到末尾
 * 保持非零元素的相对顺序
 * 注意：不复制数组，原地对数组修改。
 *
 * 2.写出思路：
 * removeElement思路：
 * 【不是原地修改】：new一个int类型数组-》把去重之后的元素放进新数组-》返回新数组。
 * 【原地修改】：不允许new新数组-》只能在原数组上操作，返回新长度-》通过返回的长度&原始数组=移除后的元素有哪些。
 * 【和 26.删除有序数组中的重复项 一样的思路】：
 * 【快慢指针技巧】：快指针探路，慢指针在后，快指针每找到一个不等于val的元素就赋值给slow并让slow前进一步。
 * 这样保证了nums[0...slow]就是整个数组移除等于val的元素之后的结果。
 *
 * moveZeroes思路：
 * val = 0
 * 将移除元素的函数removeElement得到的返回值后的索引对应的元素都置零。
 *
 * 3.代码实现： moveZeroes
 * 注意：removeElement有返回值。
 *
 * 4.测试用例：
 */
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  let p = removeElement(nums, 0);
  for (; p < nums.length; p++) {
    nums[p] = 0;
  }
};
var removeElement = function(nums, target) {
  let slow = 0,
    fast = 0;
  while (fast < nums.length) {
    if (nums[fast] != target) {
      nums[slow] = nums[fast];
      slow++;
    }
    fast++;
  }
  return slow
}
// let nums = [0, 1, 0, 3, 12],
//   nums2 = [0];
// moveZeroes(nums),
// moveZeroes(nums2);
// console.log(nums, nums2);
// @lc code=end
