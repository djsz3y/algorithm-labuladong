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
// 求：1 到 n，k个数的组合。
var combine = function (n, k) {
  // 1......n

  // 1. 先写 回溯公式

  // 1.1 result path

  const result = []
  const path = []

  // 1.2 backtrack

  function backtrack(path, startIndex) {
    // 1.3 if condition result

    // 2.
    // 到达树的底部
    //    k个数的组合，所以 path 长度为 k 为 condition。
    if (path.length === k) {
      // 3.
      // 停止回溯的条件就是：
      //    返回范围 [1, n] 中所有可能的 k 个数的组合
      //    ——每个组合有 k 个数
      //    ——每个组合长度为 k
      //    即：path 的长度为 k 。
      result.push([...path])
      return
    }

    // 1.4 for path.push backtrack path.pop

    // 注意 i 从 startIndex 开始递增
    // 注意小于等于 <=
    for (let i = startIndex; i <= n; i++) {
      path.push(i) // 做选择

      // 4.
      // 回溯阶段让 i + 1，实现 从 1 -> n 的遍历：
      //    i + 1 后，传给的就是新的 回溯 backtrack 的第二个参数 startIndex，
      //    也就在每次回溯的时候：得到 i 从 startIndex(i + 1) 开始遍历的初始点了。
      backtrack(path, i + 1)
      path.pop() // 撤销选择
    }
  }

  // 1.5 执行backtrack

  backtrack(path, 1) // 执行回溯

  // 1.6 return

  return result // 返回结果
}
// @lc code=end
