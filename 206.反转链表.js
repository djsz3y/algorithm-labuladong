/*
 * @lc app=leetcode.cn id=206 lang=javascript
 *
 * [206] 反转链表
 */

// @lc code=start
/*
 * 1.读懂题目：
 * 已知单链表的头结点 head ，反转链表，并返回反转后的链表。
 * 比如 [1,2,3,4,5] 反转后 [5,4,3,2,1]
 *
 * 2.写出思路：
 * 第一步：
 * 对 head.next.next = head 的解释：
 * 比如 1,2,3,4,5
 * head指向 1，1.next.next指向 3
 * 1-2-3
 * head.next.next = head 即 2 指向 3 的指针 2->3 指向 1 去，
 * 即 1->2->3
 *    1<-2->3
 * 对 head.next = null 的解释：
 * 比如：接着上面 1 和 2 互指 & 2 指向 3
 * 现在 head 还是指向 1，
 * head.next 即 1->2 ：1 指向 2 这根指针，
 * head.next = null 即 断掉 1 指向 2 这根指针，
 * 就变成了这样：
 * null<-1  2->3
 *       1<-2->3
 * 即：null<-1<-2->3。
 * 第二步：
 * 由于上面这一群操作，是在递归之后进行的，
 * head 还是指向 1，
 * 所以 head.next 就可以因为递归而一路指向 最后一个 5
 * null<-1<-2->3...
 * null<-1<-2<-3->4...
 * null<-1<-2<-3<-4->5...
 * null<-1<-2<-3<-4<-5->null
 * 由于 head.next==null 时，return 了 head
 * 由于递归，head指向1，一路head.next.next...
 * 就是 当时递归的 指向 head 的指针，那被 return 了 last，
 * 那 last 就指向 最后一个不为空的结点
 * 大圈套小圈，最小的圈5
 * 把 head.next=null 就从5->null开始，一路断掉向右的指针
 * 从小圈，从内部开始先创造 last 并断掉last.next（last.next 就是 head.next通过递归一路指向单链表的最后一个结点的next就是null）
 * 一个个的创造 last 指针并断掉向右的指针，
 * 创造 last->5 & 断掉 5->null
 * 创造 5->4 & 断掉 4->5
 * 创造 4->3 & 断掉 3->4
 * 创造 3->2 & 断掉 2->3
 * 创造 2->1 & 断掉 1->2
 * 创造 1->null
 * 上面“创造” 都是凭空产生的吗？
 * 不是，每个 last 都通过递归被赋值的.
 * 最后得到结果：
 * null<-1<-2<-3<-4<-5<-last
 * 要注意：
 * 递归方法时间复杂度和迭代方法时间复杂度一样都是O(N),
 * 但空间复杂度递归方法 & 迭代方法分别为 O(N) O(1)。
 * 所以考虑效率用迭代算法好。
 *
 * 3.代码实现： reverseList
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
var reverseList = function (head) {
  if (head == null || head.next == null) {
    return head;
  } // 头结点本来空或者下一个空，返回头结点，null反转不了，一个结点反转后还是本身。
  let last = reverseList(head.next); //递归
  head.next.next = head;
  head.next = null;
  return last;
};
// @lc code=end
