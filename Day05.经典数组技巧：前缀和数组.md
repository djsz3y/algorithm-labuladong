Day05.经典数组技巧：前缀和数组

# 前言：前缀和技巧

适用于快速、频繁地计算一个索引区间内的元素之和。

# 一、一维数组中的前缀和【done】

> 303.区域和检索 - 数组不可变  
> 计算数组区间内元素的和

## 1.读懂题目：

整数数组 nums ：

- 计算索引 left 和 right 之间的 nums 元素的和，其中 left <= right。

实现 NumArray 类：

- NumArray(nums) 使用数组 nums 初始化对象
- sumRange(i,j) 返回数组 nums 中索引 left 和 right 之间的元素的总和，  
  包含 left 和 right 两点（也就是 nums[left] + nums[left +1] + ... + nums[right]）

【1】题目要求实现类：
java

```java
class NumArray {
  public NumArray(int[] nums) {}
  public int sumRange(int left, int right) {}
}
```

js

```js
class NumArray {
  NumArray(nums) {}
  sumRange(left, right) {}
}
```

【2】sumRange 函数需要计算并返回一个索引区间之内的元素和，没学过前缀和的人可能写出如下代码：

java

```java
class NumArray {
  private int[] nums;
  public NumArray(int[] nums) {
    this.nums = nums;
  }
  public int sumRange(int left, int right) {
    int res = 0;
    for(int i=left; i<=right; i++) {
      res += nums[i]
    }
    return res;
  }
}
```

js

```js
class NumArray {
  nums
  NumArray(nums) {
    this.nums = nums
  }
  sumRange(left, right) {
    let res = 0
    for (let i = left; i <= right; i++) {
      res += nums[i]
    }
    return res
  }
}
```

【3】**达到效果，但效率很差**：

- 因为 sumRange 方法会被频繁调用，而它的时间复杂度是 O(N)，其中 N 代表 nums 数组的长度。

【4】**最优解法**是使用**前缀和技巧**，将 **sumRange 函数的时间复杂度降为 O(1)**，就是不要在 sumRange 里面用 for 循环，咋整？

## 2.写出思路：

【1】构造前缀和数组 preSum （new 一个新数组 preSum），  
其中 `preSum[0] = 0` ， `preSum[i] = preSum[i-1] + nums[i-1]`，

【2】也就是：  
`i = 1 ，preSum[1] = preSum[0] + nums[0]`
`i = n` ，依此类推...。

`preSum[i]` 代表 `nums[0..i-1]` 所有元素的**累加和**。

【3】要想求区间 [left,right] 累加和：

1）只需要时间复杂度为 O(1)的算法：

- 计算 `preSum[right+1] - preSum[left]` 即可。

2）而不需要时间复杂度为 O(N) 的

- 遍历整个区间求和 `for(let i=left i<=right;i++){ res += nums[i]}`。

【4】举例：想求 [1, 4] 内的所有元素之和，就可以通过 preSum[5] - preSum[1] 得出；

这样，sumRange 函数仅仅需要做一次减法运算，避免了每次进行 for 循环调用，最坏时间复杂度为常数 O(1).

【5】生活中运用广泛：

- 班上若干同学，每个同学有一个期末考试成绩（满分 100 分），那么请你实现一个 API，输入任意一个分数段，返回有多少同学的成绩在这个分数段内。

可以先通过计数排序的方式计算每个分数具体有多少个同学，然后利用前缀和技巧来实现分数段查询的 API：

java

```java
int[] scores; // 存储着所有同学的分数
// 试卷满分 100 分
int[] count = new int[100 + 1] // 存储 0 到 100 分的所有同学的 count 计数
// 记录每个分数有几个同学
for (int score : scores)
    count[score]++
// 构造前缀和
for (int i = 1; i < count.length; i++)
    count[i] = count[i] + count[i-1];

// 利用 count 这个前缀和数组进行分数段查询
```

js

```js
let scores = [] // 存储着所有同学的分数
// 试卷满分 100 分
let count = new Array(100+1).fill(0)
// 记录每个分数有几个同学
for(let i = 0; i <= 101; i++ ) {
  let score = scores[i]
  count[score]++
}
// 构造前缀和
for (int i = 1; i < count.length; i++)
    count[i] = count[i] + count[i-1];

// 利用 count 这个前缀和数组进行分数段查询
```

也就是：
存个分数，存个 0 到 100 分的计数

```text
scores [50, 60, 80, 60]
count 的 index [0, 1, ... , 50, ... ,60, ... ,80, ...]
count 的 数组值               1        2        1
```

## 3.代码实现： NumArray

> [303.区域和检索 - 数组不可变](https://leetcode.cn/problems/range-sum-query-immutable/solutions/1591667/by-djsz3y-hnco/)

```js
// var NumArray = function (nums) {};
// NumArray.prototype.sumRange = function (left, right) {};
class NumArray {
  preSum // 前缀和数组
  // 输入一个数组，构造前缀和
  constructor(nums) {
    // preSum[0] = 0，便于计算累加和
    this.preSum = new Array(nums.length + 1).fill(0)
    // 计算 nums 的累加和
    for (let i = 1; i < this.preSum.length; i++) {
      this.preSum[i] = this.preSum[i - 1] + nums[i - 1]
    }
  }
  // 查询闭区间 [left,right] 的累加和
  sumRange(left, right) {
    return this.preSum[right + 1] - this.preSum[left]
  }
}
```

## 4.测试用例：

```js
let nums = [-2, 0, 3, -5, 2, -1]
let lrArr = [
  [0, 2],
  [2, 5],
  [0, 5]
]
lrArr.forEach((sRArg) => {
  let left = sRArg[0],
    right = sRArg[1]
  let obj = new NumArray(nums)
  let param_1 = obj.sumRange(left, right)
  console.log(param_1)
})
```

# 二、二维矩阵中的前缀和【todo】

## 1.读懂题目：

二维矩阵 matrix：

- 计算**子矩阵**范围内**元素的总和**，
- 该子矩阵的 **左上角**为`(row1,col1)` **右下角**`(row2,col2)`

实现 `NumMatrix` 类：

- `NumMatrix(int[][] matrix)` 给定整数矩阵 `matrix` 进行初始化
- `int sumRegion(int row1, int col1, int row2, int col2)`
- 返回左上角`(row1,col1)` 右下角`(row2,col2)` 所描述的子矩阵的元素 总和。

【1】

【2】

## 2.写出思路：

for 循环遍历矩阵，sumRegion 函数的时间复杂度就高了，算法格局就低了。
更好的思路是：和一维数组中的前缀和是非常类似的。
绿 - 蓝 - 橙 + 粉
这四个矩阵有共同特点，左上角就是 (0,0) 原点

那么就可以维护一个二维数组 preSum：
专门记录以原点为顶点的矩阵的元素之和，就可以用几次加减运算算出任何一个子矩阵的元素之和。

## 3.代码实现： NumMatrix

> [304.二维区域和检索 - 矩阵不可变](https://leetcode.cn/problems/range-sum-query-2d-immutable/solutions/1623007/304-er-wei-qu-yu-he-jian-suo-ju-zhen-bu-8iqfx/)

```js
// var NumMatrix = function (matrix) {};
// NumMatrix.prototype.sumRegion = function (row1, col1, row2, col2) {};
class NumMatrix {
  preSum
  /**
   * @param {number[][]} matrix
   */
  constructor(matrix) {
    const m = matrix.length,
      n = matrix[0].length
    if (m == 0 || n == 0) return
    // let oneArr = new Array(m + 1).fill(0);
    // this.preSum = new Array(n + 1).fill(deepClone(oneArr));
    this.preSum = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))
    // console.log(this.preSum);
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        this.preSum[i][j] =
          this.preSum[i - 1][j] +
          this.preSum[i][j - 1] +
          matrix[i - 1][j - 1] -
          this.preSum[i - 1][j - 1]
      }
    }
    // console.log(52, this.preSum);
    // console.log(this.preSum[1][1]);
  }
  /**
   * @param {number} x1
   * @param {number} y1
   * @param {number} x2
   * @param {number} y2
   * @return {number}
   */
  sumRegion(x1, y1, x2, y2) {
    return (
      this.preSum[x2 + 1][y2 + 1] -
      this.preSum[x1][y2 + 1] -
      this.preSum[x2 + 1][y1] +
      this.preSum[x1][y1]
    )
  }
}
```

## 4.测试用例：

```js
/**
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */
const matrix = [
  [3, 0, 1, 4, 2],
  [5, 6, 3, 2, 1],
  [1, 2, 0, 1, 5],
  [4, 1, 0, 1, 7],
  [1, 0, 3, 0, 5]
]
const sumRegion_arg1 = [2, 1, 4, 3],
  sumRegion_arg2 = [1, 1, 2, 2],
  sumRegion_arg3 = [1, 2, 2, 4]
const obj = new NumMatrix(matrix)
const param_1 = obj.sumRegion(
  sumRegion_arg1[0],
  sumRegion_arg1[1],
  sumRegion_arg1[2],
  sumRegion_arg1[3]
)
const param_2 = obj.sumRegion(
  sumRegion_arg2[0],
  sumRegion_arg2[1],
  sumRegion_arg2[2],
  sumRegion_arg2[3]
)
const param_3 = obj.sumRegion(
  sumRegion_arg3[0],
  sumRegion_arg3[1],
  sumRegion_arg3[2],
  sumRegion_arg3[3]
)
console.log(param_1, param_2, param_3)
```

# 总结

Day05.经典数组技巧：前缀和数组

今天输出了篇打卡文章总结：

- [Day05.经典数组技巧：前缀和数组](https://github.com/djsz3y/algorithm-labuladong/blob/master/Day05.%E7%BB%8F%E5%85%B8%E6%95%B0%E7%BB%84%E6%8A%80%E5%B7%A7%EF%BC%9A%E5%89%8D%E7%BC%80%E5%92%8C%E6%95%B0%E7%BB%84.md)

实际上之前做过，今天就是整理了第一个一维数组，二位数组来不及做，下次吸收。
一会把一维数组的力扣题提交了并记住。

# 参考链接

- [LABULADONG 的算法网站](https://labuladong.online/algo/)
