/*
 * @lc app=leetcode.cn id=567 lang=javascript
 *
 * [567] 字符串的排列
 */

// @lc code=start
/*
 * 1.读懂题目：
 * 字符串 s1 和 s2，写一个函数判断 s2是否包含 s1 的排列。
 * 是 返 true；否则 返 false。
 * s1 的排列之一是 s2 的子串。
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
 * s1 可以包含重复字符，所以题难度不小。
 * 明显的滑动窗口算法，相当于给你一个 S 和一个 T，请问 S 中是否存在一个子串，包含 T 中所有字符且不包含其他字符？
 * 先复制粘贴之前的算法框架代码：滑动窗口算法框架代码。
 * 然后明确提出的 4 个问题。
 *
 * 对于这道题，代码解法基本和最小覆盖子串一模一样，只需要改两个地方：
 * 1.本题移动left缩小窗口的时机是窗口大小大于t.size时，应为排列，显然长度应该一样。
 * 2.当发现 valid == need.size时，说明窗口中就时一个合法排列，所以立即返回true。
 * 至于如何处理窗口的扩大和缩小，和 76.最小覆盖子串完全相同。
 *
 * 3.代码实现： checkInclusion
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
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function (t, s) {
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
    if (need.has(c)) {
      !window.has(c) ? window.set(c, 1) : window.set(c, window.get(c) + 1);
      if (window.get(c) == need.get(c)) valid++;
    }

    // 判断左侧窗口是否要收缩
    while (right - left >= t.length) {
      // 在这里判断是否找到了合法的子串
      if (valid == need.size) {
        return true;
      }
      // d 是将移出窗口的字符
      let d = s[left];
      // 缩小窗口
      left++;
      // 进行窗口内数据的一系列更新
      if (need.has(d)) {
        if (window.get(d) == need.get(d)) valid--;
        window.set(d, window.get(d) - 1);
      }
    }
  }
  // 未找到符合条件的子串
  return false;
};
let s1 = "ab",
  s2 = "eidbaooo",
  s12 = "ab",
  s22 = "eidboaoo";
let res = checkInclusion(s1, s2),
  res2 = checkInclusion(s12, s22);
console.log(res, res2);
// @lc code=end
