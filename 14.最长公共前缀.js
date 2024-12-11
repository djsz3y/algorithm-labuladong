/*
 * @lc app=leetcode.cn id=14 lang=javascript
 * @lcpr version=20004
 *
 * [14] 最长公共前缀
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  let slow = 0
  let len = strs.length
  let result = strs[slow]

  while (slow < len) {
    let strArr = ''
    if (strs[slow].length < result.length) {
      strArr = strs[slow]
    } else {
      strArr = result
      result = strs[slow]
    }

    let j = 0
    while (j < strArr.length && result.startsWith(strArr.slice(0, j + 1))) {
      j++
    }
    result = strArr.slice(0, j)
    console.log(37, 'RES:', result, ',  J:', j)
    slow++
  }
  return result
}
// @lc code=end

/*
// @lcpr case=start
// ["flower","flow","flight"]\n
// @lcpr case=end

// @lcpr case=start
// ["dog","racecar","car"]\n
// @lcpr case=end

 */
