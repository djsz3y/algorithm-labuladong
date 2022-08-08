/*
 * @lc app=leetcode.cn id=701 lang=javascript
 *
 * [701] 二叉搜索树中的插入操作
 */

// @lc code=start
/*
 * 1.读懂题目：
 * 【BST题解】：「增」
 * 已知 二叉搜索树 BST 根节点 root & 整数 value
 * 将 value 插入 BST。
 * 返回 BST插入后的 BST的根 root，
 * 保证了value和原始 BST 任意节点值都不同。
 * 【注意】：
 * 可能存在多种有效插入方式，
 * 只要 BST 插入后仍为 BST即可，
 * 可以返回 任意有效结果。
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
 * 2.2【BST基操的「查」】：
 * 700.二叉搜索树中的搜索
 *
 * 2.3【BST基操的「判断 BST 的合法性」】：
 * 98.验证二叉搜索树
 *
 * 2.4【此题是BST基操的「增」】：
 * 701.二叉搜索树中的插入操作
 *
 * 2.4.1 对数据结构的操作无非遍历 + 访问，
 * 遍历就是「找」，访问就是「改」。
 * 具体到这个问题，插入一个数，找插入位置，进行插入操作。
 *
 * 2.4.2 上一个问题，我们总结了 BST 中的遍历框架，就是「找」的问题。
 * 直接套框架，加上「改」的操作即可。
 *
 * 2.4.3 一旦涉及「改」（就类似二叉树的构造问题），函数要返回 TreeNode 类型，并且要对递归调用的返回值进行接收。
 *
 * 2.5【BST基操的「删」】：
 * 450.删除二叉搜索树中的节点
 *
 * 3.代码实现： insertIntoBST
 *
 * 4.测试用例：
 */
// Definition for a binary tree node.
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var insertIntoBST = function (root, val) {
  /**
   *【注意】：
   * 2.4.3 一旦涉及「改」（就类似二叉树的构造问题），
   * 函数要返回 TreeNode 类型，
   * 并且要对递归调用的返回值进行接收。
   */

  // 找到空位置插入新节点
  if (root == null) return new TreeNode(val);
  // if (root.val == val)
  //     BST 中一般不会插入已存在元素
  if (root.val < val) root.right = insertIntoBST(root.right, val);
  if (root.val > val) root.left = insertIntoBST(root.left, val);
  return root;
};
// 可以把 700.BST查找 和 BST插入 两种代码 做对比。
// var searchBST = function (root, val) {
//   if (root == null) return null;
//   if (root.val > val) {
//     return searchBST(root.left, val);
//   }
//   if (root.val < val) {
//     return searchBST(root.right, val);
//   }
//   return root;
// };
let root = {
    val: 4,
    left: { val: 2, left: { val: 1 }, right: { val: 3 } },
    right: { val: 7 },
  },
  val = 5;
let root2 = {
    val: 40,
    left: { val: 20, left: { val: 10 }, right: { val: 30 } },
    right: { val: 60, left: { val: 50 }, right: { val: 70 } },
  },
  val2 = 25;
let root3 = {
    val: 4,
    left: { val: 2, left: { val: 1 }, right: { val: 3 } },
    right: { val: 7 },
  },
  val3 = 5;
let res = insertIntoBST(root, val);
console.log(root, res);
let res2 = insertIntoBST(root2, val2);
console.log(root2, res2);
let res3 = insertIntoBST(root3, val3);
console.log(root3, res3);
// @lc code=end
