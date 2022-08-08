/*
 * @lc app=leetcode.cn id=92 lang=javascript
 *
 * [92] 反转链表 II
 */

// @lc code=start
/*
 * 1.读懂题目：
 * 单链表 头指针 head 整数 left 和 right，
 * left<=right
 * 反转从 left 到 right 的链表节点，
 * 返回反转后的链表。
 *
 * 2.写出思路：
 * 反转链表前 n 个节点 reverseN
 *
 *
 * 3.代码实现： reverseBetween
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
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
let successor = null;
// 反转以 head 为起点的 n 个节点，返回新的头结点
const reverseN = (head, n) => {
  if (n == 1) {
    // 记录第 n + 1 个节点
    successor = head.next;
    return head;
  }
  // 以 head.next 为起点，需要反转前 n - 1 个节点
  let last = reverseN(head.next, n - 1);

  head.next.next = head;
  // 让反转之后的 head 节点和后面的节点连起来
  head.next = successor;
  return last;
};
let reverseBetween = (head, m, n) => {
  // 反转链表前 n 个节点
  if (m == 1) {
    return reverseN(head, n);
  }
  head.next = reverseBetween(head.next, m - 1, n - 1);
  return head;
};
let head = {
    val: 1,
    next: {
      val: 2,
      next: { val: 3, next: { val: 4, next: { val: 5 } } },
    },
  },
  left = 2,
  right = 4;
let head2 = { val: 5 },
  left2 = 1,
  right2 = 1;
let res = reverseBetween(head, left, right);
let res2 = reverseBetween(head2, left2, right2);
console.log(JSON.stringify(res), JSON.stringify(res2));
// @lc code=end
