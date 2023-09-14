/*
 * @lc app=leetcode.cn id=11 lang=javascript
 *
 * [11] 盛最多水的容器
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  // [1,8,6,2,5,4,8,3,7]
  // 思路：水多面级大 max，（高）谁小移谁找最大。

  let pStart = 0 // 左指针
  let pEnd = height.length - 1 // 右指针
  let max = 0 // 起始面级

  // pStart !== pEnd
  while (pStart < pEnd) {
    const hStart = height[pStart] // 左高
    const hEnd = height[pEnd] // 右高
    const minHeight = Math.min(hStart, hEnd) // 最小高度
    const tmpMax = minHeight * (pEnd - pStart) // 临时面级
    max = Math.max(max, tmpMax) // 记录最大面积
    hStart < hEnd ? pStart++ : pEnd-- // （高）谁小移谁：找最大高，求最大面级
  }

  return max
}
// @lc code=end
