/*
 * @lc app=leetcode.cn id=704 lang=javascript
 *
 * [704] 二分查找
 */

// @lc code=start
/*
 * # 1.读懂题目：
 * 整型数组 nums 包含 n 个有序的升序元素
 * 目标值 target
 * 在 nums 中搜索target，存在返回下标，不存在返回-1。
 * 可以假设nums的所有元素是不重复的。
 * n将在[1,10000]之间
 * nums 的每个元素都将在 [-9999, 9999]之间。
 *
 * # 2.写出思路：
 * ## [二分搜索]算法技巧：
 * 
 * 使用寻找一个数（基本的二分搜索）
 * 做指针设置 0，右指针设置 nums 长度-1.
 * while 循环 left <= right ，因为右指针是长度-1。
 * 找中位，防止左右指针太大直接相加导致溢出。
 * 中位数 nums[mid] 对比目标 target 等于？ 小于？ 大于？
 * 等于即：找到目标值停止搜索
 * 这里注意：由于搜索区间两端都闭 [left,right] ，发现索引 mid 不是要找的 target 时， mid 已经搜索过，应该从搜索区间中去除。
 * 小于即：要去右边找，所以把左指针设置为 mid + 1。
 * 大于即：要去左边找，所以把右指针设置为 mid - 1。
 * 
 * ## 注意细节：
 * 
 * ### 1). 使用 while(left <= right) 而不使用 while(left < right) 的原因。
 * 
 * 终止条件分别为：
 * left == right+1 区间为 [right+1,right] [3,2] -> while 循环终止时正确的，返回-1。
 * left == right 区间为 [right,right] [2,2] -> while 循环终止时[2,2]里的 2 被漏掉了，索引 2 没有被搜索，直接返回 -1 是错误的。
 * 如果非要使用 while(left < right) 可以打个补丁：while 语句后面【不能直接 return -1】，应该 return nums[left] == target ? left : -1;
 * 
 * ### 2). 使用 left = mid + 1 & right = mid - 1。
 * 
 * 因为 mid 已经搜索过，应该从搜索区间中去除。
 * 
 * ### 3). 此算法的局限性。
 * 
 * 有序数组 nums = [1,2,2,2,3], target = 2。
 * 此算法返回索引 2 ；但无法得到 target 的左侧边界（索引 1）和右侧边界（索引 3），此算法无法处理，如果向左、右线性搜索，难以保证二分查找对数级的复杂度。
 * 这就要用到 `二、寻找左侧边界的二分搜索` 和 `三、寻找右侧边界的二分查找`
 *
 * # 3.代码实现： search
 *
 * # 4.测试用例：
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    let mid = left + (right - left) / 2; // 防止 left & right 太大相加导致溢出
    mid = Math.floor(mid); // JavaScript 向下取整，可是困难到我了，测试用例运行 Run Code 一直不出结果，因为别的语言自动取整了，我要手动取整。
    if (nums[mid] == target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    }
  }
  return -1;
};
// let nums = [-1, 0, 3, 5, 9, 12],
//   target = 9;
// let nums2 = [-1, 0, 3, 5, 9, 12],
//   target2 = 2;
// let res = search(nums, target);
// let res2 = search(nums2, target2);
// console.log(73, res, "-", res2);
// @lc code=end
