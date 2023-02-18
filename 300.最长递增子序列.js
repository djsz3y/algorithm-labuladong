/*
 * @lc app=leetcode.cn id=300 lang=javascript
 *
 * [300] 最长递增子序列
 */

// @lc code=start
/*
 * # 1.读懂题目：
 * 
 * 
 * # 2.写出思路：
 * 
 * 
 * # 3.代码实现： lengthOfLIS
 * 
 * # 4.测试用例：
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
  let top = new Array(nums.length).fill(-1);
  // 牌堆数初始化为 0
  let piles = 0;
  for (let i = 0; i < nums.length; i++) {
      // 要处理的扑克牌
      let poker = nums[i];

      /***** 搜索左侧边界的二分查找 *****/
      let left = 0, right = piles;
      while (left < right) {
          let mid = (left + right) / 2;
          if (top[mid] > poker) {
              right = mid;
          } else if (top[mid] < poker) {
              left = mid + 1;
          } else {
              right = mid;
          }
      }
      /*********************************/
      
      // 没找到合适的牌堆，新建一堆
      if (left == piles) piles++;
      // 把这张牌放到牌堆顶
      top[left] = poker;
  }
  // 牌堆数就是 LIS 长度
  return piles;
};

// @lc code=end

