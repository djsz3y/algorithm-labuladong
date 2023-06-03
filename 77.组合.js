/*
 * @lc app=leetcode.cn id=77 lang=javascript
 *
 * [77] 组合
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  const result = [];
  const path = [];

  function backtrack(path, startIndex) {
    // 到达树的底部
    if (path.length === k) {
      result.push([...path]);
      return;
    }

    // 注意 i 从 startIndex 开始递增
    // 注意小于等于 <=
    for (let i = startIndex; i <= n; i++) {
      // 做选择
      path.push(i);
      backtrack(path, i + 1);
      // 撤销选择
      path.pop();
    }
  }

  backtrack(path, 1);

  return result;
};
// @lc code=end
