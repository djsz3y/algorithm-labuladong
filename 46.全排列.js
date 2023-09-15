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
// 1. 读懂题目：
// 不含重复数字的数组 nums
// 全排列
// 按任意顺序
// 2. 写出思路：
// nums = [1,2,3]
// [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
var permute = function (nums) {
  // 1.先写回溯公式
  const result = []
  const path = []

  // 2.考虑backtrack参数
  function backtrack(nums, path) {
    // 5.condition
    //    nums.length === 0
    if (nums.length === 0) {
      result.push([...path])
      return
    }
    // 3.for：循环 nums
    for (let i = 0; i < nums.length; i++) {
      // 全排列：

      // 第一波 for 循环：
      //   [1,2,3]        [1,2,3]         [1,2,3]   ----------> nums
      //    1                2                 3    ----------> tmp[0]

      // 第二波 for 循环：
      // [2,3] [2,3]    [1,3] [1,3]     [1,2] [1,2] ----------> _nums
      //  2       3      1       3       1       2  ----------> tmp[0]

      // 第三波 for 循环：
      //   [3] [2]        [3] [1]         [2] [1]   ----------> _nums
      //    3   2          3   1           2   1    ----------> tmp[0]

      const _nums = [...nums]
      const tmp = _nums.splice(i, 1) // tmp[0] 是当前要push的值

      path.push(tmp[0]) // 4.path 元素为 nums[i]

      backtrack(_nums, path)

      path.pop()
    }
  }

  // 2.考虑backtrack参数
  backtrack(nums, path)

  return result
}
// 测试
// console.log(permute([1, 2, 3]))
// console.log(permute([0, 1]))
// console.log(permute([1]))
// @lc code=end
