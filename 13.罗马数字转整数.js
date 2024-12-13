/*
 * @lc app=leetcode.cn id=13 lang=javascript
 * @lcpr version=20004
 *
 * [13] 罗马数字转整数
 */

// @lcpr-template-start

// @lcpr-template-end
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

/*
// @lcpr case=start
// "III"\n
// @lcpr case=end

// @lcpr case=start
// "IV"\n
// @lcpr case=end

// @lcpr case=start
// "IX"\n
// @lcpr case=end

// @lcpr case=start
// "LVIII"\n
// @lcpr case=end

// @lcpr case=start
// "MCMXCIV"\n
// @lcpr case=end

 */
