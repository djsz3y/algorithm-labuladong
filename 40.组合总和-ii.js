/*
 * @lc app=leetcode.cn id=40 lang=javascript
 *
 * [40] 组合总和 II
 */

// @lc code=start
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
// 候选人编号的集合 candidates 和一个目标数 target
// candidates 中所有可以使数字和为 target 的组合。
// candidates 中的每个数字在每个组合中只能使用 一次 。
// 注意：解集不能包含重复的组合。
// 输入: candidates = [2,5,2,1,2], target = 5,
// 输出:
// [
// [1,2,2],
// [5]
// ]
var combinationSum2 = function (candidates, target) {
  // !注意：必须排序，否则报错！
  candidates.sort((a, b) => a - b)
  // 先写回溯公式
  const res = []
  const path = []

  function backtrack(sum, startIndex) {
    // !condition
    if (sum === target) {
      res.push([...path])
      return
    }
    for (let i = startIndex; i < candidates.length; i++) {
      // !剪枝
      // 除了大于target情况，还得剪枝，[1,7], [7,1] 的情况。
      if (candidates[i] + sum > target) return
      // !数组中可能有相同的数据，这个数据会影响最后的结果，有重复。
      // !因为上面排过序了，这里判断 candidates 的 i 和 i -1 相同否，就可知道是否选择了重复的。

      // ?也就是：[2,5,2,1,2] 排序后 [1, 2, 2, 2, 5] 时候，
      //    i 从 startIndex = 2 开始时候，
      //    i 从 startIndex = 3 开始时候，
      //    candidates[i] !== candidates[i - 1] 不等的时候，
      // 继续回溯。
      if (i === startIndex || candidates[i] !== candidates[i - 1]) {
        path.push(candidates[i])
        // 在每次回溯时候：
        // 把当前循环的项 item(=candidates[i]) 与 sum 相加
        // ——从而计算下次回溯的参数：和 sum 。

        // !注意 i + 1
        backtrack(candidates[i] + sum, i + 1)
        path.pop()
      }
    }
  }

  backtrack(0, 0)

  return res
}
// @lc code=end
