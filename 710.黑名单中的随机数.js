/*
 * @lc app=leetcode.cn id=710 lang=javascript
 *
 * [710] 黑名单中的随机数
 */

// @lc code=start
/*
 * 1.读懂题目：
 * 实现 Solution 类：
 * 初始化此类。
 * Solution(int n, int[] blacklist): 初始化整数 n 和被加入黑名单 blacklist 的整数
 * int pick(): 返回一个范围为 [0, n - 1] 且不在黑名单 blacklist 中的随机整数
 * 
 * 优化你的算法，使它最小化调用语言 内置 随机函数的次数。
 * 
 * 每个元素有相同概率被返回，用数组。
 *
 * 2.写出思路：
 * 实现随机集合：
 *
 * 技巧点：
 * 结合哈希表和数组，使 数组 删除操作 时间复杂度 变 O(1)。
 *
 * 难点：
 * 1. 插入 删除 获取随机元素 3操作 时间复杂度 为常数 O(1)。
 * 2. pick() 等概率返回随即元素，即 集合里 n 元素，各元素被返回概率 1/n。
 *
 * 分析：
 * 虽然 HashSet（哈希集合）的3操作（插入&删除&查找），时间复杂度为 O(1)，
 * 但是 为什么 HashSet 不能 O(1)时间 等概率  随机获取元素？
 * 因为 HashSet 底层原理是 大数组，元素通过哈希函数映射索引（元素被哈希函数 分散 整个数组里）；
 * 并且 HashSet 有 哈希冲突，用拉链法解决，索引就会连着一个链表或者红黑树。
 * 所以 HashSet 做不到 O(1)时间 等概率。
 * 虽然 LinkedHashSet（哈希链表）（LRU 缓存）本质 哈希表 配合 双链表，元素存储在双链表。
 * 但是 哈希链表 只给 哈希集合 增加有序性，无法按要求实现 pick()。
 * 因为 底层 用链表 存储元素， 无法 O(1)时间 访问某元素。
 *
 * 根据以上分析：
 * pick() 需要 等概率 & O(1)时间 取出元素，
 * 一定满足：底层 用数组，且必须紧凑。
 * 这样可以：直接生成随机数作为索引，数组取 随机索引-对应元素 作为随机元素。
 * 由于数组 插入 & 删除 时间不是 O(1)
 * 但是 数组-尾部 插入 & 删除，不涉及数据搬迁，时间复杂度为 O(1)。
 *
 * !结论：
 * 删除某 val ，先交换到数组尾部，再 pop 掉。
 * 交换-2元素，必须通过索引交换，需要 哈希表 valToIndex 记录：元素值-对应-索引。
 *
 * 3.代码实现：Solution 类
 *
 * 4.测试用例：
 */
// var Solution = function (n, blacklist) {};
// Solution.prototype.pick = function () {};
class Solution {
  sz;
  mapping;
  /**
   * @param {number} N
   * @param {number[]} blacklist
   */
  constructor(N, blacklist) {
    // 最终数组中的元素个数
    this.sz = N - blacklist.length;
    this.mapping = new Map();
    // 先将所有黑名单数字加入 map
    for (let b in blacklist) {
      // 这里赋值多少都可以
      // 目的仅仅是把键存进哈希表
      // 方便快速判断数字是否在黑名单内
      this.mapping.set(blacklist[b], 666);
    }
    // 最后一个元素的索引
    let last = N - 1;
    // 将黑名单中的索引换到最后去
    for (let b in blacklist) {
      // 如果 b 已经在区间 [sz, N)
      // 可以直接忽略
      if (blacklist[b] >= this.sz) continue;
      // 跳过所有黑名单中的数字
      while (this.mapping.has(last)) {
        last--;
      }
      this.mapping.set(blacklist[b], last);
      last--;
    }
  }
  /**
   * @return {number}
   */
  pick() {
    const random = Math.random();
    const _length = this.sz;
    const index = Math.floor(random * _length);
    console.log(index)
    if (this.mapping.has(index)) {
      return this.mapping.get(index);
    }
    return index;
  }
}
/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(n, blacklist)
 * var param_1 = obj.pick()
 */
let solution = new Solution(7, [2, 3, 5]),
  res1 = solution.pick(),
  res2 = solution.pick(),
  res3 = solution.pick(),
  res4 = solution.pick(),
  res5 = solution.pick(),
  res6 = solution.pick(),
  res7 = solution.pick();
console.log(res1, res2, res3, res4, res5, res6, res7);
// @lc code=end
