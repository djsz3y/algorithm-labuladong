/*
 * @lc app=leetcode.cn id=9 lang=javascript
 * @lcpr version=20004
 *
 * [9] 回文数
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  // 整数 x 是回文整数，return true；否则 return false；
  // 思路：while 循环 对 10 取余，对 10 取整
  // 变量：临时参数 temp ，x 对应的回文整数 y
  if (x < 0) return false
  let y = 0,
    temp = x
  while (temp > 0) {
    let last_number = temp % 10
    // temp = Math.floor(temp / 10)
    temp = ~~(temp / 10)
    y = y * 10 + last_number
  }
  return y === x
}
// @lc code=end

/*
// @lcpr case=start
// 121\n
// @lcpr case=end

// @lcpr case=start
// -121\n
// @lcpr case=end

// @lcpr case=start
// 10\n
// @lcpr case=end

 */
