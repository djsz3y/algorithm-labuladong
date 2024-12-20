/*
 * @lc app=leetcode.cn id=26 lang=javascript
 *
 * [26] 删除有序数组中的重复项
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/*
 * 1.读懂题目：
 * 升序排列数组 nums
 * 原地删除重复元素
 * 返回删除后数组新长度
 * 保持元素相对顺序一致
 * --------------------------------------
 * // console.log(3 * Math.pow(10, 4));
 * let length = nums.length;
 * if (length <= 3 * Math.pow(10, 4) && length >= 0) {
 *   nums = Array.from(new Set(nums));
 *   return nums.length;
 * }
 * 看了labuladong的第26题题解，得知 ：
 * 我之前的做法是：不原地修改的题解。
 * 现在是原地修改的题解，才是对的。
 * --------------------------------------
 *
 * 2.写出思路：
 * 【不是原地修改】：new一个int类型数组-》把去重之后的元素放进新数组-》返回新数组。
 * 【原地修改】：不允许new新数组-》只能在原数组上操作，返回新长度-》通过返回的长度&原始数组=移除后的元素有哪些。
 * 【和 27.移除元素 一样的思路】：
 * 【快慢指针技巧】：快指针探路，慢指针在后，快指针每找到一个不等于val的元素就赋值给slow并让slow前进一步。
 * 这样保证了nums[0...slow]就是整个数组移除等于val的元素之后的结果。
 *
 * --------------------------------------
 * 【2024-4-7】
 * 1.读懂题目：让在有序数组去重。
 * 2.写出思路：明白原地修改的 What Why How。
 * （1）先判长度 0 直接 return 0；
 * （2）声明快慢指针；
 * （3）快到最后就结束，所以 while(fast < nums.length)；
 * （4）一开始快慢重合，快慢值相等，让快++，所以 fast++；
 * （5）这里思考一下，假如所有元素都相等，fast 直接走到最后了；
 * （6）如果快慢值不相等（至少有两个值不相等，就要包含一些普遍情况了）：
 * 首先，**让慢++，是为了留下重复元素**；
 * 其次，**快值赋值给慢值，是为了**快值的不重复新元素往前移，**直接覆盖前面重复元素的位置**，也就**维护了 `nums[0..slow]` 无重复**；
 * （7）循环完后，`slow + 1` 就是长度；
 *
 * 3.代码实现： removeDuplicates
 *
 * 4.测试用例：
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  // 原地删除
  if (nums.length === 0) return 0

  let slow = (fast = 0)

  while (fast < nums.length) {
    if (nums[slow] !== nums[fast]) {
      slow++
      nums[slow] = nums[fast]
    }
    fast++
  }

  return slow + 1
}
// @lc code=end
