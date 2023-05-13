/*
 * @lc app=leetcode.cn id=145 lang=javascript
 *
 * [145] 二叉树的后序遍历
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
 * @return {number[]}
 */
var postorderTraversal = function (root) {
  // 回溯算法思想
  let res = [];
  const postOrder = function (node) {
    if (node == null) return;
    postOrder(node.left);
    postOrder(node.right);
    res.push(node.val);
  };
  postOrder(root);
  return res;
};
// @lc code=end
