Day11.东哥手把手带你刷二叉树（思维篇）

# 前言

## 更新日志：

> 2024-4-15：完成了 零、前言 & 第一题、翻转二叉树 的总结。

## ⭐ 本文目的：

1. 通过几道简单题：226 & 116 & 114，**实践运用二叉树解题总纲**；
2. 理解「遍历」&「分解问题」2 种思维模式的 **区别和联系**。

## ⭐ 复述<span style="color:red;">二叉树解题总纲</span>

以下总结是昨天的打卡的`零、前言`部分，参考链接：[Day10.东哥手把手带你刷二叉树（纲领篇）](https://zhuanlan.zhihu.com/p/692422378)

> 1.总结二叉树 de 解题，两类思维模式  
>  1）「遍历」的思维模式：  
>  **是否可以通过遍历一遍二叉树得到答案？**
>
> - 如果可以，用一个 traverse 函数配合外部变量来实现。

> 2）「分解问题」的思维模式：  
>  **是否可以定义一个递归函数，通过子问题（子树）的答案推导出原问题的答案？**
>
> - 如果可以，写出这个递归函数的定义，并充分利用这个函数的返回值。

> 2.不管哪种思维，都要思考：  
> **如果单独抽出一个二叉树节点，它需要做什么事情？需要在什么时候（前/中/后序位置）做？**
>
> - 其他的节点不用你操心，递归函数会帮你在所有节点上执行相同的操作。

# 一、翻转二叉树（226. 翻转二叉树）<span style="color: red;">【进行了详细分析】</span>

> [226. 翻转二叉树](https://leetcode.cn/problems/invert-binary-tree/description/)  
> Easy

## 1.读懂题目：

【二叉树题解】：

- 已知二叉树的根节点 root，
  **镜像翻转二叉树**，
  并返回根节点。
- **原地翻转**。
- 发现：  
  二叉树上 **每个结点的左右子节点进行交换**，  
  最后结果就是**完全翻转之后的二叉树**。

## ⭐2.写出思路：

### ⭐ 1）心中<span style="color:red;">默念二叉树解题总纲</span>：

> 1、这题能不能用「遍历」的思维模式解决？
>
> 2、这题能不能用「分解问题」的思维模式解决？

### 2）可用「遍历」思维模式：

1. 写 **traverse 函数遍历每个节点**，让**每个节点的左右子节点颠倒**就可以。
2. 单独抽出一个节点，需要做什么？交换左右子节点。
3. 什么时候交换？前中后序位置都可以。

#### 解法代码：

##### 首先，

- 分析一下，交换左右子节点在前序还是后序还是中序位置进行：

##### 其中，

- 交换左右子树的代码，即可以写在前序位置，也可以写在后序位置，但是不能写在中序位置。

##### 因为，

- 我可以在遍历子节点前，先交换左右子树，即在递的阶段，就交换左右子树（先序）；
- 也可以在遍历子节点后，离开子节点时，即在归的阶段，交换左右子树（后序）；
- 但是如果在中序位置交换左右子节点，那么本来从左子节点出来了该进入右子节点了，结果交换了左右子树这两者，那么就会遍历相同的子节点，本该遍历的右子节点成为了左子节点，这种方式就会导致右子节点无法遍历到，最后影响结果（中序交换，右子节点无法遍历到，因为被交换了）。

##### 接下来，

- 写一下 JavaScript 版本的解法代码：

```js
// 主函数
var invertTree = function (root) {
  // 二叉树遍历函数
  const traverse = function (root) {
    if (root === null) return

    /**** 前序位置 ****/
    // 每一个节点需要做的事就是交换它的左右子节点
    let tmp = root.left
    root.left = root.right
    root.right = tmp

    // 遍历框架，去遍历左右子树的节点
    traverse(root.left)
    traverse(root.right)
  }

  // 遍历二叉树，交换每个节点的子节点
  traverse(root)
  return root
}
```

### 3）可用「分解问题」思维模式：

【1】尝试给 invertTree 函数**赋予一个定义**：

```java
// 定义：将以 root 为根的这棵二叉树翻转，返回翻转后的二叉树的根节点。
TreeNode invertTree(TreeNode root);
```

【2】**思考**：对于**某二叉树节点 `x` 执行 `invertTree(x)`，利用递归函数定义做什么？**

- 先翻转左子树（利用 `invertTree(x.left)`），
- 再翻转右子树（利用 `invertTree(x.right)`），
- 最后交换 `x` 的左右子树，
- 这恰好完成了以 `x` 为根的整棵二叉树的翻转，即完成了 `invertTree(x)` 的定义。

#### 解法代码

```js
var invertTree = function (root) {
  if (root === null) return null // 空？返空。

  // 利用函数定义，先翻转左右子树【根据函数定义，先翻转左子树，再翻转右子树】
  const left = invertTree(root.left)
  const right = invertTree(root.right)

  // 然后交换左右子节点【交换左右】
  root.left = right
  root.right = left

  // 和定义逻辑自洽：以 root 为根的这颗二叉树已经被翻转，返回 root【自恰，翻完，返 root】
  return root
}
```

#### ⭐「分解问题」思路的核心：

核心在于：

- 要**给递归函数合适的定义**，
- 用**函数的定义**来**解释**你的**代码**。

如果逻辑成功自恰，说明算法是正确的。

## 3.代码实现： invertTree

### 「遍历」

```js
var invertTree = function (root) {
  const traverse = function (root) {
    if (root === null) return

    let tmp = root.left
    root.left = root.right
    root.right = tmp

    traverse(root.left)
    traverse(root.right)
  }

  traverse(root)
  return root
}
```

### 「分解问题」

```js
var invertTree = function (root) {
  if (root == null) return null

  let left = invertTree(root.left)
  let right = invertTree(root.right)

  root.left = right
  root.right = left

  return root
}
```

## 4.测试用例：

```js
let root = {
    val: 4,
    left: { val: 2, left: { val: 1 }, right: { val: 3 } },
    right: { val: 7, left: { val: 6 }, right: { val: 9 } }
  },
  root2 = { val: 2, left: { val: 1 }, right: { val: 3 } },
  root3 = {}
console.time(1)
let res = invertTree(root),
  res2 = invertTree(root2),
  res3 = invertTree(root3)
console.timeEnd(1)
console.log(res, '-', res2, '-', res3)
```

# 二、填充节点的右侧指针（116. 填充每个节点的下一个右侧节点指针）【todo】

> [116. 填充每个节点的下一个右侧节点指针](https://leetcode.cn/problems/populating-next-right-pointers-in-each-node/description/)  
> Medium

## 1.读懂题目：

### 【二叉树题解】：

- 已知完美二叉树，所有叶子节点都在同一层，每个父节点都有两个子节点。
- 已知二叉树定义如下...
- 每个 next 指针指向存在的下一个右侧节点，若不存在，则将 next 指针设置为 null 。
- 初始状态 所有 next 指针都被设置 null。

### - 题目的意思是把二叉树的每一层节点都用 next 指针连接起来。

- 输入的是一颗完美二叉树，

* 形象地说整颗二叉树是一个正三角形，
* 除了最右侧的节点 next 指针会指向 null，
* 其他节点的右侧一定有相邻的节点。

## 2.写出思路：

### 【题解思路】：

#### 1).可用「遍历」思维模式解决：

- 写 traverse 函数遍历每个节点，让每个节点的 next 指针指向右侧节点。
  - 不过这样模仿上一道题，直接写出的代码，有很大问题，因为它只能把相同父节点的两个节点穿起来。
  - 不属于同一个父节点的两个节点，按照上述代码的逻辑，没有办法穿起来，这是不符合题意的。
  - 问题出在哪里？
  - 传统的 traverse 函数是遍历二叉树的所有节点，但现在我们想遍历的其实是两个相邻节点之间的空隙。
  - 所以，要在二叉树的基础上进行抽象，把图中的每个方框看做一个节点：
  - 一颗二叉树被抽象成了一颗三叉树，三叉树上的每个节点就是原先二叉树的两个相邻节点。
  - 现在，我们只要实现一个 traverse 函数来遍历这颗三叉树。
- 单独抽出一个节点，需要做什么？
  每个 三叉树节点 ：把自己内部的两个二叉树结点穿起来。
- 什么时候做？
  前序位置。

#### 2).无法使用「分解问题」思维模式解决此问题。

### 【最后】：

学会 默念 二叉树 de 解题总纲。

## 3.代码实现： connect

本题用「遍历」思维模式可以解决，「分解问题」思维模式无法解决。

```js
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
      return
    }
    // 前序位置
    // 将传入的两个节点穿起来
    node1.next = node2 //每个三叉树节点：把自己内部的两个二叉树节点穿起来。

    // 连接相同父节点的两个子节点
    traverse(node1.left, node1.right) //连接（父同）左右子节点。
    traverse(node2.left, node2.right)
    // 连接跨越父节点的两个子节点
    traverse(node1.right, node2.left) //连接（父不同）左右子节点。
  }

  if (root == null) return null //根空 返空。
  // 遍历三叉树，连接相邻节点
  traverse(root.left, root.right) //遍历三叉，连接相邻。
  return root
}
```

## 4.测试用例：

```js
let root = {
    val: 1,
    left: { val: 2, left: { val: 4 }, right: { val: 5 } },
    right: { val: 3, left: { val: 6 }, right: { val: 7 } }
  },
  root2 = {}
let res = connect(root),
  res2 = connect(root2)
console.log(res)
console.log(res2)
```

# 三、将二叉树展开为链表（114. 二叉树展开为链表）

> [114. 二叉树展开为链表](https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/description/)  
> Medium

## 1.读懂题目：

【二叉树题解】：

- 已知二叉树根 root，将其展开为单链表
- 展开后，单链表同样使用 TreeNode，
- right 子指针指向链表下一个结点，左子指针始终 null
- 展开后单链表和二叉树先序遍历顺序相同。

## 2.写出思路：

### 【题解思路】：

#### 1).无法使用「遍历」思维模式解决：

乍一看可以用「遍历」思维模式：前序遍历并构造「链表」：

```js
// 虚拟头节点，dummy.right 就是结果
TreeNode dummy = new TreeNode(-1);
// 用来构建链表的指针
TreeNode p = dummy;

void traverse(TreeNode root) {
    if (root == null) {
        return;
    }
    // 前序位置
    p.right = new TreeNode(root.val);
    p = p.right;

    traverse(root.left);
    traverse(root.right);
}
```

但是 flatten 函数签名，返回类型 void，
意思是：题目希望原地把二叉树拉平成链表。
所以，无法通过 简单二叉树 de 遍历 解决这道题。

#### 2).可用「分解问题」思维模式解决此问题：

##### - 尝试给出 flatten 函数的定义：

```js
// 定义：输入节点 root，然后 root 为根的二叉树就会被拉平为一条链表
void flatten(TreeNode root);
```

##### - 有函数定义后，如何 按题目 把树拉平成链表？

对节点 x，执行以下流程： 1.先用 flatten(x.left) 和 flatten(x.right)，将 x 左右子树 拉平。
2.x 右子树 接 左子树 下方 -> 整个左子树 作为 右子树。

这样，以 x 为根的整颗二叉树被拉平，恰好完成 flatten(x) 的定义。

实现代码 flatten(root)。

#### - 对上述补充解释：

这就是递归的魅力，虽然不容易说清楚 flatten 函数 是如何把左右子树拉平的，
但是只知道 flatten 定义并利用定义，
让每个节点做它该做的事，
flatten 函数就会按照定义工作。
至此，这道题也解决，
前文 k 个一组翻转链表的递归思路（25. K 个一组翻转链表）和本题也有一些类似。

### 【最后】：

学会 默念 二叉树 de 解题总纲。

- 首位呼应，再次默写二叉树解题总纲：

#### - 二叉树解题的思维模式分两类：

1、是否可以通过遍历一遍二叉树得到答案？
如果可以，用一个 traverse 函数配合外部变量来实现，
这叫「遍历」的思维模式。
2、是否可以定义一个递归函数，通过子问题（子树）的答案推导出原问题的答案？
如果可以，写出这个递归函数的定义，并充分利用这个函数的返回值，
这叫「分解问题」的思维模式。

#### - 无论使用哪种思维模式，你都需要思考：

1. 如果单独抽出一个二叉树节点，它需要做什么事情？
2. 需要在什么时候（前/中/后序位置）做？
   其他节点 不用操心，递归函数 会在 所有节点上 执行相同操作。
   希望你能仔细体会，并运用到所有二叉树题目上。

## 3.代码实现： flatten

本题用「遍历」思维模式无法解决，「分解问题」思维模式可以解决。

```js
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
  if (root == null) return

  // 利用定义，把左右子树拉平
  flatten(root.left)
  flatten(root.right)

  /**** 后序遍历位置 ****/
  // 1、左右子树已经被拉平成一条链表
  let left = root.left
  let right = root.right

  // 2、将左子树作为右子树
  root.left = null
  root.right = left

  // 3、将原先的右子树接到当前右子树的末端
  let p = root
  while (p.right != null) {
    p = p.right
  }
  p.right = right
}
```

## 4.测试用例：

```js
let root = {
    val: 1,
    left: { val: 2, left: { val: 3 }, right: { val: 4 } },
    right: { val: 5 }
  },
  root2 = {},
  root3 = { val: 0 }
flatten(root), flatten(root2), flatten(root3)
console.log(root)
console.log(root2)
console.log(root3)
```

# 总结

Day11.东哥手把手带你刷二叉树（思维篇）

## 更新日志：

> 2024-4-15：完成了 零、前言 & 第一题、翻转二叉树 的总结。

## 【收获 1】

【1】今天学习了 **实践运用二叉树解题总纲**，也就是**二叉树（思维篇）**，以后遇到：

- [226. 翻转二叉树](https://leetcode.cn/problems/invert-binary-tree/description/)
- [116. 填充每个节点的下一个右侧节点指针](https://leetcode.cn/problems/populating-next-right-pointers-in-each-node/description/)
- [114. 二叉树展开为链表](https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/description/)

类型的题目，我可以按照：

1. 能否通过遍历思维模式：遍历一遍二叉树得到答案？如果可以，使用 traverse 配合外部变量实现。
2. 能否通过分解问题思维模式：定义一个递归函数，通过子问题/子树答案推导出原问题答案？如果可以，写出递归函数的定义，并充分利用函数返回值。

的标准化步骤思考。

## 【收获 2】

今天输出了一篇打卡文章总结：

- [Day11.东哥手把手带你刷二叉树（思维篇）](https://github.com/djsz3y/algorithm-labuladong/blob/master/Day11.东哥手把手带你刷二叉树（思维篇）.md)

# 参考链接

- [LABULADONG 的算法网站](https://labuladong.online/algo/)
