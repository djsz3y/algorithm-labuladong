/*
 * @lc app=leetcode.cn id=543 lang=javascript
 *
 * [543] 二叉树的直径
 */

// @lc code=start
/*
 * 1.读懂题目：
 * 【二叉树题解-二叉树的直径】
 * 二叉树的直径：
 * 任意两结点 路径长度中的 最大值，
 * 可能 穿过/不穿过 根结点。
 * 注意：
 * 两结点之间的路径长度是以它们之间边的数目表示。
 *
 * 2.写出思路：
 * - 二叉树题目的递归解法分两类思路：
 * 1.遍历二叉树计算答案的思路。
 * 2.分解问题计算答案的思路。
 * - 这两类思路分别对应：
 * 1.回溯算法核心框架。
 * 2.动态规划核心框架。
 * 
 * 注意：
 * 遇到子树问题，
 * 首先想到给函数设置返回值，然后在后序位置做文章。
 * 反过来，如果你写出了类似一开始的那种递归套递归的解法，
 * 大概率也需要反思是不是可以通过后序遍历优化。
 *
 * 3.代码实现： diameterOfBinaryTree
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
 * @return {number}
 */

var diameterOfBinaryTree = function (root) {
  let maxDiameter = 0;
  function maxDepth(root) {
    if (root == null) {
      return 0;
    }
    // 利用定义，计算左右子树的最大深度
    let leftMax = maxDepth(root.left);
    let rightMax = maxDepth(root.right);

    // 后序位置，顺便计算最大直径
    let myDiameter = leftMax + rightMax;
    maxDiameter = Math.max(maxDiameter, myDiameter);

    // 整棵树的最大深度等于左右子树的最大深度取最大值
    // 然后再加上根节点自己
    let res = Math.max(leftMax, rightMax) + 1;

    return res;
  }
  maxDepth(root);
  return maxDiameter;
};
let root = {
  val: 1,
  left: { val: 2, left: { val: 4 }, right: { val: 5 } },
  right: { val: 3 },
};
let res = diameterOfBinaryTree(root);
console.log(res); // 4-2-1-3 或 5-2-1-3
// @lc code=end
