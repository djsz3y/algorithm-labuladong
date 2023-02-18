/*
 * @lc app=leetcode.cn id=698 lang=javascript
 *
 * [698] 划分为k个相等的子集
 */

// @lc code=start
/*
 * # 1.读懂题目：
 *
 *
 * # 2.写出思路：
 *
 *
 * # 3.代码实现： canPartitionKSubsets
 *
 * # 4.测试用例：
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var canPartitionKSubsets = function (nums, k) {
  let memo = new Map();

  const backtrack = function (k, bucket, nums, start, used, target) {
    // base case
    if (k == 0) {
      // 所有桶都被装满了，而且 nums 一定全部用完了
      return true;
    }
    if (bucket == target) {
      // 装满了当前桶，递归穷举下一个桶的选择
      // 让下一个桶从 nums[0] 开始选数字
      let res = backtrack(k - 1, 0, nums, 0, used, target);
      // 缓存结果
      memo.set(used, res);
      return res;
    }

    if (memo.has(used)) {
      // 避免冗余计算
      return memo.get(used);
    }

    for (let i = start; i < nums.length; i++) {
      // 剪枝
      if (((used >> i) & 1) == 1) {
        // 判断第 i 位是否是 1
        // nums[i] 已经被装入别的桶中
        continue;
      }
      if (nums[i] + bucket > target) {
        continue;
      }
      // 做选择
      used |= 1 << i; // 将第 i 位置为 1
      bucket += nums[i];
      // 递归穷举下一个数字是否装入当前桶
      if (backtrack(k, bucket, nums, i + 1, used, target)) {
        return true;
      }
      // 撤销选择
      used ^= 1 << i; // 使用异或运算将第 i 位恢复 0
      bucket -= nums[i];
    }

    return false;
  };

  // 排除一些基本情况
  if (k > nums.length) return false;
  let sum = 0;
  for (let v of nums) sum += v;
  if (sum % k != 0) return false;

  let used = 0; // 使用位图技巧
  let target = sum / k;
  // k 号桶初始什么都没装，从 nums[0] 开始做选择
  return backtrack(k, 0, nums, 0, used, target);
};

// @lc code=end
