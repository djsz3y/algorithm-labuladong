/*
 * @lc app=leetcode.cn id=700 lang=javascript
 *
 * [700] 二叉搜索树中的搜索
 */

// @lc code=start
/*
 * 1.读懂题目：
 * 【BST题解】：「查」
 * 已知 二叉搜索树 BST 根节点 root & 整数 val
 * 返回 BST 中以节点 root(整数 val = root.val) 为根 子树，
 * if 此种节点 不存在，返 null。
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
 * 2.2【此题是BST基操的「查」】：
 *
 * 2.2.1【穷举所有节点，适用于所有二叉树】：
 * 在 普通二叉树 寻找：穷举所有节点，适用于所有二叉树。
 * ```js
 * TreeNode searchBST(TreeNode root, int target);
 *   if (root == null) return null; // 根空？返空。
 *   if (root.val == target) return root; // 根值==目标？返根。
 *   // 当前节点没找到就递归地去左右子树寻找
 *   TreeNode left = searchBST(root.left, target); // 递归左子树 和 目标值
 *   TreeNode right = searchBST(root.right, target); // 递归右子树 和 目标值
 *
 *   return left != null ? left : right; // 左不是空即左，右不是空即右。
 * }
 * ```
 *
 * 2.2.2【适用 BST 的 BST 搜索(searchBST)】：
 * 充分利用BST特殊性：「左小右大」特性：
 * 不需要递归搜索两边，类似二分查找思想，根据target和root.val大小比较，排除一边。
 * 把上述思维稍稍改动：
 * ```js
 * TreeNode searchBST(TreeNode root, int target) {
 *   if (root == null) { // 根空返空。
 *     return null;
 *   }
 *   // 去左子树搜索
 *   if (root.val > target) { // 根值比目标值大，目标在左，找左子树。
 *     return searchBST(root.left, target);
 *   }
 *   // 去右子树搜索
 *   if (root.val < target) { // 根值比目标值小，目标在右，找右子树。
 *     return searchBST(root.right, target);
 *   }
 *   return root; // 根植 = 目标，返根。
 * }
 * ```
 *
 * 3.代码实现： searchBST
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
 * @param {number} val
 * @return {TreeNode}
 */
var searchBST = function (root, val) {
  if (root == null) return null;
  if (root.val > val) {
    return searchBST(root.left, val);
  }
  if (root.val < val) {
    return searchBST(root.right, val);
  }
  return root;
};
let root = {
    val: 4,
    left: { val: 2, left: { val: 1 }, right: { val: 3 } },
    right: { val: 7 },
  },
  val = 2,
  root2 = {
    val: 4,
    left: { val: 2, left: { val: 1 }, right: { val: 3 } },
    right: { val: 7 },
  },
  val2 = 5;
let res = searchBST(root, val),
  res2 = searchBST(root2, val2);
console.log(res, "-", res2);
// @lc code=end
