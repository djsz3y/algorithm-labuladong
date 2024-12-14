/*
 * @lc app=leetcode.cn id=5 lang=javascript
 * @lcpr version=20004
 *
 * [5] 最长回文子串
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  // 找到字符串s中最长的回文子串
  const palindrome = function (s, l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      l--
      r++
    }
    return s.substring(l + 1, r)
  }
  let res = ''
  for (let i = 0; i < s.length; i++) {
    let s1 = palindrome(s, i, i)
    let s2 = palindrome(s, i, i + 1)

    res = res.length > s1.length ? res : s1
    res = res.length > s2.length ? res : s2
  }
  return res
}
// @lc code=end

/*
// @lcpr case=start
// "babad"\n
// @lcpr case=end

// @lcpr case=start
// "cbbd"\n
// @lcpr case=end

 */
