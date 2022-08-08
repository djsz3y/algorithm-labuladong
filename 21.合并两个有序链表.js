/*
 * @lc app=leetcode.cn id=21 lang=javascript
 *
 * [21] 合并两个有序链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/*
 * 1.读懂题目：
 * 2个非递减顺序的升序链表
 * 合并为新的升序链表并返回。
 *
 * 2.写出思路：
 * 最基本链表技巧：双指针技巧。
 * while 循环每次比较 p1 和 p2 的大小，较小节点接到结果链表上。
 * 算法逻辑类似于拉拉链， l1 l2 类似于拉链两侧的锯齿，指针 p 类似于拉链的拉索，将两个有序链表合并。【谁小把谁拉进来】
 * 代码用到链表算法题中常见的【虚拟头结点】技巧，也就是 dummy 节点：
 * 不使用 dummy 更复杂，有 dummy 节点这个占位符，可以避免处理空指针的情况，降低代码的复杂性。
 *
 * 3.代码实现： mergeTwoLists
 *
 * 4.测试用例：
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  let dummy = new ListNode(-1),
    p = dummy;//虚拟头结点 dummy 赋值给 p
  let p1 = list1,
    p2 = list2;
  while (p1 != null && p2 != null) { // p1 p2 都不是 null 和 undefined
    if (p1.val > p2.val) { // 比较 p1,p2 大小 头结点
      p.next = p2; // p2 小，p2 给结果链表 p
      p2 = p2.next; // p2 指向下一个即 p2 = p2.next
    } else { // 否则操作 p1（同 p2 ）
      p.next = p1;
      p1 = p1.next;
    } // 谁小操作谁
    p = p.next; // p 被给了新的，p 去下一个
  }
  if (p1 != null) {
    p.next = p1;
  }
  if (p2 != null) {
    p.next = p2;
  } // 把剩余非空连到 p 的下一个
  return dummy.next; // p是 dummy 的指针，p往下走（不断前进），dummy链表就形成了。dummy 是 -1，so return dummy.next。
};
class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}
// let l1 = [1, 2, 4],
//   l2 = [1, 3, 4];
// let l3 = [],
//   l4 = [];
// let l5 = [],
//   l6 = [0];

// let res1 = mergeTwoLists(l1, l2),
//   res2 = mergeTwoLists(l3, l4),
//   res3 = mergeTwoLists(l5, l6);

// console.log(res1, res2, res3);
// @lc code=end
