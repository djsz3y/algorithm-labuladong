/*
 * @lc app=leetcode.cn id=39 lang=javascript
 *
 * [39] 组合总和
 */

// @lc code=start
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
// 无重复元素 整数数组 candidates
// 目标整数 target
// 数字和为目标数 target 所有 不同组合
// 列表形式返回，任意顺序 返回这些组合。
// candidates 中的 同一个 数字可以 无限制重复被选取 。
var combinationSum = function (candidates, target) {
  /**
   * 注意：
   * 排序，37行可用 break 或者 return ；
   * 不排序，37 行 用 continue ；
   */

  // 注意：必须排序，否则报错！
  // candidates = candidates.sort((a, b) => a - b)

  // 先写回溯公式
  const res = []
  const path = []

  function backtrack(sum, startIndex) {
    // condition
    //    let summary = path.reduce((sum, cur) => (sum += cur), 0)
    if (sum === target) {
      res.push([...path])
      return
    }
    for (let i = startIndex; i < candidates.length; i++) {
      // 剪枝？
      if (candidates[i] + sum > target) continue
      // console.log(i, candidates[i], startIndex, path)
      path.push(candidates[i])
      // 在每次回溯时候：
      // 把当前循环的项 item(=candidates[i]) 与 sum 相加
      // ——从而计算下次回溯的参数：和 sum 。
      backtrack(candidates[i] + sum, i)
      path.pop()
    }
  }

  backtrack(0, 0)

  return res
}
// @lc code=end
