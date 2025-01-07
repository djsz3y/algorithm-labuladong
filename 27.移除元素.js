/*
 * @lc app=leetcode.cn id=27 lang=javascript
 *
 * [27] 移除元素
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/*
 * 1.读懂题目：
 * 数组nums，
 * 值val，
 * 原地移除nums里等于val的值，并返回移除后数组的新长度。
 * 注意：不能使用额外数组空间，必须o(1)额外空间并原地修改输入数组。
 * 元素顺序可以改变，不需要考虑数组中超出新长度后面的元素。
 *
 * 2.写出思路：
 * 【不是原地修改】：new一个int类型数组-》把去重之后的元素放进新数组-》返回新数组。
 * 【原地修改】：不允许new新数组-》只能在原数组上操作，返回新长度-》通过返回的长度&原始数组=移除后的元素有哪些。
 * 【和 26.删除有序数组中的重复项 一样的思路】：
 * 【快慢指针技巧】：快指针探路，慢指针在后，快指针每找到一个不等于val的元素就赋值给slow并让slow前进一步。
 * 这样保证了nums[0...slow]就是整个数组移除等于val的元素之后的结果。
 *
 * 3.代码实现： removeElement
 */
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
  let slow = (fast = 0)
  while (fast < nums.length) {
    if (nums[fast] !== val) {
      nums[slow] = nums[fast]
      slow++
    }
    fast++
  }
  return slow
}
// let nums = [3,2,2,3], val = 3
// let nums2 = [0,1,2,2,3,0,4,2], val2 = 2
// let res = removeElement(nums,val)
// let res2 = removeElement(nums2,val2)
// console.log(nums,nums2)
// console.log(res,res2)
// @lc code=end
