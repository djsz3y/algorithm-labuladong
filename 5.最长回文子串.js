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
  // 最长回文子串
  const palindrome = (s, i, j) => {
    while (i >= 0 && j < s.length && s[i] === s[j]) {
      i--
      j++
    }
    return s.substring(i + 1, j)
  }

  let res = ''

  for (let i = 0; i < s.length; i++) {
    let res1 = palindrome(s, i, i)
    let res2 = palindrome(s, i, i + 1)

    res = res.length > res1.length ? res : res1
    res = res.length > res2.length ? res : res2
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
