/*
 * @lc app=leetcode.cn id=144 lang=javascript
 *
 * [144] 二叉树的前序遍历
 */

// @lc code=start
/*
 * 1.读懂题目：
 * 【二叉树题解】
 * 已知二叉树的根节点 root
 * 返回节点值的前序遍历
 *
 * 2.写出思路：
 * 
 *
 * 3.代码实现： preorderTraversal
 * 69/69 cases passed (48 ms)
 * Your runtime beats 99.09 % of javascript submissions
 * Your memory usage beats 18.26 % of javascript submissions (41.4 MB)
 *
 * 4.测试用例：
 */
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
  let res = [];
  if (root == null) {
    return res;
  }
  root.val ? res.push(root.val) : "";

  const left = preorderTraversal(root.left);
  // console.log(39, left);
  res = res.concat(left);
  // console.log(res);

  const right = preorderTraversal(root.right);
  // console.log(42, right);
  right.length != 0 ? (res = res.concat(right)) : "";

  return res;
};
let root = { val: 1, left: null, right: { val: 2, left: { val: 3 } } },
  root2 = {},
  root3 = { val: 1 },
  root4 = { val: 1, left: { val: 2 } },
  root5 = { val: 1, left: null, right: { val: 2 } };
let res = preorderTraversal(root),
  res2 = preorderTraversal(root2),
  res3 = preorderTraversal(root3),
  res4 = preorderTraversal(root4),
  res5 = preorderTraversal(root5);
console.log(res, res2, res3, res4, res5);
// @lc code=end
