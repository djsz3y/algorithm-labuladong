/*
 * @lc app=leetcode.cn id=48 lang=javascript
 *
 * [48] 旋转图像
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
// 题目：
// - 将图像顺时针旋转 90 度。
// - 原地 旋转图像，直接修改，请不要 使用另一个矩阵

// 1.反转一维数组
const reverse = function (arr) {
  let i = 0,
    j = arr.length - 1
  while (i < j) {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
    i++
    j--
  }
}
// 二维矩阵原地「顺时针」旋转90°。
// 1）左上右下对角线，旋转
// - 根据旋转的规则，定义好i j 的值，
// - 进行两个for循环，交换 i j 和 j i即可。
// 2）反转每一行
var rotate = function (matrix) {
  let len = matrix.length
  // 先沿 左上右下 对角线 镜像对称 二维矩阵
  for (let i = 0; i < len; i++) {
    for (let j = i; j < len; j++) {
      // swap(matrix[i][j], matrix[j][i])
      let temp = matrix[i][j]
      matrix[i][j] = matrix[j][i]
      matrix[j][i] = temp
    }
  }
  // 反转二维矩阵的每一行
  for (let key in matrix) {
    let row = matrix[key]
    reverse(row)
  }
}
/**
 * 二维矩阵原地「逆时针」旋转90°。
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate_niShiZhen = function (matrix) {
  let len = matrix.length
  // 先沿 左下右上 对角线 镜像对称 二维矩阵
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i; j++) {
      // swap(matrix[i][j], matrix[n-j-1][n-i-1])
      let temp = matrix[i][j]
      matrix[i][j] = matrix[len - j - 1][len - i - 1]
      matrix[len - j - 1][len - i - 1] = temp
    }
  }
  // 反转二维矩阵的每一行
  for (let key in matrix) {
    let row = matrix[key]
    reverse(row) //顺时针、逆时针 同一个 reverse
  }
}
let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ],
  matrix2 = [
    [5, 1, 9, 11],
    [2, 4, 8, 10],
    [13, 3, 6, 7],
    [15, 14, 12, 16]
  ]
rotate_niShiZhen(matrix)
rotate(matrix2)
console.log(matrix, matrix2)
// @lc code=end
