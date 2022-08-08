/*
 * @lc app=leetcode.cn id=59 lang=javascript
 *
 * [59] 螺旋矩阵 II
 */

// @lc code=start
/*
 * 1.读懂题目：
 * 给定正整数 n
 * 生成 正方形矩阵 matrix
 * 包含元素为 1 到 n的二次方
 * 元素排列 按顺时针顺序 螺旋排列。
 *
 * 2.写出思路：
 * 二维数组的花式遍历技巧
 *
 * 力扣第 54 题思路：
 *
 * 矩阵的「 螺旋矩阵」
 * 核心思路：
 * 按照(右、下、左、上)的顺序遍历数组，
 * 并使用四个变量 圈定 未遍历元素的边界。
 * 随着螺旋便利，相应的边界会收缩，直到螺旋遍历完整个数组。
 * 有了这个思路，翻译代码很容易：
 *
 * 力扣第 59 题
 * 矩阵的「 螺旋矩阵 II」也是类似的题目
 * 只不过是反过来，让你按照螺旋的顺序生成矩阵：
 *
 * 3.代码实现： generateMatrix
 *
 * 4.测试用例：
 */
/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function (n) {
  // 定义 二维数组 matrix
  let matrix = Array.from({ length: n }, () => new Array(n).fill(0));
  // console.log(matrix) //[ [ 0, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ] ]

  // 定义 二维矩阵的 上下左右 边界值
  let upper_bound = 0,
    lower_bound = n - 1;
  let left_bound = 0,
    right_bound = n - 1;

  // 需要填入矩阵的数字
  let num = 1;

  while (num <= n * n) {
    if (upper_bound <= lower_bound) {
      // 顶部从左向右遍历
      for (let j = left_bound; j <= right_bound; j++) {
        matrix[upper_bound][j] = num++;
      }
      // 上边界下移（因为遍历是 from 左上 to 右上 -> 完成了）
      upper_bound++;
    }
    if (left_bound <= right_bound) {
      // 右侧从上到下遍历
      for (let i = upper_bound; i <= lower_bound; i++) {
        matrix[i][right_bound] = num++;
      }
      // 右边界左移（因为遍历是 from 右上 to 右下 -> 完成了）
      right_bound--;
    }
    if (upper_bound <= lower_bound) {
      // 底部从右向左遍历
      for (let j = right_bound; j >= left_bound; j--) {
        matrix[lower_bound][j] = num++;
      }
      // 下边界上移（因为遍历是 from 右下 to 左下 -> 完成了）
      lower_bound--;
    }
    if (left_bound <= right_bound) {
      // 左侧从下向上遍历
      for (let i = lower_bound; i >= upper_bound; i--) {
        matrix[i][left_bound] = num++;
      }
      // 左边界右移（因为遍历是 from 左下 to 左上 -> 完成了）
      left_bound++;
    }
  } // 如果 num <= n的二次方，就一直进行上面操作

  // 返回结果：「 螺旋矩阵 II」遍历完成后的。
  return matrix;
};
const res = generateMatrix(3),
  res2 = generateMatrix(1);
console.log(res);
console.log(res2);
// @lc code=end
