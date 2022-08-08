/*
 * @lc app=leetcode.cn id=114 lang=javascript
 *
 * [114] 二叉树展开为链表
 */

// @lc code=start
/*
 * 1.读懂题目：
 * 【二叉树题解】：
 * - 已知二叉树根 root，将其展开为单链表
 * - 展开后，单链表同样使用TreeNode，
 * - right 子指针指向链表下一个结点，左子指针始终null
 * - 展开后单链表和二叉树先序遍历顺序相同。
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
 * 1).无法使用「遍历」思维模式解决：
 * 乍一看可以用「遍历」思维模式：前序遍历并构造「链表」：
 *
 * // 虚拟头节点，dummy.right 就是结果
 * TreeNode dummy = new TreeNode(-1);
 * // 用来构建链表的指针
 * TreeNode p = dummy;
 *
 * void traverse(TreeNode root) {
 *     if (root == null) {
 *         return;
 *     }
 *     // 前序位置
 *     p.right = new TreeNode(root.val);
 *     p = p.right;
 *
 *     traverse(root.left);
 *     traverse(root.right);
 * }
 * 但是 flatten 函数签名，返回类型 void，
 * 意思是：题目希望原地把二叉树拉平成链表。
 * 所以，无法通过 简单二叉树de遍历 解决这道题。
 *
 * 2).可用「分解问题」思维模式解决此问题：
 * - 尝试给出 flatten 函数的定义：
 * // 定义：输入节点 root，然后 root 为根的二叉树就会被拉平为一条链表
 * void flatten(TreeNode root);
 *
 * - 有函数定义后，如何 按题目 把树拉平成链表？
 * 对节点 x，执行以下流程：
 * 1.先用 flatten(x.left) 和 flatten(x.right)，将 x 左右子树 拉平。
 * 2.x 右子树 接 左子树 下方 -> 整个左子树 作为 右子树。
 *
 * - 这样，以 x 为根的整颗二叉树被拉平，恰好完成 flatten(x) 的定义。
 *
 * - 实现代码 flatten(root)
 * - 对上述补充解释：
 * 这就是递归的魅力，虽然不容易说清楚 flatten 函数 是如何把左右子树拉平的，
 * 但是只知道 flatten 定义并利用定义，
 * 让每个节点做它该做的事，
 * flatten 函数就会按照定义工作。
 * 至此，这道题也解决，
 * 前文 k个一组翻转链表的递归思路（25. K 个一组翻转链表）和本题也有一些类似。
 *
 * 【最后】：
 * 学会 默念 二叉树 de 解题总纲。
 *
 * - 首位呼应，再次默写二叉树解题总纲：
 * - 二叉树解题的思维模式分两类：
 * 1、是否可以通过遍历一遍二叉树得到答案？
 * 如果可以，用一个 traverse 函数配合外部变量来实现，
 * 这叫「遍历」的思维模式。
 * 2、是否可以定义一个递归函数，通过子问题（子树）的答案推导出原问题的答案？
 * 如果可以，写出这个递归函数的定义，并充分利用这个函数的返回值，
 * 这叫「分解问题」的思维模式。
 *
 * - 无论使用哪种思维模式，你都需要思考：
 * 1. 如果单独抽出一个二叉树节点，它需要做什么事情？
 * 2. 需要在什么时候（前/中/后序位置）做？
 * 其他节点 不用操心，递归函数 会在 所有节点上 执行相同操作。
 * 希望你能仔细体会，并运用到所有二叉树题目上。
 *
 * 3.代码实现： flatten
 * 本题用「遍历」思维模式无法解决，「分解问题」思维模式可以解决。
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
 * 定义：将以 root 为根的树拉平为链表
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function (root) {
  // base case
  if (root == null) return;

  // 利用定义，把左右子树拉平
  flatten(root.left);
  flatten(root.right);

  /**** 后序遍历位置 ****/
  // 1、左右子树已经被拉平成一条链表
  let left = root.left;
  let right = root.right;

  // 2、将左子树作为右子树
  root.left = null;
  root.right = left;

  // 3、将原先的右子树接到当前右子树的末端
  let p = root;
  while (p.right != null) {
    p = p.right;
  }
  p.right = right;
};
let root = {
    val: 1,
    left: { val: 2, left: { val: 3 }, right: { val: 4 } },
    right: { val: 5 },
  },
  root2 = {},
  root3 = { val: 0 };
flatten(root),
flatten(root2),
flatten(root3);
console.log(root);
console.log(root2);
console.log(root3);
// @lc code=end
