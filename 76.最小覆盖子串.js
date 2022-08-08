/*
 * @lc app=leetcode.cn id=76 lang=javascript
 *
 * [76] 最小覆盖子串
 */

// @lc code=start
/*
 * 1.读懂题目：
 * 字符串 s 和 t
 * 返回 s 中涵盖 t 中所有 字符的最小子串，
 * s 中不存在涵盖 t 所有字符的子串，则返回空字符串""
 *
 * 2.写出思路：
 * 滑动窗口算法思想：
 * 字符串 s 中使用双指针的左右指针技巧，左闭右开区间 [left,right) 称为一个窗口
 * 先不断增加 right 指针扩大窗口，直到窗口中的字符串符合要求：包含所有 T 中字符。
 * 停止增加 right ，转而不断增加 left 指针缩小窗口，直到窗口中的字符串不再符合要求：不包含所有 T 中字符。
 * 同时，每增加left，都要更新一轮结果。
 * 重复 2 & 3 步骤，直到 right 到达字符串 s 的尽头。
 * 第 2 步骤寻找可行解，第 3 步骤优化可行解，最终找到最优解，即最短的覆盖子串。
 *
 * 3.代码实现： minWindow
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
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  let need = new Map(),
    window = new Map();

  for (let i = 0; i < t.length; i++) {
    let c = t[i];
    !need.has(c) ? need.set(c, 1) : need.set(c, need.get(c) + 1);
  }
  let left = 0,
    right = 0;
  let valid = 0;

  let start = 0,
    len = Number.MAX_SAFE_INTEGER; //最大安全整数。
  while (right < s.length) {
    let c = s[right];
    right++;
    if (need.has(c)) {
      !window.has(c) ? window.set(c, 1) : window.set(c, window.get(c) + 1);
      if (window.get(c) === need.get(c)) {
        valid++;
      }
    }

    while (valid == need.size) {
      if (right - left < len) {
        start = left;
        len = right - left;
      }

      let d = s[left];
      left++;

      if (need.has(d)) {
        if (window.get(d) === need.get(d)) {
          valid--;
        }
        window.set(d, window.get(d) - 1);
      }
    }
  }
  // console.log(74, start, len);
  return len === Number.MAX_SAFE_INTEGER ? "" : s.substring(start, start + len);
};
// let s = "ADOBECODEBANC",
//   t = "ABC",
//   s2 = "a",
//   t2 = "a",
//   s3 = "a",
//   t3 = "aa";
// let res1 = minWindow(s, t),
//   res2 = minWindow(s2, t2),
//   res3 = minWindow(s3, t3);
// console.log(res1, "-", res2, "-", res3);
// @lc code=end
