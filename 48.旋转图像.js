/*
 * @lc app=leetcode.cn id=48 lang=javascript
 *
 * [48] 旋转图像
 */

// @lc code=start
/*
 * 1.读懂题目：
 * n的二次方的二维矩阵matrix表示图像。顺时针旋转90°。
 * 原地旋转，直接修改输入的二维矩阵，不要使用另一个矩阵旋转图像。
 *
 * 2.写出思路：
 * 先对称翻转(左上到右下对角线 镜像对称)，再横向翻转（矩阵每一行反转）。
 *
 * 3.代码实现： rotate
 *
 * 4.测试用例：
 */

// 反转一维数组
const reverse = function (arr) {
  let i = 0,
    j = arr.length - 1;
  while (i < j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    i++;
    j--;
  }
};
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
// 二维矩阵原地顺时针旋转90°。
var rotate = function (matrix) {
  let len = matrix.length;
  // 先沿左上右下对角线对称二维矩阵
  for (let i = 0; i < len; i++) {
    for (let j = i; j < len; j++) {
      let temp = matrix[i][j];
      matrix[i][j] = matrix[j][i];
      matrix[j][i] = temp;
    }
  }
  // 反转二维矩阵的每一行
  for (let key in matrix) {
    let row = matrix[key];
    reverse(row);
  }
};
// let matrix = [
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9],
//   ],
//   matrix2 = [
//     [5, 1, 9, 11],
//     [2, 4, 8, 10],
//     [13, 3, 6, 7],
//     [15, 14, 12, 16],
//   ];
// rotate(matrix)
// rotate(matrix2)
// console.log(matrix, matrix2);
// @lc code=end
