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
var mySqrt = function (x) {
  let low = 1,
    high = x;
  while (low <= high) {
    let mid = low + ((high - low) >> 1);
    if (mid * mid <= x) {
      if ((mid + 1) * (mid + 1) > x) {
        return mid;
      }
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return 0;
};
// @lc code=end
