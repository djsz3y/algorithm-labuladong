/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 */

// @lc code=start
/*
 * 1.读懂题目：
 * 给定字符串 s，
 * 找出不含重复字符的，
 * 最长子串 de 长度。
 *
 * 2.写出思路：
 * 【滑动窗口算法思想】：
 * 字符串 s 中使用双指针的左右指针技巧，左闭右开区间 [left,right) 称为一个窗口
 * 先不断增加 right 指针扩大窗口，直到窗口中的字符串符合要求：包含所有 T 中字符。
 * 停止增加 right ，转而不断增加 left 指针缩小窗口，直到窗口中的字符串不再符合要求：不包含所有 T 中字符。
 * 同时，每增加left，都要更新一轮结果。
 * 重复 2 & 3 步骤，直到 right 到达字符串 s 的尽头。
 * 第 2 步骤寻找可行解，第 3 步骤优化可行解，最终找到最优解，即最短的覆盖子串。
 *
 * 【分析】：
 * 变简单了，连 need 和 valid 都不需要，而且更新窗口内数据也只需要简单的更新计数器 window 即可。
 * 当 window[c] 值大于 1 时，说明窗口中存在重复字符，不符合条件，就该移动 left 缩小窗口了嘛。
 * 唯一需要注意的是，在哪里更新结果 res 呢？我们要的是最长无重复子串，哪一个阶段可以保证窗口中的字符串是没有重复的呢？
 * 这里和之前不一样，要在收缩窗口完成后更新 res，因为窗口收缩的 while 条件是存在重复元素，换句话说收缩完成后一定保证窗口中没有重复嘛。
 * 好了，滑动窗口算法模板就讲到这里，希望大家能理解其中的思想，记住算法模板并融会贯通。回顾一下，遇到子数组/子串相关的问题，你只要能回答出来以下几个问题，就能运用滑动窗口算法：
 * 1、什么时候应该扩大窗口？
 * 2、什么时候应该缩小窗口？
 * 3、什么时候得到一个合法的答案？
 * 接下来看：
 * 我在 滑动窗口经典习题 中使用这套思维模式列举了更多经典的习题，旨在强化你对算法的理解和记忆，以后就再也不怕子串、子数组问题了。
 * 
 * 3.代码实现： lengthOfLongestSubstring
 *
 * 4.测试用例：
 */

/**
 * 滑动窗口算法框架：js版
function slidingWindow(s, t) {
  let need = new Map(),
    window = new Map();

  for (let i = 0; i < t.length; i++) {
    let c = t[i];
    !need.has(c) ? need.set(c, 1) : need.set(c, need.get(c) + 1);
  }
  let left = 0,
    right = 0;
  let valid = 0;
  while (right < s.length) {
    // c 是将移入窗口的字符
    let c = s[right];
    // 增大窗口
    right++;
    // 进行窗口内数据的一系列更新
    ...

    // debug 输出的位置
    console.log("window:[%d,%d)\n",left,right)

    // 判断左侧窗口是否要收缩
    while (window needs shrink) {
      // d 是将移出窗口的字符
      let d = s[left];
      // 缩小窗口
      left++;
      // 进行窗口内数据的一系列更新
      ...
    }
  }
}
 */
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let window = new Map();

  let left = 0,
    right = 0;
  let res = 0; // 记录结果
  while (right < s.length) {
    // c 是将移入窗口的字符
    let c = s[right];
    // 增大窗口
    right++;
    // 进行窗口内数据的一系列更新
    // ...
    if (window.has(c)) {
      window.set(c, window.get(c) + 1);
    } else {
      window.set(c, 1);
    }

    // 判断左侧窗口是否要收缩
    while (window.get(c) > 1) {
      // d 是将移出窗口的字符
      let d = s[left];
      // 缩小窗口
      left++;
      // 进行窗口内数据的一系列更新
      // ...
      window.set(d, window.get(d) - 1);
    }
    // 在这里更新答案
    res = Math.max(res, right - left);
  }
  return res;
};
let s = "abcabcbb",
  s2 = "bbbbb",
  s3 = "pwwkew";
let res = lengthOfLongestSubstring(s),
  res2 = lengthOfLongestSubstring(s2),
  res3 = lengthOfLongestSubstring(s3);
console.log(res, res2, res3);
// @lc code=end
