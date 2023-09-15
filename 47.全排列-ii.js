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
// 可包含重复数字的序列 nums
// 任意顺序
// 返回不重复的全排列
// [1,1,2]
// [[1,1,2],
//  [1,2,1],
//  [2,1,1]]
var permuteUnique = function (nums) {
  nums.sort((a, b) => a - b)

  // 先写回溯公式
  const result = []
  const path = []

  function backtrack(nums) {
    // condition
    if (nums.length === 0) {
      result.push([...path])
      return
    }

    for (let i = 0; i < nums.length; i++) {
      if (i > 0 && nums[i] === nums[i - 1]) continue
      let _nums = [...nums]
      let tmp = _nums.splice(i, 1)[0]
      path.push(tmp)
      backtrack(_nums)
      path.pop()
    }
  }

  backtrack(nums)

  return result
}
// @lc code=end
