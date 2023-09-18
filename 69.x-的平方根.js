/*
 * @lc app=leetcode.cn id=69 lang=javascript
 *
 * [69] x 的平方根
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */
// 非负整数 x
// 返回 x 的 算术平方根（求根号下x）
// 结果只保留 整数部分
// 不能使用 内置指数函数和算符，例如 pow(x, 0.5) 或者 x ** 0.5 。
// 输入：x = 8
// 输出：2
// 解释：8 的算术平方根是 2.82842..., 由于返回类型是整数，小数部分将被舍去。
var mySqrt = function (x) {
  let low = 1,
    high = x
  while (low <= high) {
    let mid = low + ((high - low) >> 1)
    if (mid * mid <= x) {
      if ((mid + 1) * (mid + 1) > x) {
        return mid
      }
      low = mid + 1
    } else {
      high = mid - 1
    }
  }
  return 0
}
// @lc code=end
