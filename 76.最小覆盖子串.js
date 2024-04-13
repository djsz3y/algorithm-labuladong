/*
 * @lc app=leetcode.cn id=76 lang=javascript
 *
 * [76] 最小覆盖子串
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
// 字符串 s 和 t
// 返回 s 中涵盖 t 中所有 字符的最小子串，
// s 中不存在涵盖 t 所有字符的子串，则返回空字符串""
var minWindow = function (s, t) {
  // 使用 Map 存储字符出现次数
  const need = new Map(),
    window = new Map()

  for (let i = 0; i < t.length; i++) {
    const c = t[i]
    // !need.has(c) ? need.set(c, 1) : need.set(c, need.get(c) + 1)
    need.set(c, need.has(c) ? need.get(c) + 1 : 1)
  }

  let left = 0,
    right = 0
  let valid = 0

  let start = 0,
    len = Number.MAX_SAFE_INTEGER // 最大安全整数。

  while (right < s.length) {
    const c = s[right] // 记录扩大窗口的当前字符串
    right++ // 扩大窗口

    if (need.has(c)) {
      // 当前字符串 T 里有，也就是 need里有
      // 就记录在 window 窗口里
      // !window.has(c) ? window.set(c, 1) : window.set(c, window.get(c) + 1)
      window.set(c, window.has(c) ? window.get(c) + 1 : 1)

      if (window.get(c) === need.get(c)) {
        // 需要 c 且窗口里有 c，记录 valid 的值 ++
        valid++
      }
    }

    while (valid === need.size) {
      // 更新最小覆盖子串
      // 缩小窗口，记录符合条件的最小窗口，即len，
      // 由于要截取字符串，所以记录最小窗口时的 start = left 和 最小窗口 len = right - left，
      if (right - left < len) {
        start = left
        len = right - left
      }

      const d = s[left] // 记录缩小窗口的当前字符串
      left++ // 缩小窗口

      if (need.has(d)) {
        // 判断是否存在于 need 中
        if (window.get(d) === need.get(d)) {
          // 需要 d 且 窗口里有 d，记录 valid 的值 --
          valid--
        } // valid-- 为了跳出循环，达到图中第 ④ 步“直到窗口中的字符串不再符合要求，left 不再继续移动”

        window.set(d, window.get(d) - 1)
      }
    }
  }
  // console.log(66, start, len);

  // 最后返回题目所需
  return len === Number.MAX_SAFE_INTEGER ? '' : s.substring(start, start + len)
}
// let s = 'EBBANCF',
//   t = 'ABC',
//   s2 = 'a',
//   t2 = 'a',
//   s3 = 'a',
//   t3 = 'aa'
// let res1 = minWindow(s, t),
//   res2 = minWindow(s2, t2),
//   res3 = minWindow(s3, t3)
// console.log(res1)
// console.log('-', res2, '-', res3)
// @lc code=end
