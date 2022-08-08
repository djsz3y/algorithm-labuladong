/*
 * @lc app=leetcode.cn id=1109 lang=javascript
 *
 * [1109] 航班预订统计
 */

// @lc code=start
/*
 * 1.读懂题目：
 * --------------------
 * 1.1 实际算法题需要对题目进行联想和抽象，不会直接的让你看出来要用差分数组技巧。
 * 1.2 看本题 [1109] 航班预订统计：
 * 把 n 个航班，从 1 - n 进行编号，
 * 有航班预定表 bookings[i] = [firsti, lasti, seatsi]，
 * 意思是：从 firsti 到 lasti （包含 firsti 和 lasti ）的 每个航班 上预订了 seatsi 个座位。
 * 返回长度为 n 的数组 answer ，里面的元素是每个航班预定的座位总数。
 * --------------------
 * 1.3 把本题翻译一下：
 * 题目绕弯弯，其实就是差分数组题。
 * 输入 长度 n 数组 nums ，所有元素都是 0 。
 * 输入 bookings ，里面是 若干三元组 (i, j, k) 。
 * 其中这组三元组 (i, j, k) 数组区间对应 [i-1, j-1] ：
 * （
 * 因为题目说的 n 是从 1 开始计数的，数组索引从 0 开始，
 * 所以对于三元组 (i, j, k) ，数组区间应该对应 [i-1, j-1] 。
 * ）。
 * 每个三元组的含义就是：给 nums 的闭区间 [i-1, j-1] 中所有元素都加上 k。
 * 请返回 最后的 nums 数组是多少？
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
 * 再看本题 [1109] 航班预订统计
 *
 * 3.代码实现： corpFlightBookings
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
// 直接复用差分数组类
// 【看来上面 差分数组工具类: Difference 必须记住咯~】
/**
 * @param {number[][]} bookings
 * @param {number} n
 * @return {number[]}
 */
var corpFlightBookings = function (bookings, n) {
  // nums 初始化为全 0
  let nums = new Array(n).fill(0); // 差分数组
  // console.log(nums);
  // 构造差分解法
  const df = new Difference(nums);
  // 这里注意：三元组 (i,j,k) 的 i这个值，不一定就是 当前索引的加1。
  // 现在突然明白。
  for (let key in bookings) {
    const booking = bookings[key];
    // 注意转成数组索引要减一哦
    const i = booking[0] - 1;
    const j = booking[1] - 1;
    const k = booking[2];
    // 对区间 nums[i..j] 增加 val
    df.increment(i, j, k);
  }
  // 返回最终的结果数组
  return df.result();
};
let bookings = [
    [1, 2, 10],
    [2, 3, 20],
    [2, 5, 25],
  ],
  n = 5,
  bookings2 = [
    [1, 2, 10],
    [2, 2, 15],
  ],
  n2 = 2;
let res = corpFlightBookings(bookings, n),
  res2 = corpFlightBookings(bookings2, n2);
console.log(res, res2);
// @lc code=end
