/*
 * @lc app=leetcode.cn id=146 lang=javascript
 *
 * [146] LRU 缓存
 */

// @lc code=start
/*
 * 1.读懂题目：
 * LRU(最近最少使用)缓存 算法：
 * LRUCache(int capacity) 类：容量 capacity 正整数
 * int get(int key)：key 存在返值，不存在返-1
 * void put(int key, int value)：key 存在改值，不存在插入 key-value，key 数超过容量，逐出 最久未使用的关键字。
 * get put 运行的时间复杂度：O(1)
 *
 * 2.写出思路：
 *
 * 3.代码实现： LRUCache
 * 版本一：2022-06-11 22:45【Top Voted Solution】只用哈希表
 * 22/22 cases passed (564 ms)
 * Your runtime beats 50.79 % of javascript submissions
 * Your memory usage beats 66.17 % of javascript submissions (94.2 MB)
 * 版本二：2022-06-12 00:47【labuladong】用双向链表DoubleList和哈希表Map
 * 22/22 cases passed (492 ms)
 * Your runtime beats 97.42 % of javascript submissions
 * Your memory usage beats 63.94 % of javascript submissions (94.2 MB)
 *
 * 4.测试用例：
 */

// 版本一：2022-06-11 22:45【Top Voted Solution】只用哈希表

// class LRUCache {
//   constructor(capacity) {
//     this.cache = new Map();
//     this.capacity = capacity;
//   }

//   get(key) {
//     if (!this.cache.has(key)) return -1;

//     const v = this.cache.get(key);
//     this.cache.delete(key);
//     this.cache.set(key, v);
//     return this.cache.get(key);
//   }

//   put(key, value) {
//     if (this.cache.has(key)) {
//       this.cache.delete(key);
//     }
//     this.cache.set(key, value);
//     if (this.cache.size > this.capacity) {
//       this.cache.delete(this.cache.keys().next().value); // keys().next().value returns first item's key
//     }
//   }
// }

// 版本二：2022-06-12 00:47【labuladong】用双向链表DoubleList和哈希表Map

// class Node{
//   constructor(e){
//     this.element = element
//     this.next = undefined
//   }
// }
class Node {
  constructor(k, v) {
    this.key = k;
    this.val = v;
    this.prev = undefined;
    this.next = undefined;
  }
}
class DoubleList {
  constructor() {
    this.head = new Node(0, 0);
    this.tail = new Node(0, 0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.size = 0;
  }
  addLast(x) {
    x.prev = this.tail.prev;
    x.next = this.tail;
    this.tail.prev.next = x;
    this.tail.prev = x;
    this.size++;
  }
  remove(x) {
    x.prev.next = x.next;
    x.next.prev = x.prev;
    this.size--;
  }
  removeFirst() {
    if (this.head.next == this.tail) return null;
    let first = this.head.next;
    this.remove(first);
    return first;
  }
}

class LRUCache {
  map = undefined;
  cache = undefined;
  cap = 0;
  constructor(capacity) {
    this.cap = capacity;
    this.map = new Map();
    this.cache = new DoubleList();
  }
  makeRecently(key) {
    let x = this.map.get(key);
    this.cache.remove(x);
    this.cache.addLast(x);
  }
  addRecently(key, val) {
    let x = new Node(key, val);
    this.cache.addLast(x);
    this.map.set(key, x);
  }
  deleteKey(key) {
    let x = this.map.get(key);
    this.cache.remove(x);
    this.map.delete(key);
  }
  removeLeastRecently() {
    let deletedNode = this.cache.removeFirst();
    let deletedKey = deletedNode.key;
    this.map.delete(deletedKey);
  }

  get(key) {
    if (!this.map.has(key)) return -1;
    this.makeRecently(key);
    return this.map.get(key).val;
  }

  put(key, val) {
    if (this.map.has(key)) {
      this.deleteKey(key);
      this.addRecently(key, val);
      return;
    }
    if (this.cap == this.cache.size) {
      this.removeLeastRecently();
    }
    this.addRecently(key, val);
  }
}
/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
var lRUCache = new LRUCache(2);
lRUCache.put(1, 1);
lRUCache.put(2, 2);
var param_1 = lRUCache.get(1);
lRUCache.put(3, 3);
var param_2 = lRUCache.get(2);
lRUCache.put(4, 4);
var param_3 = lRUCache.get(1);
var param_4 = lRUCache.get(3);
var param_5 = lRUCache.get(4);
console.log(param_1, param_2, param_3, param_4, param_5);
// @lc code=end
