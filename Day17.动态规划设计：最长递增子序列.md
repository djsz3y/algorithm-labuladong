Day17.动态规划设计：最长递增子序列

# 零、前言

## 更新日志：

> 2024-4-21：阅读了 v5.2 的 一、动态规划解法 的 PDF；总结了 零、前言 & 一、动态规划解法。

## 1.本文主要内容：

### 【1】昨日打卡，学会了**动态规划的套路**：

- 找到了问题的「状态」，
- 明确了 dp 数组/函数的含义，
- 定义了 base case；

但不知：

- **如何确定「选择」**，
- 也就是 **找不到状态转移的关系**，
- 依然**写不出动态规划解法**，

怎么办？

### ⭐【2】动态规划的**难点**：

- 在于**寻找正确的状态转移方程**

### ⭐【3】使用 设计动态规划的**通用技巧**：数学归纳思想

> 借助经典的「最长递增子序列问题」
> 最长递增子序列（Longest Increasing Subsequence，简写 LIS）是 非常经典，算法问题

1. **动态规划解法**（容易想到），时间复杂度 `O(N^2)`：借这个问题来**由浅入深**讲解*如何找状态转移方程，如何写出动态规划解法*。
2. 利用**二分查找**（难想到），时间复杂度是 `O(NlogN)`：通过一种简单的**纸牌游戏**来**辅助理解**这种*巧妙的解法*。

# ⭐ 一、动态规划解法

> [300. 最长递增子序列](https://leetcode.cn/problems/longest-increasing-subsequence/description/)

## 1.读懂题目：

1. 无序的整数数组，找到 最长的 严格递增子序列的长度，函数签名为 `function lengthOfLIS(nums) {}`

2. 输入 `nums=[10,9,2,5,3,7,101,18]`，最长的递增子序列是 `[2,3,7,101]`，所以算法输出应该是 4。

3. 注意「子序列」VS「子串」两个名词的区别：  
   子串一定是连续的，  
   而子序列不一定是连续的。

## 2.写出思路：

> 先来**设计动态规划算法**解决这个问题

### 【1】核心设计思想是数学归纳法

1. 高中学过数学归纳法，思路简单：
2. 想证明一个数学结论，<span style="color:red;">**先假设**这个结论在 k < n 时成立，然后根据这个假设，想办法**推导证明出** k = n 的时候此结论也成立。</span>
3. 如果能够证明出来，那么就说明这个结论对于 k 等于任何数都成立。

### ⭐【2】类似的，设计动态规划算法，需要 dp 数组：

1. 假设 `dp[0...i-1]` 都已被算出，
2. 问自己：怎么通过结果算出 `dp[i]`？

### ⭐【3】举例：最长递增子序列问题

[1]首先，**定义清楚 dp 数组的含义**，

1. What？即 `dp[i]` 的值到底代表什么？

2. How？**定义：dp[i] 表示以 `nums[i]` 这个数结尾的最长递增子序列的长度。**

3. Why？  
   ① 这是**解决子序列问题的一个套路**，  
   ② **后文** [动态规划之子序列问题解题模板](https://labuladong.online/algo/dynamic-programming/subsequence-problem/) **总结**了几种**常见套路**。  
   ③ 你读完本章所有的动态规划问题，就会**发现 dp 数组的定义方法也就那几种**。

[2]其次，**根据定义**可以**推出 base case**：

1. What？base case，
2. How？**`dp[i]` 初始值为 1**，
3. Why？因为以 `nums[i]` 结尾的 最长递增子序列，**要包含自己**。
4. 举两个例子，看其 算法演进的过程：

```js
nums: [1, 4, 3, 4, 2]
dp: [1, 2, 2, 3, 2]
```

```js
index   0 1 2 3 4
nums    1 4 3 4 2
dp      1 2 2 3 2
```

[3]最后，**根据定义，得到最终结果**（子序列的最大长度）

- 应该是 **dp 数组中的最大值**。

代码如下：

```js
let res = 0
for (let i = 0; i < dp.length; i++) {
  res = Math.max(res, dp[i])
}
return res
```

### ⭐【4】使用数学归纳的思想，设计算法逻辑（动态规划的重头戏）

> 算法演进过程 dp[i] 的结果，是肉眼看出来；
> **怎么设计**算法逻辑，来正确计算 每个 dp[i] 呢？
> **如何设计**算法逻辑，进行状态转移，从而正确运行呢？

[1]假设已知 `dp[0..4]` ，如何通过已知 推出 `dp[5]` ？

- 根据对 dp 数组的定义，  
  想求 `dp[5]`，  
  即想求 以 `nums[5]` 为结尾的 最长递增子序列。

> 注意 ?

```js
nums: [1, 4, 3, 4, 2, 3]
dp: [1, 2, 2, 3, 2, ?]
```

[2]**`nums[5] = 3`**，既然是**递增子序列**，我们只要**找到前面**那些**结尾比 3 小的子序列**，然后**把 3 接到这些子序列末尾**，就可以**形成一个新的递增子序列**，而且这个**新的子序列长度加一**。

- 前面小于 `nums[5]` 的有哪些？用 **for 循环比较**元素找出来。

- 以这些元素为结尾的，最长递增子序列 长度 是多少？回顾对 dp 数组定义，记录的正是 **以每个元素为末尾**的最长递增子序列的**长度**。

- 以举的例子来说，  
  ① `nums[0]` 和 `nums[4]` 都小于 `nums[5]`，  
  ② 对比 `dp[0]` 和 `dp[4]` 的值，  
  ③ 让 `nums[5]` **和更长的递增子序列结合**，得出 `dp[5] = 3` ，如下：

> ? = 3  
> **`max(1+1, 2+1)`**

```js
nums: [1, 4, 3, 4, 2, 3]
dp: [1, 2, 2, 3, 2, 3]
```

[3]代码如下：

> 当 `i = 5` 时，这段代码 可以算出 `dp[5]`。

```js
for (let j = 0; j < i; j++) {
  if (nums[i] > nums[j]) {
    dp[i] = Math.max(dp[i], dp[j] + 1)
  }
}
```

[4]刚才只算了 `dp[5]` ，`dp[4]`、`dp[3]` 怎么算？

> **类似数学归纳法**，已算出 `dp[5]` ，其他都可算出：

```js
for (let i = 0; i < nums.length; i++) {
  for (let j = 0; j < i; j++) {
    // !寻找 nums[0..j-1] 中比 nums[i] 小的元素
    if (nums[i] > nums[j]) {
      // !把 nums[i] 接在后面，即可形成长度为 dp[j] + 1，
      // 且以 nums[i] 为结尾的递增子序列
      dp[i] = Math.max(dp[i], dp[j] + 1)
    }
  }
}
```

[5]结合 base case，看完整代码为：

```js
function lengthOfLIS(nums) {
  // !定义：dp[i] 表示以 nums[i] 这个数结尾的最长递增子序列的长度
  const dp = new Array[nums.length]()
  // !base case：dp 数组全都初始化为 1
  dp.fill(1)

  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) dp[i] = Math.max(dp[i], dp[j] + 1)
    }
  }

  let res = 0
  for (let i = 0; i < dp.length; i++) {
    res = Math.max(res, dp[i])
  }
  return res
}
```

[6]至此，此题已解决，时间复杂度为 `O(N^2)`

### ⭐【5】总结：如何找动态规划的 状态转移关系：

**1、明确 dp 数组的定义。**

- **这一步对于任何动态规划问题都很重要**，如果不得当或者不够清晰，会阻碍之后的步骤。

**2、根据 dp 数组的定义，运用数学归纳法的思想：**

- **假设 dp[0...i-1] 都已知，想办法求出 dp[i]**，一旦这一步完成，整个题目基本就解决了。

**3、如果无法完成**，很可能就是：

1. dp 数组的定义不够恰当，需要**重新定义** dp 数组的含义；
2. 或者可能是 dp 数组存储的信息还不够，不足以推出下一步的答案，**需要把 dp 数组扩大成二维数组甚至三维数组**。

### ⭐【6】还有更高效的解法：

1. 目前的解法是**标准的动态规划**，
2. 但对最长递增子序列问题来说，这个**解法不是最优**的，可能**无法通过所有测试用例**；

> 下面讲讲更高效的解法，见 **二、二分查找解法**

## 3.代码实现： lengthOfLIS

```js
var lengthOfLIS = function (nums) {
  // const dp = []
  // let res = 0
  // dp[0] = 1

  const dp = Array(nums.length).fill(1)
  let res = 0

  for (let i = 0; i < nums.length; i++) {
    // dp[i] = 1
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[j] + 1, dp[i])
      }
    }
    res = Math.max(dp[i], res)
  }

  return res
}
```

## 4.测试用例：

# 二、二分查找解法【todo】

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  let top = new Array(nums.length)
  // 牌堆数初始化为 0
  let piles = 0
  for (let i = 0; i < nums.length; i++) {
    // 要处理的扑克牌
    let poker = nums[i]

    /***** 搜索左侧边界的二分查找 *****/
    let left = 0,
      right = piles
    while (left < right) {
      let mid = (left + right) / 2
      if (top[mid] > poker) {
        right = mid
      } else if (top[mid] < poker) {
        left = mid + 1
      } else {
        right = mid
      }
    }
    /*********************************/

    // 没找到合适的牌堆，新建一堆
    if (left == piles) piles++
    // 把这张牌放到牌堆顶
    top[left] = poker
  }
  // 牌堆数就是 LIS 长度
  return piles
}
```

# 三、拓展到二维

> [354. 俄罗斯套娃信封问题](https://leetcode.cn/problems/russian-doll-envelopes/description/)

# 总结

Day17.动态规划设计：最长递增子序列

## 更新日志：

> 2024-4-21：阅读了 v5.2 的 一、动态规划解法 的 PDF；总结了 零、前言 & 一、动态规划解法。

## 【收获 1】

【1】今天学习了 **动态规划设计：最长递增子序列** 技巧，以后遇到：

- [300. 最长递增子序列](https://leetcode.cn/problems/longest-increasing-subsequence/description/)
- [354. 俄罗斯套娃信封问题](https://leetcode.cn/problems/russian-doll-envelopes/description/)

类型的题目，

【2】我可以按照：

1. **定义 dp 的定义**；

2. 根据 dp 定义，**推出 base case**，找出状态转移方程，需要有数学归纳法的思维；

3. 根据**定义，得到最终结果**；

【3】其中，第二步：对 **数学归纳法的原理** 的使用就是：

1. 先假设 `dp[0...i-1]` 已知，然后根据已知条件，思考如何推导出 `dp[i]`；
2. 同理，假设 dp[0...i-1-1] 已知，然后根据已知条件，思考如何推导出 `dp[i-1]`；
3. 以此类推；
4. 最后推出已知条件，说明以上证明成立。

根据这个思想，推出第二步的 base case。

也就是【2】【3】的标准化步骤思考。

【4】之前做过第 300 题，最长递增子序列，那时候花时间理解了这道题，但是还得多做来解决这一道题，  
然而今天，我**更加理解了这类题：动态规划的题目的思想**，并且**有了这种系统的算法思想**，感觉更加明白了：

- 之前写的代码里有 dp[i] = 1 ，今天一下子 labuladong 在开头就明确了 定义一个 const dp = Array(nums.length) 并且 dp.fill(1) ，还说明了要把自己包含在内，一下子豁然开朗，更加了解了它的原理思想。

- 包括 `dp[0] = 1` 的原因是因为，这道题原来是 **数学归纳法** 的思想，更明白了。

【5】在 vue 中，也是使用这道题的算法思想解决的虚拟 dom 的 diff 对比。

## 【收获 2】

今天输出了一篇打卡文章总结：

- [Day17.动态规划设计：最长递增子序列](https://github.com/djsz3y/algorithm-labuladong/blob/master/Day17.动态规划设计：最长递增子序列.md)

# 参考链接

- [LABULADONG 的算法网站](https://labuladong.online/algo/)
