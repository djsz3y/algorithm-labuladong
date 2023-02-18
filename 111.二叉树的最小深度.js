/*
 * @lc app=leetcode.cn id=111 lang=javascript
 *
 * [111] 二叉树的最小深度
 */

// @lc code=start
/*
 * # 1.读懂题目：
 *
 *
 * # 2.写出思路：
 *
 *
 * # 3.代码实现： minDepth
 *
 * # 4.测试用例：
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
var minDepth = function (root) {
  if (root == null) return 0;
  let q = [];
  q.push(root);
  // root 本身就是一层，depth 初始化为 1
  let depth = 1;

  while (Array.isArray(q) && q.length != 0) {
    let sz = q.length;
    /* 将当前队列中的所有节点向四周扩散 */
    for (let i = 0; i < sz; i++) {
      let cur = q.shift();
      /* 判断是否到达终点 */
      if (cur.left == null && cur.right == null) return depth;
      /* 将 cur 的相邻节点加入队列 */
      if (cur.left != null) q.push(cur.left);
      if (cur.right != null) q.push(cur.right);
    }
    /* 这里增加步数 */
    depth++;
  }
  return depth;
};
const root = [3, 9, 20, null, null, 15, 7],
  result = minDepth(root);
console.log(result);
const root2 = [2, null, 3, null, 4, null, 5, null, 6],
  result2 = minDepth(root2);
console.log(result2);
// @lc code=end
