Day06.经典数组技巧：差分数组

# 一、理论

> 差分数组 VS 前缀和

## 1.前缀和

### 1.1.适用场景：

- 不修改 原始数组，**频繁查询**某个区间**累加和**

### 1.2.核心代码：

```js
/* 输入一个数组，构造前缀和 */
var PrefixSum =  function(nums) {
  this.prefix = new Array(nums.length + 1)// 前缀和数组
  for(var i = 1; i < this.prefix.length; i++) {
    prefix[i] = prefix[i - 1] + nums[i - 1]
  } // 计算 nums 的累加和
}

/* 查询闭区间 [i, j] 的累计和 */
PrefixSum.prototype.query(i, j) {
  return this.prefix[j+1] - this.prefix[i]
}
```

### 1.3.思路：

1. 前缀和数组 `prefix[i]` 的值，是原数组 `nums[0]` 到 `nums[i - 1]` 的和。

2. 要想求 区间 `nums[i…j]` 的累加和，只需要 计算 prefix[j+1] - prefix[i]，不需遍历整个区间求和。

3. 也就是：**求原数组的 `n[i...j]` 的累加和，计算前缀和数组的 `p[j+1] - p[i]`** ;

## 2.差分数组（2024-4-11）

> 以下是第二次对「差分数组」技巧的理解（2024-4-11）

### 2.1.适用场景

- 不修改 原始数组，**频繁增减**原始数组 某个**区间的元素**

### 2.2.举例说明

1. 输入一个数组 `nums` 要求先给 `nums[2...6]` 全部加 1，再给 `nums[3...9]` 全部减 3，再给 nums[0...4] 全部加 2，再给。。。。。。

2. 最后问你，nums 数组的值是什么？

#### 2.2.1.常规思路

- **for 循环** nums[i...j] 加上 val；
- 时间复杂度：**O(N)**；
- 缺点：对 nums 的**修改**非常**频繁**，**效率低下**。

#### 2.2.2.差分数组技巧

- 类似前缀和技巧构造的 prefix 数组：

##### 【1】**（对 nums）构造差分数组 diff：**

- `diff[i] = nums[i] - nums[i - 1];`

```js
var diff = new Array(nums.length)
// 构造差分数组
diff[0] = nums[0]
for (var i = 1; i < nums.length; i++) {
  diff[i] = nums[i] - nums[i - 1]
}
```

##### 【2】反推，构造结果数组

反推（差分数组 diff 的）原始数组 nums：

- `res[i] = res[i - 1] + diff[i];`

即，差分数组 diff **构造结果数组：**

```js
var res = new Array(diff.length)
// 根据差分数组构造结果数组
res[0] = diff[0]
for (var i = 1; i < diff.length; i++) {
  res[i] = res[i - 1] + diff[i]
}
```

##### 【3】**比如**：

```
原数组        nums [8, 2, 6, 3, 1]
构造的差分数组 diff [8, -6, 4, -3, -2]
```

##### 【4】即可 **快速增减区间值**

- 构造差分数组 diff，快速增减区间

##### 【5】比如：

- **想对区间** `nums[i...j]` 全部加 3，
- 那么**只需要**让`diff[i] += 3`，再让`diff[j+1] -= 3` 即可。

##### 【6】原理

- 让 `diff[j+1]` 减 3，为了让 `nums[j+1]` 的值减 3，

###### 1）因为：

- 原数组 `nums[j+1]` 是由 原数组 `nums[j]` 和 `diff[j+1]` 组成的，
- 也就是：`nums[j] + diff[j+1] = nums[j+1]`

###### 2）又因为：

- j+1 之后的所有 nums 值，都是由 前一位 nums 值和 diff 对应值组成的，
  所以前一步的 nums[j+1]被减了 3 后，之后的所有值都减了 3 了。

###### 3）再想：

为啥让 j+1 之后的所有 nums 值都减 3 呢？

- 因为前面`diff[i] += 3`了，就会导致 i... 之后所有原数组 nums 值都加 3，因为只是想要区间 i...j 的 nums 值加 3，所以，j+1 之后的 nums 值还得减回来 3；
- 那前面构造了 diff 差分数组了，就只需要让 diff[j+1]减 3，就可以让 nums[j+1]减 3，
- 又因为 j+1 之后的差分数组没变，从而使得 nums[j+1]之后的都减回来了~

##### 【7】差分数组，时间复杂度 O(1)

O(1)时间修改 diff 数组，相当于给 nums 的整个区间做了修改：

- 从 使用 for 循环的 频繁修改 nums 多个区间的值，时间复杂度 O(n)
- 变为了 多次修改 diff，就可以达到效果的，时间复杂度 O(1)

##### 【8】<span style="color:red;">差分数组工具类 Difference</span>

抽象成一个类，以后就可以直接用啦：

> 看来 Difference 必须记住咯~

```js
// 差分数组工具类
class Difference {
  // 差分数组
  diff = []
  // 输入一个初始数组，区间操作将在这个数组上进行
  constructor(nums) {
    // console.log(101, nums);
    if (nums.length > 0) {
      this.diff = new Array(nums.length).fill(0)
      // 根据初始数组构造差分数组
      this.diff[0] = nums[0]
      // console.log(105, nums);
      // console.log(106, this.diff);
      for (let i = 1; i < nums.length; i++) {
        this.diff[i] = nums[i] - nums[i - 1]
      }
    }
  }
  // 给闭区间 [i, j] 增加 val（可以是负数）
  increment(i, j, val) {
    // console.log(112, i, j, val);
    this.diff[i] += val
    if (j + 1 < this.diff.length) {
      // 注意：当 j+1 >= diff.length 时，说明是对 nums[i] 及以后的整个数组都进行修改，那么就不需要再给 diff 数组减 val 了。
      this.diff[j + 1] -= val
    }
  }
  // 返回结果数组
  result() {
    let res = new Array(this.diff.length).fill(0)
    // console.log(125,this.diff)
    // console.log(this.diff[0])

    // 根据差分数组构造结果数组
    res[0] = this.diff[0]
    for (let i = 1; i < this.diff.length; i++) {
      res[i] = res[i - 1] + this.diff[i]
    }
    return res
  }
}
```

## 3.差分数组（2022-6-5）

> 以下就是我对「差分数组」技巧的理解。（2022-6-5）

### 2.1.【labuladong】：

「差分数组」技巧：使用场景-频繁对原始数组的某个区间的元素进行增减。
比如输入一个数组 nums,要求给区间 nums[2..6]全部加 1，再给 nums[3..9]全部减 3，再给 nums[0..4]全部加 2，再给...。求最后 nums 的值。
「常规思路」：for 循环给 nums[i..j]加上 val，这种思路的算法复杂度是 O(N)，这个场景下对 nums 的修改频繁，效率低下。
所以需要「差分数组」技巧：
（对 nums）构造差分数组 diff，diff[i] = nums[i] - nums[i - 1]
（差分数组 diff）构造（反推）结果数组 res，res[i] = res[i-1] + diff[i]
构造差分数组 diff，快速进行区间增减的操作：想对区间[i..j]的元素全部加 3，只需要让 diff[i] += 3，再让 diff[j+1] -=3 即可。

### 2.2. 【我的思考】：

#### 1）用例子解释上面：

原数组 `nums [8,2,6,3,1]`，
其差分数组为 `diff [8,-6,4,-3,-2]`，
由于差分数组是可以反推原数组 `nums 为 [8,2,6,3,1]`，
想对`nums[1..3]`全部加 3（想对`nums[i..j]`全部加 3）：

【第一步】：想得到 `nums [8,5,9,6,1]`

【第二步】，想得到的 `nums 对应的 diff(现) 为 [8,-3,4,-3,-5]`

【第三步】，和原来的 diff(原)对比，找规律（如何操作 i->j 的 diff(原) 的元素呢？）

diff 原 【`8|-6|4|-3|-2`】
diff 现 【`8|-3|4|-3|-5`】
diff 原(i->j+1) 为 `|-6|4|-3|-2`
diff 现(i->j+1) 为 `|-3|4|-3|-5`

发现：

`i->j+1为1->3+1即1->4`

当 i=1 时：

`diff(原)[1] = -6`
`diff(现)[1] = -3`
`-6+3=-3`

当 j=3(j+1=4)时：

`diff(原)[4] = -2`
`diff(现)[4] = -5`
`-2-3=-5`

也就是：

`diff(原)[i] + 3 = diff(现)[i]`
`diff(原)[j+1] - 3 = diff(现)[j+1]`

变成程序语言：

`diff[i] += 3`
`diff[j+1] -= 3`

【第四步】，（到这里有个疑问）`为何操作的是j+1？`

由结果看出：`diff原中，diff[i] = nums[i] - nums[i-1]`

- 既然让 `nums 的 i->j 全加 3`
- `diff[j+1] = nums[j+1] - nums[j]`

由 `nums[j+1]不变 & nums[j]加了3`
得 `diff[j+1] 要减3`
所以 `操作的是 j+1`。

上述思想就是 `由 原数组 nums，构造差分数组 diff(原)`;

- （想得到 nums 的 i 到 j 区间进行某操作）`对想得到的数组 nums， 构造差分数组 diff(现)`;
- 对`构造的差分数组操作`，就可以`快速`进行`区间增减操作`（高数的意义？）

--------------------line 3

#### 2） 【经过第一、二、三、四步的思考，labuladong 的“原理很简单”很容易理解】：

原理很简单，回想 diff 数组反推 nums 数组的过程，`diff[i] += 3` 意味着给 `nums[i..] 所有的元素都加了 3`，然后 `diff[j+1] -= 3` 又意味着`对于 nums[j+1..] 所有元素再减 3`，**那综合起来**，`是不是就是对 nums[i..j] 中的所有元素都加 3 了？`

这里的原因，全是因为：
`diff[i] = nums[i] - nums[i-1]`
及
`diff[j+1] = nums[j+1] - nums[j]`

--------------------line 4
花费 O(1) 的时间修改 diff 数组，相当于给 nums 的整个区间做了修改。`多次修改 diff -> 通过 diff 数组反推 -> 可得到 nums 修改后的结果。`

--------------------line 5

- 差分数组抽象成类，以后遇到类似的题目，就可以直接用啦~
- 差分数组工具类 class Difference

# 二、算法实践

## <span style="color: red;">注意：</span>

- **实际算法题**需要对题目进行**联想和抽象**，**不会直接**的让你**看出来**要用差分数组技巧。

## 370.区间加法（VIP）

> [370. 区间加法](https://leetcode.cn/problems/range-addition/description/)

## 1109.航班预订统计

> [1109. 航班预订统计](https://leetcode.cn/problems/corporate-flight-bookings/description/)

### 1.读懂题目：

#### 1.1 看本题 `[1109] 航班预订统计`：

- 把 n 个航班，从 1 - n 进行编号，
- 有航班预定表 bookings[i] = [firsti, lasti, seatsi]，
- 意思是：从 firsti 到 lasti （包含 firsti 和 lasti ）的 每个航班 上预订了 seatsi 个座位。
- 返回长度为 n 的数组 answer ，里面的元素是每个航班预定的座位总数。

#### 1.2 把本题翻译一下：

题目绕弯弯，其实就是差分数组题。

- 输入 长度 n 数组 nums ，所有元素都是 0 。
- 输入 bookings ，里面是 若干三元组 (i, j, k) 。
- 其中这组三元组 (i, j, k) 数组区间对应 [i-1, j-1] ：
  （
  因为题目说的 n 是从 1 开始计数的，数组索引从 0 开始，
  所以对于三元组 (i, j, k) ，数组区间应该对应 [i-1, j-1] 。
  ）。
- 每个三元组的含义就是：给 nums 的闭区间 [i-1, j-1] 中所有元素都加上 k。
- 请返回 最后的 nums 数组是多少？

### 2.写出思路：

- 记住差分数组工具类 Difference

- 再看本题 `[1109] 航班预订统计`

### 3.代码实现： corpFlightBookings

直接复用差分数组类：

```js
// 直接复用差分数组类
// 【看来上面 差分数组工具类: Difference 必须记住咯~】
/**
 * @param {number[][]} bookings
 * @param {number} n
 * @return {number[]}
 */
var corpFlightBookings = function (bookings, n) {
  // nums 初始化为全 0
  let nums = new Array(n).fill(0) // 差分数组
  // console.log(nums);
  // 构造差分解法
  const df = new Difference(nums)
  // 这里注意：三元组 (i,j,k) 的 i这个值，不一定就是 当前索引的加1。
  // 现在突然明白。
  for (let key in bookings) {
    const booking = bookings[key]
    // 注意转成数组索引要减一哦
    const i = booking[0] - 1
    const j = booking[1] - 1
    const k = booking[2]
    // 对区间 nums[i..j] 增加 val
    df.increment(i, j, k)
  }
  // 返回最终的结果数组
  return df.result()
}
```

### 4.测试用例：

```js
let bookings = [
    [1, 2, 10],
    [2, 3, 20],
    [2, 5, 25]
  ],
  n = 5,
  bookings2 = [
    [1, 2, 10],
    [2, 2, 15]
  ],
  n2 = 2
let res = corpFlightBookings(bookings, n),
  res2 = corpFlightBookings(bookings2, n2)
console.log(res, res2)
```

## 1094.拼车

> [1094. 拼车](https://leetcode.cn/problems/car-pooling/description/)

### 1.读懂题目：

- 车 de 空座位有 `capacity` 个
- 只能一个方向行驶（不允许掉头或改变方向）
- 给定整数 `capacity` trips.
- trip[i]=[numPassengers,from,to]表示
- 第 i 次旅行，从 from 到 to 位置的有 numPassengers 人。
- 当且仅当你可以在所有的行程中接送所有乘客，返回 true，否则返回 false。

### 2.写出思路：

- 记住差分数组工具类 Difference

### 3.代码实现： carPooling

直接复用差分数组类：

```js
// 差分数组工具类
class Difference {
  // 差分数组
  diff = []
  // 输入一个初始数组，区间操作将在这个数组上进行
  constructor(nums) {
    // console.log(101, nums);
    if (nums.length > 0) {
      this.diff = new Array(nums.length).fill(0)
      // 根据初始数组构造差分数组
      this.diff[0] = nums[0]
      // console.log(105, nums);
      // console.log(106, this.diff);
      for (let i = 1; i < nums.length; i++) {
        this.diff[i] = nums[i] - nums[i - 1]
      }
    }
  }
  // 给闭区间 [i, j] 增加 val（可以是负数）
  increment(i, j, val) {
    // console.log(112, i, j, val);
    this.diff[i] += val
    if (j + 1 < this.diff.length) {
      // 注意：当 j+1 >= diff.length 时，说明是对 nums[i] 及以后的整个数组都进行修改，那么就不需要再给 diff 数组减 val 了。
      this.diff[j + 1] -= val
    }
  }
  // 返回结果数组
  result() {
    let res = new Array(this.diff.length).fill(0)
    // console.log(125,this.diff)
    // console.log(this.diff[0])

    // 根据差分数组构造结果数组
    res[0] = this.diff[0]
    for (let i = 1; i < this.diff.length; i++) {
      res[i] = res[i - 1] + this.diff[i]
    }
    return res
  }
}
```

代码实现：

```js
/**
 * @param {number[][]} trips
 * @param {number} capacity
 * @return {boolean}
 */
var carPooling = function (trips, capacity) {
  // console.log(138, trips, capacity);

  // 最多有 1001 个车站
  let nums = new Array(1001).fill(0)
  // console.log(nums)

  // 构造差分解法
  let df = new Difference(nums)
  // console.log(142,df.diff)
  for (const key in trips) {
    const trip = trips[key]
    // console.log("trip", trip);

    // 乘客数量
    const val = trip[0]

    // 第 trip[1] 站乘客上车
    // 即乘客在车上的区间是 [trip[1], trip[2] - 1]
    const i = trip[1]

    // 第 trip[2] 站乘客已经下车，
    const j = trip[2] - 1
    // console.log(val,i,j)

    // 进行区间操作
    df.increment(i, j, val)
    // console.log(df);
  }
  // console.log(162,df.diff)
  const res = df.result()
  // console.log("res", res);

  // 客车自始至终都不应该超载
  for (let i = 0; i < res.length; i++) {
    if (capacity < res[i]) {
      return false
    }
  }
  return true
}
```

### 4.测试用例：

```js
let trips = [
    [2, 1, 5],
    [3, 3, 7]
  ],
  capacity = 4
let trips2 = [
    [2, 1, 5],
    [3, 3, 7]
  ],
  capacity2 = 5
let res = carPooling(trips, capacity)
let res2 = carPooling(trips2, capacity2)
console.log(res)
console.log(res2)
```

# 参考链接

- [LABULADONG 的算法网站](https://labuladong.online/algo/)
