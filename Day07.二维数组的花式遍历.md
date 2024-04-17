Day07.二维数组的花式遍历

> **巧妙**的二维数组的花式操作

# 1.顺/逆时针旋转矩阵

## 48.旋转图像

> [48. 旋转图像](https://leetcode.cn/problems/rotate-image/description/)  
> 先对角线 镜像翻转
> 再每一行 反转

### 1.读懂题目：

- n 的二次方的二维矩阵 matrix 表示图像。
- 顺时针旋转 90°。
- 原地旋转，直接修改输入的二维矩阵，不要使用另一个矩阵旋转图像。

### 2.写出思路：

> 顺时针、逆时针 旋转 90°，思路一样。

#### 1）二维矩阵原地**「顺时针」**旋转 90°：

1. 先对称翻转(左上到右下对角线 镜像对称)，
2. 再横向翻转（矩阵每一行反转）。

#### 2）同理，二维矩阵原地**「逆时针」**旋转 90°：

1. 先沿 左下右上 对角线 镜像对称 二维矩阵
2. 反转二维矩阵的每一行

#### 3）⭐ 两者思路总结：<span style="color:red;">【重要】</span>

【1】左上右下对角线，旋转

- 根据旋转的规则，定义好 i j 的值，
- 进行两个 for 循环，交换 i j 和 j i 即可。

【2】反转每一行

### 3.代码实现： rotate

#### 1）反转一维数组

```js
// 反转一维数组
const reverse = function (arr) {
  let i = 0,
    j = arr.length - 1
  while (i < j) {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
    i++
    j--
  }
}
```

#### 2）二维矩阵原地「顺时针」旋转 90°。

```js
/**
 * 二维矩阵原地「顺时针」旋转90°。
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
  let len = matrix.length
  // 先沿 左上右下 对角线 镜像对称 二维矩阵
  for (let i = 0; i < len; i++) {
    for (let j = i; j < len; j++) {
      // swap(matrix[i][j], matrix[j][i]);
      let temp = matrix[i][j]
      matrix[i][j] = matrix[j][i]
      matrix[j][i] = temp
    }
  }
  // 反转二维矩阵的每一行
  for (let key in matrix) {
    let row = matrix[key]
    reverse(row)
  }
}
```

#### 3）二维矩阵原地「逆时针」旋转 90°。

```js
/**
 * 二维矩阵原地「逆时针」旋转90°。
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate_niShiZhen = function (matrix) {
  let len = matrix.length
  // 先沿 左下右上 对角线 镜像对称 二维矩阵
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i; j++) {
      // swap(matrix[i][j], matrix[n-j-1][n-i-1])
      let temp = matrix[i][j]
      matrix[i][j] = matrix[len - j - 1][len - i - 1]
      matrix[len - j - 1][len - i - 1] = temp
    }
  }
  // 反转二维矩阵的每一行
  for (let key in matrix) {
    let row = matrix[key]
    reverse(row) //顺时针、逆时针 同一个 reverse
  }
}
```

### 3.代码实现（回忆时手写的）

```js
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
  const reverse = function (arr) {
    if (arr.length === 0) return
    for (let i = 0, j = arr.length - 1; i < j; i++, j--) {
      const tmp = arr[i]
      arr[i] = arr[j]
      arr[j] = tmp
    }
    return arr
  }

  if (matrix.length === 0) return
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < i; j++) {
      const tmp = matrix[i][j]
      matrix[i][j] = matrix[j][i]
      matrix[j][i] = tmp
    }
  } // 对角线交换

  for (let i = 0; i < matrix.length; i++) {
    reverse(matrix[i])
  }
  return matrix
}
```

### 4.测试用例：

```js
let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ],
  matrix2 = [
    [5, 1, 9, 11],
    [2, 4, 8, 10],
    [13, 3, 6, 7],
    [15, 14, 12, 16]
  ]
rotate_niShiZhen(matrix)
rotate(matrix2)
console.log(matrix, matrix2)
```

## 151.反转字符串中的单词

> 将：s = "hello world labuladong"  
> **原地反转所有单词顺序的目的**
> 为：s = "labuladong world hello"  
> [151. 反转字符串中的单词](https://leetcode.cn/problems/reverse-words-in-a-string/description/)
> 正确的做法是，先将整个字符串 s 反转：s = "gnodalubal dlrow olleh"
> 然后将每个单词分别反转：s = "labuladong world hello"  
> 比如说输入单链表 1 -> 2 -> 3 -> 4 -> 5，k = 2，你的算法需要返回 4 -> 5 -> 1 -> 2 -> 3，即将链表每个节点向右移动 2 个位置。

## 61.旋转链表

> 小技巧还可以再包装包装，  
> [61. 旋转链表](https://leetcode.cn/problems/rotate-list/description/)  
> 给你一个单链表，让你旋转链表，将链表每个节点向右移动 k 个位置。

## 54.螺旋矩阵

> [54. 螺旋矩阵](https://leetcode.cn/problems/spiral-matrix/description/)

### 1.读懂题目：

矩阵 matrix 是 m 行 n 列
顺时针螺旋舒徐
返回矩阵中所有元素。

### 2.写出思路：

二维数组的花式遍历技巧
矩阵的「 螺旋矩阵」
核心思路：
按照(右、下、左、上)的顺序遍历数组，
并使用四个变量 圈定 未遍历元素的边界。
随着螺旋便利，相应的边界会收缩，直到螺旋遍历完整个数组。
有了这个思路，翻译代码很容易：

### 3.代码实现： spiralOrder

```js
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  let m = matrix.length,
    n = matrix[0].length
  let upper_bound = 0,
    lower_bound = m - 1
  let left_bound = 0,
    right_bound = n - 1
  let res = new Array()
  // res.length == m * n 则遍历完整个数组
  while (res.length < m * n) {
    if (upper_bound <= lower_bound) {
      // 在顶部从左向右遍历
      for (let j = left_bound; j <= right_bound; j++) {
        res.push(matrix[upper_bound][j])
      }
      // 上边界下移
      upper_bound++
    }
    if (left_bound <= right_bound) {
      // 在右侧从上向下遍历
      for (let i = upper_bound; i <= lower_bound; i++) {
        res.push(matrix[i][right_bound])
      }
      // 右边界左移
      right_bound--
    }
    if (upper_bound <= lower_bound) {
      // 在底部从右向左遍历
      for (let j = right_bound; j >= left_bound; j--) {
        res.push(matrix[lower_bound][j])
      }
      // 下边界上移
      lower_bound--
    }
    if (left_bound <= right_bound) {
      // 在左侧从下向上遍历
      for (let i = lower_bound; i >= upper_bound; i--) {
        res.push(matrix[i][left_bound])
      }
      left_bound++
    }
  }
  return res
}
```

### 4.测试用例：

```js
let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ],
  matrix2 = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12]
  ]
let res = spiralOrder(matrix),
  res2 = spiralOrder(matrix2)
console.log(res) // [1,2,3,6,9,8,7,4,5]
console.log(res2) // [1,2,3,4,8,12,11,10,9,5,6,7]
```

# 2.矩阵的螺旋遍历

## 59.螺旋矩阵 II

> [59. 螺旋矩阵 II](https://leetcode.cn/problems/spiral-matrix-ii/description/)

### 1.读懂题目：

给定正整数 n
生成 正方形矩阵 matrix
包含元素为 1 到 n 的二次方
元素排列 按**顺时针**顺序 **螺旋排列**。

### 2.写出思路：

二维数组的花式遍历技巧

#### 力扣第 54 题思路：

矩阵的「 螺旋矩阵」

核心思路：

- 按照(右、下、左、上)的顺序遍历数组，
- 并使用四个变量 圈定 未遍历元素的边界。
- 随着螺旋便利，相应的边界会收缩，直到螺旋遍历完整个数组。

有了这个思路，翻译代码很容易：

#### 力扣第 59 题

矩阵的「 螺旋矩阵 II」也是类似的题目
只不过是反过来，让你按照螺旋的顺序生成矩阵：

### 3.代码实现： generateMatrix

```js
/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function (n) {
  // 定义 二维数组 matrix
  let matrix = Array.from({ length: n }, () => new Array(n).fill(0))
  // console.log(matrix) //[ [ 0, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ] ]

  // 定义 二维矩阵的 上下左右 边界值
  let upper_bound = 0,
    lower_bound = n - 1
  let left_bound = 0,
    right_bound = n - 1

  // 需要填入矩阵的数字
  let num = 1

  while (num <= n * n) {
    if (upper_bound <= lower_bound) {
      // 顶部从左向右遍历
      for (let j = left_bound; j <= right_bound; j++) {
        matrix[upper_bound][j] = num++
      }
      // 上边界下移（因为遍历是 from 左上 to 右上 -> 完成了）
      upper_bound++
    }
    if (left_bound <= right_bound) {
      // 右侧从上到下遍历
      for (let i = upper_bound; i <= lower_bound; i++) {
        matrix[i][right_bound] = num++
      }
      // 右边界左移（因为遍历是 from 右上 to 右下 -> 完成了）
      right_bound--
    }
    if (upper_bound <= lower_bound) {
      // 底部从右向左遍历
      for (let j = right_bound; j >= left_bound; j--) {
        matrix[lower_bound][j] = num++
      }
      // 下边界上移（因为遍历是 from 右下 to 左下 -> 完成了）
      lower_bound--
    }
    if (left_bound <= right_bound) {
      // 左侧从下向上遍历
      for (let i = lower_bound; i >= upper_bound; i--) {
        matrix[i][left_bound] = num++
      }
      // 左边界右移（因为遍历是 from 左下 to 左上 -> 完成了）
      left_bound++
    }
  } // 如果 num <= n的二次方，就一直进行上面操作

  // 返回结果：「 螺旋矩阵 II」遍历完成后的。
  return matrix
}
```

### 4.测试用例：

```js
const res = generateMatrix(3),
  res2 = generateMatrix(1)
console.log(res)
console.log(res2)
```

# 总结

Day07.二维数组的花式遍历

## 【收获 1】

今天学习了 **二维数组的花式遍历** 技巧，以后遇到 [48. 旋转图像](https://leetcode.cn/problems/rotate-image/description/) 类型的题目，我可以按照 **先对角线 镜像翻转 -> 再每一行 反转** 的标准化步骤思考。
其中第一步的作用是**左上右下对角线，旋转**，第二步的作用是**反转每一行**。

也就是以下思路：

两者思路（顺时针、逆时针 90° 旋转）总结：<span style="color:red;">【重要】</span>

【1】左上右下对角线，旋转

- 根据旋转的规则，定义好 i j 的值，
- 进行两个 for 循环，交换 i j 和 j i 即可。

【2】反转每一行

## 【收获 2】

今天输出了篇打卡文章总结：

- [Day07.二维数组的花式遍历](https://github.com/djsz3y/algorithm-labuladong/blob/master/Day07.二维数组的花式遍历.md)

# 参考链接

- [LABULADONG 的算法网站](https://labuladong.online/algo/)
