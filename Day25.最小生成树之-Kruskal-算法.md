Day25.最小生成树之-Kruskal-算法

# 零、前言

## 更新日志：

> 2024-5-1：完成了零、前言的总结。

## 本文主要内容：

[1]图论中知名度比较高的算法应该就是：

- <u>Dijkstra 最短路径算法</u>（[Dijkstra 算法模板及应用](https://labuladong.online/algo/data-structure/dijkstra/)），
- <u>环检测和拓扑排序</u>（[环检测及拓扑排序算法](https://labuladong.online/algo/data-structure/topological-sort/)，或者 [Day23.拓扑排序详解及运用](https://zhuanlan.zhihu.com/p/695164059)），
- <u>二分图判定算法</u>（[二分图判定算法](https://labuladong.online/algo/data-structure/bipartite-graph/)）
- 以及今天要讲的**最小生成树（Minimum Spanning Tree）算法**了。

[2]最小生成树算法主要有：

- Prim 算法（普里姆算法）和
- Kruskal 算法（克鲁斯卡尔算法）两种，

[3]这两种算法虽然**都运用了贪心思想**，但从**实现上**来说**差异还是蛮大**的。

[4]本文**先来讲**比较**简单易懂的 Kruskal 算法**，然后在**下一篇**文章 <u>Prim 算法模板</u>（[Prim 最小生成树算法](https://labuladong.online/algo/data-structure/prim/)） 中**聊 Prim 算法**。

- Kruskal 算法其实**很容易理解和记忆**，其**关键**是要**熟悉并查集算法**，如果不熟悉，建议先看下前文 <u>Union-Find 并查集算法</u>（[并查集（Union-Find）算法](https://labuladong.online/algo/data-structure/union-find/)，或者前一天的打卡文章 [Day24.Union-Find-算法详解](https://zhuanlan.zhihu.com/p/695403429)）。

[5]接下来，从**最小生成树的定义**说起。

# 一、什么是最小生成树【todo】

## 【1】XXX

[1]「树」和「图」的根本区别：

- 树不会包含环，图可以包含环。

[2]树就是「无环连通图」

如果一幅图没有环，完全可以拉伸成一棵树的模样。专业一点，树就是「无环连通图」。

# 二、Union-Find 并查集算法

> [1584. 连接所有点的最小费用](https://leetcode.cn/problems/min-cost-to-connect-all-points/description/)

# 三、Kruskal 算法

# 总结

Day25.最小生成树之-Kruskal-算法

## 更新日志：

> 2024-5-1：完成了零、前言的总结。

## 【收获 1】

【1】今天学习了 **最小生成树之-Kruskal-算法** 技巧，

今天没有做题，但是了解到：

- 要想了解最小生成树算法，首先要熟悉 Union-Find 并查集算法，然后先学简单易懂的 Kruskal 算法/克鲁斯卡尔算法，然后为了知识的完整性，再了解 Prim 算法/普利姆算法。

## 【收获 2】

今天输出了一篇打卡文章总结：

- [Day25.最小生成树之-Kruskal-算法](https://github.com/djsz3y/algorithm-labuladong/blob/master/Day25.最小生成树之-Kruskal-算法.md)

# 参考链接

- [LABULADONG 的算法网站](https://labuladong.online/algo/)
