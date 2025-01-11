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
  // ['longest', 'locommon', 'lo']
  if (!strs.length) return ''
  let res = strs[0]
  for (let i = 0; i < strs.length; i++) {
    // 找最小字符串
    let curStr = ''
    if (res.length > strs[i].length) {
      curStr = strs[i]
    } else {
      curStr = res
      res = strs[i]
    }

    let j = 0
    while (j < curStr.length && res.startsWith(curStr.substring(0, j + 1))) {
      j++
    }
    res = curStr.substring(0, j)
  }
  return res
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
