Day23.拓扑排序详解及运用

# 零、前言

## 更新日志：

> 2024-4-29：总结了 零、前言 & 环检测算法（DFS 版本），下次精读环检测算法，现在好好熟悉工作内容。

## 本文主要内容：

【1】图这种数据结构，有一些比较特殊的算法，比如：

- 二分图判断（基本且有用的算法，比较熟练地掌握），
- 有环图无环图的判断，
- 拓扑排序（基本且有用的算法，比较熟练地掌握），
- 以及最经典的最小生成树（刷题角度用不多，但是经典算法，学有余力可掌握），
- 单源最短路径问题（刷题角度用不多，但是经典算法，学有余力可掌握），
- 更难的就是类似网络流这样的问题（不打竞赛，没时间没必要学）。

【2】本文结合具体算法题，来说两个图论算法：

- 有向图的环检测、
- 拓扑排序算法。

【3】这两个算法既可以用 **DFS 思路解决**，也可以用 **BFS 思路解决**，  
相对而言 **BFS 解法**从**代码实现**上看**更简洁**一些，  
但 **DFS 解法**有助于你进一步理解**递归遍历数据结构的奥义**，  
所以本文中我先讲 DFS 遍历的思路，再讲 BFS 遍历的思路。

# 环检测算法（DFS 版本）

> [207. 课程表](https://leetcode.cn/problems/course-schedule/description/)

## 1.读懂题目：

`numCourses`：必须选修课程门数，记 0 到 numCourses - 1
`prerequisites[i] = [ai, bi]`：先修课程对，表示想要学 ai ，先完成 bi
问：是否可能完成所有课程的学习？

## 2.写出思路：

### 2.1.how to 无法修完所有课程？存在循环依赖。

### 2.2.环检测算法（DFS 版本）：

存在循环依赖，无法修所有【场景常见：编译器判断代码能否成功编译（import 包，合理设计代码目录结构，否则循环依赖，编译器报错）】
遇到依赖问题 -> 问题转化「有向图」数据结构：图存在环 -> 存在循环依赖。

### 2.3.具体：

1. 课程「有向图」节点，编号 0 -> numCourses-1，课程依赖关系 -> 节点有向边。
   比如：1 指向 3 ：想要学 3 ，先完成 1。
2. 题目数组 prerequisites 生成有向图：
   解释数组：有向图 存在环，课程 存在循环依赖；没有环，能上完全部。
3. 如何解决问题？题目输入转化有向图，判断图是否存在环。
   由于：图的两种存储形式：邻接矩阵和邻接表（常见）。
   所以用邻接表：`const graph = new Array(numCourses).fill([])`
   graph[s] 是列表，存储节点 s 所指向的节点们。

#### 3.1.编写建图函数：buildGraph

```js
// 3.1建图函数
const buildGraph = (numCourses, prerequisites) => {
  const graph = new Array(numCourses).fill([])
  for (let edge of prerequisites) {
    const from = edge[1],
      to = edge[0]
    graph[from].push(to)
  }
  return graph
}
```

#### 3.2.如何遍历此图？

由 DFS 遍历图（多叉树遍历 + visited 数组），
得出 DFS 遍历本题图

```js
// 3.2.1.DFS遍历图（多叉树遍历 + visited 数组）
let _visited = []
const _traverse = (graph, s) => {
  if (_visited[s]) return
  // 前遍位置
  _visited[s] = true // 没遍历过记标记数组visited为遍过。
  for (let t of graph[s]) {
    _traverse(graph, t) // 开遍
  }
  // 后遍位置
}
```

```js
// 3.2.2.DFS遍历本题图
let _visited_ = []
var _canFinish = function (numCourses, prerequisites) {
  const graph = buildGraph(numCourses, prerequisites) // 建图 graph
  _visited_ = new Array(numCourses).fill(false) // 新建 boolean 数组 长 numCourses
  for (let i = 0; i < numCourses; i++) {
    // 注意：
    // for 循每个都遍（此图不全相连，有独立），记 visited为标记，遍过的不再操作；
    // 全相连，直接 _traverse(graph, 0)
    // 这里是精髓！
    _traverse(graph, i) // 从 0 到 numCourses-1 ，DFS遍历上面建图 graph。
  }
}
// traverse 见上面
```

#### 3.3.如何判断图中存在环？

递归函数看做递归树上游走的指针，再添加布尔数组 onPath 记录 traverse 正经过的路径

PS：类比贪吃蛇游戏，visited 记录蛇经过过的格子，而 onPath 仅仅记录蛇身。onPath 用于判断是否成环，类比当贪吃蛇自己咬到自己（成环）的场景。
这样即可在遍历过程中同时判断是否存在环了。

```js
// 3.3.如何判断图中存在环
let onPath = [] // 记录traverse 经过的路径
let visited = [] // 遍过记true
let hasCycle = false // 初始化无环
const traverse = (graph, s) => {
  if (onPath[s]) {
    // 进去出来 true -> false， 进去没出一直 true
    hasCycle = true // 发现环
  }
  if (visited[s] || hasCycle) return // 节点被遍过 或 有环
  // 前遍位置
  visited[s] = true // 标记遍历
  // 开始遍历节点 s
  onPath[s] = true // 进去 true
  for (let t of graph[s]) {
    traverse(graph, t) // 开遍
  }
  // 后遍位置
  onPath[s] = false // 出来 false（节点 s 遍完）
}
```

## 3.代码实现： canFinish

```js
const buildGraph2 = (numCourses, prerequisites) => {
  const map = new Map()
  for (let i = 0; i < numCourses; i++) {
    map.set(i, [])
  }
  for (let edge of prerequisites) {
    const from = edge[1],
      to = edge[0]
    console.log('f', from, 'to', to)
    // graph[from].push(to)
    console.log(map.get(from))
    let list = new Array(...map.get(from))
    list.push(to)
    map.set(from, list)
  }
  const graph = [...map]
  return graph
}
```

```js
/**
 * 完整代码
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
// 建图函数
const buildGraph = (numCourses, prerequisites) => {
  let graph = new Array(numCourses).fill([])
  for (let edge of prerequisites) {
    let from = edge[1],
      to = edge[0]
    graph[from].push(to)
  }
  return graph
}
var canFinish = function (numCourses, prerequisites) {
  let onPath = []
  let visited = []
  let hasCycle = false

  let graph = buildGraph(numCourses, prerequisites)
  visited = new Array(numCourses).fill(false)
  onPath = new Array(numCourses).fill(false)

  const traverse = (graph, s) => {
    console.log(147, onPath[s])
    if (onPath[s]) {
      hasCycle = true // 发现环
    }
    if (visited[s] || hasCycle) return // 节点被遍过 或 有环
    // 前遍位置
    visited[s] = true
    // 开始遍历节点 s
    onPath[s] = true
    for (let t of graph[s]) {
      traverse(graph, t)
    }
    // 后遍位置
    onPath[s] = false
  }

  for (let i = 0; i < numCourses; i++) {
    traverse(graph, i)
  }
  return !hasCycle
}
```

## 4.测试用例：

```js
const numCourses = 2,
  prerequisites = [[1, 0]]
const result = canFinish(numCourses, prerequisites)
console.log(result)
// const numCourses_2 = 2,
//   prerequisites_2 = [
//     [1, 0],
//     [0, 1],
//   ];
// const result_2 = canFinish(numCourses_2, prerequisites_2);
// console.log(result_2);
```

# 拓扑排序算法（DFS 版本）

> [210. 课程表 II](https://leetcode.cn/problems/course-schedule-ii/description/)

# 环检测算法（BFS 版本）

# 拓扑排序算法（BFS 版本）

# 总结

Day23.拓扑排序详解及运用

## 更新日志：

> 2024-4-29：总结了 零、前言 & 环检测算法（DFS 版本），下次精读环检测算法，现在好好熟悉工作内容。

## 【收获 1】

【1】今天学习了 **拓扑排序详解及运用** 技巧，

今天没有做题，但是了解到 今天的 拓扑排序：

- 是否可能完成所有课程，那么什么时候无法修完所有课程？存在循环依赖，那么就需要环检测算法。

- 遇到依赖问题，问题转化成有向图数据结构，图存在环，存在循环依赖。

- 怎么判断图存在环，根据图有两种存储形式，邻接矩阵和邻接表，邻接表常见，所以用这个常见的邻接表。

- 然后编写建图函数，遍历图，判断是否有环，然后是代码实现。

## 【收获 2】

今天输出了一篇打卡文章总结：

- [Day23.拓扑排序详解及运用](https://github.com/djsz3y/algorithm-labuladong/blob/master/Day23.拓扑排序详解及运用.md)

# 参考链接

- [LABULADONG 的算法网站](https://labuladong.online/algo/)
