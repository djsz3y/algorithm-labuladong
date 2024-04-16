Day12.手把手带你刷二叉搜索树（第二期）

# 零、前言

## 更新日志：

> 2024-4-16：完成了 零、前言 & 一、判断 BST 的合法性（98） & 二、在 BST 中搜索元素（700） & 三、在 BST 中插入一个数（701） & 四、在 BST 中删除一个数（450） 的总结。

## 1.有效二叉搜索树定义（**有效 BST 定义**）：

- 节点的左子树只包含 小于 当前节点的数。
- 节点的右子树只包含 大于 当前节点的数。
- 所有左子树和右子树自身必须也是二叉搜索树。

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
```

## 2.BST 的基础操作：

- 「判断合法性」（98.验证二叉搜索树）、
- 「增」（701.二叉搜索树中的插入操作）、
- 「删」（450.删除二叉搜索树中的节点）、
- 「查」（700.二叉搜索树中的搜索）：

## ⭐3.BST 基操「判断合法性」

BST 的基础操作依赖「左小右大」特性，使用二分搜索思想效率很高：

1. 二叉树操作**类似二分搜索**的操作，**寻找**一个元素的**效率很高**。
2. **BST 代码框架** 类似 **二叉树的遍历框架**，利用 BST「左小右大」的特性。

### 【1】注意坑：

- 根据 BST 左小右大的特性，判断自己是否是合法的 BST 节点，只需比较自己和左右孩子吗？

感觉应该这样写：

```js
var isValidBST = function (root) {
  if (root === null) return true
  // root 的左边应该更小
  if (root.left !== null && root.left.val >= root.val) return false
  // root 的右边应该更大
  if (root.right !== null && root.right.val <= root.val) return false

  return isValidBST(root.left) && isValidBST(root.right)
}
```

### 【2】算法出现了错误：

1. 节点 10 右子树中有一个节点 6 ，位置显然不对，但算法会判定为合法 BST；
2. BST 的**每个节点**应该要**小于右边**子树的**所有**节点。

```js
   10
  /  \
 5    15
     /  \
    6    20
```

### 【3】⭐ 问题原因：

- 每个 root，**只检查了**左右孩子节点，是否符合左小右大的原则；
- 但根据 BST 定义，root 的**整个左子树都要小于** root.val，**整个右子树都要大于** root.val。

### 【4】⭐ 上述问题的问题：

- 某一节点 root，只能管自己的左右子节点，
- **怎么把 root 的约束传递给左右子树呢？**

### 【5】正确的代码：

```js
var isValidBST = function (root) {
  const _isValidBST = function (root, min, max) {
    if (root === null) return true // base case

    // 若 root.val 不符合 max 和 min 的限制，说明不是合法 BST
    if (min !== null && root.val <= min.val) return false
    if (max !== null && root.val >= max.val) return false

    // 限定左子树的最大值是 root.val，右子树的最小值是 root.val
    return (
      _isValidBST(root.left, min, root) && _isValidBST(root.right, root, max)
    )
  }
  return _isValidBST(root, null, null)
}
```

### 【6】⭐ 二叉树小技巧：使用辅助函数，增加函数参数列表

- 通过**使用辅助函数**，**增加函数参数列表**，在**参数中携带额外信息**，将这种**约束传递给子树的所有节点**，这也是二叉树算法的一个小技巧吧。

## ⭐4.BST 基操「查」

> 增删改查，增删改前都需要先查。

### 1）普通二叉树的「查」：

- **穷举所有**节点，适用于所有二叉树。

这不就是 Day.11 打卡思维篇的「分解问题」思维模式嘛~

> 参考链接：
>
> - [Day11.东哥手把手带你刷二叉树（思维篇）——一、翻转二叉树（226. 翻转二叉树）【进行了详细分析】——3）可用「分解问题」思维模式：](https://github.com/djsz3y/algorithm-labuladong/blob/master/Day11.东哥手把手带你刷二叉树（思维篇）.md#3可用分解问题思维模式)

```js
function searchBST(root, target) {
  if (root == null) return null // 【1】根空？返空。

  if (root.val == target) return root // 【2】根值==目标？返根。

  // 【3】当前节点没找到，递归左右子树寻找
  const left = searchBST(root.left, target) // 【3.1】左子树
  const right = searchBST(root.right, target) // 【3.2】右子树

  return left != null ? left : right // 左不是空即左，右不是空即右。
}
```

### 2）BST「查」——BST 遍历框架

- 充分利用 BST 特殊性「左小右大」特性，二分查找思想：

- **不需**要**递归**搜索**两边**，类似**二分查找思想**，根据 target 和 root.val 大小比较，排除一边。

把上述思维稍稍改动：

```js
function searchBST(root, target) {
  if (root == null) return null // 【1】根空？返空。

  // 以下，对比于普通二叉树的「查」：
  // 【3】当前节点没找到，递归左右子树寻找
  if (root.val > target) {
    return searchBST(root.left, target) // 【3.1】左子树
  }
  if (root.val < target) {
    return searchBST(root.right, target) // 【3.2】右子树
  }

  return root // 【2】根值==目标？返根。
}
```

## ⭐5.BST 基操「增」

1. 对数据结构的操作：遍历「找」 + 访问「改」；
2. 具体到这个问题：插入一个数，找插入位置（遍历「找」），进行插入操作（访问「改」）。
3. 直接套框架，加「改」的操作。
4. 一旦涉及「改」（就类似二叉树的构造问题），  
   函数要返回 TreeNode 类型，  
   并且要对递归调用的返回值进行接收。
5. 对比上面 BST「查」

## ⭐6.BST 基操「删」

### 【1】先写框架

（稍复杂，类似插入，先「找」再「改」）：

```js
function deleteNode(root, key) {
  if (root.val == key) {
    //找到啦，进行删除
  } else if (root.val > key) {
    root.left = deleteNode(root.left, key) // 左子树找
  } else if (root.val < key) {
    root.right = deleteNode(root.right, key) // 右子树找
  }
  return root
}
```

### 【2】难点-如何删除：

- 删除节点同时，不能破坏 BST 性质

### 【3】找到目标节点，删除有三种情况（假如存在节点 A）：

#### 3.1.【情况 1】

A 恰好是**末端节点**，两个子节点都为空，可以**立即删除 A**：

```js
if (root.left == null && root.right == null) return null
```

#### 3.2.【情况 2】

A 只有**一个孩子**，让孩子**接替自己**位置：

排除了情况 1 后：

```js
//【找到啦，进行删除】

//【情况 1】和【情况 2】：这两个 if 正好正确处理
if (root.left == null) return root.right
if (root.right == null) return root.left
```

#### 3.3.【情况 3】

A 有**两个孩子**（比较麻烦），找 maxLeftNode / minRightNode 接替自己

- 为**不破坏 BST 性质**，A 必须找到**左子树中最大节点**或者**右子树最小节点**。

> 以**右子树最小节点** minRightNode 为例：

```js
if (root.left != null && root.right != null) {
  // 获取右子树最小节点
  const minNode = getMin(root.right)
  // root 改成 minNode
  root.val = minNode.val
  // 转而删除 minNode
  root.right = deleteNode(root.right, minNode.val)
}
```

#### 3.4.【分析完毕】

填入框架，简化代码：
（详情，见四）

```js
function getMin(node) {...}
function deleteNode(root, key) {...}
```

#### 3.5.【注意】

[1]真正实现删除操作时，**交换 root 和 minNode 两个节点**，使用了略复杂的**链表操作**：

- 仅仅对于这道题，可以通过**直接改 val 字段**方式得到简洁易懂的题解，

[2]但这样操作**并不完美**，我们一般不会通过修改节点内部的值交换节：

- 因为在**实际**中 **BST 内部数据域**是**用户自定义**的，可以**非常复杂**，
- BST 作为数据结构（工具人），**操作**应该**和内部存储的数据域解耦**，

[3]所以，我们更倾向于 **使用指针操作 交换节点**，从而**不用关心内部数据**。

```js
// 处理【情况3】
let minNode = getMin(root.right) // get root.right 's minNode
root.right = deleteNode(root.right, minNode.val) // delete root.right 's minNode.
// Replace the root node with the smallest node in the right subtree
minNode.left = root.left
minNode.right = root.right
root = minNode
```

## ⭐⭐7.打卡文章最后总结：

1. 当前节点对下面子节点有整体影响，**通过辅助函数增长参数列表，借助参数传递信息。**
2. 在二叉树递归框架之上，**扩展出一套 BST 代码框架**：
3. 根据代码框架**掌握 BST 增删改查操作**。

```js
function BST(root, target) {
  if (root.val == target) {
    // 找到目标，做点什么
  }
  if (root.val < target) {
    BST(root.right, target)
  }
  if (root.val > target) {
    BST(root.left, target)
  }
}
```

## ⭐⭐8.总结 BST 基操的所有重要特征：

| BST 的基础操作 | 「判断合法性」                                              | 「查」                                                                                                                   | 「增」                                                                                                                              | 「删」                                                                                                                                  |
| :------------- | :---------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| 例题           | 98. 验证二叉搜索树                                          | 700. 二叉搜索树中的搜索                                                                                                  | 701. 二叉搜索树中的插入操作                                                                                                         | 450. 删除二叉搜索树中的节点                                                                                                             |
| 1.读懂题目     | 已知：二叉树的根 root，<br>**判断：是否是有效二叉搜索树**。 | 已知：二叉搜索树 BST 根 root & 整数 val<br>**返回： BST 的子树 val = root.val 的根 root，**<br>if root 不存在，返 null。 | 已知：二叉搜索树 BST 根 root & 整数 value<br>**返回： 插入 value 的 BST 的根 root，**<br>保证了 value 和原始 BST 任意节点值都不同。 | 已知：二叉搜索树 BST 根 root & 值 key<br>**删除 BST 中 key 对应节点 & 保证 BST 性质不变。**<br>返回： BST（可能被更新）的根节点的引用。 |
| 注意           | 见 1.有效二叉搜索树定义（**有效 BST 定义**）：              | --                                                                                                                       | 返回 插入后仍为 BST 的，多种有效插入方式的，**任意有效结果之一** 即可。                                                             | 一般，删除节点分两个步骤：<br>1.**首先找**到需要删除的节点；<br>2.如果**找到，删除** it。                                               |
| 2.写出思路     | ⭐3.BST 基操「判断合法性」                                  | 见 ⭐4.BST 基操「查」                                                                                                    | 见 ⭐5.BST 基操「增」                                                                                                               | 见 ⭐6.BST 基操「删」                                                                                                                   |
| 3.代码实现：   | 见一（98）isValidBST                                        | 见二（700）searchBST                                                                                                     | 见三（701）insertIntoBST                                                                                                            | 见四（450）deleteNode                                                                                                                   |
| 4.测试用例     | 同上                                                        | 同上                                                                                                                     | 同上                                                                                                                                | 同上                                                                                                                                    |

# 一、判断 BST 的合法性（98）

- [98. 验证二叉搜索树](https://leetcode.cn/problems/validate-binary-search-tree/description/)

## 3.代码实现： isValidBST

```js
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
  function isValidBST(root, min, max) {
    // base case
    if (root == null) return true
    if (min != null && root.val <= min.val) return false
    if (max != null && root.val >= max.val) return false
    return isValidBST(root.left, min, root) && isValidBST(root.right, root, max)
  }
  return isValidBST(root, null, null)
}
```

## 4.测试用例

```js
const root = { val: 2, left: { val: 1 }, right: { val: 3 } },
  root2 = {
    val: 5,
    left: { val: 1 },
    right: { val: 4, left: { val: 3 }, right: { val: 6 } }
  }
const res = isValidBST(root),
  res2 = isValidBST(root2)
console.log(res, '-', res2)
```

# 二、在 BST 中搜索元素（700）

- [700. 二叉搜索树中的搜索](https://leetcode.cn/problems/search-in-a-binary-search-tree/description/)

## 3.代码实现： searchBST

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
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var searchBST = function (root, val) {
  if (root == null) return null
  if (root.val > val) {
    return searchBST(root.left, val)
  }
  if (root.val < val) {
    return searchBST(root.right, val)
  }
  return root
}
```

## 4.测试用例

```js
let root = {
    val: 4,
    left: { val: 2, left: { val: 1 }, right: { val: 3 } },
    right: { val: 7 }
  },
  val = 2,
  root2 = {
    val: 4,
    left: { val: 2, left: { val: 1 }, right: { val: 3 } },
    right: { val: 7 }
  },
  val2 = 5
let res = searchBST(root, val),
  res2 = searchBST(root2, val2)
console.log(res, '-', res2)
```

# 三、在 BST 中插入一个数（701）

- [701. 二叉搜索树中的插入操作](https://leetcode.cn/problems/insert-into-a-binary-search-tree/description/)

## 3.代码实现： insertIntoBST

```js
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var insertIntoBST = function (root, val) {
  /**
   *【注意】：
   * 3）一旦涉及「改」（就类似二叉树的构造问题），
   * 函数要返回 TreeNode 类型，
   * 并且要对递归调用的返回值进行接收。
   */

  // 找到空位置插入新节点
  if (root == null) return new TreeNode(val)
  // if (root.val == val)
  //     BST 中一般不会插入已存在元素
  if (root.val < val) root.right = insertIntoBST(root.right, val)
  if (root.val > val) root.left = insertIntoBST(root.left, val)
  return root
}
```

## 4.测试用例：

```js
let root = {
    val: 4,
    left: { val: 2, left: { val: 1 }, right: { val: 3 } },
    right: { val: 7 }
  },
  val = 5
let root2 = {
    val: 40,
    left: { val: 20, left: { val: 10 }, right: { val: 30 } },
    right: { val: 60, left: { val: 50 }, right: { val: 70 } }
  },
  val2 = 25
let root3 = {
    val: 4,
    left: { val: 2, left: { val: 1 }, right: { val: 3 } },
    right: { val: 7 }
  },
  val3 = 5
let res = insertIntoBST(root, val)
console.log(root, res)
let res2 = insertIntoBST(root2, val2)
console.log(root2, res2)
let res3 = insertIntoBST(root3, val3)
console.log(root3, res3)
```

# 四、在 BST 中删除一个数（450）

- [450. 删除二叉搜索树中的节点](https://leetcode.cn/problems/delete-node-in-a-bst/description/)

## 3.代码实现： deleteNode

```js
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
```

## 4.测试用例：

```js
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
```

# 总结

Day12.手把手带你刷二叉搜索树（第二期）

## 更新日志：

> 2024-4-16：完成了 零、前言 & 一、判断 BST 的合法性（98） & 二、在 BST 中搜索元素（700） & 三、在 BST 中插入一个数（701） & 四、在 BST 中删除一个数（450） 的总结。

## 【收获 1】

【1】今天学习了 **BST 基础操作「判断合法性」「增」「删」「查」** 技巧，以后遇到：

- [98. 验证二叉搜索树](https://leetcode.cn/problems/validate-binary-search-tree/description/)
- [700. 二叉搜索树中的搜索](https://leetcode.cn/problems/search-in-a-binary-search-tree/description/)
- [701. 二叉搜索树中的插入操作](https://leetcode.cn/problems/insert-into-a-binary-search-tree/description/)
- [450. 删除二叉搜索树中的节点](https://leetcode.cn/problems/delete-node-in-a-bst/description/)

【2】类型的题目，我可以按照 **打卡文章总结中的表格**：

- ⭐⭐7.打卡文章最后总结
- ⭐⭐8.总结 BST 基操的所有重要特征

的标准化步骤思考。

【3】其中，

- 判断合法性，要使用辅助函数，
- 增、删操作，都需要先查再改（增、删）。

## 【收获 2】

今天输出了一篇打卡文章总结：

- [Day12.手把手带你刷二叉搜索树（第二期）](https://github.com/djsz3y/algorithm-labuladong/blob/master/Day12.手把手带你刷二叉搜索树（第二期）.md)

# 参考链接

- [LABULADONG 的算法网站](https://labuladong.online/algo/)
- 二叉树的递归遍历之分解问题的思维模式：[Day11.东哥手把手带你刷二叉树（思维篇）](https://github.com/djsz3y/algorithm-labuladong/blob/master/Day11.东哥手把手带你刷二叉树（思维篇）.md#3可用分解问题思维模式)
- 我的 LeetCode 题解：[98.验证二叉搜索树【JavaScript】](https://leetcode.cn/problems/validate-binary-search-tree/solutions/1650913/by-djsz3y-6zds/)
- 我的 LeetCode 题解：[700.二叉搜索树中的搜索【JavaScript】](https://leetcode.cn/problems/search-in-a-binary-search-tree/solutions/1606085/700-by-djsz3y-fkg5/)
- 我的 LeetCode 题解：[701.二叉搜索树中的插入操作【JavaScript】](https://leetcode.cn/problems/insert-into-a-binary-search-tree/solutions/1699591/701er-cha-sou-suo-shu-zhong-de-cha-ru-ca-uxho/)
- 我的 LeetCode 题解：[450.删除二叉搜索树中的节点【JavaScript】](https://leetcode.cn/problems/delete-node-in-a-bst/solutions/1700192/450shan-chu-er-cha-sou-suo-shu-zhong-de-x24m2/)
