/*
 * @lc app=leetcode.cn id=83 lang=javascript
 *
 * [83] 删除排序链表中的重复元素
 */

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/*
 * 1.读懂题目：
 * 已排序的链表的头head，
 * 删除所有重复的元素，使每个元素只出现一次。
 * 返回已排序的链表。
 *
 * 2.写出思路：
 * 【不是原地修改】：new一个int类型数组-》把去重之后的元素放进新数组-》返回新数组。
 * 【原地修改】：不允许new新数组-》只能在原数组上操作，返回新长度-》通过返回的长度&原始数组=移除后的元素有哪些。
 * 【和 26.删除有序数组中的重复项 一样的思路】：
 * 【快慢指针技巧】：快指针探路，慢指针在后，快指针每找到一个不等于val的元素就赋值给slow并让slow前进一步。
 * 这样保证了nums[0...slow]就是整个数组移除等于val的元素之后的结果。
 *
 * 和数组去重一样，
 * 唯一区别：把数组赋值操作变成指针操作。
 *
 * 3.代码实现： deleteDuplicates
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
var deleteDuplicates = function (head) {
  if (head === null) return null

  let slow = (fast = head)

  while (fast !== null) {
    if (slow.val !== fast.val) {
      slow.next = fast
      slow = slow.next
    }
    fast = fast.next
  }

  slow.next = null

  return head
}
// @lc code=end
