/*
 * @lc app=leetcode.cn id=876 lang=javascript
 *
 * [876] 链表的中间结点
 */

// @lc code=start
/*
 * 1.读懂题目：
 * 非空单链表，头节点head
 * 返回链表中间节点
 * 两个中间节点，返回第二个中间节点。
 *
 * 2.写出思路：
 * 快慢指针 技巧
 *
 * 3.代码实现： middleNode
 *
 * 4.测试用例：
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function (head) {
  // 快慢指针初始化指向 head
  let slow = head,
    fast = head; // 快慢指针指头
  // 快指针走到末尾时停止
  while (fast != null && fast.next != null) {
    // 快没走末尾
    slow = slow.next; // 慢指针走一步
    fast = fast.next.next; // 快指针走两步
  }
  // 慢指针指向中点
  return slow;
};
let params = {
    val: 1,
    next: { val: 2, next: { val: 3, next: { val: 4, next: { val: 5 } } } },
  },
  params2 = {
    val: 1,
    next: {
      val: 2,
      next: { val: 3, next: { val: 4, next: { val: 5, next: { val: 6 } } } },
    },
  };
let res = middleNode(params),
  res2 = middleNode(params2);
console.log(res);
console.log(res2);
// @lc code=end
