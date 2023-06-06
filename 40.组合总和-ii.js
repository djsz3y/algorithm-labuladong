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
var combinationSum2 = function (candidates, target) {
  // 注意：必须排序，否则报错！
  candidates = candidates.sort((a, b) => a - b);

  const result = [];
  const path = [];

  function backtrack(startIndex, sum) {
    if (sum === target) {
      result.push([...path]);
      return;
    }
    for (let i = startIndex; i < candidates.length; i++) {
      // 剪枝
      if (candidates[i] + sum > target) return;
      // 数组中可能有相同的数据，这个数据会影响最后的结果，有重复。
      if (i === startIndex || candidates[i] !== candidates[i - 1]) {
        path.push(candidates[i]);
        // 在每次回溯时候：
        // 把当前循环的项 item(=candidates[i]) 与 sum 相加
        // ——从而计算下次回溯的参数：和 sum 。

        // !注意 i + 1
        backtrack(i + 1, candidates[i] + sum);
        path.pop();
      }
    }
  }

  backtrack(0, 0);

  return result;
};
// @lc code=end
