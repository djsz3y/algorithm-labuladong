/*
 * @lc app=leetcode.cn id=46 lang=javascript
 *
 * [46] 全排列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  const res = []
  const path = []

  function backtrack(nums) {
    if (!nums.length) {
      res.push([...path])
      return
    }
    for (let i = 0; i < nums.length; i++) {
      const _nums = [...nums]
      const tmp = _nums.splice(i, 1)[0]
      path.push(tmp)
      backtrack(_nums)
      path.pop()
    }
  }

  backtrack(nums)

  return res
}
// @lc code=end
