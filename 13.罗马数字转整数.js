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
  // console.time('romanToInt')
  const romanMap = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000
  }
  const romanArr = Object.keys(romanMap)

  let _s = s.split('') // .reverse()

  let res = _s.reduceRight((sum, cur, idx, arr) => {
    if (sum === 0) return 0 + romanMap[cur]

    let cur_idx = romanArr.findIndex((ite) => ite === arr[idx]),
      next_idx = romanArr.findIndex((ite) => ite === arr[idx + 1])

    if (next_idx > cur_idx) return sum - romanMap[cur]

    return sum + romanMap[cur]
  }, 0)

  // console.timeEnd('romanToInt')
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
