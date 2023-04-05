/*
 * @lc app=leetcode.cn id=146 lang=typescript
 *
 * [146] LRU 缓存
 */

// @lc code=start
// Testcase
// ["LRUCache","put","put","get","put","get","put","get","get","get"]
// ' +
//   '[[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]
// Answer
// [null,null,null,1,null,0,null,0,3,4]
// Expected Answer
// [null,null,null,1,null,-1,null,-1,3,4]
class LRUCache {
    private length: number
    private data: Map<any, any> = new Map()

    constructor(capacity: number) {
      if (capacity < 1) throw new Error('invalid length')
      this.length = capacity
    }

    get(key: number): number {
      const data = this.data

      if (!data.has(key)) return -1

      const value = data.get(key)

      data.delete(key)
      data.set(key, value)

      return value
    }

    put(key: number, value: number): void {
      const data = this.data

      if (data.has(key)) {
          data.delete(key)
      }
      data.set(key, value)

      if (data.size > this.length) {
          // 如果超出了容量，则删除 Map 最老的元素
          const delKey = data.keys().next().value
          data.delete(delKey)
      }
    }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
// @lc code=end

