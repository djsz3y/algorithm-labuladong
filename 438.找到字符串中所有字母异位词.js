/*
 * @lc app=leetcode.cn id=438 lang=javascript
 *
 * [438] 找到字符串中所有字母异位词
 */

// @lc code=start
/*
 * 1.读懂题目：
 * 给定 2 个字符串 s 和 p，
 * 找到 s 中所有 p 的异位词的子串，
 * 返回这些子串起始索引（不考虑答案顺序）。
 *
 * 【异位词：】
 * 相同字母重排列形成的字符串，
 * 包括相同字符串。
 *
 * 【分析：】
 * 字母异位词：
 * 明显是排列。
 *
 * 相当于：
 * 输入一个 串 S ，一个串 T，
 * 找到 S 中所有 T 的排列，
 * 返回他们的起始索引。
 *
 * 直接默写滑动窗口算法框架，
 * 明确刚才讲的 4 个问题，
 * 即可秒杀这道题。
 * 写出 findAnagrams 函数。
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
 * 3.代码实现： findAnagrams
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
 * @return {number[]}
 */
// 判断 s 中是否存在 t 的排列
var findAnagrams = function (s, t) {
  let need = new Map(),
    window = new Map();

  for (let i = 0; i < t.length; i++) {
    let c = t[i];
    !need.has(c) ? need.set(c, 1) : need.set(c, need.get(c) + 1);
  }
  let left = 0,
    right = 0;
  let valid = 0;
  // -------------------------这里是 new code 的位置 start
  let res = []; // 记录结果
  // -------------------------这里是 new code 的位置 end
  while (right < s.length) {
    // c 是将移入窗口的字符
    let c = s[right];
    // 增大窗口
    right++;
    // 进行窗口内数据的一系列更新
    // ...
    // -------------------------这里是...的位置 start
    if (need.has(c)) {
      !window.has(c) ? window.set(c, 1) : window.set(c, window.get(c) + 1);
      if (window.get(c) === need.get(c)) valid++;
    }
    // -------------------------这里是...的位置 end

    // 判断左侧窗口是否要收缩
    while (right - left >= t.length) {
      // -------------------------这里是 new code 的位置 start
      // 当窗口符合条件时，把起始索引加入 res
      if (valid === need.size) res.push(left);
      // -------------------------这里是 new code 的位置 end

      // d 是将移出窗口的字符
      let d = s[left];
      // 缩小窗口
      left++;
      // 进行窗口内数据的一系列更新
      // ...
      // -------------------------这里是...的位置 start
      if (need.has(d)) {
        if (window.get(d) === need.get(d)) valid--;
        !window.has(d) ? window.set(d, 1) : window.set(d, window.get(d) - 1);
      }
      // -------------------------这里是...的位置 end
    }
  }
  return res;
};
let s = "cbaebabacd",
  t = "abc",
  s2 = "abab",
  t2 = "ab";
let res = findAnagrams(s, t),
  res2 = findAnagrams(s2, t2);
console.log(res, res2);
// @lc code=end
