/*
 * @lc app=leetcode.cn id=47 lang=javascript
 *
 * [47] 全排列 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// 含重复数字 nums
// 任意顺序
// 所有不重复的全排列
// 输入：nums = [1,1,2]
// 输出：
// [[1,1,2],
//  [1,2,1],
//  [2,1,1]]
var permuteUnique = function (nums) {
  nums = nums.sort((a, b) => a - b)

  // 1. 先写回溯公式
  const result = []
  const path = []

  function backtrack(nums, path) {
    // 2. condition
    //    path
    //    [1,1,2],
    //    [1,2,1],
    //    [2,1,1]
    if (nums.length === 0) {
      result.push([...path])
      return
    }

    for (let i = 0; i < nums.length; i++) {
      // 4.跳过重复值
      if (i > 0 && nums[i] === nums[i - 1]) continue

      // 3. 有重复值全排列，算法
      const _nums = [...nums] // [1, 1, 2]
      const tmp = _nums.splice(i, 1)[0] // 1

      path.push(tmp)
      backtrack(_nums, path)
      path.pop()
    }
  }

  backtrack(nums, path)

  return result
}
// console.log(permuteUnique([1, 1, 2]))
// console.log(permuteUnique([1, 2, 3]))
// @lc code=end
