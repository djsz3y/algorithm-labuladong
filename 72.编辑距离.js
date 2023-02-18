/*
 * @lc app=leetcode.cn id=72 lang=javascript
 *
 * [72] 编辑距离
 */

// @lc code=start
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function(s1, s2) {
  const min = function(a, b, c) {
    return Math.min(a, Math.min(b, c));
  }
  
  let m = s1.length, n = s2.length;
  // 定义：s1[0..i] 和 s2[0..j] 的最小编辑距离是 dp[i+1][j+1]
  let dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(-1));
  console.log(41, dp)
  // base case 
  for (let i = 1; i <= m; i++)
      dp[i][0] = i;
  for (let j = 1; j <= n; j++)
      dp[0][j] = j;
  // 自底向上求解
  for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
          if (s1.charAt(i-1) == s2.charAt(j-1)) {
              dp[i][j] = dp[i - 1][j - 1];
          } else {
              dp[i][j] = min(
                  dp[i - 1][j] + 1,
                  dp[i][j - 1] + 1,
                  dp[i - 1][j - 1] + 1
              );
          }
      }
  }
  // 储存着整个 s1 和 s2 的最小编辑距离
  return dp[m][n];
};
const word1 = "horse", word2 = "ros"
const result = minDistance(word1, word2)
console.log(result)
const word1_ = "intention", word2_ = "execution"
const result2 = minDistance(word1_, word2_)
console.log(result2)
// @lc code=end

