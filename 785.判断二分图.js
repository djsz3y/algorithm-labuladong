/*
 * @lc app=leetcode.cn id=785 lang=javascript
 *
 * [785] 判断二分图
 */

// @lc code=start
/*
 * # 1.读懂题目：
 * 二分图 定义：如果能将一个图的节点集合分割成两个独立的子集 A 和 B ，并使图中的每一条边的两个节点一个来自 A 集合，一个来自 B 集合，就将这个图称为 二分图 。
 * 如果图是二分图，返回 true ；否则，返回 false 。
 *
 * # 2.写出思路：
 *
 * ## 一、图的「双色问题」(等同于二分图的判定问题)：
 * 所有顶点只有两种颜色，任意一条边的两个端点颜色都不相同。
 * 如果能够成功将图染色，这就是二分图，反之不是。
 *
 * ## 二、解决双色问题的目的：
 * 特殊的图模型，高级图算法（比如最大流算法）用到；
 * 更高效地存储数据（简单实用）。
 *
 * ## 三、存储映射关系中【电影-演员（多对多）】：
 * 1.使用两个哈希表：
 * - HashMap<String, List<String>>
 * - 电影-演员列表，和（其「反向索引」）演员-电影列表。
 * 2.使用「图」结构：
 * - 电影和参演的演员连接，成为二分图（方便、直观）。
 * - 每个电影相邻节点是参演该电影的所有演员，
 * 每个演员相邻节点是演过的所有电影。
 * - 二分图的应用，再比如：labuladong 网站每篇文章末尾-引用该文章的题目：「文章」-「题目」
 * - 生活中不少实体的关系-（自然地）二分图结构：某场景图结构也-（存键值对）数据结构（符号表）。
 *
 * ## 四、二分图判定思路【代码解决「双色问题」】：
 * - 遍历一遍图，边遍历边染色，能否2种颜色-all节点染色 & 邻节点色都不同。
 * - 不涉及最短路径，DFS 和 BFS 皆可。
 *
 * ### DFS 算法判定双色图
 * #### 图的遍历框架：
 * ```java
 * // 二叉树遍历框架
 * void traverse(TreeNode root) {
 *   if (root == null) return;
 *   traverse(root.left);
 *   traverse(root.right);
 * }
 *
 * // 多叉树遍历框架
 * void traverse(Node root) {
 *   if (root == null) return;
 *   for (Node child : root.children)
 *       traverse(child);
 * }
 *
 * // 图遍历框架
 * boolean[] visited;
 * void traverse(Graph graph, int v) {
 *   // 防止走回头路进入死循环
 *   if (visited[v]) return; // base case
 *   // 前序遍历位置，标记节点 v 已访问
 *   visited[v] = true;
 *   for (Vertex neighbor : graph.neighbors(v))
 *       traverse(graph, neighbor);
 * }
 * ```
 * - 上面 base case 写在前头，代码清晰。
 *
 * #### 第二种图遍历框架的写法（if放其他位置）：
 * ```java
 * // 图遍历框架
 * boolean[] visited;
 * void traverse(Graph graph, int v) {
 *     // 前序遍历位置，标记节点 v 已访问
 *     visited[v] = true;
 *     for (int neighbor : graph.neighbors(v)) {
 *         if (!visited[neighbor]) {
 *             // 只遍历没标记过的相邻节点
 *             traverse(graph, neighbor);
 *         }
 *     }
 * }
 * ```
 * - 此写法 visited 判断放递归前，
 * - 与上面写法的不同点：保证调用 traverse(v) 的时候，visited[v] == false。
 * - 第二种写法在判断二分图的算法会用。
 *
 * #### 判定二分图的代码逻辑：
 * ```java
 * // 图遍历框架
 * void traverse(Graph graph, boolean[] visited, int v) {
 *   visited[v] = true;
 *   // 遍历节点 v 的所有相邻节点 neighbor
 *   for (int neighbor : graph.neighbors(v)) {
 *       if (!visited[neighbor]) {
 *           // 相邻节点 neighbor 没有被访问过
 *           // 那么应该给节点 neighbor 涂上和节点 v 不同的颜色
 *           traverse(graph, visited, neighbor);
 *       } else {
 *           // 相邻节点 neighbor 已经被访问过
 *           // 那么应该比较节点 neighbor 和节点 v 的颜色
 *           // 若相同，则此图不是二分图
 *       }
 *   }
 * }
 * ```
 *
 * ### BFS 算法判定双色图
 * - 核心逻辑和刚才实现的 traverse 函数（DFS 算法）完全一样，也是根据相邻节点 v 和 w 的颜色来进行判断的。关于 BFS 算法框架的探讨，详见前文 BFS 算法框架 和 Dijkstra 算法模板，这里就不展开了。
 *
 * ## 五、题目实践
 * - 785 题「 判断二分图」
 * - 886 题「 可能的二分法」
 *
 * # 3.代码实现： isBipartite
 *
 * # 4.测试用例：
 */
/**
 * @param {number[][]} graph
 * @return {boolean}
 */
var isBipartite = function (graph) {
  let ok = true; // 记录图是否符合二分图性质
  let color = []; // 记录图中节点的颜色，false 和 true 代表两种不同颜色
  let visited = []; // 记录图中节点是否被访问过

  let n = graph.length;
  color = new Array(n).fill(false);
  visited = new Array(n).fill(false);

  // DFS 遍历框架
  const traverse = (graph, v) => {
    // 如果已经确定不是二分图了，就不用浪费时间再递归遍历了
    if (!ok) return;

    visited[v] = true;
    for (let w of graph[v]) {
      if (!visited[w]) {
        // 相邻节点 w 没有被访问过
        // 那么应该给节点 w 涂上和节点 v 不同的颜色
        color[w] = !color[v];
        // 继续遍历 w
        traverse(graph, w);
      } else {
        // 相邻节点 w 已经被访问过
        // 根据 v 和 w 的颜色判断是否是二分图
        if (color[w] == color[v]) {
          // 若相同，则此图不是二分图
          ok = false;
          return;
        }
      }
    }
  };

  // 因为图不一定是联通的，可能存在多个子图
  // 所以要把每个节点都作为起点进行一次遍历
  // 如果发现任何一个子图不是二分图，整幅图都不算二分图
  for (let v = 0; v < n; v++) {
    if (!visited[v]) {
      traverse(graph, v);
    }
  }
  return ok;
};
const graph = [
    [1, 2, 3],
    [0, 2],
    [0, 1, 3],
    [0, 2],
  ],
  result = isBipartite(graph);
console.log(172, "测试用例1：result：", result);
const graph2 = [
    [1, 3],
    [0, 2],
    [1, 3],
    [0, 2],
  ],
  result2 = isBipartite(graph2);
console.log(180, "测试用例2：result2：", result2);
// @lc code=end
