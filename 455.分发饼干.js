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
// 法Ⅰ：
var findContentChildren = function (g, s) {
  // 胃口值 g[i]
  // 饼干尺寸 s[j]
  // 要求：s[j] >= g[i]

  // 1. 先排序：从小到大
  g = g.sort((a, b) => a - b) // 胃口值排序
  s = s.sort((a, b) => a - b) // 饼干尺寸排序

  // 2. 看循环胃口（法Ⅰ）还是循环饼干（法Ⅱ）
  // 2.1法Ⅰ：满足胃口，从大到小，大饼干满足一个个的大胃口。
  //    即：从最大胃口开始计算，看饼干是否能满足胃口
  // 2.2
  let result = 0 // 满足越多数量的孩子的最大值
  let index = s.length - 1 // 饼干指针，最后一个饼干
  for (let i = g.length - 1; i >= 0; i--) {
    // 如果还有饼干，且当前饼干能满足当前胃口
    if (index >= 0 && g[i] <= s[index]) {
      // 2.3 饼干尺寸能满足胃口
      result++ // 饼干数量加 1
      index-- // 饼干指针，从大到小指，看是否符合
    }
  }
  // 2.4
  return result
}

// 法Ⅱ：
var findContentChildren = function (g, s) {
  // 胃口值 g[i]
  // 饼干尺寸 s[j]
  // 要求：s[j] >= g[i]

  // 1. 先排序：从小到大
  g = g.sort((a, b) => a - b) // 胃口值排序
  s = s.sort((a, b) => a - b) // 饼干尺寸排序

  // 2. 看循环胃口（法Ⅰ）还是循环饼干（法Ⅱ）
  // 2.1法Ⅱ：饼干——物尽其用，从小到大。
  //      即：循环饼干，看是否能满足胃口，能满足，胃口数 index 加 1
  // 2.2
  let index = 0 // 胃口值
  for (let j = 0; j < s.length; j++) {
    if (g[index] <= s[j]) {
      // 2.3 饼干尺寸能满足胃口
      index++
    }
  }
  // 2.4
  return index
}
// @lc code=end
