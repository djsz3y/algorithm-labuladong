# 滑动窗口延伸：Rabin Karp 字符匹配算法

力扣题目：

> [28. 找出字符串中第一个匹配项的下标](https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/description/)

> [187. 重复的 DNA 序列](https://leetcode.cn/problems/repeated-dna-sequences/description/)

前言：

> - 状态机的思路 - KMP 算法确实不太好理解。
> - 不过今天我来讲一讲字符串匹配的另一种经典算法：**Rabin-Karp 算法**，这是一个**很简单优雅**的算法。

> - 本文会由浅入深地讲明白这个算法的核心思路，先从**最简单的字符串转数字**讲起，然后研究一道**力扣题目**，到最后你就会发现 **Rabin-Karp 算法使用的就是滑动窗口技巧**，直接套前文讲的 [滑动窗口算法框架](https://labuladong.online/algo/essential-technique/sliding-window-framework/) 就出来了，根本不用死记硬背。

## 一、基础的问题【done】

### 1.分析：如何在数字的最低位添加数字以及如何删除数字的最高位？

输入一个字符串形式的正整数，如何把它转化成数字的形式？

- 算法的核心思路就是不断向最低位（个位）添加数字，同时把前面的数字整体左移一位（乘以 10）。

那如果我想删除数字的最高位，怎么做呢？

- 比如说我想把 8264 变成 264，应该如何运算？其实也很简单，让 8264 减去 8000 就得到 264 了。

### 2.公式：在最低位添加一个数字 & 在最高位删除一个数字

用 R 表示数字的进制数，用 L 表示数字的位数，就可以总结出如下公式：

```js
// ⭐****** 在最低位添加一个数字 ******
let number = 8264,
  R = 10, // number 的进制
  appendVal = 3 // 想在 number 的最低位添加的数字

number = R * number + appendVal // 运算，在最低位添加一位
// 此时 number = 82643

// ⭐****** 在最高位删除一个数字 ******
let number = 8264

let R = 10, // number 的进制
  removeVal = 8, // number 最高位的数字
  L = 4 // 此时 number 的位数

number = number - removeVal * Math.pow(R, L - 1) // 运算，删除最高位数字
// 此时 number = 264
```

如果你能理解这两个公式，那么 Rabin-Karp 算法就没有任何难度。

## 二、高效寻找重复子序列【todo】

## 三、Rabin-Karp 算法【todo】

### 暴力字符串匹配算法（28 题解法）

暴力字符串匹配算法是这样的：

```js
var search = function (txt, pat) {
  var N = txt.length,
    L = pat.length

  for (var i = 0; i + L <= N; i++) {
    var subStr = txt.substring(i, i + L)
    if (subStr === pat) {
      // 在 txt 中找到模式串 pat，返回起始索引
      return i
    }
  }
  // txt 中不存在模式串 pat
  return -1
}
```

你可以发现，这个逻辑和上面讲的那道题的暴力解法非常类似，总的时间复杂度是 `O(LN)`，优化的核心也是子串 `subStr` 和模式串 `pat` 匹配的部分。

。。。

## 参考链接

- 本文参考链接：[滑动窗口延伸：Rabin Karp 字符匹配算法](https://labuladong.online/algo/practice-in-action/rabinkarp/)

滑动窗口相关：

- 打卡文章：[Day09.滑动窗口算法框架](https://github.com/djsz3y/algorithm-labuladong/blob/master/Day09.滑动窗口算法框架.md)

- 参考文章：[滑动窗口算法核心代码模板](https://labuladong.online/algo/essential-technique/sliding-window-framework/)
