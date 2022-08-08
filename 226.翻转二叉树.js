/*
 * @lc app=leetcode.cn id=226 lang=javascript
 *
 * [226] 翻转二叉树
 */

// @lc code=start
/*
 * 1.读懂题目：
 *
 * 【二叉树题解】：
 * - 已知二叉树的根节点 root，
 * 镜像翻转二叉树，
 * 并返回根节点。
 * - 原地翻转。
 * - 二叉树上 每个结点的左右子节点进行交换，
 * 最后结果就是完全翻转之后的二叉树。
 *
 * 2.写出思路：
 *
 * 要求：【理解「遍历」&「分解问题」2种思维模式的区别】
 *
 * 主要思路：【二叉树解题de思维模式】：
 * 1).「遍历」思维模式：
 * 如果 通过遍历一遍二叉树得到答案，
 * 那么 用 traverse 函数配合外部变量来实现。
 * 2).「分解问题」思维模式：
 * 如果 通过定义一个递归函数，用 子问题（子树）答案推导出原问题的答案，
 * 那么 写出递归函数定义，并 充分利用此函数返回值。
 *
 * 【题解思路】：
 * 1).可用「遍历」思维模式：
 * - 写 traverse 函数遍历每个节点，让每个节点的左右子节点颠倒就可以。
 * - 单独抽出一个节点，需要做什么？
 * 把自己的左右子节点交换。
 * - 什么时候做？
 * 前中后序位置都可以。
 *
 * 2).可用「分解问题」思维模式：
 * - 第一步，赋予定义（尝试给 invertTree 函数）：
 * // 定义：将以 root 为根的这棵二叉树翻转，返回翻转后的二叉树的根节点。
 * TreeNode invertTree(TreeNode root);
 * - 第二步，思考（对于某二叉树节点 x ，执行invertTree(x)，利用递归函数定义做什么？）
 * 先翻转左子树 [利用 invertTree(x.left)]，
 * 再翻转右子树 [利用 invertTree(x.right)]，
 * 最后交换 x 的左右子树，
 * - 恰好，完成以 x 为根的整棵二叉树翻转，
 * 也就是，完成 invertTree(x) 的定义。
 *
 * 【注意】：
 * 第二种解法，核心 在于要给 递归函数 合适 定义，用 函数定义 解释代码。
 * 逻辑成功自恰，算法正确。
 *
 * 【最后】：
 * 学会 默念 二叉树 de 解题总纲。
 *
 * 3.代码实现： invertTree
 * 本题用「遍历」&「分解问题」2种思维模式都可以解决。
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
 * @return {TreeNode}
 */
/**
 * （用第一种思维模式解题：）
 * 1.解法代码：「遍历」思维模式：
 * 【1: 0.133ms】
 */
// var invertTree = function (root) {
//   traverse(root);
//   return root;
// };
// function traverse(root) {
//   if (root == null) {
//     return;
//   }
//   const temp = root.left;
//   root.left = root.right;
//   root.right = temp;
//   traverse(root.left);
//   traverse(root.right);
// }
/**
 * （第二种思维模式解题：）
 * 2.解法代码：「分解问题」思维模式：
 * 【1: 0.124ms】
 */
var invertTree = function (root) {
  if (root == null) return null; // 空？返空。
  // 利用函数定义，先翻转左右子树【函数定义，翻左，再翻右】
  let left = invertTree(root.left);
  let right = invertTree(root.right);
  // 然后交换左右子节点【交换左右】
  root.left = right;
  root.right = left;
  // 和定义逻辑自恰：以 root 为根的这棵二叉树已经被翻转，返回 root【自恰，翻完，返 root】
  return root;
};

let root = {
    val: 4,
    left: { val: 2, left: { val: 1 }, right: { val: 3 } },
    right: { val: 7, left: { val: 6 }, right: { val: 9 } },
  },
  root2 = { val: 2, left: { val: 1 }, right: { val: 3 } },
  root3 = {};
console.time(1);
let res = invertTree(root),
  res2 = invertTree(root2),
  res3 = invertTree(root3);
console.timeEnd(1);
console.log(res, "-", res2, "-", res3);
// @lc code=end
