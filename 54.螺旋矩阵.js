/*
 * @lc app=leetcode.cn id=54 lang=javascript
 *
 * [54] 螺旋矩阵
 */

// @lc code=start
/*
 * 1.读懂题目：
 * 矩阵 matrix 是 m 行 n 列
 * 顺时针螺旋舒徐
 * 返回矩阵中所有元素。
 *
 * 2.写出思路：
 * 二维数组的花式遍历技巧
 * 矩阵的「 螺旋矩阵」
 * 核心思路：
 * 按照(右、下、左、上)的顺序遍历数组，
 * 并使用四个变量 圈定 未遍历元素的边界。
 * 随着螺旋便利，相应的边界会收缩，直到螺旋遍历完整个数组。
 * 有了这个思路，翻译代码很容易：
 *
 * 3.代码实现： spiralOrder
 *
 * 4.测试用例：
 */
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  let m = matrix.length,
    n = matrix[0].length;
  let upper_bound = 0,
    lower_bound = m - 1;
  let left_bound = 0,
    right_bound = n - 1;
  let res = new Array();
  // res.length == m * n 则遍历完整个数组
  while (res.length < m * n) {
    if (upper_bound <= lower_bound) {
      // 在顶部从左向右遍历
      for (let j = left_bound; j <= right_bound; j++) {
        res.push(matrix[upper_bound][j]);
      }
      // 上边界下移
      upper_bound++;
    }
    if (left_bound <= right_bound) {
      // 在右侧从上向下遍历
      for (let i = upper_bound; i <= lower_bound; i++) {
        res.push(matrix[i][right_bound]);
      }
      // 右边界左移
      right_bound--;
    }
    if (upper_bound <= lower_bound) {
      // 在底部从右向左遍历
      for (let j = right_bound; j >= left_bound; j--) {
        res.push(matrix[lower_bound][j]);
      }
      // 下边界上移
      lower_bound--;
    }
    if (left_bound <= right_bound) {
      // 在左侧从下向上遍历
      for (let i = lower_bound; i >= upper_bound; i--) {
        res.push(matrix[i][left_bound]);
      }
      left_bound++;
    }
  }
  return res;
};
let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ],
  matrix2 = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
  ];
let res = spiralOrder(matrix),
  res2 = spiralOrder(matrix2);
console.log(res); // [1,2,3,6,9,8,7,4,5]
console.log(res2); // [1,2,3,4,8,12,11,10,9,5,6,7]
// @lc code=end
