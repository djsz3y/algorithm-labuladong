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
  // 给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合
  // 1......n

  const res = []
  const path = []

  function backtrack(path, startIndex) {
    // 到达树的底部
    if (path.length === k) {
      // 停止回溯的条件就是：

      // 返回范围 [1, n] 中所有可能的 k 个数的组合
      // ——每个组合有 k 个数
      // ——每个组合长度为 k

      // 即：path 的长度为 k 。
      res.push([...path])
      return
    }

    // 注意 i 从 startIndex 开始递增
    // 注意小于等于 <=
    for (let i = startIndex; i <= n; i++) {
      // 做选择
      path.push(i)
      // 回溯阶段让 i + 1，实现 从 1 -> n 的遍历：

      // i + 1 后，传给的就是新的 回溯 backtrack 的第二个参数 startIndex，
      // 也就在每次回溯的时候：得到 i 从 startIndex(i + 1) 开始遍历的初始点了。

      // 符合数学逻辑。
      backtrack(path, i + 1)
      // 撤销选择
      path.pop()
    }
  }

  // 执行回溯
  backtrack(path, 1)

  // 返回结果
  return res
}
// @lc code=end
