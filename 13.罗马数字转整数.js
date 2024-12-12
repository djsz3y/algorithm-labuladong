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
  // 转数组后，反转
  const strs = s.split('')
  const reversedStrs = strs.toReversed()

  // 得到罗马数字映射
  const lomaToNum_obj = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 }
  const lomaStrs = Object.keys(lomaToNum_obj)

  // 计算结果
  let result = reversedStrs.reduce((sum, cur, idx, src) => {
    let cur_num = lomaToNum_obj[cur]

    // 开头不需要比较，开头直接相加
    // 比较罗马字符串反转后的数组，的上一个和当前罗马数字的前后顺序
    // 上一个大，总和 sum - cur
    if (sum !== 0) {
      let last_loc = lomaStrs.findIndex((lomaStr) => lomaStr === src[idx - 1])
      let cur_loc = lomaStrs.findIndex((lomaStr) => lomaStr === src[idx])

      if (last_loc > cur_loc) {
        return sum - cur_num
      }
    }
    
    // 其他情况，总和 sum + cur
    return sum + cur_num
  }, 0)

  return result
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
