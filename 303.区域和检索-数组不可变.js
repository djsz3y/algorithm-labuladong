/*
 * @lc app=leetcode.cn id=303 lang=javascript
 *
 * [303] 区域和检索 - 数组不可变
 */

// @lc code=start
/*
 * 1.读懂题目：
 * 整数数组 `nums` ，
 * 计算索引 `left` 和 `right` 之间的 `nums` 元素的和，其中 `left <= right`。
 * 实现 `NumArray` 类：
 * `NumArray(nums)` 使用数组 `nums` 初始化对象
 * `sumRange(i,j)` 返回数组 `nums` 中索引 `left` 和 `right` 之间的元素的总和，
 * 包含 `left` 和 `right` 两点（也就是 `nums[left] + nums[left +1] + ... + nums[right]`）
 *
 * 2.写出思路：
 * 构造前缀和数组 `preSum` ，其中 `preSum[0] = 0` ， `preSum[i] = preSum[i-1] + nums[i-1]`
 * `i = 1` ，`preSum[1] = preSum[0] + nums[0]`
 * `i = n` ，依此类推...。
 * `preSum[i]` 代表 `nums[0..i-1]` 所有元素的累加和。
 * 
 * 要想求区间 `[left,right]` 累加和，
 * 只需要时间复杂度为O(1)的算法：计算 `preSum[right+1] - preSum[left]` 即可。
 * 而不需要时间复杂度为 O(N) 的遍历整个区间求和 `for(let i=left i<=right;i++){ res += nums[i]}`。
 *
 * 3.代码实现： NumArray
 *
 * 4.测试用例：
 */
// var NumArray = function (nums) {};
// NumArray.prototype.sumRange = function (left, right) {};
class NumArray {
  preSum; // 前缀和数组
  // 输入一个数组，构造前缀和
  constructor(nums) {
    // preSum[0] = 0，便于计算累加和
    this.preSum = new Array(nums.length + 1).fill(0);
    // 计算 nums 的累加和
    for (let i = 1; i < this.preSum.length; i++) {
      this.preSum[i] = this.preSum[i - 1] + nums[i - 1];
    }
  }
  // 查询闭区间 [left,right] 的累加和
  sumRange(left, right) {
    return this.preSum[right + 1] - this.preSum[left];
  }
}
/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(left,right)
 */
let nums = [-2, 0, 3, -5, 2, -1];
let lrArr = [
  [0, 2],
  [2, 5],
  [0, 5],
];
lrArr.forEach((sRArg) => {
  let left = sRArg[0],
    right = sRArg[1];
  let obj = new NumArray(nums);
  let param_1 = obj.sumRange(left, right);
  console.log(param_1);
});
// @lc code=end
