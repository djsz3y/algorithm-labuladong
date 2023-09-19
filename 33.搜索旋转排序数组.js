/*
 * @lc app=leetcode.cn id=33 lang=javascript
 *
 * [33] 搜索旋转排序数组
 */

// @lc code=start
/**
 * # 读懂题目：
 * 1. 首先：整数升序元素互不相同数组 nums ，
 *    未知下标 k 位置，元素旋转 180° 。
 * 2. 比如：[0,1,2,4,5,6,7] 下标 3 处 -> [4,5,6,7,0,1,2]
 * 3. 已知：旋转后数组 nums ，整数 target
 * 4. 求： search(nums, target) 函数，
 *    target 在 nums ，
 * - 存在返回下标，
 * - 不存在返回-1 。
 * 5. 时间复杂度 O(log n) 。
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// 旋转后 的数组 nums [4,5,6,7,0,1,2]
// 目标值 target
// 存在返回它的下标，否则返回 -1 。
// 时间复杂度为 O(log n)
// 输入：nums = [4,5,6,7,0,1,2], target = 0
// 输出：4
var search = function (nums, target) {
  let low = 0,
    high = nums.length - 1

  while (low <= high) {
    let mid = low + ((high - low) >> 1)

    // 如果中值是目标值，返回mid
    if (nums[mid] === target) {
      return mid
    }

    // 1. 先判断左边有序还是右边有序。
    // 2. 左边有序，就判断目标值target是否在左边范围内；
    //    在左边，滑动窗口左移；否做右移。
    // 3. 右边有序，判断目标值target是否在右边范围内；
    //    在右边，滑动窗口右移；否则左移。
    // 4. 注意 target 和 nums[mid] 要么大，要么小，不存在 >= 和 <= 情况；
    //    如果存在之前就已经 return 了。
    if (nums[mid] >= nums[high]) {
      // 左边有序——[low, mid)
      if (nums[low] <= target && target < nums[mid]) {
        high = mid - 1
      } else {
        low = mid + 1
      }
    } else if (nums[mid] < nums[high]) {
      // 右边有序——(mid, high]
      if (nums[mid] < target && target <= nums[high]) {
        low = mid + 1
      } else {
        high = mid - 1
      }
    }
  }

  return -1
}
// @lc code=end
