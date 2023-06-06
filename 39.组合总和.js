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
var combinationSum = function (candidates, target) {
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
      if (candidates[i] + sum > target) return;
      path.push(candidates[i]);
      // 在每次回溯时候：
      // 把当前循环的项 item(=candidates[i]) 与 sum 相加
      // ——从而计算下次回溯的参数：和 sum 。
      backtrack(i, candidates[i] + sum);
      path.pop();
    }
  }

  backtrack(0, 0);

  return result;
};
// @lc code=end
