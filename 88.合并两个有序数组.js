/*
 * @lc app=leetcode.cn id=88 lang=javascript
 * @lcpr version=20004
 *
 * [88] 合并两个有序数组
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
  // 合并两个有序数组
  //    倒序 循环，到第一个数组中
  let i = m - 1,
    j = n - 1
  let p = nums1.length - 1
  // 倒序循环
  while (i >= 0 && j >= 0) {
    // 谁大操作谁
    if (nums1[i] > nums2[j]) {
      // p 从后往前遍历，所以谁大，就先赋值，
      // 再操作已经被比较过了所以可以被更小的覆盖！
      nums1[p] = nums1[i]
      i--
    } else {
      nums1[p] = nums2[j]
      j--
    }
    p--
  }
  // 可能其中一个数组的指针走到尽头了，另一个还没走完
  // 本身往 nums1 里放元素，所以只需考虑 nums2 是否剩余元素即可。
  // nums2 长
  while (j >= 0) {
    nums1[p] = nums2[j]
    j--
    p--
  }
}
// @lc code=end

/*
// @lcpr case=start
// [1,2,3,0,0,0]\n3\n[2,5,6]\n3\n
// @lcpr case=end

// @lcpr case=start
// [1]\n1\n[]\n0\n
// @lcpr case=end

// @lcpr case=start
// [0]\n0\n[1]\n1\n
// @lcpr case=end

 */
