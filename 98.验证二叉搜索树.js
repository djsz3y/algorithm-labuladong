/*
 * @lc app=leetcode.cn id=98 lang=javascript
 *
 * [98] 验证二叉搜索树
 */

// @lc code=start
/*
 * 1.读懂题目：
 * 【BST题解】：「判断 BST 的合法性」
 * 已知二叉树的根root，
 * 判断是否是有效二叉搜索树。
 * - 有效 二叉搜索树定义如下：
 *   - 节点的左子树只包含 小于 当前节点的数。
 *   - 节点的右子树只包含 大于 当前节点的数。
 *   - 所有左子树和右子树自身必须也是二叉搜索树。
 *
 * 2.写出思路：
 *
 * 2.1【BST的基础操作】：
 * 「判断合法性」、「增」、「删」、「查」。
 * 基础操作依赖「左小右大」的特性，
 * 二叉树中做类似二分搜索的操作，
 * 寻找一个元素的效率很高。
 * BST 代码框架 和二叉树的遍历框架差不多，利用 BST「左小右大」的特性。
 *
 * 2.2【此题是BST基操的「判断 BST 的合法性」】：
 *
 * 3.代码实现： isValidBST
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
 * @return {boolean}
 */
var isValidBST = function (root) {
  function isValidBST(root, min, max) {
    // base case
    if (root == null) return true;
    if (min != null && root.val <= min.val) return false;
    if (max != null && root.val >= max.val) return false;
    return (
      isValidBST(root.left, min, root) && isValidBST(root.right, root, max)
    );
  }
  return isValidBST(root, null, null);
};
const root = { val: 2, left: { val: 1 }, right: { val: 3 } },
  root2 = {
    val: 5,
    left: { val: 1 },
    right: { val: 4, left: { val: 3 }, right: { val: 6 } },
  };
const res = isValidBST(root),
  res2 = isValidBST(root2);
console.log(res, "-", res2);
// @lc code=end
