// 1. Create a graph using adjacency list
class Graph {
  constructor() { this.list = {}; }
  addNode(n) { if (!this.list[n]) this.list[n] = []; }
}

// 2. Create a graph using adjacency matrix
class GraphMatrix {
  constructor(n) {
    this.matrix = Array.from({ length: n }, () => Array(n).fill(0));
  }
}

// 3. Add edge to directed graph
addDirectedEdge(u, v)
{ this.list[u].push(v); }

// 4. Add edge to undirected graph
addUndirectedEdge(u, v) 
{ this.list[u].push(v); this.list[v].push(u); }

// 5. Remove edge from graph
removeEdge(u, v) 
{
  this.list[u] = this.list[u].filter(n => n !== v);
  this.list[v] = this.list[v].filter(n => n !== u);
}

// 6. Traverse graph using DFS (recursive)
function dfs(graph, node, visited = new Set()) {
  if (visited.has(node)) return;
  visited.add(node);
  console.log(node);
  for (const neighbor of graph[node]) dfs(graph, neighbor, visited);
}

// 7. Traverse graph using BFS
function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  while (queue.length) {
    const node = queue.shift();
    console.log(node);
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) { visited.add(neighbor); queue.push(neighbor); }
    }
  }
}

// 8. Count number of nodes
function countNodes(graph) { return Object.keys(graph).length; }

// 9. Count number of edges (undirected)
function countEdges(graph) {
  return Object.values(graph).reduce((sum, neighbors) => sum + neighbors.length, 0) / 2;
}

// 10. Check if path exists between two nodes
function hasPath(graph, src, dst, visited = new Set()) {
  if (src === dst) return true;
  visited.add(src);
  for (const n of graph[src]) {
    if (!visited.has(n) && hasPath(graph, n, dst, visited)) return true;
  }
  return false;
}

// 11. Find connected components
function connectedComponents(graph) {
  const visited = new Set();
  const components = [];
  for (const node of Object.keys(graph)) {
    if (!visited.has(node)) {
      const component = [];
      dfsCollect(graph, node, visited, component);
      components.push(component);
    }
  }
  return components;
}
function dfsCollect(graph, node, visited, component) {
  visited.add(node);
  component.push(node);
  for (const n of graph[node]) if (!visited.has(n)) dfsCollect(graph, n, visited, component);
}

// 12. Count connected components
function countComponents(graph) { return connectedComponents(graph).length; }

// 13. Print all neighbors of a node
function getNeighbors(graph, node) { return graph[node] || []; }

// 14. Detect isolated nodes
function isolatedNodes(graph) {
  return Object.keys(graph).filter(n => graph[n].length === 0);
}

// 15. Clone a simple graph
function cloneGraph(graph) {
  return Object.fromEntries(Object.entries(graph).map(([k, v]) => [k, [...v]]));
}

// 16. Number of islands
function numIslands(grid) {
  let count = 0;
  const rows = grid.length, cols = grid[0].length;
  function sink(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === '0') return;
    grid[r][c] = '0';
    sink(r+1,c); sink(r-1,c); sink(r,c+1); sink(r,c-1);
  }
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (grid[r][c] === '1') { sink(r, c); count++; }
  return count;
}

// 17. Flood fill
function floodFill(image, sr, sc, color) {
  const orig = image[sr][sc];
  if (orig === color) return image;
  function fill(r, c) {
    if (r < 0 || r >= image.length || c < 0 || c >= image[0].length || image[r][c] !== orig) return;
    image[r][c] = color;
    fill(r+1,c); fill(r-1,c); fill(r,c+1); fill(r,c-1);
  }
  fill(sr, sc);
  return image;
}

// 18. Rotten oranges
function orangesRotting(grid) {
  const rows = grid.length, cols = grid[0].length;
  const queue = [];
  let fresh = 0;
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 2) queue.push([r, c, 0]);
      if (grid[r][c] === 1) fresh++;
    }
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  let time = 0;
  while (queue.length) {
    const [r, c, t] = queue.shift();
    for (const [dr, dc] of dirs) {
      const nr = r+dr, nc = c+dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1) {
        grid[nr][nc] = 2; fresh--; time = t+1; queue.push([nr, nc, t+1]);
      }
    }
  }
  return fresh === 0 ? time : -1;
}

// 19. Walls and gates (fill each empty room with distance to nearest gate)
function wallsAndGates(rooms) {
  const rows = rooms.length, cols = rooms[0].length;
  const queue = [];
  const INF = 2147483647;
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (rooms[r][c] === 0) queue.push([r, c]);
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  while (queue.length) {
    const [r, c] = queue.shift();
    for (const [dr, dc] of dirs) {
      const nr = r+dr, nc = c+dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && rooms[nr][nc] === INF) {
        rooms[nr][nc] = rooms[r][c] + 1;
        queue.push([nr, nc]);
      }
    }
  }
}

// 20. Word ladder (BFS shortest transformation)
function ladderLength(beginWord, endWord, wordList) {
  const wordSet = new Set(wordList);
  if (!wordSet.has(endWord)) return 0;
  const queue = [[beginWord, 1]];
  while (queue.length) {
    const [word, steps] = queue.shift();
    for (let i = 0; i < word.length; i++) {
      for (let c = 97; c <= 122; c++) {
        const next = word.slice(0,i) + String.fromCharCode(c) + word.slice(i+1);
        if (next === endWord) return steps + 1;
        if (wordSet.has(next)) { wordSet.delete(next); queue.push([next, steps+1]); }
      }
    }
  }
  return 0;
}

// 21. Shortest path in binary matrix
function shortestPathBinaryMatrix(grid) {
  const n = grid.length;
  if (grid[0][0] === 1 || grid[n-1][n-1] === 1) return -1;
  const queue = [[0, 0, 1]];
  grid[0][0] = 1;
  const dirs = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
  while (queue.length) {
    const [r, c, d] = queue.shift();
    if (r === n-1 && c === n-1) return d;
    for (const [dr, dc] of dirs) {
      const nr = r+dr, nc = c+dc;
      if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] === 0) {
        grid[nr][nc] = 1; queue.push([nr, nc, d+1]);
      }
    }
  }
  return -1;
}

// 22. Pacific Atlantic water flow
function pacificAtlantic(heights) {
  const rows = heights.length, cols = heights[0].length;
  const bfsOcean = (starts) => {
    const visited = new Set(starts.map(([r,c]) => r+','+c));
    const queue = [...starts];
    const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
    while (queue.length) {
      const [r, c] = queue.shift();
      for (const [dr, dc] of dirs) {
        const nr = r+dr, nc = c+dc, key = nr+','+nc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited.has(key) && heights[nr][nc] >= heights[r][c]) {
          visited.add(key); queue.push([nr, nc]);
        }
      }
    }
    return visited;
  };
  const pac = [], atl = [];
  for (let r = 0; r < rows; r++) { pac.push([r,0]); atl.push([r,cols-1]); }
  for (let c = 0; c < cols; c++) { pac.push([0,c]); atl.push([rows-1,c]); }
  const pVisited = bfsOcean(pac), aVisited = bfsOcean(atl);
  const res = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (pVisited.has(r+','+c) && aVisited.has(r+','+c)) res.push([r,c]);
  return res;
}

// 23. Surrounded regions (capture 'O' not connected to border)
function solve(board) {
  const rows = board.length, cols = board[0].length;
  function dfs(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] !== 'O') return;
    board[r][c] = 'S';
    dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1);
  }
  for (let r = 0; r < rows; r++) { dfs(r, 0); dfs(r, cols-1); }
  for (let c = 0; c < cols; c++) { dfs(0, c); dfs(rows-1, c); }
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      board[r][c] = board[r][c] === 'S' ? 'O' : board[r][c] === 'O' ? 'X' : board[r][c];
}

// 24. Keys and rooms
function canVisitAllRooms(rooms) {
  const visited = new Set([0]);
  const stack = [0];
  while (stack.length) {
    const room = stack.pop();
    for (const key of rooms[room]) if (!visited.has(key)) { visited.add(key); stack.push(key); }
  }
  return visited.size === rooms.length;
}

// 25. Is graph bipartite?
function isBipartite(graph) {
  const color = new Array(graph.length).fill(-1);
  for (let i = 0; i < graph.length; i++) {
    if (color[i] !== -1) continue;
    const queue = [i]; color[i] = 0;
    while (queue.length) {
      const node = queue.shift();
      for (const n of graph[node]) {
        if (color[n] === -1) { color[n] = 1 - color[node]; queue.push(n); }
        else if (color[n] === color[node]) return false;
      }
    }
  }
  return true;
}

// 26. Find all paths from source to target
function allPathsSourceTarget(graph) {
  const res = [];
  function dfs(node, path) {
    if (node === graph.length - 1) { res.push([...path]); return; }
    for (const n of graph[node]) { path.push(n); dfs(n, path); path.pop(); }
  }
  dfs(0, [0]);
  return res;
}

// 27. Minimum moves in snake and ladder
function snakesAndLadders(board) {
  const n = board.length;
  const cells = [0];
  for (let r = n-1, dir = 1; r >= 0; r--, dir *= -1) {
    const row = dir === 1 ? board[r] : [...board[r]].reverse();
    for (const v of row) cells.push(v);
  }
  const visited = new Set([1]);
  const queue = [[1, 0]];
  while (queue.length) {
    const [pos, moves] = queue.shift();
    for (let dice = 1; dice <= 6; dice++) {
      let next = pos + dice;
      if (next > n*n) break;
      if (cells[next] !== -1) next = cells[next];
      if (next === n*n) return moves + 1;
      if (!visited.has(next)) { visited.add(next); queue.push([next, moves+1]); }
    }
  }
  return -1;
}

// 28. Knight shortest path on chessboard
function knightShortestPath(n, src, dst) {
  const moves = [[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]];
  const queue = [[src[0], src[1], 0]];
  const visited = new Set([src.join(',')]);
  while (queue.length) {
    const [r, c, steps] = queue.shift();
    if (r === dst[0] && c === dst[1]) return steps;
    for (const [dr, dc] of moves) {
      const nr = r+dr, nc = c+dc, key = nr+','+nc;
      if (nr >= 0 && nr < n && nc >= 0 && nc < n && !visited.has(key)) {
        visited.add(key); queue.push([nr, nc, steps+1]);
      }
    }
  }
  return -1;
}

// 29. Escape the maze (BFS to check if exit is reachable)
function canEscape(maze, start, destination) {
  const rows = maze.length, cols = maze[0].length;
  const visited = new Set([start.join(',')]);
  const queue = [start];
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  while (queue.length) {
    const [r, c] = queue.shift();
    if (r === destination[0] && c === destination[1]) return true;
    for (const [dr, dc] of dirs) {
      const nr = r+dr, nc = c+dc, key = nr+','+nc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && maze[nr][nc] === 0 && !visited.has(key)) {
        visited.add(key); queue.push([nr, nc]);
      }
    }
  }
  return false;
}

// 30. Multi-source BFS (distance from nearest source for each cell)
function multiSourceBFS(grid, sources) {
  const rows = grid.length, cols = grid[0].length;
  const dist = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  const queue = [];
  for (const [r, c] of sources) { dist[r][c] = 0; queue.push([r, c]); }
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  while (queue.length) {
    const [r, c] = queue.shift();
    for (const [dr, dc] of dirs) {
      const nr = r+dr, nc = c+dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && dist[nr][nc] === Infinity) {
        dist[nr][nc] = dist[r][c] + 1; queue.push([nr, nc]);
      }
    }
  }
  return dist;
}

// 31. Detect cycle in undirected graph using DFS
function hasCycleUndirected(graph) {
  const visited = new Set();
  function dfs(node, parent) {
    visited.add(node);
    for (const n of graph[node]) {
      if (!visited.has(n)) { if (dfs(n, node)) return true; }
      else if (n !== parent) return true;
    }
    return false;
  }
  for (const node of Object.keys(graph))
    if (!visited.has(node) && dfs(node, null)) return true;
  return false;
}

// 32. Detect cycle using Union-Find
function hasCycleUnionFind(n, edges) {
  const parent = Array.from({ length: n }, (_, i) => i);
  function find(x) { return parent[x] === x ? x : (parent[x] = find(parent[x])); }
  for (const [u, v] of edges) {
    const pu = find(u), pv = find(v);
    if (pu === pv) return true;
    parent[pu] = pv;
  }
  return false;
}

// 33. Detect cycle in directed graph (DFS with rec stack)
function hasCycleDirected(graph) {
  const visited = new Set(), recStack = new Set();
  function dfs(node) {
    visited.add(node); recStack.add(node);
    for (const n of (graph[node] || [])) {
      if (!visited.has(n) && dfs(n)) return true;
      if (recStack.has(n)) return true;
    }
    recStack.delete(node);
    return false;
  }
  for (const node of Object.keys(graph))
    if (!visited.has(node) && dfs(node)) return true;
  return false;
}

// 34. Find eventual safe states
function eventualSafeNodes(graph) {
  const n = graph.length;
  const state = new Array(n).fill(0); // 0=unvisited, 1=visiting, 2=safe
  function dfs(node) {
    if (state[node] === 1) return false;
    if (state[node] === 2) return true;
    state[node] = 1;
    for (const n of graph[node]) if (!dfs(n)) return false;
    state[node] = 2;
    return true;
  }
  return Array.from({ length: n }, (_, i) => i).filter(i => dfs(i));
}

// 35. Course schedule I (can finish all courses?)
function canFinish(numCourses, prerequisites) {
  const graph = Array.from({ length: numCourses }, () => []);
  for (const [a, b] of prerequisites) graph[b].push(a);
  const state = new Array(numCourses).fill(0);
  function dfs(node) {
    if (state[node] === 1) return false;
    if (state[node] === 2) return true;
    state[node] = 1;
    for (const n of graph[node]) if (!dfs(n)) return false;
    state[node] = 2;
    return true;
  }
  for (let i = 0; i < numCourses; i++) if (!dfs(i)) return false;
  return true;
}

// 36. Course schedule II (return order)
function findOrder(numCourses, prerequisites) {
  const graph = Array.from({ length: numCourses }, () => []);
  for (const [a, b] of prerequisites) graph[b].push(a);
  const state = new Array(numCourses).fill(0);
  const order = [];
  function dfs(node) {
    if (state[node] === 1) return false;
    if (state[node] === 2) return true;
    state[node] = 1;
    for (const n of graph[node]) if (!dfs(n)) return false;
    state[node] = 2; order.push(node);
    return true;
  }
  for (let i = 0; i < numCourses; i++) if (!dfs(i)) return [];
  return order.reverse();
}

// 37. Alien dictionary (topological sort on character order)
function alienOrder(words) {
  const graph = {};
  for (const w of words) for (const c of w) if (!graph[c]) graph[c] = new Set();
  for (let i = 0; i < words.length - 1; i++) {
    const [w1, w2] = [words[i], words[i+1]];
    const len = Math.min(w1.length, w2.length);
    if (w1.length > w2.length && w1.startsWith(w2)) return '';
    for (let j = 0; j < len; j++) {
      if (w1[j] !== w2[j]) { graph[w1[j]].add(w2[j]); break; }
    }
  }
  const state = {}, order = [];
  function dfs(c) {
    if (state[c] === 1) return false;
    if (state[c] === 2) return true;
    state[c] = 1;
    for (const n of graph[c]) if (!dfs(n)) return false;
    state[c] = 2; order.push(c);
    return true;
  }
  for (const c of Object.keys(graph)) if (!dfs(c)) return '';
  return order.reverse().join('');
}

// 38. Topological sort using DFS
function topoSortDFS(graph) {
  const visited = new Set(), order = [];
  function dfs(node) {
    visited.add(node);
    for (const n of (graph[node] || [])) if (!visited.has(n)) dfs(n);
    order.push(node);
  }
  for (const node of Object.keys(graph)) if (!visited.has(node)) dfs(node);
  return order.reverse();
}

// 39. Topological sort using Kahn's Algorithm (BFS)
function topoSortKahn(numNodes, edges) {
  const inDegree = new Array(numNodes).fill(0);
  const graph = Array.from({ length: numNodes }, () => []);
  for (const [u, v] of edges) { graph[u].push(v); inDegree[v]++; }
  const queue = [];
  for (let i = 0; i < numNodes; i++) if (inDegree[i] === 0) queue.push(i);
  const order = [];
  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    for (const n of graph[node]) if (--inDegree[n] === 0) queue.push(n);
  }
  return order.length === numNodes ? order : []; // empty = cycle
}

// 40. Detect cycle in prerequisite dependency graph (same as canFinish)
// reuse canFinish(numCourses, prerequisites) from #35

// 41. Dijkstra's shortest path
function dijkstra(graph, start) {
  const dist = {};
  for (const node of Object.keys(graph)) dist[node] = Infinity;
  dist[start] = 0;
  const visited = new Set();
  while (true) {
    let node = null;
    for (const n of Object.keys(dist))
      if (!visited.has(n) && (node === null || dist[n] < dist[node])) node = n;
    if (node === null || dist[node] === Infinity) break;
    visited.add(node);
    for (const [neighbor, weight] of graph[node]) {
      if (dist[node] + weight < dist[neighbor]) dist[neighbor] = dist[node] + weight;
    }
  }
  return dist;
}

// 42. Bellman-Ford
function bellmanFord(n, edges, start) {
  const dist = new Array(n).fill(Infinity);
  dist[start] = 0;
  for (let i = 0; i < n - 1; i++)
    for (const [u, v, w] of edges)
      if (dist[u] !== Infinity && dist[u] + w < dist[v]) dist[v] = dist[u] + w;
  for (const [u, v, w] of edges)
    if (dist[u] !== Infinity && dist[u] + w < dist[v]) return null; // negative cycle
  return dist;
}

// 43. Floyd-Warshall (all pairs shortest path)
function floydWarshall(graph) {
  const n = graph.length;
  const dist = graph.map(row => [...row]);
  for (let k = 0; k < n; k++)
    for (let i = 0; i < n; i++)
      for (let j = 0; j < n; j++)
        if (dist[i][k] + dist[k][j] < dist[i][j]) dist[i][j] = dist[i][k] + dist[k][j];
  return dist;
}

// 44. Shortest path in DAG (topo sort + relax)
function shortestPathDAG(graph, start, n) {
  const order = topoSortDFS(graph);
  const dist = new Array(n).fill(Infinity);
  dist[start] = 0;
  for (const u of order)
    for (const [v, w] of (graph[u] || []))
      if (dist[u] + w < dist[v]) dist[v] = dist[u] + w;
  return dist;
}

// 45. Network delay time
function networkDelayTime(times, n, k) {
  const graph = {};
  for (let i = 1; i <= n; i++) graph[i] = [];
  for (const [u, v, w] of times) graph[u].push([v, w]);
  const dist = dijkstra(graph, k);
  const max = Math.max(...Object.values(dist));
  return max === Infinity ? -1 : max;
}

// 46. Cheapest flights within k stops
function findCheapestPrice(n, flights, src, dst, k) {
  let prices = new Array(n).fill(Infinity);
  prices[src] = 0;
  for (let i = 0; i <= k; i++) {
    const tmp = [...prices];
    for (const [u, v, w] of flights)
      if (prices[u] !== Infinity && prices[u] + w < tmp[v]) tmp[v] = prices[u] + w;
    prices = tmp;
  }
  return prices[dst] === Infinity ? -1 : prices[dst];
}

// 47. Minimum effort path (BFS/Dijkstra on grid)
function minimumEffortPath(heights) {
  const rows = heights.length, cols = heights[0].length;
  const effort = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  effort[0][0] = 0;
  const heap = [[0, 0, 0]]; // [effort, r, c]
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  while (heap.length) {
    heap.sort((a, b) => a[0] - b[0]);
    const [e, r, c] = heap.shift();
    if (r === rows-1 && c === cols-1) return e;
    if (e > effort[r][c]) continue;
    for (const [dr, dc] of dirs) {
      const nr = r+dr, nc = c+dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
        const ne = Math.max(e, Math.abs(heights[nr][nc] - heights[r][c]));
        if (ne < effort[nr][nc]) { effort[nr][nc] = ne; heap.push([ne, nr, nc]); }
      }
    }
  }
  return 0;
}

// 48. Path with maximum probability
function maxProbability(n, edges, succProb, start, end) {
  const graph = Array.from({ length: n }, () => []);
  for (let i = 0; i < edges.length; i++) {
    const [u, v] = edges[i], p = succProb[i];
    graph[u].push([v, p]); graph[v].push([u, p]);
  }
  const prob = new Array(n).fill(0);
  prob[start] = 1;
  const heap = [[1, start]];
  while (heap.length) {
    heap.sort((a, b) => b[0] - a[0]);
    const [p, node] = heap.shift();
    if (node === end) return p;
    for (const [next, ep] of graph[node]) {
      if (p * ep > prob[next]) { prob[next] = p * ep; heap.push([prob[next], next]); }
    }
  }
  return 0;
}

// 49. Minimum cost to connect all points (Prim's on points)
function minCostConnectPoints(points) {
  const n = points.length;
  const dist = new Array(n).fill(Infinity);
  dist[0] = 0;
  const visited = new Set();
  let total = 0;
  for (let i = 0; i < n; i++) {
    let u = -1;
    for (let j = 0; j < n; j++) if (!visited.has(j) && (u === -1 || dist[j] < dist[u])) u = j;
    visited.add(u); total += dist[u];
    for (let v = 0; v < n; v++) {
      const d = Math.abs(points[u][0]-points[v][0]) + Math.abs(points[u][1]-points[v][1]);
      if (!visited.has(v) && d < dist[v]) dist[v] = d;
    }
  }
  return total;
}

// 50. 0-1 BFS (weights only 0 or 1, use deque)
function zeroOneBFS(graph, start, end) {
  const dist = new Array(graph.length).fill(Infinity);
  dist[start] = 0;
  const deque = [start];
  while (deque.length) {
    const node = deque.shift();
    for (const [next, w] of graph[node]) {
      if (dist[node] + w < dist[next]) {
        dist[next] = dist[node] + w;
        w === 0 ? deque.unshift(next) : deque.push(next);
      }
    }
  }
  return dist[end];
}

// 51. A* search algorithm
function aStar(grid, start, end) {
  const h = (r, c) => Math.abs(r - end[0]) + Math.abs(c - end[1]);
  const rows = grid.length, cols = grid[0].length;
  const gScore = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  gScore[start[0]][start[1]] = 0;
  const open = [[h(start[0], start[1]), start[0], start[1]]];
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  while (open.length) {
    open.sort((a, b) => a[0] - b[0]);
    const [, r, c] = open.shift();
    if (r === end[0] && c === end[1]) return gScore[r][c];
    for (const [dr, dc] of dirs) {
      const nr = r+dr, nc = c+dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 0) {
        const ng = gScore[r][c] + 1;
        if (ng < gScore[nr][nc]) {
          gScore[nr][nc] = ng;
          open.push([ng + h(nr, nc), nr, nc]);
        }
      }
    }
  }
  return -1;
}

// 52. Bidirectional BFS shortest path
function bidirectionalBFS(graph, src, dst) {
  if (src === dst) return 0;
  let front = new Set([src]), back = new Set([dst]);
  const visitedFront = new Set([src]), visitedBack = new Set([dst]);
  let steps = 0;
  while (front.size && back.size) {
    if (front.size > back.size) [front, back] = [back, front];
    steps++;
    const next = new Set();
    for (const node of front) {
      for (const n of (graph[node] || [])) {
        if (back.has(n)) return steps;
        if (!visitedFront.has(n)) { visitedFront.add(n); next.add(n); }
      }
    }
    front = next;
  }
  return -1;
}

// 53. Kruskal's algorithm
function kruskal(n, edges) {
  edges.sort((a, b) => a[2] - b[2]);
  const parent = Array.from({ length: n }, (_, i) => i);
  const rank = new Array(n).fill(0);
  function find(x) { return parent[x] === x ? x : (parent[x] = find(parent[x])); }
  function union(x, y) {
    const px = find(x), py = find(y);
    if (px === py) return false;
    if (rank[px] < rank[py]) parent[px] = py;
    else if (rank[px] > rank[py]) parent[py] = px;
    else { parent[py] = px; rank[px]++; }
    return true;
  }
  let cost = 0, edgesUsed = 0;
  for (const [u, v, w] of edges) if (union(u, v)) { cost += w; edgesUsed++; }
  return edgesUsed === n-1 ? cost : -1;
}

// 54. Prim's algorithm
function prim(n, graph) {
  const inMST = new Array(n).fill(false);
  const key = new Array(n).fill(Infinity);
  key[0] = 0;
  let cost = 0;
  for (let i = 0; i < n; i++) {
    let u = -1;
    for (let v = 0; v < n; v++) if (!inMST[v] && (u === -1 || key[v] < key[u])) u = v;
    inMST[u] = true; cost += key[u];
    for (const [v, w] of (graph[u] || [])) if (!inMST[v] && w < key[v]) key[v] = w;
  }
  return cost;
}

// 55. Number of provinces
function findCircleNum(isConnected) {
  const n = isConnected.length;
  const visited = new Set();
  function dfs(i) {
    visited.add(i);
    for (let j = 0; j < n; j++) if (isConnected[i][j] === 1 && !visited.has(j)) dfs(j);
  }
  let count = 0;
  for (let i = 0; i < n; i++) if (!visited.has(i)) { dfs(i); count++; }
  return count;
}

// 56. Redundant connection
function findRedundantConnection(edges) {
  const parent = Array.from({ length: edges.length + 1 }, (_, i) => i);
  function find(x) { return parent[x] === x ? x : (parent[x] = find(parent[x])); }
  for (const [u, v] of edges) {
    const pu = find(u), pv = find(v);
    if (pu === pv) return [u, v];
    parent[pu] = pv;
  }
}

// 57. Accounts merge
function accountsMerge(accounts) {
  const parent = {};
  function find(x) { if (parent[x] === undefined) parent[x] = x; return parent[x] === x ? x : (parent[x] = find(parent[x])); }
  function union(x, y) { parent[find(x)] = find(y); }
  const emailToName = {};
  for (const acc of accounts) {
    const name = acc[0];
    for (let i = 1; i < acc.length; i++) {
      emailToName[acc[i]] = name;
      union(acc[1], acc[i]);
    }
  }
  const groups = {};
  for (const email of Object.keys(emailToName)) {
    const root = find(email);
    if (!groups[root]) groups[root] = [];
    groups[root].push(email);
  }
  return Object.values(groups).map(emails => [emailToName[emails[0]], ...emails.sort()]);
}

// 58. Most stones removed with same row or column
function removeStones(stones) {
  const parent = {};
  function find(x) { if (parent[x] === undefined) parent[x] = x; return parent[x] === x ? x : (parent[x] = find(parent[x])); }
  function union(x, y) { parent[find(x)] = find(y); }
  for (const [r, c] of stones) union(r, ~c);
  const roots = new Set(stones.map(([r, c]) => find(r)));
  return stones.length - roots.size;
}

// 59. Satisfiability of equality equations
function equationsPossible(equations) {
  const parent = Array.from({ length: 26 }, (_, i) => i);
  function find(x) { return parent[x] === x ? x : (parent[x] = find(parent[x])); }
  for (const eq of equations)
    if (eq[1] === '=') parent[find(eq.charCodeAt(0)-97)] = find(eq.charCodeAt(3)-97);
  for (const eq of equations)
    if (eq[1] === '!' && find(eq.charCodeAt(0)-97) === find(eq.charCodeAt(3)-97)) return false;
  return true;
}

// 60. Dynamic connectivity queries (offline union-find with rollback)
class DynamicConnectivity {
  constructor(n) { this.parent = Array.from({ length: n }, (_, i) => i); this.rank = new Array(n).fill(0); }
  find(x) { return this.parent[x] === x ? x : this.find(this.parent[x]); }
  union(x, y) { this.parent[this.find(x)] = this.find(y); }
  connected(x, y) { return this.find(x) === this.find(y); }
}

// 61. SCC - Kosaraju's algorithm
function kosarajuSCC(graph, n) {
  const order = [], visited = new Set();
  function dfs1(v) { visited.add(v); for (const u of (graph[v]||[])) if (!visited.has(u)) dfs1(u); order.push(v); }
  for (let i = 0; i < n; i++) if (!visited.has(i)) dfs1(i);
  const rev = Array.from({ length: n }, () => []);
  for (let v = 0; v < n; v++) for (const u of (graph[v]||[])) rev[u].push(v);
  const visited2 = new Set(), sccs = [];
  function dfs2(v, comp) { visited2.add(v); comp.push(v); for (const u of rev[v]) if (!visited2.has(u)) dfs2(u, comp); }
  while (order.length) {
    const v = order.pop();
    if (!visited2.has(v)) { const comp = []; dfs2(v, comp); sccs.push(comp); }
  }
  return sccs;
}

// 62. SCC - Tarjan's algorithm
function tarjanSCC(graph, n) {
  let id = 0, sccCount = 0;
  const ids = new Array(n).fill(-1), low = new Array(n).fill(0);
  const onStack = new Array(n).fill(false);
  const stack = [], sccs = [];
  function dfs(v) {
    stack.push(v); onStack[v] = true; ids[v] = low[v] = id++;
    for (const u of (graph[v]||[])) {
      if (ids[u] === -1) dfs(u);
      if (onStack[u]) low[v] = Math.min(low[v], low[u]);
    }
    if (ids[v] === low[v]) {
      const scc = [];
      while (true) { const u = stack.pop(); onStack[u] = false; low[u] = ids[v]; scc.push(u); if (u === v) break; }
      sccs.push(scc); sccCount++;
    }
  }
  for (let i = 0; i < n; i++) if (ids[i] === -1) dfs(i);
  return sccs;
}

// 63. Bridges in a graph
function findBridges(n, edges) {
  const graph = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) { graph[u].push(v); graph[v].push(u); }
  let timer = 0;
  const disc = new Array(n).fill(-1), low = new Array(n).fill(0);
  const bridges = [];
  function dfs(u, parent) {
    disc[u] = low[u] = timer++;
    for (const v of graph[u]) {
      if (v === parent) continue;
      if (disc[v] === -1) { dfs(v, u); low[u] = Math.min(low[u], low[v]); if (low[v] > disc[u]) bridges.push([u, v]); }
      else low[u] = Math.min(low[u], disc[v]);
    }
  }
  for (let i = 0; i < n; i++) if (disc[i] === -1) dfs(i, -1);
  return bridges;
}

// 64. Articulation points
function findArticulationPoints(n, edges) {
  const graph = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) { graph[u].push(v); graph[v].push(u); }
  let timer = 0;
  const disc = new Array(n).fill(-1), low = new Array(n).fill(0);
  const isAP = new Array(n).fill(false);
  function dfs(u, parent) {
    disc[u] = low[u] = timer++;
    let children = 0;
    for (const v of graph[u]) {
      if (v === parent) continue;
      if (disc[v] === -1) {
        children++; dfs(v, u); low[u] = Math.min(low[u], low[v]);
        if (parent === -1 && children > 1) isAP[u] = true;
        if (parent !== -1 && low[v] >= disc[u]) isAP[u] = true;
      } else low[u] = Math.min(low[u], disc[v]);
    }
  }
  for (let i = 0; i < n; i++) if (disc[i] === -1) dfs(i, -1);
  return isAP.map((v, i) => v ? i : -1).filter(i => i !== -1);
}

// 65. Eulerian path and circuit
function eulerianPath(graph, n) {
  const inDeg = new Array(n).fill(0), outDeg = new Array(n).fill(0);
  for (let u = 0; u < n; u++) for (const v of (graph[u]||[])) { outDeg[u]++; inDeg[v]++; }
  let start = 0;
  for (let i = 0; i < n; i++) if (outDeg[i] - inDeg[i] === 1) { start = i; break; }
  const adj = graph.map(l => [...l]);
  const path = [], stack = [start];
  while (stack.length) {
    const v = stack[stack.length - 1];
    if (adj[v] && adj[v].length) stack.push(adj[v].pop());
    else path.push(stack.pop());
  }
  return path.reverse();
}

// 66. Hamiltonian path (backtracking)
function hamiltonianPath(graph, n) {
  const path = [0], visited = new Set([0]);
  function bt() {
    if (path.length === n) return true;
    const u = path[path.length - 1];
    for (const v of (graph[u]||[])) {
      if (!visited.has(v)) { visited.add(v); path.push(v); if (bt()) return true; path.pop(); visited.delete(v); }
    }
    return false;
  }
  return bt() ? path : null;
}

// 67. Traveling Salesman Problem (bitmask DP)
function tsp(dist, n) {
  const dp = Array.from({ length: 1<<n }, () => new Array(n).fill(Infinity));
  dp[1][0] = 0;
  for (let mask = 1; mask < (1<<n); mask++) {
    for (let u = 0; u < n; u++) {
      if (!(mask & (1<<u)) || dp[mask][u] === Infinity) continue;
      for (let v = 0; v < n; v++) {
        if (mask & (1<<v)) continue;
        const nm = mask | (1<<v);
        dp[nm][v] = Math.min(dp[nm][v], dp[mask][u] + dist[u][v]);
      }
    }
  }
  let ans = Infinity;
  for (let u = 1; u < n; u++) ans = Math.min(ans, dp[(1<<n)-1][u] + dist[u][0]);
  return ans;
}

// 68. Graph coloring (backtracking)
function graphColoring(graph, n, colors) {
  const color = new Array(n).fill(0);
  function isSafe(v, c) { return !(graph[v]||[]).some(u => color[u] === c); }
  function bt(v) {
    if (v === n) return true;
    for (let c = 1; c <= colors; c++) {
      if (isSafe(v, c)) { color[v] = c; if (bt(v+1)) return true; color[v] = 0; }
    }
    return false;
  }
  return bt(0) ? color : null;
}

// 69. Detect negative weight cycle (Bellman-Ford)
function hasNegativeCycle(n, edges) { return bellmanFord(n, edges, 0) === null; }

// 70. Minimum cut (using max-flow via BFS augmentation - Ford-Fulkerson approach)
function minCut(capacity, source, sink, n) { return maxFlow(capacity, source, sink, n); } // equal to max flow

// 71. Maximum bipartite matching (Hopcroft-Karp simplified)
function bipartiteMatching(graph, n, m) {
  const matchL = new Array(n).fill(-1), matchR = new Array(m).fill(-1);
  function dfs(u, visited) {
    for (const v of graph[u]) {
      if (!visited.has(v)) {
        visited.add(v);
        if (matchR[v] === -1 || dfs(matchR[v], visited)) { matchL[u] = v; matchR[v] = u; return true; }
      }
    }
    return false;
  }
  let matched = 0;
  for (let u = 0; u < n; u++) if (dfs(u, new Set())) matched++;
  return matched;
}

// 72. Ford-Fulkerson max flow (BFS = Edmonds-Karp)
function maxFlow(capacity, source, sink, n) {
  const cap = capacity.map(r => [...r]);
  let flow = 0;
  function bfs() {
    const parent = new Array(n).fill(-1); parent[source] = source;
    const queue = [source];
    while (queue.length) {
      const u = queue.shift();
      for (let v = 0; v < n; v++)
        if (parent[v] === -1 && cap[u][v] > 0) { parent[v] = u; if (v === sink) return parent; queue.push(v); }
    }
    return null;
  }
  let parent;
  while ((parent = bfs())) {
    let path_flow = Infinity;
    for (let v = sink; v !== source; v = parent[v]) path_flow = Math.min(path_flow, cap[parent[v]][v]);
    for (let v = sink; v !== source; v = parent[v]) { cap[parent[v]][v] -= path_flow; cap[v][parent[v]] += path_flow; }
    flow += path_flow;
  }
  return flow;
}

// 73. Edmonds-Karp algorithm — same as #72 (Ford-Fulkerson with BFS)
// reuse maxFlow above

// 74. Dinic's algorithm
function dinic(capacity, source, sink, n) {
  const cap = capacity.map(r => [...r]);
  function bfsLevel() {
    const level = new Array(n).fill(-1); level[source] = 0;
    const queue = [source];
    while (queue.length) { const u = queue.shift(); for (let v = 0; v < n; v++) if (level[v] < 0 && cap[u][v] > 0) { level[v] = level[u]+1; queue.push(v); } }
    return level;
  }
  function dfsFlow(u, pushed, level, iter) {
    if (u === sink) return pushed;
    for (; iter[u] < n; iter[u]++) {
      const v = iter[u];
      if (level[v] !== level[u]+1 || cap[u][v] <= 0) continue;
      const d = dfsFlow(v, Math.min(pushed, cap[u][v]), level, iter);
      if (d > 0) { cap[u][v] -= d; cap[v][u] += d; return d; }
    }
    return 0;
  }
  let flow = 0, level;
  while ((level = bfsLevel())[sink] >= 0) {
    const iter = new Array(n).fill(0);
    let f;
    while ((f = dfsFlow(source, Infinity, level, iter)) > 0) flow += f;
  }
  return flow;
}

// 75. Critical connections in network (bridges — same as #63)
// reuse findBridges(n, edges)

// 76. Reconstruct itinerary
function findItinerary(tickets) {
  const graph = {};
  for (const [from, to] of tickets) { if (!graph[from]) graph[from] = []; graph[from].push(to); }
  for (const k of Object.keys(graph)) graph[k].sort().reverse();
  const result = [];
  function dfs(airport) { while (graph[airport] && graph[airport].length) dfs(graph[airport].pop()); result.push(airport); }
  dfs('JFK');
  return result.reverse();
}

// 77. Word search II (Trie + DFS)
function findWords(board, words) {
  const trie = {};
  for (const w of words) { let node = trie; for (const c of w) { if (!node[c]) node[c] = {}; node = node[c]; } node['#'] = w; }
  const rows = board.length, cols = board[0].length, res = new Set();
  function dfs(r, c, node) {
    if (r < 0 || r >= rows || c < 0 || c >= cols) return;
    const ch = board[r][c];
    if (!node[ch]) return;
    const next = node[ch];
    if (next['#']) res.add(next['#']);
    board[r][c] = '#';
    dfs(r+1,c,next); dfs(r-1,c,next); dfs(r,c+1,next); dfs(r,c-1,next);
    board[r][c] = ch;
  }
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) dfs(r, c, trie);
  return [...res];
}

// 78. Open the lock
function openLock(deadends, target) {
  const dead = new Set(deadends);
  if (dead.has('0000')) return -1;
  const queue = [['0000', 0]], visited = new Set(['0000']);
  while (queue.length) {
    const [combo, turns] = queue.shift();
    if (combo === target) return turns;
    for (let i = 0; i < 4; i++) {
      for (const d of [1, -1]) {
        const next = combo.split('');
        next[i] = String((+next[i] + d + 10) % 10);
        const s = next.join('');
        if (!visited.has(s) && !dead.has(s)) { visited.add(s); queue.push([s, turns+1]); }
      }
    }
  }
  return -1;
}

// 79. Sliding puzzle graph state
function slidingPuzzle(board) {
  const start = board.flat().join(''), target = '123450';
  const neighbors = [[1,3],[0,2,4],[1,5],[0,4],[1,3,5],[2,4]];
  const queue = [[start, 0]], visited = new Set([start]);
  while (queue.length) {
    const [state, moves] = queue.shift();
    if (state === target) return moves;
    const z = state.indexOf('0');
    for (const n of neighbors[z]) {
      const arr = state.split('');
      [arr[z], arr[n]] = [arr[n], arr[z]];
      const next = arr.join('');
      if (!visited.has(next)) { visited.add(next); queue.push([next, moves+1]); }
    }
  }
  return -1;
}

// 80. Count distinct islands (canonical DFS path signature)
function countDistinctIslands(grid) {
  const rows = grid.length, cols = grid[0].length;
  const shapes = new Set();
  function dfs(r, c, r0, c0, path) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] !== 1) return;
    grid[r][c] = 0;
    path.push([r-r0, c-c0].join(','));
    dfs(r+1,c,r0,c0,path); dfs(r-1,c,r0,c0,path); dfs(r,c+1,r0,c0,path); dfs(r,c-1,r0,c0,path);
    path.push('b');
  }
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    if (grid[r][c] === 1) { const p = []; dfs(r,c,r,c,p); shapes.add(p.join('|')); }
  }
  return shapes.size;
}

// 81. Largest island after one flip
function largestIsland(grid) {
  const n = grid.length;
  let id = 2;
  const size = {};
  function dfs(r, c, id) {
    if (r < 0 || r >= n || c < 0 || c >= n || grid[r][c] !== 1) return 0;
    grid[r][c] = id;
    return 1 + dfs(r+1,c,id) + dfs(r-1,c,id) + dfs(r,c+1,id) + dfs(r,c-1,id);
  }
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (grid[r][c] === 1) { size[id] = dfs(r,c,id); id++; }
  let ans = Math.max(0, ...Object.values(size));
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
    if (grid[r][c] === 0) {
      const seen = new Set();
      let total = 1;
      for (const [dr, dc] of dirs) { const nr=r+dr, nc=c+dc; if (nr>=0&&nr<n&&nc>=0&&nc<n&&grid[nr][nc]>1&&!seen.has(grid[nr][nc])) { seen.add(grid[nr][nc]); total+=size[grid[nr][nc]]; } }
      ans = Math.max(ans, total);
    }
  }
  return ans;
}

// 82. Number of enclaves
function numEnclaves(grid) {
  const rows = grid.length, cols = grid[0].length;
  function dfs(r, c) {
    if (r<0||r>=rows||c<0||c>=cols||grid[r][c]!==1) return;
    grid[r][c] = 0; dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1);
  }
  for (let r=0;r<rows;r++) { dfs(r,0); dfs(r,cols-1); }
  for (let c=0;c<cols;c++) { dfs(0,c); dfs(rows-1,c); }
  return grid.flat().filter(v=>v===1).length;
}

// 83. Shortest bridge between two islands
function shortestBridge(grid) {
  const n = grid.length, dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  const queue = [];
  let found = false;
  function dfs(r, c) {
    if (r<0||r>=n||c<0||c>=n||grid[r][c]!==1) return;
    grid[r][c] = 2; queue.push([r,c,0]); dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1);
  }
  outer: for (let r=0;r<n;r++) for (let c=0;c<n;c++) if (grid[r][c]===1) { dfs(r,c); found=true; break outer; }
  while (queue.length) {
    const [r,c,d] = queue.shift();
    for (const [dr,dc] of dirs) {
      const nr=r+dr, nc=c+dc;
      if (nr<0||nr>=n||nc<0||nc>=n) continue;
      if (grid[nr][nc]===1) return d;
      if (grid[nr][nc]===0) { grid[nr][nc]=2; queue.push([nr,nc,d+1]); }
    }
  }
}

// 84. As far from land as possible (BFS from all land cells)
function maxDistance(grid) {
  const n = grid.length, queue = [], dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  const dist = grid.map(r => [...r]);
  for (let r=0;r<n;r++) for (let c=0;c<n;c++) if (grid[r][c]===1) queue.push([r,c]);
  if (queue.length===0||queue.length===n*n) return -1;
  let ans = -1;
  while (queue.length) {
    const [r,c] = queue.shift();
    for (const [dr,dc] of dirs) {
      const nr=r+dr, nc=c+dc;
      if (nr>=0&&nr<n&&nc>=0&&nc<n&&dist[nr][nc]===0) { dist[nr][nc]=dist[r][c]+1; ans=Math.max(ans,dist[nr][nc]); queue.push([nr,nc]); }
    }
  }
  return ans;
}

// 85. Trapping rain water II (BFS min-heap)
function trapRainWater(heightMap) {
  const rows = heightMap.length, cols = heightMap[0].length;
  const visited = Array.from({ length: rows }, () => new Array(cols).fill(false));
  const heap = [];
  for (let r=0;r<rows;r++) for (let c=0;c<cols;c++) if (r===0||r===rows-1||c===0||c===cols-1) { heap.push([heightMap[r][c],r,c]); visited[r][c]=true; }
  heap.sort((a,b)=>a[0]-b[0]);
  let water = 0;
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  while (heap.length) {
    const [h,r,c] = heap.shift();
    for (const [dr,dc] of dirs) {
      const nr=r+dr, nc=c+dc;
      if (nr<0||nr>=rows||nc<0||nc>=cols||visited[nr][nc]) continue;
      visited[nr][nc]=true;
      water += Math.max(0, h - heightMap[nr][nc]);
      heap.push([Math.max(h, heightMap[nr][nc]), nr, nc]);
      heap.sort((a,b)=>a[0]-b[0]);
    }
  }
  return water;
}

// 86. Escape large maze
function isEscapePossible(blocked, source, target) {
  const limit = (blocked.length * (blocked.length - 1)) / 2;
  const bset = new Set(blocked.map(b => b.join(',')));
  function bfs(src, dst) {
    const visited = new Set([src.join(',')]);
    const queue = [src];
    const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
    while (queue.length) {
      const [r,c] = queue.shift();
      if (r===dst[0]&&c===dst[1]) return true;
      if (visited.size > limit) return true;
      for (const [dr,dc] of dirs) {
        const nr=r+dr, nc=c+dc, key=nr+','+nc;
        if (nr>=0&&nr<1e6&&nc>=0&&nc<1e6&&!bset.has(key)&&!visited.has(key)) { visited.add(key); queue.push([nr,nc]); }
      }
    }
    return false;
  }
  return bfs(source, target) && bfs(target, source);
}

// 87. Minimum obstacle removal to reach corner
function minimumObstacles(grid) {
  const rows = grid.length, cols = grid[0].length;
  const dist = Array.from({ length: rows }, () => new Array(cols).fill(Infinity));
  dist[0][0] = 0;
  const deque = [[0,0]];
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  while (deque.length) {
    const [r,c] = deque.shift();
    for (const [dr,dc] of dirs) {
      const nr=r+dr, nc=c+dc;
      if (nr<0||nr>=rows||nc<0||nc>=cols) continue;
      const nd = dist[r][c] + grid[nr][nc];
      if (nd < dist[nr][nc]) { dist[nr][nc]=nd; grid[nr][nc]===0 ? deque.unshift([nr,nc]) : deque.push([nr,nc]); }
    }
  }
  return dist[rows-1][cols-1];
}

// 88. Disconnect path in binary matrix
function isPossible(grid) {
  const n = grid.length;
  function dfs(r, c) {
    if (r<0||r>=n||c<0||c>=n||grid[r][c]===0) return false;
    if (r===n-1&&c===n-1) return true;
    grid[r][c]=0;
    return dfs(r+1,c)||dfs(r,c+1)||dfs(r-1,c)||dfs(r,c-1);
  }
  grid[0][0]=1; grid[n-1][n-1]=1;
  return dfs(0,0) && dfs(0,0); // two passes; if second pass fails, we can disconnect
}

// 89. Count sub-islands
function countSubIslands(grid1, grid2) {
  const rows = grid1.length, cols = grid1[0].length;
  function dfs(r, c) {
    if (r<0||r>=rows||c<0||c>=cols||grid2[r][c]===0) return true;
    grid2[r][c]=0;
    let res = grid1[r][c]===1;
    res = dfs(r+1,c) && res; res = dfs(r-1,c) && res; res = dfs(r,c+1) && res; res = dfs(r,c-1) && res;
    return res;
  }
  let count = 0;
  for (let r=0;r<rows;r++) for (let c=0;c<cols;c++) if (grid2[r][c]===1&&dfs(r,c)) count++;
  return count;
}


// 90. Clone graph with cycles
function cloneGraphWithCycles(node) {
  if (!node) return null;
  const map = new Map();
  function dfs(n) {
    if (map.has(n)) return map.get(n);
    const clone = { val: n.val, neighbors: [] };
    map.set(n, clone);
    for (const nb of n.neighbors) clone.neighbors.push(dfs(nb));
    return clone;
  }
  return dfs(node);
}

// 91. Minimum height trees (find centroid)
function findMinHeightTrees(n, edges) {
  if (n === 1) return [0];
  const graph = Array.from({ length: n }, () => new Set());
  for (const [u,v] of edges) { graph[u].add(v); graph[v].add(u); }
  let leaves = [];
  for (let i=0;i<n;i++) if (graph[i].size===1) leaves.push(i);
  let remaining = n;
  while (remaining > 2) {
    remaining -= leaves.length;
    const newLeaves = [];
    for (const l of leaves) {
      const nb = [...graph[l]][0];
      graph[nb].delete(l);
      if (graph[nb].size===1) newLeaves.push(nb);
    }
    leaves = newLeaves;
  }
  return leaves;
}

// 92. Tree diameter (longest path between any two nodes)
function treeDiameter(edges) {
  const graph = {};
  for (const [u,v] of edges) { if (!graph[u]) graph[u]=[]; if (!graph[v]) graph[v]=[]; graph[u].push(v); graph[v].push(u); }
  let diameter = 0;
  function dfs(node, parent) {
    let maxDepth = 0, second = 0;
    for (const nb of (graph[node]||[])) {
      if (nb===parent) continue;
      const d = dfs(nb, node) + 1;
      if (d > maxDepth) { second=maxDepth; maxDepth=d; } else if (d>second) second=d;
    }
    diameter = Math.max(diameter, maxDepth+second);
    return maxDepth;
  }
  if (Object.keys(graph).length) dfs(Object.keys(graph)[0], -1);
  return diameter;
}

// 93. Validate tree using graph (connected + n-1 edges + no cycle)
function isValidTree(n, edges) {
  if (edges.length !== n-1) return false;
  const graph = Array.from({ length: n }, () => []);
  for (const [u,v] of edges) { graph[u].push(v); graph[v].push(u); }
  const visited = new Set();
  function dfs(node, parent) {
    visited.add(node);
    for (const nb of graph[node]) { if (nb===parent) continue; if (visited.has(nb)) return false; if (!dfs(nb,node)) return false; }
    return true;
  }
  return dfs(0, -1) && visited.size === n;
}

// 94. Find center of tree (star graph)
function findCenter(edges) {
  const [a, b] = edges[0], [c, d] = edges[1];
  return a===c||a===d ? a : b;
}

// 95. Sum of distances in tree
function sumOfDistancesInTree(n, edges) {
  const graph = Array.from({ length: n }, () => []);
  for (const [u,v] of edges) { graph[u].push(v); graph[v].push(u); }
  const count = new Array(n).fill(1), ans = new Array(n).fill(0);
  function dfs1(node, parent) {
    for (const nb of graph[node]) { if (nb===parent) continue; dfs1(nb,node); count[node]+=count[nb]; ans[node]+=ans[nb]+count[nb]; }
  }
  function dfs2(node, parent) {
    for (const nb of graph[node]) { if (nb===parent) continue; ans[nb]=ans[node]-count[nb]+(n-count[nb]); dfs2(nb,node); }
  }
  dfs1(0,-1); dfs2(0,-1);
  return ans;
}

// 96. Binary lifting LCA
function buildLCA(n, edges, root=0) {
  const LOG = Math.ceil(Math.log2(n+1));
  const graph = Array.from({ length: n }, () => []);
  for (const [u,v] of edges) { graph[u].push(v); graph[v].push(u); }
  const up = Array.from({ length: n }, () => new Array(LOG).fill(-1));
  const depth = new Array(n).fill(0);
  function dfs(node, parent) {
    up[node][0] = parent;
    for (let j=1;j<LOG;j++) if (up[node][j-1]!==-1) up[node][j]=up[up[node][j-1]][j-1];
    for (const nb of graph[node]) if (nb!==parent) { depth[nb]=depth[node]+1; dfs(nb,node); }
  }
  dfs(root, root);
  function lca(u, v) {
    if (depth[u]<depth[v]) [u,v]=[v,u];
    let diff=depth[u]-depth[v];
    for (let j=0;j<LOG;j++) if ((diff>>j)&1) u=up[u][j];
    if (u===v) return u;
    for (let j=LOG-1;j>=0;j--) if (up[u][j]!==up[v][j]) { u=up[u][j]; v=up[v][j]; }
    return up[u][0];
  }
  return lca;
}

// 97. Re-rooting DP on trees
function reRootingDP(n, edges) {
  const graph = Array.from({ length: n }, () => []);
  for (const [u,v] of edges) { graph[u].push(v); graph[v].push(u); }
  const down = new Array(n).fill(0);
  function dfs1(node, parent) {
    for (const nb of graph[node]) { if (nb===parent) continue; dfs1(nb,node); down[node]+=down[nb]+1; }
  }
  const ans = new Array(n).fill(0);
  function dfs2(node, parent, fromAbove) {
    ans[node] = down[node] + fromAbove;
    for (const nb of graph[node]) {
      if (nb===parent) continue;
      const childUp = fromAbove + (down[node] - down[nb] - 1) + 1;
      dfs2(nb, node, childUp);
    }
  }
  dfs1(0,-1); dfs2(0,-1,0);
  return ans;
}

// 98. Detect subtree using graph traversal
function isSubtree(root, subRoot) {
  function isSame(a, b) {
    if (!a && !b) return true;
    if (!a || !b) return false;
    return a.val===b.val && isSame(a.left,b.left) && isSame(a.right,b.right);
  }
  function dfs(node) {
    if (!node) return false;
    return isSame(node, subRoot) || dfs(node.left) || dfs(node.right);
  }
  return dfs(root);
}

// 99. Serialize and deserialize graph/tree
function serialize(root) {
  if (!root) return 'null';
  return root.val + ',' + serialize(root.left) + ',' + serialize(root.right);
}
function deserialize(data) {
  const vals = data.split(',');
  function build() {
    const val = vals.shift();
    if (val==='null') return null;
    return { val: +val, left: build(), right: build() };
  }
  return build();
}

// 100. PageRank simplified
function pageRank(graph, iterations=100, d=0.85) {
  const nodes = Object.keys(graph);
  const n = nodes.length;
  const rank = {};
  for (const node of nodes) rank[node] = 1/n;
  for (let i=0;i<iterations;i++) {
    const newRank = {};
    for (const node of nodes) {
      let sum = 0;
      for (const src of nodes) if (graph[src].includes(node)) sum += rank[src]/graph[src].length;
      newRank[node] = (1-d)/n + d*sum;
    }
    Object.assign(rank, newRank);
  }
  return rank;
}

// 101. Topological sort for dependency/package resolver
function resolveDependencies(packages) {
  const graph = {}, inDegree = {};
  for (const pkg of Object.keys(packages)) { graph[pkg] = packages[pkg]; inDegree[pkg] = inDegree[pkg]||0; for (const dep of packages[pkg]) inDegree[dep] = (inDegree[dep]||0)+1; }
  // Flip: install deps first — reverse topological order
  const order = topoSortKahn(Object.keys(packages).length, Object.entries(packages).flatMap(([p,deps]) => deps.map(d=>[p,d])));
  return order.reverse();
}

// 102. BFS web crawler graph traversal
async function webCrawler(startUrl, htmlParser) {
  const visited = new Set([startUrl]);
  const queue = [startUrl];
  const hostname = new URL(startUrl).hostname;
  while (queue.length) {
    const url = queue.shift();
    for (const link of (await htmlParser(url))) {
      if (!visited.has(link) && new URL(link).hostname === hostname) { visited.add(link); queue.push(link); }
    }
  }
  return [...visited];
}

// 103. Sudoku solver as graph constraint problem
function solveSudoku(board) {
  function isValid(board, row, col, num) {
    const box_r = Math.floor(row/3)*3, box_c = Math.floor(col/3)*3;
    for (let i=0;i<9;i++) {
      if (board[row][i]===num) return false;
      if (board[i][col]===num) return false;
      if (board[box_r+Math.floor(i/3)][box_c+i%3]===num) return false;
    }
    return true;
  }
  function solve() {
    for (let r=0;r<9;r++) for (let c=0;c<9;c++) {
      if (board[r][c]==='.') {
        for (let d=1;d<=9;d++) {
          const num = String(d);
          if (isValid(board,r,c,num)) { board[r][c]=num; if (solve()) return true; board[r][c]='.'; }
        }
        return false;
      }
    }
    return true;
  }
  solve();
}

// 104. N-Queens as graph/backtracking
function solveNQueens(n) {
  const res = [];
  const cols = new Set(), diag1 = new Set(), diag2 = new Set();
  const board = Array.from({ length: n }, () => Array(n).fill('.'));
  function bt(row) {
    if (row===n) { res.push(board.map(r=>r.join(''))); return; }
    for (let col=0;col<n;col++) {
      if (cols.has(col)||diag1.has(row-col)||diag2.has(row+col)) continue;
      cols.add(col); diag1.add(row-col); diag2.add(row+col); board[row][col]='Q';
      bt(row+1);
      cols.delete(col); diag1.delete(row-col); diag2.delete(row+col); board[row][col]='.';
    }
  }
  bt(0);
  return res;
}

// 105. Social network mutual friends
function mutualFriends(graph, a, b) {
  const setA = new Set(graph[a]);
  return (graph[b]||[]).filter(f => setA.has(f));
}

// 106. Detect fraud rings (cycle detection in directed graph)
// reuse hasCycleDirected from #33

// 107. Sparse graph optimization (adjacency list is already optimal — here's a weighted version)
class SparseGraph {
  constructor() { this.edges = new Map(); }
  addEdge(u, v, w=1) { if (!this.edges.has(u)) this.edges.set(u,[]); this.edges.get(u).push({v,w}); }
  neighbors(u) { return this.edges.get(u) || []; }
}

// 108. Centroid decomposition basics
function centroidDecompose(n, graph) {
  const subtreeSize = new Array(n).fill(0), removed = new Array(n).fill(false);
  function getSize(v, p) {
    subtreeSize[v] = 1;
    for (const u of graph[v]) if (!removed[u] && u!==p) subtreeSize[v]+=getSize(u,v);
    return subtreeSize[v];
  }
  function getCentroid(v, p, treeSize) {
    for (const u of graph[v]) if (!removed[u] && u!==p && subtreeSize[u]>treeSize/2) return getCentroid(u,v,treeSize);
    return v;
  }
  const centroids = [];
  function decompose(v) {
    const sz = getSize(v,-1);
    const c = getCentroid(v,-1,sz);
    removed[c] = true; centroids.push(c);
    for (const u of graph[c]) if (!removed[u]) decompose(u);
  }
  decompose(0);
  return centroids;
}