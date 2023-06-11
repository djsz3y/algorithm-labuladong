/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let maxLength = 0
  let pStart = 0
  let pEnd = 0
  // 字符串 -> 数组
  const sArr = s.split('')
  while (pEnd < sArr.length) {
    // 复制一个子串
    const subArr = sArr.slice(pStart, pEnd)
    // 问：子串是否存在 pEnd 指针位置的值？
    // 记录：尾指针的值相对于子串存在的位置。
    let index = subArr.findIndex((item) => item === sArr[pEnd])

    // 开始指针右移情况：子串内值，遇重复 sArr[pEnd] 值。
    pStart = pStart + index + 1
    // 尾指针每次循环都右移
    pEnd++

    // 记录最长子串长度
    maxLength = pEnd - pStart > maxLength ? pEnd - pStart : maxLength
  }

  return maxLength
}
// @lc code=end
