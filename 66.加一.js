/*
 * @lc app=leetcode.cn id=66 lang=javascript
 * @lcpr version=20004
 *
 * [66] 加一
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
  // 非负整数，加一后，
  // 表示为：由 整数组成的非空数组。
  // [5] -> [6]
  // [9, 9] -> [1, 0, 0]
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] + 1 !== 10) {
      digits[i] += 1
      return digits
    }
    digits[i] = 0
    if (i === 0) {
      digits.unshift(1)
      return digits
    }
  }
}
// @lc code=end

/*
// @lcpr case=start
// [1,2,3]\n
// @lcpr case=end

// @lcpr case=start
// [4,3,2,1]\n
// @lcpr case=end

// @lcpr case=start
// [9]\n
// @lcpr case=end

 */
