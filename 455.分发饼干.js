/*
 * @lc app=leetcode.cn id=455 lang=javascript
 *
 * [455] 分发饼干
 */

// @lc code=start
/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function (g, s) {
  g = g.sort((a, b) => a - b) // 排序 胃口值
  s = s.sort((a, b) => a - b) // 排序 饼干尺寸

  let result = 0, // 满足越多数量的孩子的最大值
    index = s.length - 1 // 饼干指针，最后一个饼干

  // 从最大胃口开始计算，看饼干是否能满足胃口
  for (let i = g.length - 1; i >= 0; i--) {
    // 如果还有饼干，且，当前饼干能满足当前胃口
    if (index >= 0 && s[index] >= g[i]) {
      // 饼干数量加 1
      result++
      // 饼干指针，从大到小指，看是否符合
      index--
    }
  }

  return result
}

var findContentChildren = function (g, s) {
  g = g.sort((a, b) => a - b)
  s = s.sort((a, b) => a - b)

  // 胃口值
  let index = 0

  // 循环饼干，看是否能满足胃口，能满足，胃口数 index 加 1
  for (let i = 0; i < s.length; i++) {
    if (index < g.length && s[i] >= g[index]) {
      index++
    }
  }

  return index
}
// @lc code=end
