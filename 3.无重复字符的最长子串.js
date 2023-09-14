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
  // "abcabcbb"

  // 思路：
  // 输入：1.1 1.2 1.3
  // 循环：2.1, 2.2, 2.3.1, 2.3.2, 2.4, 2.5
  // 输出：3

  // 1.输入：
  let pStart = 0, pEnd = 0 // 1.1 左右指针
  let maxLength = 0 // 1.2 最长字串的长度
  const sArr = s.split('') // 1.3 字符串 -> 数组——数据结构

  // 2.用循环
  while (pEnd < sArr.length) {
    // 算法如下：
    const subArr = sArr.slice(pStart, pEnd) // 2.1 复制子串；
    const index = subArr.findIndex((item) => item === sArr[pEnd]) // 2.2 记录位置：子串的右指针值 -> subArr 里 sArr[pEnd] 位置；
    pStart = pStart + index + 1 // 2.3.1 左指针右移：子串存在右指针值 -> subArr 存在 sArr[pEnd]
    // 2.3.2 不存在，不右移 -> `index+1=-1+1=0`
    pEnd++ // 2.4 右指针：每次右移
    maxLength = Math.max(pEnd - pStart, maxLength) // 2.5 记录长度：最长子串
  }

  // 3.输出：
  return maxLength // 返回
}
// @lc code=end
