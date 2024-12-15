/*
 * @lc app=leetcode id=13 lang=javascript
 *
 * [13] Roman to Integer
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
  const map = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000
  }

  let res = 0

  for (let i = 0; i < s.length - 1; i++) {
    if (map[s[i + 1]] > map[s[i]]) {
      res -= map[s[i]]
    } else {
      res += map[s[i]]
    }
  }

  return res + map[s[s.length - 1]]
}
// @lc code=end
