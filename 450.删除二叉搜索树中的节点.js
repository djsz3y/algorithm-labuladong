/*
 * @lc app=leetcode.cn id=450 lang=javascript
 *
 * [450] 删除二叉搜索树中的节点
 */

// @lc code=start
/*
 * 1.读懂题目：
 * 【BST题解】：「删」
 * 已知 二叉搜索树 BST 根节点 root & 值 key
 * 删除 BST 中 key 对应的节点，
 * 并保证 BST 性质不变。
 * 返回 BST（可能被更新）的根节点的引用。
 * 一般，删除节点分两个步骤：
 * first.首先找到需要删除的节点；
 * second.如果找到，删除it。
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
 * 2.2【BST基操的「查」】：700.二叉搜索树中的搜索
 *
 * 2.3【BST基操的「判断 BST 的合法性」】：98.验证二叉搜索树
 *
 * 2.4【BST基操的「增」】：701.二叉搜索树中的插入操作
 *
 * 2.5【此题是BST基操的「删」】：450.删除二叉搜索树中的节点
 *
 * 2.5.1 删除稍微复杂，跟插入类似，先「找」再「改」，先写框架：
 * ```js
 * TreeNode deleteNode(TreeNode root,int key){
 *  if(root.val == key){
 *    //找到啦，进行删除
 *  } else if(root.val > key){
 *    //去左子树找
 *    root.left = deleteNode(root.left, key);
 *  } else if(root.val < key){
 *    //去右子树找
 *    root.right = deleteNode(root.right, key);
 *  }
 *  return root;
 * }
 * ```
 * 2.5.2 找到目标节点后，删除有三种情况，假如存在节点 A：
 * 由于删除节点同时不能破坏BST性质，所以如何删除是难点。
 * 情况1：A恰好是末端节点，两个子节点都为空，可以立即删除A；
 * ```js
 * if(root.left == null && root.right == null) return null;
 * ```
 * 情况2：A只有一个孩子，让孩子接替自己位置。
 * ```js
 * 排除了情况1后：
 * if(root.left == null) return root.right;
 * if(root.right == null) return root.left;
 * ```
 * 情况3：A有两个孩子left和right 比较麻烦：为不破坏 BST 性质，A必须找到 左子树中最大节点 或者 右子树最小节点 接替自己。
 * 以第二种方式-右子树最小节点为例讲解：
 * ```js
 * if(root.left != null && root.right != null) {
 *  //获取右子树最小节点
 *  let minNode = getMin(root.right);
 *  //root 改成 minNode
 *  root.val = minNode.val;
 *  //转而删除 minNode
 *  root.right = deleteNode(root.right, minNode.val);
 * }
 * ```
 * 情况 1&2&3 分析完毕，填入框架，简化代码：TreeNode deleteNode(TreeNode root, int key){}
 *
 * 2.5.3【注意】：
 * 真正实现删除操作时，
 * 情况3 通过 略复杂的链表操作 交换 root 和 minNode 两个节点：
 * 仅仅对于这道题，可以通过直接改val字段方式得到简洁易懂的题解，
 * 但这样操作并不完美，我们一般不会通过修改节点内部的值交换节：
 * 因为在实际中 BST 内部数据域时用户自定义的，可以非常复杂，
 * BST 作为数据结构（工具人），操作应该和内部存储的数据域解耦，
 * 所以，我们更倾向于 使用指针操作 交换节点，从而不用关心内部数据。
 *
 * 2.5.4【最后总结】：
 * 1. 当前节点对下面子节点有整体影响，通过辅助函数增长参数列表，借助参数传递信息。
 * 2. 扩展一套 BST 代码框架（二叉树递归框架上）：
 * ```js
 * void BST(TreeNode root, int target){
 *  if(root.val == target)
 *    // 找到目标，做点什么
 *  if(root.val < target)
 *    BST(root.right, target);
 *  if(root.val > target)
 *    BST(root.left, target);
 * }
 * ```
 * 3. 根据代码框架掌握BST增删改查操作。
 *
 * 3.代码实现： deleteNode
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
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function (root, key) {
  const getMin = function (node) {
    // BST 最左边就是最小的
    while (node.left != null) node = node.left
    return node
  }

  if (root == null) return null
  if (root.val == key) {
    //【找到啦，进行删除】

    //【情况 1】和【情况 2】：这两个 if 正好正确处理
    if (root.left == null) return root.right
    if (root.right == null) return root.left

    // 处理【情况3】
    let minNode = getMin(root.right) // get root.right 's minNode
    root.right = deleteNode(root.right, minNode.val) // delete root.right 's minNode.
    // Replace the root node with the smallest node in the right subtree
    minNode.left = root.left
    minNode.right = root.right
    root = minNode
  } else if (root.val > key) {
    //【去左子树找】
    root.left = deleteNode(root.left, key)
  } else if (root.val < key) {
    //【去右子树找】
    root.right = deleteNode(root.right, key)
  }
  return root
}
let root = {
    val: 5,
    left: { val: 3, left: { val: 2 }, right: { val: 4 } },
    right: { val: 6, right: { val: 7 } }
  },
  key = 3,
  root2 = {
    val: 5,
    left: { val: 3, left: { val: 2 }, right: { val: 4 } },
    right: { val: 6, right: { val: 7 } }
  },
  key2 = 0,
  root3 = {},
  key3 = 0
let res = deleteNode(root, key),
  res2 = deleteNode(root2, key2),
  res3 = deleteNode(root3, key3)
console.log(res)
console.log(res2)
console.log(res3)
// @lc code=end
