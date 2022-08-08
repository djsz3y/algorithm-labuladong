/*
 * @lc app=leetcode.cn id=116 lang=javascript
 *
 * [116] 填充每个节点的下一个右侧节点指针
 */

// @lc code=start
/*
 * 1.读懂题目：
 *
 * 【二叉树题解】：
 * - 已知完美二叉树，所有叶子节点都在同一层，每个父节点都有两个子节点。
 * - 已知二叉树定义如下...
 * - 每个 next 指针指向存在的下一个右侧节点，若不存在，则将 next 指针设置为 null 。
 * - 初始状态 所有 next指针都被设置 null。
 *
 * - 题目的意思是把二叉树的每一层节点都用 next 指针连接起来。
 * - 输入的是一颗完美二叉树，
 * * 形象地说整颗二叉树是一个正三角形，
 * * 除了最右侧的节点 next指针会指向 null，
 * * 其他节点的右侧一定有相邻的节点。
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
 * 1).可用「遍历」思维模式解决：
 * - 写 traverse 函数遍历每个节点，让每个节点的 next 指针指向右侧节点。
 *   - 不过这样模仿上一道题，直接写出的代码，有很大问题，因为它只能把相同父节点的两个节点穿起来。
 *   - 不属于同一个父节点的两个节点，按照上述代码的逻辑，没有办法穿起来，这是不符合题意的。
 *   - 问题出在哪里？
 *   - 传统的 traverse函数是遍历二叉树的所有节点，但现在我们想遍历的其实是两个相邻节点之间的空隙。
 *   - 所以，要在二叉树的基础上进行抽象，把图中的每个方框看做一个节点：
 *   - 一颗二叉树被抽象成了一颗三叉树，三叉树上的每个节点就是原先二叉树的两个相邻节点。
 *   - 现在，我们只要实现一个 traverse 函数来遍历这颗三叉树。
 * - 单独抽出一个节点，需要做什么？
 * 每个 三叉树节点 ：把自己内部的两个二叉树结点穿起来。
 * - 什么时候做？
 * 前序位置。
 *
 * 2).无法使用「分解问题」思维模式解决此问题。
 *
 * 【最后】：
 * 学会 默念 二叉树 de 解题总纲。
 *
 * 3.代码实现： connect
 * 本题用「遍历」思维模式可以解决，「分解问题」思维模式无法解决。
 *
 * 4.测试用例：
 */
/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */
/**
 * @param {Node} root
 * @return {Node}
 */
// 【本题思路总结】：
// traverse函数遍历整颗三叉树，将所有相邻节的二叉树节点都连接起来，从而避免之前出现的问题。
var connect = function (root) {
  // 三叉树遍历框架
  function traverse(node1, node2) {
    //实现 traverse 函数遍历三叉树。
    if (node1 == null || node2 == null) {
      return;
    }
    // 前序位置
    // 将传入的两个节点穿起来
    node1.next = node2; //每个三叉树节点：把自己内部的两个二叉树节点穿起来。

    // 连接相同父节点的两个子节点
    traverse(node1.left, node1.right); //连接（父同）左右子节点。
    traverse(node2.left, node2.right);
    // 连接跨越父节点的两个子节点
    traverse(node1.right, node2.left); //连接（父不同）左右子节点。
  }

  if (root == null) return null; //根空 返空。
  // 遍历三叉树，连接相邻节点
  traverse(root.left, root.right); //遍历三叉，连接相邻。
  return root;
};
let root = {
    val: 1,
    left: { val: 2, left: { val: 4 }, right: { val: 5 } },
    right: { val: 3, left: { val: 6 }, right: { val: 7 } },
  },
  root2 = {};
let res = connect(root),
  res2 = connect(root2);
console.log(res);
console.log(res2);
// @lc code=end
