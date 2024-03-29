/*
 * @lc app=leetcode.cn id=146 lang=javascript
 *
 * [146] LRU 缓存
 */

// @lc code=start
/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.cacheQueue = new Map()
  this.capacity = capacity
}

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (this.cacheQueue.has(key)) {
    const value = this.cacheQueue.get(key)
    this.cacheQueue.delete(key)
    this.cacheQueue.set(key, value)
    return value
  }
  return -1
}

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  // 存在？
  if (this.cacheQueue.has(key)) {
    this.cacheQueue.delete(key)
  }
  // 容量？
  if (this.cacheQueue.size >= this.capacity) {
    this.cacheQueue.set(key, value)
    this.cacheQueue.delete(this.cacheQueue.keys().next().value)
  } else {
    this.cacheQueue.set(key, value)
  }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
// @lc code=end
