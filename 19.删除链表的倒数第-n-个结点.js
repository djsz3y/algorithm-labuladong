/*
 * @lc app=leetcode.cn id=19 lang=javascript
 *
 * [19] 删除链表的倒数第 N 个结点
 */

// @lc code=start
/*
 * # 1.读懂题目：
 * 链表，删除 倒数第 n 个结点，返回 链表头结点。
 *
 * # 2.写出思路：
 * ## 第一步：找到倒数第 k 个结点（返回链表倒数第 k 个结点 findFromEnd ）：
 * ### 法Ⅰ（遍历两次链表）：
 * 算法题只给一个ListNode头结点：表单链表，无链表长度 n。
 * 第一次遍历for循环 得链表长度。
 * 第二次遍历for循环 得第 n-k+1 个结点。
 * ### 法Ⅱ（遍历一次链表）（优选）：
 * 1. 假设 k = 2 ，先让 p1 指向链表 head ，走 k 步。
 * 2. 再让 p2 指向链表 head ，距离 p1 此时 k 步。
 * 3. 让 p2 p1 同时走 n-k 步，此时 p2 -> 第 n-k+1 个结点，p1 -> null 。
 * 4. 此时 p2 就是倒数第 k 个结点。
 *
 * 代码实现如下： findFromEnd
 *
 * ## 第二步：
 * 1. 虚拟头结点 dummy ：使用虚拟头结点技巧，防止出现空指针情况。比如一共2个结点，删除倒数第2个，那么找倒数第2+1个时，如果不使用虚拟头结点技巧，就会报错。
 * 2. 找倒第 n+1 ：要想删除第 n 个，就得找到倒数第 n+1 个结点。
 * 3. 返回链表头结点。
 *
 * # 3.代码实现： removeNthFromEnd
 *
 * # 4.测试用例：
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
// class ListNode {
//   constructor(val, next) {
//     this.val = val === undefined ? 0 : val;
//     this.next = next === undefined ? null : next;
//   }
// }
/**
 * 返回链表倒数第 k 个结点
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var findFromEnd = function (head, k) {
  let p1 = head;
  for (let i = 0; i < k; i++) {
    p1 = p1.next;
  }
  let p2 = head;
  while (p1 != null) {
    p2 = p2.next;
    p1 = p1.next;
  }
  return p2;
};
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  // 1. 虚拟头结点 dummy ：使用虚拟头结点技巧，防止出现空指针情况。比如一共2个结点，删除倒数第2个，那么找倒数第2+1个时，如果不使用虚拟头结点技巧，就会报错。
  let dummy = new ListNode(-1);
  dummy.next = head;
  // 2. 找倒第 n+1 ：要想删除第 n 个，就得找到倒数第 n+1 个结点。
  let x = findFromEnd(dummy, n + 1);
  x.next = x.next.next;
  // 3. 返回链表头结点。
  return dummy.next;
};
// let head = {
//     val: 1,
//     next: {
//       val: 2,
//       next: { val: 3, next: { val: 4, next: { val: 5, next: null } } },
//     },
//   }, // [(1, 2, 3, 4, 5)]
//   n = 2;
// let res = removeNthFromEnd(head, n);
// console.log(88, JSON.stringify(res));
// let head2 = {
//     val: 1,
//     next: null,
//   }, // [1]
//   n2 = 1;
// let res2 = removeNthFromEnd(head2, n2);
// console.log(95, JSON.stringify(res2));
// let head3 = {
//     val: 1,
//     next: { val: 2, next: null },
//   }, // [1,2]
//   n3 = 1;
// let res3 = removeNthFromEnd(head3, n3);
// console.log(102, JSON.stringify(res3));
// @lc code=end
