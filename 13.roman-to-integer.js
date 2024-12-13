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
  let map = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000
  }

  let _s = s.split('')

  let res = _s.reduceRight((acc, cur, idx, arr) => {
    if (acc === 0) return map[cur]

    if (map[arr[idx + 1]] > map[cur]) return acc - map[cur]

    return acc + map[cur]
  }, 0)

  return res
}
// @lc code=end
