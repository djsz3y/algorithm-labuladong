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
  // 起始面级
  let max = 0
  // 左指针
  let pStart = 0
  // 右指针
  let pEnd = height.length - 1
  while (pStart <= pEnd) {
    // 左高度
    const hStart = height[pStart]
    // 右高度
    const hEnd = height[pEnd]
    // 最小高度
    const minHeight = hStart < hEnd ? hStart : hEnd
    // 面积
    const tmpMax = minHeight * (pEnd - pStart)
    // 与之前面积对比，记录最大面积
    max = tmpMax > max ? tmpMax : max
    // 左、右高度，低的向里走。
    hStart > hEnd ? pEnd-- : pStart++
  }
  return max
}
// @lc code=end
