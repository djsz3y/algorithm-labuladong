/*
 * @lc app=leetcode.cn id=1094 lang=javascript
 *
 * [1094] 拼车
 */

// @lc code=start
/*
 * 1.读懂题目：
 * 车de空座位有 `capacity` 个
 * 只能一个方向行驶（不允许掉头或改变方向）
 * 给定整数 `capacity` trips.
 * trip[i]=[numPassengers,from,to]表示
 * 第i次旅行，从 from 到 to 位置的有numPassengers人。
 * 当且仅当你可以在所有的行程中接送所有乘客，返回true，否则返回false。
 *
 * 2.写出思路：
 * --------------------
 * 【labuladong】：
 * 「差分数组」技巧：使用场景-频繁对原始数组的某个区间的元素进行增减。
 * 比如输入一个数组nums,要求给区间nums[2..6]全部加1，再给nums[3..9]全部减3，再给nums[0..4]全部加2，再给...。求最后nums的值。
 * 「常规思路」：for循环给 nums[i..j]加上val，这种思路的算法复杂度是O(N)，这个场景下对nums的修改频繁，效率低下。
 * 所以需要「差分数组」技巧：
 * （对 nums）构造差分数组 diff，diff[i] = nums[i] - nums[i - 1]
 * （差分数组diff）构造（反推）结果数组res，res[i] = res[i-1] + diff[i]
 * 构造差分数组diff，快速进行区间增减的操作：想对区间[i..j]的元素全部加3，只需要让 diff[i] += 3，再让 diff[j+1] -=3 即可。
 * --------------------
 * 【我的思考】：
 * 用例子解释上面：
 * 原数组 nums [8,2,6,3,1]
 * 其差分数组为 diff [8,-6,4,-3,-2]
 * 由于差分数组是可以反推原数组 nums 为 [8,2,6,3,1]
 * 想对nums[1..3]全部加3（想对nums[i..j]全部加3）：
 * 第一步：想得到 nums [8,5,9,6,1]
 * 第二步，想得到的 nums 对应的 diff(现) 为 [8,-3,4,-3,-5]
 * 第三步，和原来的diff(原)对比，找规律（如何操作 i->j 的 diff(原) 的元素呢？）
 * diff原 【8|-6|4|-3|-2】
 * diff现 【8|-3|4|-3|-5】
 * diff原(i->j+1) 为 |-6|4|-3|-2
 * diff现(i->j+1) 为 |-3|4|-3|-5
 *
 * 发现：
 * i->j+1为1->3+1即1->4
 * 当i=1时：
 * diff(原)[1] = -6
 * diff(现)[1] = -3
 * -6+3=-3
 * 当j=3(j+1=4)时：
 * diff(原)[4] = -2
 * diff(现)[4] = -5
 * -2-3=-5
 *
 * 也就是：
 * diff(原)[i] + 3 = diff(现)[i]
 * diff(原)[j+1] - 3 = diff(现)[j+1]
 *
 * 变成程序语言：
 * diff[i] += 3
 * diff[j+1] -= 3
 *
 * 第四步，（到这里有个疑问）为何操作的是j+1？
 * 由结果看出：diff原中，diff[i] = nums[i] - nums[i-1]
 * 既然让 nums 的 i->j 全加 3
 * diff[j+1] = nums[j+1] - nums[j]
 * 由          nums[j+1]不变 & nums[j]加了3
 * 得    diff[j+1] 要减3
 * 所以  操作的是 j+1。
 *
 * 上述思想就是 由 原数组 nums，构造差分数组 diff(原);
 * （想得到 nums 的 i 到 j 区间进行某操作）对想得到的数组 nums， 构造差分数组 diff(现);
 * 对构造的差分数组操作，就可以快速进行区间增减操作（高数的意义？）
 * --------------------
 * 【经过第一、二、三、四步的思考，labuladong的“原理很简单”很容易理解】：
 * 原理很简单，回想 diff 数组反推 nums 数组的过程，diff[i] += 3 意味着给 nums[i..] 所有的元素都加了 3，然后 diff[j+1] -= 3 又意味着对于 nums[j+1..] 所有元素再减 3，那综合起来，是不是就是对 nums[i..j] 中的所有元素都加 3 了？
 *
 * 这里的原因，全是因为：
 * diff[i] = nums[i] - nums[i-1]
 * 及
 * diff[j+1] = nums[j+1] - nums[j]
 *
 * --------------------
 * 花费 O(1) 的时间修改 diff 数组，相当于给 nums 的整个区间做了修改。多次修改 diff -> 通过 diff 数组反推 -> 可得到 nums 修改后的结果。
 *
 * --------------------
 * 差分数组抽象成类，以后遇到类似的题目，就可以直接用啦~
 * 差分数组工具类 class Difference
 *
 * --------------------以上就是我对「差分数组」技巧的理解。
 *
 * 再看本题 [1094] 拼车
 *
 * 3.代码实现： carPooling
 *
 * 4.测试用例：
 */
// 差分数组工具类
class Difference {
  // 差分数组
  diff = [];
  // 输入一个初始数组，区间操作将在这个数组上进行
  constructor(nums) {
    // console.log(101, nums);
    if (nums.length > 0) {
      this.diff = new Array(nums.length).fill(0);
      // 根据初始数组构造差分数组
      this.diff[0] = nums[0];
      // console.log(105, nums);
      // console.log(106, this.diff);
      for (let i = 1; i < nums.length; i++) {
        this.diff[i] = nums[i] - nums[i - 1];
      }
    }
  }
  // 给闭区间 [i, j] 增加 val（可以是负数）
  increment(i, j, val) {
    // console.log(112, i, j, val);
    this.diff[i] += val;
    if (j + 1 < this.diff.length) {
      // 注意：当 j+1 >= diff.length 时，说明是对 nums[i] 及以后的整个数组都进行修改，那么就不需要再给 diff 数组减 val 了。
      this.diff[j + 1] -= val;
    }
  }
  // 返回结果数组
  result() {
    let res = new Array(this.diff.length).fill(0);
    // console.log(125,this.diff)
    // console.log(this.diff[0])

    // 根据差分数组构造结果数组
    res[0] = this.diff[0];
    for (let i = 1; i < this.diff.length; i++) {
      res[i] = res[i - 1] + this.diff[i];
    }
    return res;
  }
}
/**
 * @param {number[][]} trips
 * @param {number} capacity
 * @return {boolean}
 */
var carPooling = function (trips, capacity) {
  // console.log(138, trips, capacity);

  // 最多有 1001 个车站
  let nums = new Array(1001).fill(0);
  // console.log(nums)

  // 构造差分解法
  let df = new Difference(nums);
  // console.log(142,df.diff)
  for (const key in trips) {
    const trip = trips[key];
    // console.log("trip", trip);

    // 乘客数量
    const val = trip[0];

    // 第 trip[1] 站乘客上车
    // 即乘客在车上的区间是 [trip[1], trip[2] - 1]
    const i = trip[1];

    // 第 trip[2] 站乘客已经下车，
    const j = trip[2] - 1;
    // console.log(val,i,j)

    // 进行区间操作
    df.increment(i, j, val);
    // console.log(df);
  }
  // console.log(162,df.diff)
  const res = df.result();
  // console.log("res", res);

  // 客车自始至终都不应该超载
  for (let i = 0; i < res.length; i++) {
    if (capacity < res[i]) {
      return false;
    }
  }
  return true;
};

// // 4.测试用例：
// let trips = [
//     [2, 1, 5],
//     [3, 3, 7],
//   ],
//   capacity = 4;
// let trips2 = [
//     [2, 1, 5],
//     [3, 3, 7],
//   ],
//   capacity2 = 5;
// let res = carPooling(trips, capacity);
// let res2 = carPooling(trips2, capacity2);
// console.log(res);
// console.log(res2);
// @lc code=end
