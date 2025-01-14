/*
 * @lc app=leetcode.cn id=58 lang=javascript
 * @lcpr version=20004
 *
 * [58] 最后一个单词的长度
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function (s) {
  // 最后一个单次的长度
  s = s.trim()
  let length = 0
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] !== ' ') {
      length++
    } else if (length > 0) {
      break
    }
  }
  return length
}
// @lc code=end

/*
// @lcpr case=start
// "Hello World"\n
// @lcpr case=end

// @lcpr case=start
// "   fly me   to   the moon  "\n
// @lcpr case=end

// @lcpr case=start
// "luffy is still joyboy"\n
// @lcpr case=end

 */
