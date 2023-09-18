/*
 * @lc app=leetcode.cn id=102 lang=javascript
 *
 * [102] 二叉树的层序遍历
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
// 二叉树的根节点 {TreeNode} root
// 层序遍历
// 输入：root = [3,9,20,null,null,15,7]
// 输出：[[3],[9,20],[15,7]]
var levelOrder = function (root) {
  // 使用 bfs 遍历方式

  // 8. 边缘检测
  if (!root) return []

  // 1. 队列 queue & 结果 res
  let queue = [root]
  let res = []

  // 2. while循环
  while (queue.length) {
    // 7. 本层树枝（上层的孩子）叉数
    const len = queue.length

    // 5. 一层一行 level
    let level = []

    // 6. for循环，队列值，存进level。
    for (let i = 0; i < len; i++) {
      // 3. 取出 队头
      let cur = queue.shift()

      level.push(cur.val)
      // 4. 孩子存队列
      cur.left && queue.push(cur.left)
      cur.right && queue.push(cur.right)
    }

    res.push(level)
  }

  return res
}
// @lc code=end
