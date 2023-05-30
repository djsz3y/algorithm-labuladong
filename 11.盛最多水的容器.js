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
  let max = 0; // 起始面级
  let pStart = 0; // 左指针
  let pEnd = height.length - 1; // 右指针
  while (pStart !== pEnd) {
    const hStart = height[pStart]; // 左高度
    const hEnd = height[pEnd]; // 右高度
    const minHeight = hStart < hEnd ? hStart : hEnd; // 最小高度
    const tmpMax = minHeight * (pEnd - pStart); // 面积
    max = max > tmpMax ? max : tmpMax; // 与之前面积对比，记录最大面积
    hStart > hEnd ? pEnd-- : pStart++; // 左、右高度，低的向里走。
  }
  return max;
};
// @lc code=end
