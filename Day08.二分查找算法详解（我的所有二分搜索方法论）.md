Day08.二分查找算法详解（我的所有二分搜索方法论）

# 前言

- 二分搜索包含在搜索算法里。  
  搜索算法有：顺序搜索、二分搜索、内插搜索。

> 1. 最常用二分查找场景：
>    ① 寻找一个数、② 寻找左侧边界、③ 寻找右侧边界。
> 2. 深入细节，比如：
>    ① 不等号是否应该带等号，
>    ② mid 是否应该加一等等。
> 3. 分析细节差异&出现差异原因，以保证灵活准确正确写出二分查找算法。
> 4. 探讨多种代码写法，以理解出现这些细微差异的本质原因

# 二分框架&注意细节

## 【1】二分框架 `binarySearch`：

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var binarySearch = function(nums, target) {
    var left = 0, right = ... // 左右指针

    while(...) {
      let mid = left + (right - left) / 2
      mid = Math.floor(mid) // 找中位数（有效防止溢出）
      if (nums[mid] === target) {
          ...
      } else if (nums[mid] < target) {
          left = ...
      } else if (nums[mid] > target) { // 展现所有细节
          right = ...
      }
    }
    return ...
}
```

## ⭐【2】注意细节：

### 1）分析二分查找时，使用 `else if` 清楚**展现所有细节**；

### 2）**找中位数 mid，有效防止溢出**：

> `mid = low + ((high - low) >> 1);` 而不是 `mid = (low + high) / 2;` 因为两者之和，有可能会溢出。（考察）

- ① 代码中 `left + (right - left) / 2` 就和 `(left + right) / 2` 的结果相同；
- ② 有效防止 left 和 right 太大，直接相加，导致溢出。

### 3）while 循环使用 `<=`，而不使用 `<` 的原因：（<span style="color:red;">重要：左右相等时继续循环</span>）

> low <= high, 而不是 low < high ， 如果数组的长度是偶数，倒数第二步，low = high.

[1.1]使用 `while(left <= right)`时：

- 终止条件是：`left === right+1`，
- 区间是：`[right+1, right]`，
- 比如：`[3, 2]`，
- while 循环终止时：
  正确，返回-1。

[1.2]使用 `while(left < right)`时：

- 终止条件是：`left === right`，
- 区间是：`[right, right]`，
- 比如：`[2, 2]`，
- while 循环终止时：
  ① `[2, 2]`里的 2 被漏掉了，索引 2 没有被搜索，
  ② 直接返回 -1 是错误的。

[1.3]非要使用 `while(left < right)`，**打个补丁**：

- while 语句后**不能直接 return -1**，
- 应该 `return nums[left] === target ? left : -1;`

### 4）使用 `left = mid + 1` & `right = mid - 1`：

> low = mid + 1; high = mid - 1.  
> 如果你直接写成 low = mid 或者 high = mid， 可能会发生死循环。

因为 mid 已经搜索过，所以从搜索区间中去除。

### 5）两种情形：

1. 寻找一个数的位置，没找到 return -1（704.二分查找）
2. 寻找一个数的位置，没找到返回插入的位置；（35.搜索插入位置）  
   如果说是找一个位置，return left ; return right + 1；

### 6）二分场景：

1. 二分依赖的是顺序表，是数组，而不是链表；
2. 二分查找的一定是有序数组；
3. 数据量一般比较大。

### 7）**基本二分查找算法的局限性**，用**左、右边界二分查找**的原因：

1. 有序数组 `nums = [1,2,2,2,3], target = 2`。
2. 此算法返回索引 2，但此算法**无法处理** target 的**左**侧边界（索引 1）和**右侧边界**（索引 3）；
3. 如果向**左、右线性搜索**，**难以保证二分**查找**对数级**的**复杂度**。

# ⭐ 一、寻找一个位置（<span style="color:red;">基本二分搜索</span>）

> 1. 寻找一个数的位置
> 2. 确定一个数在有序数组中的位置
> 3. 求平方根

## ⭐ 基本思路：

1. 左指针设置 0，右指针设置 nums 长度-1 ；
2. while 循环 left <= right ：因为右指针是长度-1。
3. 找中位：防止 left & right 太大，直接相加导致溢出；  
   **向下取整可以**：  
    ① `let mid = Math.floor(left + (right - left) / 2)`  
    ② `let mid = left + ((right - left) >> 1)`
4. 中位数判断： nums[mid] 对比目标 target 等于？ 小于？ 大于？  
   等于即：找到目标值停止搜索
5. 这里注意 ⭐：  
   ① 由于搜索区间两端都闭 [left,right] ，发现索引 mid 不是要找的 target 时，  
   mid 已经搜索过，应该从搜索区间中去除。  
   ② 小于即：要去右边找，所以把左指针设置为 mid + 1。  
   ③ 大于即：要去左边找，所以把右指针设置为 mid - 1。
6. 之前遇到的困难 ⭐：  
   ① 使用 `let mid = left + (right - left) / 2`，  
   ② 而没有向下取整 `mid = Math.floor(mid)` ，  
   ③ 别的语言自动取整了，JavaScript 手动取整

## 例题：704.二分查找（寻找一个数的位置）

> [704. 二分查找](https://leetcode.cn/problems/binary-search/description/)

### 1.读懂题目：

- 整型数组 nums 包含 n 个有序的升序元素
- 目标值 target
- 在 nums 中搜索 target，存在返回下标，不存在返回-1。
- 可以假设 nums 的所有元素是不重复的。
- n 将在[1,10000]之间
- nums 的每个元素都将在 [-9999, 9999]之间。

### 2.写出思路：

- 左右指针 len-1
- while 用 <=
- 中位数防止溢出
- 据中位对比目标，找到 return mid
- 注意去掉 mid 区间，mid+1/mid-1

### 3.代码实现： search

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// 左右指针 len-1
// while 用 <=
// 中位数防止溢出
// 据中位对比目标，找到return mid
// 注意去掉mid区间，mid+1/mid-1
var search = function (nums, target) {
  let left = 0,
    right = nums.length - 1
  while (left <= right) {
    let mid = left + ((right - left) >> 1)
    if (nums[mid] === target) {
      return mid
    } else if (nums[mid] < target) {
      left = mid + 1
    } else if (target < nums[mid]) {
      right = mid - 1
    }
  }
  return -1
}
```

### 4.测试用例：

```js
let nums = [-1, 0, 3, 5, 9, 12],
  target = 9
let nums2 = [-1, 0, 3, 5, 9, 12],
  target2 = 2
let res = search(nums, target)
let res2 = search(nums2, target2)
console.log(73, res, '-', res2)
```

## 例题：35.搜索插入位置（确定一个数在有序数组中的位置）

> [35. 搜索插入位置](https://leetcode.cn/problems/search-insert-position/)

### 法 Ⅰ：二分-while 循环

```js
// 排序数组 nums & 目标值 target
// 找到目标值，返回索引
// 不存在，返回它被按顺序插入的位置。
var searchInsert = function (nums, target) {
  // 二分查找
  let low = 0,
    high = nums.length - 1
  while (low <= high) {
    // let mid = left + (right - left) / 2;
    // mid = Math.floor(mid);
    let mid = low + ((high - low) >> 1)
    if (nums[mid] < target) {
      low = mid + 1
    } else if (target < nums[mid]) {
      high = mid - 1
    } else if (nums[mid] === target) {
      return mid
    }
  }
  return high + 1
  // 如果说是找一个位置，return left ;   return right + 1
}
```

### 法 Ⅱ：二分-递归

```js
var searchInsert = function (arr, target) {
  const search = function (arr, target, low, high) {
    let mid = low + ((high - low) >> 1)

    if (arr[mid] === target) {
      return mid
    }

    if (low > high) {
      return low
    }

    if (arr[mid] < target) {
      return search(arr, target, mid + 1, high)
    } else {
      return search(arr, target, low, mid - 1)
    }
  }
  return search(arr, target, 0, arr.length - 1)
}
console.log(searchInsert([2, 3, 4, 5, 6, 7, 8, 9], 10))
```

## 例题：69.x-的平方根（求平方根）

> [69. x 的平方根](https://leetcode.cn/problems/sqrtx/)

### 思路：

- 平方根一定是在这两个之间的：1----------x
- 不断地取中间值 mid 求平方，
- 比一下是否<=x（或者用 x 除以 mid 看大小），看看哪一个成立。

### 实现

```js
// 非负整数 x
// 返回 x 的 算术平方根（求根号下x）
// 结果只保留 整数部分
// 不能使用 内置指数函数和算符，例如 pow(x, 0.5) 或者 x ** 0.5 。
// 输入：x = 8
// 输出：2
// 解释：8 的算术平方根是 2.82842..., 由于返回类型是整数，小数部分将被舍去。
var mySqrt = function (x) {
  let low = 1,
    high = x
  while (low <= high) {
    let mid = low + ((high - low) >> 1)
    if (mid * mid <= x) {
      if ((mid + 1) * (mid + 1) > x) {
        return mid
      }
      low = mid + 1
    } else {
      high = mid - 1
    }
  }
  return 0
}
```

# ⭐ 二、左右边界二分搜索（<span style="color:red;">左右边界</span>）

## 左侧边界

- 常见的 `[left, right)`

- 便于记忆的 `[left, right]`

## 右侧边界

- 常见的 `[left, right)`

- 便于记忆的 `[left, right]`

## 例题：34.在排序数组中查找元素的第一个和最后一个位置

> [34. 在排序数组中查找元素的第一个和最后一个位置](https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/description/)

### 1.读懂题目：

- **非递减**顺序排列，**整数数组** nums
- 目标值 target  
  ① 给定目标值 **开始位置、结束位置**  
  ② 不存在，返回 **`[-1, -1]`**
- 必须设计并实现**时间复杂度**为 **`O(log n)`**
- `nums = [5,7,7,8,8,10], target = 8`
- `[3,4]`

### 2.写出思路：

#### 【法 Ⅰ】labuladong 二分查找模板：

- `left_bound` : 左侧边界二分搜索（**左闭右开**的写法）
- `right_bound` : 右侧边界二分搜索（**左闭右开**的写法）

#### 【法 Ⅱ】思路：

① 题目要求 and 8 步（1 2 3 4 5 6 7 8）

② 找到 target 的范围区间内的值的时候——  
需要根据 true / false ——
从而找到左右边界 ——

- 左移右指针找（target 区间的）左边界，
- 右移左指针找（target 区间的）右边界；

### 3.代码实现： searchRange

#### 【法 Ⅰ】 labuladong 实现

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  function left_bound(nums, target) {
    let left = 0,
      right = nums.length - 1
    while (left <= right) {
      let mid = Math.floor(left + (right - left) / 2)

      if (nums[mid] < target) {
        left = mid + 1
      } else if (nums[mid] > target) {
        right = mid - 1
      } else if (nums[mid] == target) {
        right = mid - 1
      }
    }
    // 检查出界情况
    if (left >= nums.length || nums[left] != target) {
      return -1
    }
    return left
  }

  function right_bound(nums, target) {
    if (nums.length == 0) return -1
    let left = 0,
      right = nums.length
    while (left < right) {
      let mid = Math.floor(left + (right - left) / 2)

      if (nums[mid] == target) {
        left = mid + 1
      } else if (nums[mid] < target) {
        left = mid + 1
      } else if (nums[mid] > target) {
        right = mid
      }
    }
    return left - 1 //注意
  }

  const l_b = left_bound(nums, target)
  const r_b = right_bound(nums, target)

  if (l_b == -1 || r_b == -1) {
    return [-1, -1]
  }

  return [l_b, r_b]
}
```

#### 【法 Ⅱ】实现

```js
// 题目要求：
// 非递减顺序排列的整数数组 nums
// 目标值 target
//    给定目标值 开始位置、结束位置
//    不存在，返回 [-1, -1]
// 时间复杂度为 O(log n)
// nums = [5,7,7,8,8,10], target = 8
// [3,4]
var searchRange = function (nums, target) {
  // 思路：题目要求 and 8 步（1 2 3 4 5 6 7 8）
  // 1. search fromLow
  const search = function (fromLow) {
    // 3. 左右指针
    let low = 0,
      high = nums.length - 1
    // 4. while循环
    while (low <= high) {
      // 5. 二分查找 mid
      let mid = low + ((high - low) >> 1)
      // 6. 二分查找 if
      if (nums[mid] < target) {
        low = mid + 1
      } else if (target < nums[mid]) {
        high = mid - 1
      } else {
        // 找到 target 的范围区间内的值的时候——
        // 需要根据 true / false ——

        // - 左移右指针找（target 区间的）左边界，
        // - 右移左指针找（target 区间的）右边界；

        // 从而找到左右边界；

        // 7. fromLow
        // 找到目标值
        if (fromLow) {
          // 要找左边界
          if (nums[mid] === nums[mid - 1]) {
            high = mid - 1
          } else {
            return mid
          }
        } else {
          // 要找右边界
          if (nums[mid] === nums[mid + 1]) {
            low = mid + 1
          } else {
            return mid
          }
        }
      }
    }
    // 8. -1
    return -1
  }
  // 2. return [s..., s...]
  return [search(true), search(false)]
}
```

### 4.测试用例：

```js
const nums = [5, 7, 7, 8, 8, 10],
  target = 8,
  nums2 = [5, 7, 7, 8, 8, 10],
  target2 = 6,
  nums3 = [],
  target3 = 0
const res = searchRange(nums, target),
  res2 = searchRange(nums2, target2),
  res3 = searchRange(nums3, target3)
console.log(res, res2, res3)
```

## 例题：33.搜索旋转排序数组

> [33. 搜索旋转排序数组](https://leetcode.cn/problems/search-in-rotated-sorted-array/)

### 1.读懂题目：

1. 首先：整数升序元素互不相同数组 nums ，  
   未知下标 k 位置，元素旋转 180° 。
2. 比如：[0,1,2,4,5,6,7] 下标 3 处 -> [4,5,6,7,0,1,2]
3. 已知：旋转后数组 nums ，整数 target
4. 求： search(nums, target) 函数，  
   target 在 nums ，  
   -存在返回下标，  
   -不存在返回-1 。

5. 时间复杂度 O(log n) 。

### 2.写出思路：

#### 思路：

二分左右指针。

1. 先看**中间值 mid** 在整个数组的哪个**位置**；
2. 有两种情况：  
   1）因为是先逐渐升高突然到达断点再从更低再爬回原来的起始点，比如：[4,5,6,7,0,1,2]；  
   2）所以要看 mid 在中间**断点悬崖左边还是右边**；断点左右分别有序，所以从 mid 在所在断点的相对位置->得知**某一边有序**。
3. 某一边有序->再看 **target 区间是否位于其中**，就可以像基本的二分一样修改左右 left、right 或者低高 low、high 指针，从而完成循环判断。不存在返回-1 呗。

#### ⭐ 总结：

同基本的二分一样，就是**多了一层思路上的判断**。

### 3.代码实现： searchRange

```js
// 旋转后 的数组 nums [4,5,6,7,0,1,2]
// 目标值 target
// 存在返回它的下标，否则返回 -1 。
// 时间复杂度为 O(log n)
// 输入：nums = [4,5,6,7,0,1,2], target = 0
// 输出：4
var search = function (nums, target) {
  let low = 0,
    high = nums.length - 1

  while (low <= high) {
    let mid = low + ((high - low) >> 1)

    // 如果中值是目标值，返回mid
    if (nums[mid] === target) {
      return mid
    }

    // 1. 先判断左边有序还是右边有序。
    // 2. 左边有序，就判断目标值target是否在左边范围内；
    //    在左边，滑动窗口左移；否做右移。
    // 3. 右边有序，判断目标值target是否在右边范围内；
    //    在右边，滑动窗口右移；否则左移。
    // 4. 注意 target 和 nums[mid] 要么大，要么小，不存在 >= 和 <= 情况；
    //    如果存在之前就已经 return 了。
    if (nums[mid] >= nums[high]) {
      // 左边有序——[low, mid)
      if (nums[low] <= target && target < nums[mid]) {
        high = mid - 1
      } else {
        low = mid + 1
      }
    } else if (nums[mid] < nums[high]) {
      // 右边有序——(mid, high]
      if (nums[mid] < target && target <= nums[high]) {
        low = mid + 1
      } else {
        high = mid - 1
      }
    }
  }

  return -1
}
```

### 4.测试用例：

# 总结

Day08.二分查找算法详解（我的所有二分搜索方法论）

## 【收获 1】

1）今天学习了 **二分查找** 技巧，

2）以后遇到以下类型的题目：

- **[704. 二分查找](https://leetcode.cn/problems/binary-search/description/)**
- **[35. 搜索插入位置](https://leetcode.cn/problems/search-insert-position/)**
- **[69. x 的平方根](https://leetcode.cn/problems/sqrtx/)**
- **[33. 搜索旋转排序数组](https://leetcode.cn/problems/search-in-rotated-sorted-array/)**
- **[34. 在排序数组中查找元素的第一个和最后一个位置](https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/description/)**

3）我可以按照以下的标准化步骤思考：

1. 左右指针，右指针 len-1
2. -> while 循环用<=
3. -> 取中位数 mid 防止溢出
4. -> 中位数值对比目标值判断=、<、>
5. -> 去除 mid 区间 mid+1/mid-1
6. -> 根据题目最后返回：704.寻找一个数的位置-1/35.搜索插入位置 high+1/69.求平方根 0

4）其中第 1 步的作用是 **取左右指针，划定范围** ，  
第 2 步的作用是 **指针循环** ，  
第 3 步的作用是 **防止溢出** ，  
第 4 步的作用是 **缩小左右指针窗口范围直至接近目标值** ，  
第 5 步的作用是 **防止陷入死循环** ，  
第 6 步的作用是 **返回符合题目的答案** 。

5）其中，33&34 题，要特别画图思考一下：

1. 【前面 704、35、69 题：】只是寻找一个位置，比如：704、35、69；
2. 【33 题：】要根据 nums[mid] 和 nums[high] 的大小，判断左边有序还是右边有序，
3. 【33 题：】进而根据有序的那部分判断 target 是否在有序区间内，从而进行左右指针的移动；
4. 【33 题：】当然，在这之前要先判断 `nums[mid] === target`，再进行上述判断。
5. 【34 题：】要内部写一个 search 方法：
6. 【34 题：】寻找一个位置的二分查找方法，与通用一个位置查找的区别是先判断<、>也就是判断两头，
7. 【34 题：】然后再在 else 里判断根据参数 fromLeft，判断查找左边界还是右边界；
8. 【34 题：】左右边界就是判断 `nums[mid] === nums[mid-1]`、`nums[mid] === nums[mid+1]`

## 【收获 2】

1）今天学习使用 **二分查找** 技巧解决了 LeetCode 的 704/35/69 题，

2）我之前**第一次做**有一个**误区**：

- 没有 AI 的 JS 代码时，直接按照 labuladong Java 题解写的一直报错，

3）后来发现原来

- **其他语言自动取整，JavaScript 需要手动向下取整**；

4）今天总结了 JS 取中位数的方式：
① `let mid = left + ((right - left) >> 1)`
② `let mid = left + Math.floor((right - left) / 2)`  
③ `let mid = Math.floor(left + (right - left) / 2)`

5）其中，① 效率最好，但 ② ③ 可读性更好，不过如果不考虑 left right 为整数，如果是小数，② 的精度更高；  
所以结论是取中位数时，使用 ① 或者 ②，不使用 ③ 了。

6）由此，我想如果 left 是小数会怎样，想到 **面试题：为什么 JS `0.1 + 0.2 !== 0.3` ？**，然后输出了一篇文章。

## 【收获 3】

今天输出了一篇打卡文章总结：

- [Day08.二分查找算法详解（我的所有二分搜索方法论）](https://github.com/djsz3y/algorithm-labuladong/blob/master/Day08.二分查找算法详解（我的所有二分搜索方法论）.md)
  一篇面试题总结：
- [JavaScript `0.1+0.2 !== 0.3`，为什么？](https://juejin.cn/post/7356772920275796018)

# 参考链接

- [LABULADONG 的算法网站](https://labuladong.online/algo/)

- [算法学习笔记 3（二分和回溯）](https://zhuanlan.zhihu.com/p/636040965)
