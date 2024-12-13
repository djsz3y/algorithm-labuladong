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
  let left = [] // 栈

  let map = {
      ')': '(',
      '}': '{',
      ']': '['
    },
    mapLeft = Object.values(map) // 左括号列表

  for (let c of s) {
    if (mapLeft.includes(c)) {
      // 是左括号，入栈
      left.push(c)
    } else {
      // 是右括号
      if (left.length !== 0 && map[c] === left[left.length - 1]) {
        // 右括号和栈里左括号是对应关系，出栈左括号
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
