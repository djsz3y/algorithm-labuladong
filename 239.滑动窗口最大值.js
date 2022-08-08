/*
 * @lc app=leetcode.cn id=239 lang=javascript
 *
 * [239] 滑动窗口最大值
 */

// @lc code=start
/*
 * 1.读懂题目：
 * 整数数组 nums
 * 滑动窗口 k 从数组最左侧移动到数组的最右侧
 * 只能看到滑动窗口内的 k 个数字。
 * 滑动窗口 一次 只向右移动一位。
 * 返回 滑动窗口中 最大值。
 *
 * 2.写出思路：
 *
 *
 * 3.代码实现： maxSlidingWindow
 *
 * 4.测试用例：
 */
class Deque {
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  addFront(element) {
    if (this.isEmpty()) {
      this.addBack(element);
    } else if (this.lowestCount > 0) {
      this.lowestCount--;
      this.items[this.lowestCount] = element;
    } else {
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1];
      }
      this.count++;
      this.items[0] = element;
    }
  }

  addBack(element) {
    this.items[this.count] = element;
    this.count++;
  }

  removeFront() {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }

  removeBack() {
    if (this.isEmpty()) {
      return undefined;
    }
    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }

  peekFront() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.lowestCount];
  }

  peekBack() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.count - 1];
  }

  isEmpty() {
    return this.size() === 0;
  }

  clear() {
    this.items = {};
    this.count = 0;
    this.lowestCount = 0;
  }

  size() {
    return this.count - this.lowestCount;
  }

  toString() {
    if (this.isEmpty()) {
      return "";
    }
    let objString = `${this.items[this.lowestCount]}`;
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`;
    }
    return objString;
  }
}
class MonotonicQueue {
  constructor() {
    this.maxq = new Deque();
  }
  push(n) {
    while (!this.maxq.isEmpty() && this.maxq.peekBack() < n) {
      this.maxq.removeBack();
    }
    this.maxq.addBack(n);
  }
  max() {
    return this.maxq.peekFront();
  }
  pop(n) {
    if (n == this.maxq.peekFront()) {
      this.maxq.removeFront();
    }
  }
}
// class maxSlidingWindow {
//   constructor(nums, k) {
//   }
// }
// /**
//  * @param {number[]} nums
//  * @param {number} k
//  * @return {number[]}
//  */
var maxSlidingWindow = function (nums, k) {
  this.window = new MonotonicQueue();
  this.res = [];
  for (let i = 0; i < nums.length; i++) {
    if (i < k - 1) {
      this.window.push(nums[i]);
    } else {
      this.window.push(nums[i]);
      this.res.push(this.window.max());
      this.window.pop(nums[i - k + 1]);
    }
  }
  let arr = new Array(this.res.length);
  for (let i = 0; i < this.res.length; i++) {
    arr[i] = this.res[i];
  }
  return arr
};
let nums = [1, 3, -1, -3, 5, 3, 6, 7],
  k = 3;
let nums2 = [1],
  k2 = 1;
let res = maxSlidingWindow(nums, k);
let res2 = maxSlidingWindow(nums2, k2);
console.log(res);
console.log(res2);
// @lc code=end
