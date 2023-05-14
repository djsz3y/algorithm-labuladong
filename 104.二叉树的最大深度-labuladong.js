/*
 * @lc app=leetcode.cn id=104 lang=javascript
 *
 * [104] 二叉树的最大深度
 */

// @lc code=start
/*
 * 1.读懂题目：
 * 【二叉树题解】
 * 给定二叉树
 * 返回它的最大深度
 *
 * 2.写出思路：
 * - 二叉树题目的递归解法分两类思路：
 * 1.遍历二叉树计算答案的思路。
 * 2.分解问题计算答案的思路。
 * - 这两类思路分别对应：
 * 1.回溯算法核心框架。
 * 2.动态规划核心框架。
 *
 * 3.代码实现： maxDepth
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
// --------------------1.遍历二叉树计算答案的思路 start【56ms】
// 主函数
var maxDepth = function (root) {
  // 记录最大深度
  let res = 0;
  // 记录遍历到的节点的深度
  let depth = 0;
  // 二叉树遍历框架
  function traverse(root) {
    if (root == null) {
      return;
    }
    // 前序位置
    depth++;
    if (root.left == null && root.right == null) {
      // 到达叶子节点，更新最大深度
      res = Math.max(res, depth);
    }
    traverse(root.left);
    traverse(root.right);
    // 后序位置
    depth--;
  }
  traverse(root);
  return res;
};
// 问题：为什么在前序位置增加depth & 后序位置减少depth？
// 前序位置进入节点，后序位置离开节点，depth 记录当前递归到的节点深度，
// 把 traverse 理解成在二叉树上游走的一个指针，所以当然要这样维护。
// res 的更新，放在前中后序位置都可以，只要保证进入节点之后，离开节点之前（即depth自增之后，自减之前）就行。
// --------------------1.遍历二叉树计算答案的思路 end

// // --------------------2.分解问题计算答案的思路 start【72ms】
// /**
//  * @param {TreeNode} root
//  * @return {number}
//  */
// var maxDepth = function (root) {
//   if (root == null) {
//     return 0;
//   }
//   // 利用定义，计算左右子树的最大深度
//   let leftMax = maxDepth(root.left);
//   let rightMax = maxDepth(root.right);
//   // 整棵树的最大深度等于左右子树的最大深度取最大值
//   // 然后再加上根节点自己
//   let res = Math.max(leftMax, rightMax) + 1;

//   return res;
// };
// // 问题：明确递归函数定义，这个解法就好理解了。但为什么主要代码逻辑集中在后序位置？
// // 因为 通过子树最大高度推导出原树的高度，
// // 所以当然要首先利用递归函数的定义算出左右子树的最大深度，
// // 然后推出原树的最大深度，主要逻辑自然放在后序位置。
// // --------------------2.分解问题计算答案的思路 end
let tree = {
  val: 3,
  left: { val: 9 },
  right: { val: 20, left: { val: 15 }, right: { val: 7 } },
};
let result = maxDepth(tree);
console.log(result);
// @lc code=end
