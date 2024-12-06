/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  // 数组长度范围判断
  // 数字在范围内
  // 目标数字在范围内
  // for in loop nums
  // for in loop nums
  // 对比 和为target return

  // 方法：循环数据，每次记录 target - 当前值 得数在映射中存在不？
  // 存在就返回两个index。

  let valToIndex = new Map()
  for (let i = 0; i < nums.length; i++) {
    let need = target - nums[i]
    if (valToIndex.has(need)) {
      return [valToIndex.get(need), i]
    }
    valToIndex.set(nums[i], i)
  }
  return null
}
// const res1 = twoSum([2, 7, 11, 15], 9)
// const res2 = twoSum([3, 2, 4], 6)
// const res3 = twoSum([3, 3], 6)
// console.log(res1, res2, res3)
// @lc code=end

// @after-stub-for-debug-begin
module.exports = twoSum
// @after-stub-for-debug-end
