/*
 * @lc app=leetcode.cn id=78 lang=javascript
 *
 * [78] 子集
 */

// @lc code=start
/*
 * # 1.读懂题目：
 * 求所有子集
 *
 * # 2.写出思路：
 *
 *
 * # 3.代码实现： subsets
 *
 * # 4.测试用例：
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  let res = [];
  // 记录回溯算法的递归路径
  let track = [];

  // 回溯算法核心函数，遍历子集问题的回溯树
  let backtrack = function (nums1, start) {
    // 前序位置，每个节点的值都是一个子集
    console.log(31,
      track)
    res.push([...track]);

    // 回溯算法标准框架
    for (let i = start; i < nums1.length; i++) {
      // 做选择
      track.push(nums1[i]);
      // 通过 start 参数控制树枝的遍历，避免产生重复的子集
      backtrack(nums1, i + 1);
      // 撤销选择
      track.pop();
    }
  };

  // 主函数
  backtrack(nums, 0);
  return res;
};
const nums = [1, 2, 3],
  result = subsets(nums);
console.log(result);
const nums2 = [0],
  result2 = subsets(nums2);
console.log(result2);
// @lc code=end
