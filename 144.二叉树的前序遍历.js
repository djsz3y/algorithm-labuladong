/*
 * @lc app=leetcode.cn id=144 lang=javascript
 *
 * [144] 二叉树的前序遍历
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
var preorderTraversal = function (root) {
  // 回溯算法思想
  let res = [];
  const preOrder = function (node) {
    if (node == null) return;
    res.push(node.val);
    preOrder(node.left);
    preOrder(node.right);
  };
  preOrder(root);
  return res;
};
// @lc code=end
