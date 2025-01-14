/*
 * @lc app=leetcode.cn id=101 lang=javascript
 * @lcpr version=20004
 *
 * [101] 对称二叉树
 */

// @lcpr-template-start

// @lcpr-template-end
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
 * @return {boolean}
 */
var isSymmetric = function (root) {
  if (!root) return true
  const isSame = function (leftNode, rightNode) {
    if (
      // 只有左子树
      (leftNode && !rightNode) ||
      // 只有右子树
      (!leftNode && rightNode) ||
      // 左右子树都有，但值不等
      (leftNode && rightNode && leftNode.val !== rightNode.val)
    )
      return false
    // 左右子树都有，递归
    if (leftNode && rightNode) {
      return (
        isSame(leftNode.left, rightNode.right) &&
        isSame(leftNode.right, rightNode.left)
      )
    }
    // ⭐ 以上 都没走，说明值相等，所以走 true
    return true
  }
  return isSame(root.left, root.right)
}
// @lc code=end

/*
// @lcpr case=start
// [1,2,2,3,4,4,3]\n
// @lcpr case=end

// @lcpr case=start
// [1,2,2,null,3,null,3]\n
// @lcpr case=end

 */
