/*
 * @lc app=leetcode.cn id=51 lang=javascript
 *
 * [51] N 皇后
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  const res = []

  /**
   * 初始化棋盘
   */

  // '.' 表示空，'Q' 表示皇后，初始化棋盘
  // 0: (5) ['.', '.', '.', '.', '.']
  // 1: (5) ['.', '.', '.', '.', '.']
  // 2: (5) ['.', '.', '.', '.', '.']
  // 3: (5) ['.', '.', '.', '.', '.']
  // 4: (5) ['.', '.', '.', '.', '.']
  // length: 5
  const board = Array(n)
    .fill(-1)
    .map(() => Array(n).fill('.'))

  function backtrack(board, row) {
    const n = board.length
    // 结束条件
    if (row === n) {
      // 最后形成了 n 皇后 board ，把 n 皇后 board 的每一行转字符串，形成一组可行的 n 皇后给了 结果数组 res 。
      res.push(board.map((i) => i.join('')))
      return
    }

    for (let i = 0; i < n; i++) {
      if (valid(board, row, i)) {
        // go 本行设置 'Q'
        board[row][i] = 'Q'
        // row + 1（until row = n-1），回溯（设置 'Q'）
        backtrack(board, row + 1)
        // back 本行设置 '.'，for 恢复棋盘
        board[row][i] = '.'
      }
    }
  }

  /* 是否可以在 board[row][col] 放置皇后？*/
  function valid(board, row, col) {
    const n = board.length
    /**
     * 1.检查列是否有皇后互相冲突
     */

    // 检查 col 列中，从 0 到 row 行，没有 Q
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 'Q') return false
    }

    /**
     * 2.检查右上方是否有皇后互相冲突
     */

    // 2.1 检查：
    // 从上一行 row-1 （let i = row - 1,），
    // 从列加一 col+1 （j = col + 1;），
    // 开始；
    // 2.2 每次都让：
    // 行减一 i-1 （i--），
    // 以及（&），
    // 列加一 j+1 （j++）；
    // 2.3 符合：
    // （ i >= 0 && j < n;），
    // 条件；
    // 2.4 使得：
    // 右上对角线，如果有 Q 返回不合法 false 。
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (board[i][j] === 'Q') return false
    }

    /**
     * 3.检查左上方是否有皇后互相冲突
     */

    // 同理，以 `i=row-1,j=col-1` 为开始，i-- j--，左上对角线，如果有 Q 返回不合法 false 。
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 'Q') return false
    }

    /**
     * 4.没有不合法的，返回 合法 true
     */

    return true
  }

  backtrack(board, 0)

  return res
}
// @lc code=end
