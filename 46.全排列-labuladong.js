/*
 * @lc app=leetcode.cn id=46 lang=javascript
 *
 * [46] 全排列
 */

// @lc code=start
/*
 * # 1.读懂题目：
 * 返回全排列
 *
 * # 2.写出思路：
 * for 选择 in 选择列表:
 *  # 做选择
 *  将该选择从选择列表移除
 *  路径.add(选择)
 *  backtrack(路径, 选择列表)
 *  # 撤销选择
 *  路径.remove(选择)
 *  将该选择再加入选择列表
 *
 * # 3.代码实现： permute
 *
 * # 4.测试用例：
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
/* 主函数，输入一组不重复的数字，返回它们的全排列 */
var permute = function (nums) {
  let res = [];

  // 记录「路径」
  let track = [];
  // 「路径」中的元素会被标记为 true，避免重复使用
  let used = new Array(nums.length).fill(false);
  // 路径：记录在 track 中
  // 选择列表：nums 中不存在于 track 的那些元素（used[i] 为 false）
  // 结束条件：nums 中的元素全都在 track 中出现
  let backtrack = function (nums, track, used) {
    // 触发结束条件
    if (track.length == nums.length) {
      console.log(44, track);
      res.push([...track]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      // 排除不合法的选择
      if (used[i]) {
        // nums[i] 已经在 track 中，跳过
        continue;
      }
      // 做选择
      track.push(nums[i]);
      used[i] = true;
      // 进入下一层决策树
      backtrack(nums, track, used);
      // 取消选择
      track.pop();
      used[i] = false;
    }
  };
  backtrack(nums, track, used);
  return res;
};
const nums = [1, 2, 3],
  result = permute(nums);
console.log(result);
const nums2 = [0,1],
  result2 = permute(nums2);
console.log(result2);
const nums3 = [1],
  result3 = permute(nums3);
console.log(result3);
// @lc code=end
