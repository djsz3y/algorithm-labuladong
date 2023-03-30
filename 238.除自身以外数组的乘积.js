/*
 * @lc app=leetcode.cn id=238 lang=javascript
 *
 * [238] 除自身以外数组的乘积
 */

// @lc code=start
/*
 * # 1.读懂题目：
 * 整数数组nums，返回数组answer,
 * answer[i] = nums[0] * nums[1] * ... * nums[i-1] * nums[i+1] * ... * nums[n]
 * 不用除法
 * O(n) 时间复杂度内完成此题。
 *
 * # 2.写出思路：
 *
 * ## 2.1 前缀和数组技巧：
 *
 * ### 2.1.1 前缀和 preSum ：
 * `preSum[0] = 0, preSum[i] = preSum[i-1] + nums[i-1]`
 * `i = 1, preSum[1] = preSum[0] + nums[0]`
 * `i = n` ，依此类推...。
 *
 * ## 2.2 前缀积数组技巧：
 *
 * ### 2.2.1. 前缀积 preMul
 * `preMul[0] = 1, preMul[i] = preMul[i-1] * nums[i-1]`
 * `i = 1, preMul[1] = preMul[0] * nums[0]`
 * `i = n` ，依此类推...。
 *
 * ### 2.2.2. 后缀积 sufMul
 * `sufMul[n] = 1, sufMul[i] = sufMul[i+1] * nums[i+1]`
 * `i = n-1, sufMul[n-1] = sufMul[n] * nums[n]`
 * `i = i` ，依此类推... , `sufMul[i] = sufMul[i+1] * nums[i+1]`。
 *
 *
 * # 3.代码实现： productExceptSelf
 * 
 * ## 一、前缀积（从左到右的前缀积）
 * 1. 在上述思路中，当：
 * 假设 preMul[0] = 1 ，
 * 那么 preMul[1] = preMul[0] * nums[0]
 * 从而构造了前缀积数组 preMul ： preMul[i] = preMul[i-1] * nums[i-1]
 * 
 * 2. 在本道题中，同理：
 * 假设 prefix[0] = nums[0] ，
 * 那么 prefix[1] = prefix[0] * nums[1]
 * 从而构造了前缀积数组 prefix ： prefix[i] = prefix[i-1] * nums[i]
 * 
 * ## 二、后缀积（从右到左的前缀积）
 * 1. 在上述思路中，当：
 * 假设 sufMul[n] = 1 ，
 * 那么 sufMul[n-1] = sufMul[n] * nums[n]
 * 从而构造了后缀积数组 sufMul ： sufMul[i] = sufMul[i+1] * nums[i+1]

 * 2. 在本道题中，同理：
 * 假设 suffix[n-1] = nums[n-1] ，
 * 那么 suffix[n-1] = suffix[n] * nums[n-1] (其中，suffix[n] = 1)
 * 从而构造了后缀积数组 suffix ： suffix[i] = suffix[i+1] * nums[i]
 * 
 * ## 三、元素积（结果数组）
 * 确定特殊情况（开头、结尾）元素积：
 * 开头：res[0] = suffix[1];
 * 结尾：res[n - 1] = prefix[n - 2];
 * 构造元素积数组 res ： res[i] = prefix[i - 1] * suffix[i + 1]
 *
 * # 4.测试用例：
 */
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  let n = nums.length;
  // 一、前缀积（从左到右的前缀积）
  // 1. 在上述思路中，当：
  // 假设 preMul[0] = 1 ，
  // 那么 preMul[1] = preMul[0] * nums[0]
  // 从而构造了前缀积数组 preMul ： preMul[i] = preMul[i-1] * nums[i-1]

  // 2. 在本道题中，同理：
  // 假设 prefix[0] = nums[0] ，
  // 那么 prefix[1] = prefix[0] * nums[1]
  // 从而构造了前缀积数组 prefix ： prefix[i] = prefix[i-1] * nums[i]
  let prefix = new Array(n);
  prefix[0] = nums[0];
  for (let i = 1; i < nums.length; i++) {
    prefix[i] = prefix[i - 1] * nums[i]; // 从左到右的前缀积，prefix[i] 是 nums[0..i] 的元素积
  }

  // 二、后缀积（从右到左的前缀积）
  // 1. 在上述思路中，当：
  // 假设 sufMul[n] = 1 ，
  // 那么 sufMul[n-1] = sufMul[n] * nums[n]
  // 从而构造了后缀积数组 sufMul ： sufMul[i] = sufMul[i+1] * nums[i+1]

  // 2. 在本道题中，同理：
  // 假设 suffix[n-1] = nums[n-1] ，
  // 那么 suffix[n-1] = suffix[n] * nums[n-1] (其中，suffix[n] = 1)
  // 从而构造了后缀积数组 suffix ： suffix[i] = suffix[i+1] * nums[i]
  let suffix = new Array(n);
  suffix[n - 1] = nums[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    suffix[i] = suffix[i + 1] * nums[i]; // 从右到左的前缀积，suffix[i] 是 nums[i..n-1] 的元素积
  }

  // 三、元素积（结果数组）
  let res = new Array(n);
  // 确定特殊情况（开头、结尾）元素积
  // 构造元素积数组 res ： res[i] = prefix[i - 1] * suffix[i + 1]
  res[0] = suffix[1];
  res[n - 1] = prefix[n - 2];
  for (let i = 1; i < n - 1; i++) {
    res[i] = prefix[i - 1] * suffix[i + 1]; // 除了 nums[i] 自己的元素积就是 nums[i] 左侧和右侧所有元素之积
  }
  return res;
};
// const nums = [1, 2, 3, 4],
//   res = productExceptSelf(nums);
// const nums2 = [-1, 1, 0, -3, 3],
//   res2 = productExceptSelf(nums2);
// console.log(92, res);
// console.log(93, res2);
// @lc code=end
