/*
 * @lc app=leetcode.cn id=304 lang=javascript
 *
 * [304] 二维区域和检索 - 矩阵不可变
 */

// @lc code=start
/*
 * 1.读懂题目：
 * 二维矩阵 matrix
 * 计算子矩阵范围内元素的总和，左上角为(row1,col1) 右下角(row2,col2)
 * 实现 NumMatrix 类
 * NumMatrix(int[][] matrix) 给定整数矩阵 matrix 进行初始化
 * int sumRegion(int row1, int col1, int row2, int col2) 返回左上角(row1,col1) 右下角(row2,col2) 所描述的子矩阵的元素 总和。
 *
 * 2.写出思路：
 * for 循环遍历矩阵，sumRegion函数的时间复杂度就高了，算法格局就低了。
 * 更好的思路是：和一维数组中的前缀和是非常类似的。
 * 绿 - 蓝 - 橙 + 粉
 * 这四个矩阵有共同特点，左上角就是 (0,0) 原点
 *
 * 那么就可以维护一个二维数组 preSum：
 * 专门记录以原点为顶点的矩阵的元素之和，就可以用几次加减运算算出任何一个子矩阵的元素之和。
 *
 * 3.代码实现： NumMatrix
 *
 * 4.测试用例：
 */
// var NumMatrix = function (matrix) {};
// NumMatrix.prototype.sumRegion = function (row1, col1, row2, col2) {};
class NumMatrix {
  preSum;
  /**
   * @param {number[][]} matrix
   */
  constructor(matrix) {
    const m = matrix.length,
      n = matrix[0].length;
    if (m == 0 || n == 0) return;
    // let oneArr = new Array(m + 1).fill(0);
    // this.preSum = new Array(n + 1).fill(deepClone(oneArr));
    this.preSum = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    // console.log(this.preSum);
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        this.preSum[i][j] =
          this.preSum[i - 1][j] +
          this.preSum[i][j - 1] +
          matrix[i - 1][j - 1] -
          this.preSum[i - 1][j - 1];
      }
    }
    // console.log(52, this.preSum);
    // console.log(this.preSum[1][1]);
  }
  /**
   * @param {number} x1
   * @param {number} y1
   * @param {number} x2
   * @param {number} y2
   * @return {number}
   */
  sumRegion(x1, y1, x2, y2) {
    return (
      this.preSum[x2 + 1][y2 + 1] -
      this.preSum[x1][y2 + 1] -
      this.preSum[x2 + 1][y1] +
      this.preSum[x1][y1]
    );
  }
}
/**
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */
const matrix = [
  [3, 0, 1, 4, 2],
  [5, 6, 3, 2, 1],
  [1, 2, 0, 1, 5],
  [4, 1, 0, 1, 7],
  [1, 0, 3, 0, 5],
];
const sumRegion_arg1 = [2, 1, 4, 3],
  sumRegion_arg2 = [1, 1, 2, 2],
  sumRegion_arg3 = [1, 2, 2, 4];
const obj = new NumMatrix(matrix);
const param_1 = obj.sumRegion(
  sumRegion_arg1[0],
  sumRegion_arg1[1],
  sumRegion_arg1[2],
  sumRegion_arg1[3]
);
const param_2 = obj.sumRegion(
  sumRegion_arg2[0],
  sumRegion_arg2[1],
  sumRegion_arg2[2],
  sumRegion_arg2[3]
);
const param_3 = obj.sumRegion(
  sumRegion_arg3[0],
  sumRegion_arg3[1],
  sumRegion_arg3[2],
  sumRegion_arg3[3]
);
console.log(param_1, param_2, param_3);
// @lc code=end
