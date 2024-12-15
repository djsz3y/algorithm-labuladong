/*
 * @lc app=leetcode.cn id=28 lang=javascript
 * @lcpr version=20004
 *
 * [28] 找出字符串中第一个匹配项的下标
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
  // 参考链接:https://labuladong.online/algo/practice-in-action/rabinkarp/#rabin-karp-%E7%AE%97%E6%B3%95

  // 字符串匹配暴力解法
  let N = haystack.length,
    L = needle.length

  for (let i = 0; i + L <= N; i++) {
    if (haystack.substring(i, i + L) === needle) {
      return i
    }
  }

  return -1
}
// @lc code=end

/*
// @lcpr case=start
// "sadbutsad"\n"sad"\n
// @lcpr case=end

// @lcpr case=start
// "leetcode"\n"leeto"\n
// @lcpr case=end

 */
