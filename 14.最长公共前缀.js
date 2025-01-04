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
  // 最长公共前缀
  // strs = ["flower","flow","flight"]
  let result = strs[0]
  for (let i = 0; i < strs.length; i++) {
    // 找最小字符串
    let curStr = ''
    if (result.length > strs[i].length) {
      curStr = strs[i]
    } else {
      curStr = result
      result = strs[i]
    }
    // console.log(i, strs[i], curStr, result)

    let j = 0
    while (j < curStr.length && result.startsWith(curStr.substring(0, j + 1))) {
      j++
    }
    result = curStr.substring(0, j)
    // console.log(j, result)
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
