/*
 * @lc app=leetcode.cn id=380 lang=javascript
 *
 * [380] O(1) 时间插入、删除和获取随机元素
 */

// @lc code=start
/*
 * 1.读懂题目：
 * 实现 RandomizedSet 类：
 * 初始化此类。
 * bool insert(int val): val不存：插入 & 返 true；否则返 false。
 * bool remove(int val): val存：移除该项&返 true；否则返 false。
 * int getRandom()：随意返回现有集合的一项，哈希表。
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
 * 2. getRandom() 等概率返回随即元素，即 集合里 n 元素，各元素被返回概率 1/n。
 *
 * 分析：
 * 虽然 HashSet（哈希集合）的3操作（插入&删除&查找），时间复杂度为 O(1)，
 * 但是 为什么 HashSet 不能 O(1)时间 等概率  随机获取元素？
 * 因为 HashSet 底层原理是 大数组，元素通过哈希函数映射索引（元素被哈希函数 分散 整个数组里）；
 * 并且 HashSet 有 哈希冲突，用拉链法解决，索引就会连着一个链表或者红黑树。
 * 所以 HashSet 做不到 O(1)时间 等概率。
 * 虽然 LinkedHashSet（哈希链表）（LRU 缓存）本质 哈希表 配合 双链表，元素存储在双链表。
 * 但是 哈希链表 只给 哈希集合 增加有序性，无法按要求实现 getRandom()。
 * 因为 底层 用链表 存储元素， 无法 O(1)时间 访问某元素。
 *
 * 根据以上分析：
 * getRandom() 需要 等概率 & O(1)时间 取出元素，
 * 一定满足：底层 用数组，且必须紧凑。
 * 这样可以：直接生成随机数作为索引，数组取 随机索引-对应元素 作为随机元素。
 * 由于数组 插入 & 删除 时间不是 O(1)
 * 但是 数组-尾部 插入 & 删除，不涉及数据搬迁，时间复杂度为 O(1)。
 *
 * !结论：
 * 删除某 val ，先交换到数组尾部，再 pop 掉。
 * 交换-2元素，必须通过索引交换，需要 哈希表 valToIndex 记录：元素值-对应-索引。
 *
 * 3.代码实现：RandomizedSet 类
 * 19/19 cases passed (328 ms)
 * Your runtime beats 95.75 % of javascript submissions
 * Your memory usage beats 91.28 % of javascript submissions (89.5 MB)
 *
 * 4.测试用例：
 */
class RandomizedSet {
  constructor() {
    this.nums = [];
    this.valToIndex = new Map();
  }
  insert(val) {
    const _length = this.nums.length;
    if (this.valToIndex.has(val)) return false;
    this.valToIndex.set(val, _length);
    this.nums.push(val);
    return true;
  }
  remove(val) {
    const _length = this.nums.length;
    if (!this.valToIndex.has(val)) return false;
    const index = this.valToIndex.get(val);
    this.valToIndex.set(this.nums[_length - 1], index);
    const swap = () => {
      const temp = this.nums[index];
      this.nums[index] = this.nums[_length - 1];
      this.nums[_length - 1] = temp;
    };
    swap();
    this.nums.pop();
    this.valToIndex.delete(val);
    return true;
  }
  getRandom() {
    const random = Math.random();
    const _length = this.nums.length;
    const rInd = Math.floor(random * _length);
    return this.nums[rInd];
  }
}
/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */
let randomizedSet = new RandomizedSet();
let param_1 = randomizedSet.insert(1); // 向集合中插入 1 。返回 true 表示 1 被成功地插入。
let param_2 = randomizedSet.remove(2); // 返回 false ，表示集合中不存在 2 。
let param_3 = randomizedSet.insert(2); // 向集合中插入 2 。返回 true 。集合现在包含 [1,2] 。
let param_4 = randomizedSet.getRandom(); // getRandom 应随机返回 1 或 2 。
let param_5 = randomizedSet.remove(1); // 从集合中移除 1 ，返回 true 。集合现在包含 [2] 。
let param_6 = randomizedSet.insert(2); // 2 已在集合中，所以返回 false 。
let param_7 = randomizedSet.getRandom(); // 由于 2 是集合中唯一的数字，getRandom 总是返回 2 。
console.log(param_1, param_2, param_3, param_4, param_5, param_6, param_7);
// @lc code=end
