/*
 * @lc app=leetcode.cn id=20 lang=javascript
 * @lcpr version=20004
 *
 * [20] 有效的括号
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  // 有效的括号
  let map = {
      ')': '(',
      '}': '{',
      ']': '['
    },
    mapLeft = Object.values(map)

  let left = []

  for (let c of s) {
    if (mapLeft.includes(c)) {
      left.push(c)
    } else {
      if (left.length !== 0 && map[c] === left[left.length - 1]) {
        left.pop()
      } else {
        return false
      }
    }
  }

  return left.length === 0
}
// @lc code=end

/*
// @lcpr case=start
// "()"\n
// @lcpr case=end

// @lcpr case=start
// "()[]{}"\n
// @lcpr case=end

// @lcpr case=start
// "(]"\n
// @lcpr case=end

// @lcpr case=start
// "([])"\n
// @lcpr case=end

 */
