// 1. Minimum Falling Path Sum
function minFallingPathSum(matrix) {
  const n = matrix.length;
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const left = j > 0 ? matrix[i-1][j-1] : Infinity;
      const mid = matrix[i-1][j];
      const right = j < n-1 ? matrix[i-1][j+1] : Infinity;
      matrix[i][j] += Math.min(left, mid, right);
    }
  }
  return Math.min(...matrix[n-1]);
}

// 2. Count Square Submatrices with All Ones
function countSquares(matrix) {
  let count = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] > 0 && i > 0 && j > 0) {
        matrix[i][j] = Math.min(matrix[i-1][j], matrix[i][j-1], matrix[i-1][j-1]) + 1;
      }
      count += matrix[i][j];
    }
  }
  return count;
}

// 3. Largest Plus Sign
function orderOfLargestPlusSign(n, mines) {
  const grid = Array.from({length: n}, () => new Array(n).fill(1));
  for (const [r, c] of mines) grid[r][c] = 0;
  const dp = Array.from({length: n}, () => new Array(n).fill(0));
  for (let r = 0; r < n; r++) {
    let count = 0;
    for (let c = 0; c < n; c++) { count = grid[r][c] === 0 ? 0 : count + 1; dp[r][c] = count; }
    count = 0;
    for (let c = n-1; c >= 0; c--) { count = grid[r][c] === 0 ? 0 : count + 1; dp[r][c] = Math.min(dp[r][c], count); }
  }
  let ans = 0;
  for (let c = 0; c < n; c++) {
    let count = 0;
    for (let r = 0; r < n; r++) { count = grid[r][c] === 0 ? 0 : count + 1; dp[r][c] = Math.min(dp[r][c], count); }
    count = 0;
    for (let r = n-1; r >= 0; r--) { count = grid[r][c] === 0 ? 0 : count + 1; dp[r][c] = Math.min(dp[r][c], count); ans = Math.max(ans, dp[r][c]); }
  }
  return ans;
}

// 4. Number of Ways to Stay in Same Place
function numWays(steps, arrLen) {
  const MOD = 1e9 + 7;
  arrLen = Math.min(arrLen, Math.floor(steps / 2) + 1);
  let dp = new Array(arrLen).fill(0);
  dp[0] = 1;
  for (let s = 0; s < steps; s++) {
    const next = new Array(arrLen).fill(0);
    for (let i = 0; i < arrLen; i++) {
      if (dp[i] === 0) continue;
      next[i] = (next[i] + dp[i]) % MOD;
      if (i > 0) next[i-1] = (next[i-1] + dp[i]) % MOD;
      if (i < arrLen-1) next[i+1] = (next[i+1] + dp[i]) % MOD;
    }
    dp = next;
  }
  return dp[0];
}

// 5. Out of Boundary Paths
function findPaths(m, n, maxMove, startRow, startCol) {
  const MOD = 1e9 + 7;
  let dp = Array.from({length: m}, () => new Array(n).fill(0));
  dp[startRow][startCol] = 1;
  let result = 0;
  const dirs = [[0,1],[0,-1],[1,0],[-1,0]];
  for (let move = 0; move < maxMove; move++) {
    const next = Array.from({length: m}, () => new Array(n).fill(0));
    for (let r = 0; r < m; r++) {
      for (let c = 0; c < n; c++) {
        if (dp[r][c] === 0) continue;
        for (const [dr, dc] of dirs) {
          const nr = r + dr, nc = c + dc;
          if (nr < 0 || nr >= m || nc < 0 || nc >= n) result = (result + dp[r][c]) % MOD;
          else next[nr][nc] = (next[nr][nc] + dp[r][c]) % MOD;
        }
      }
    }
    dp = next;
  }
  return result;
}

// 6. Unique Paths III
function uniquePathsIII(grid) {
  const m = grid.length, n = grid[0].length;
  let startR, startC, empty = 0;
  for (let r = 0; r < m; r++)
    for (let c = 0; c < n; c++) {
      if (grid[r][c] !== -1) empty++;
      if (grid[r][c] === 1) { startR = r; startC = c; }
    }
  let result = 0;
  function dfs(r, c, remaining) {
    if (grid[r][c] === 2) { if (remaining === 1) result++; return; }
    const tmp = grid[r][c];
    grid[r][c] = -1;
    for (const [dr, dc] of [[0,1],[0,-1],[1,0],[-1,0]]) {
      const nr = r+dr, nc = c+dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] !== -1)
        dfs(nr, nc, remaining - 1);
    }
    grid[r][c] = tmp;
  }
  dfs(startR, startC, empty);
  return result;
}

// 7. Frog Jump
function canCross(stones) {
  const stoneSet = new Map();
  for (const s of stones) stoneSet.set(s, new Set());
  stoneSet.get(0).add(0);
  for (const stone of stones) {
    for (const k of stoneSet.get(stone)) {
      for (const jump of [k-1, k, k+1]) {
        if (jump > 0 && stoneSet.has(stone + jump))
          stoneSet.get(stone + jump).add(jump);
      }
    }
  }
  return stoneSet.get(stones[stones.length-1]).size > 0;
}

// 8. Knight Probability in Chessboard
function knightProbability(n, k, row, column) {
  const moves = [[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]];
  let dp = Array.from({length: n}, () => new Array(n).fill(0));
  dp[row][column] = 1;
  for (let step = 0; step < k; step++) {
    const next = Array.from({length: n}, () => new Array(n).fill(0));
    for (let r = 0; r < n; r++)
      for (let c = 0; c < n; c++) {
        if (dp[r][c] === 0) continue;
        for (const [dr, dc] of moves) {
          const nr = r+dr, nc = c+dc;
          if (nr >= 0 && nr < n && nc >= 0 && nc < n)
            next[nr][nc] += dp[r][c] / 8;
        }
      }
    dp = next;
  }
  return dp.reduce((s, row) => s + row.reduce((a, b) => a + b, 0), 0);
}

// 9. Cherry Pickup II
function cherryPickup(grid) {
  const m = grid.length, n = grid[0].length;
  const dp = Array.from({length: m}, () =>
    Array.from({length: n}, () => new Array(n).fill(-Infinity)));
  dp[0][0][n-1] = grid[0][0] + grid[0][n-1];
  for (let r = 1; r < m; r++) {
    for (let c1 = 0; c1 < n; c1++) {
      for (let c2 = 0; c2 < n; c2++) {
        let best = -Infinity;
        for (let dc1 of [-1,0,1])
          for (let dc2 of [-1,0,1]) {
            const pc1 = c1+dc1, pc2 = c2+dc2;
            if (pc1 >= 0 && pc1 < n && pc2 >= 0 && pc2 < n)
              best = Math.max(best, dp[r-1][pc1][pc2]);
          }
        if (best === -Infinity) continue;
        dp[r][c1][c2] = best + grid[r][c1] + (c1 !== c2 ? grid[r][c2] : 0);
      }
    }
  }
  let ans = 0;
  for (let c1 = 0; c1 < n; c1++)
    for (let c2 = 0; c2 < n; c2++)
      ans = Math.max(ans, dp[m-1][c1][c2]);
  return ans;
}

// 10. Longest Increasing Path in Matrix
function longestIncreasingPath(matrix) {
  const m = matrix.length, n = matrix[0].length;
  const memo = Array.from({length: m}, () => new Array(n).fill(0));
  function dfs(r, c) {
    if (memo[r][c]) return memo[r][c];
    let best = 1;
    for (const [dr, dc] of [[0,1],[0,-1],[1,0],[-1,0]]) {
      const nr = r+dr, nc = c+dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && matrix[nr][nc] > matrix[r][c])
        best = Math.max(best, 1 + dfs(nr, nc));
    }
    return memo[r][c] = best;
  }
  let ans = 0;
  for (let r = 0; r < m; r++)
    for (let c = 0; c < n; c++)
      ans = Math.max(ans, dfs(r, c));
  return ans;
}

// 1. House Robber III
function robTree(root) {
  function dp(node) {
    if (!node) return [0, 0]; // [rob, skip]
    const [lr, ls] = dp(node.left);
    const [rr, rs] = dp(node.right);
    const rob = node.val + ls + rs;
    const skip = Math.max(lr, ls) + Math.max(rr, rs);
    return [rob, skip];
  }
  const [r, s] = dp(root);
  return Math.max(r, s);
}

// 2. Binary Tree Maximum Path Sum
function maxPathSum(root) {
  let ans = -Infinity;
  function dfs(node) {
    if (!node) return 0;
    const left = Math.max(0, dfs(node.left));
    const right = Math.max(0, dfs(node.right));
    ans = Math.max(ans, node.val + left + right);
    return node.val + Math.max(left, right);
  }
  dfs(root);
  return ans;
}

// 3. Diameter of Binary Tree
function diameterOfBinaryTree(root) {
  let ans = 0;
  function depth(node) {
    if (!node) return 0;
    const l = depth(node.left), r = depth(node.right);
    ans = Math.max(ans, l + r);
    return 1 + Math.max(l, r);
  }
  depth(root);
  return ans;
}

// 4. Count Good Nodes in Binary Tree
function goodNodes(root) {
  function dfs(node, maxSoFar) {
    if (!node) return 0;
    const good = node.val >= maxSoFar ? 1 : 0;
    const nextMax = Math.max(maxSoFar, node.val);
    return good + dfs(node.left, nextMax) + dfs(node.right, nextMax);
  }
  return dfs(root, -Infinity);
}

// 5. Distribute Coins in Binary Tree
function distributeCoins(root) {
  let moves = 0;
  function dfs(node) {
    if (!node) return 0;
    const left = dfs(node.left), right = dfs(node.right);
    moves += Math.abs(left) + Math.abs(right);
    return node.val - 1 + left + right;
  }
  dfs(root);
  return moves;
}

// 6. Maximum Sum BST in Binary Tree
function maxSumBST(root) {
  let ans = 0;
  // returns [isBST, min, max, sum]
  function dfs(node) {
    if (!node) return [true, Infinity, -Infinity, 0];
    const [lb, lmin, lmax, lsum] = dfs(node.left);
    const [rb, rmin, rmax, rsum] = dfs(node.right);
    if (lb && rb && lmax < node.val && node.val < rmin) {
      const sum = lsum + rsum + node.val;
      ans = Math.max(ans, sum);
      return [true, Math.min(lmin, node.val), Math.max(rmax, node.val), sum];
    }
    return [false, 0, 0, 0];
  }
  dfs(root);
  return ans;
}

// 7. Tree DP Rerooting Technique (sum of distances in tree)
function sumOfDistancesInTree(n, edges) {
  const graph = Array.from({length: n}, () => []);
  for (const [u, v] of edges) { graph[u].push(v); graph[v].push(u); }
  const count = new Array(n).fill(1);
  const ans = new Array(n).fill(0);
  function dfs1(node, parent) {
    for (const child of graph[node]) {
      if (child === parent) continue;
      dfs1(child, node);
      count[node] += count[child];
      ans[node] += ans[child] + count[child];
    }
  }
  function dfs2(node, parent) {
    for (const child of graph[node]) {
      if (child === parent) continue;
      ans[child] = ans[node] - count[child] + (n - count[child]);
      dfs2(child, node);
    }
  }
  dfs1(0, -1);
  dfs2(0, -1);
  return ans;
}

// 8. Longest Zigzag Path in Binary Tree
function longestZigZag(root) {
  let ans = 0;
  // dir: 0 = came from left, 1 = came from right
  function dfs(node, dir, length) {
    if (!node) return;
    ans = Math.max(ans, length);
    if (dir === 0) { // came from parent's left, so we went right
      dfs(node.left, 0, 1);       // reset
      dfs(node.right, 1, length + 1);
    } else {
      dfs(node.left, 0, length + 1);
      dfs(node.right, 1, 1);      // reset
    }
  }
  dfs(root.left, 0, 1);
  dfs(root.right, 1, 1);
  return ans;
}

// 9. DP on Subtree Sizes (count nodes in each subtree)
function subtreeSizes(root) {
  const sizes = new Map();
  function dfs(node) {
    if (!node) return 0;
    const size = 1 + dfs(node.left) + dfs(node.right);
    sizes.set(node, size);
    return size;
  }
  dfs(root);
  return sizes;
}

// 10. Independent Set in Tree (max weight independent set)
function maxIndependentSetTree(root) {
  // returns [include, exclude]
  function dp(node) {
    if (!node) return [0, 0];
    const [li, le] = dp(node.left);
    const [ri, re] = dp(node.right);
    const include = node.val + le + re;
    const exclude = Math.max(li, le) + Math.max(ri, re);
    return [include, exclude];
  }
  const [inc, exc] = dp(root);
  return Math.max(inc, exc);
}

// 1. Matrix Chain Multiplication
function matrixChainOrder(dims) {
  const n = dims.length - 1;
  const dp = Array.from({length: n}, () => new Array(n).fill(0));
  for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1;
      dp[i][j] = Infinity;
      for (let k = i; k < j; k++)
        dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k+1][j] + dims[i]*dims[k+1]*dims[j+1]);
    }
  }
  return dp[0][n-1];
}

// 2. Burst Balloons
function maxCoins(nums) {
  nums = [1, ...nums, 1];
  const n = nums.length;
  const dp = Array.from({length: n}, () => new Array(n).fill(0));
  for (let len = 2; len < n; len++) {
    for (let left = 0; left < n - len; left++) {
      const right = left + len;
      for (let k = left + 1; k < right; k++)
        dp[left][right] = Math.max(dp[left][right],
          dp[left][k] + nums[left]*nums[k]*nums[right] + dp[k][right]);
    }
  }
  return dp[0][n-1];
}

// 3. Minimum Cost Tree from Leaf Values
function mctFromLeafValues(arr) {
  const n = arr.length;
  const dp = Array.from({length: n}, () => new Array(n).fill(0));
  const maxVal = Array.from({length: n}, () => new Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    maxVal[i][i] = arr[i];
    for (let j = i+1; j < n; j++)
      maxVal[i][j] = Math.max(maxVal[i][j-1], arr[j]);
  }
  for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n-len; i++) {
      const j = i+len-1;
      dp[i][j] = Infinity;
      for (let k = i; k < j; k++)
        dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k+1][j] + maxVal[i][k]*maxVal[k+1][j]);
    }
  }
  return dp[0][n-1];
}

// 4. Palindrome Partitioning II
function minCut(s) {
  const n = s.length;
  const isPalin = Array.from({length: n}, () => new Array(n).fill(false));
  for (let i = n-1; i >= 0; i--)
    for (let j = i; j < n; j++)
      isPalin[i][j] = s[i] === s[j] && (j - i <= 2 || isPalin[i+1][j-1]);
  const dp = new Array(n).fill(Infinity);
  for (let i = 0; i < n; i++) {
    if (isPalin[0][i]) { dp[i] = 0; continue; }
    for (let j = 1; j <= i; j++)
      if (isPalin[j][i]) dp[i] = Math.min(dp[i], dp[j-1] + 1);
  }
  return dp[n-1];
}

// 5. Strange Printer
function strangePrinter(s) {
  const n = s.length;
  const dp = Array.from({length: n}, () => new Array(n).fill(0));
  for (let i = n-1; i >= 0; i--) {
    dp[i][i] = 1;
    for (let j = i+1; j < n; j++) {
      dp[i][j] = dp[i][j-1] + 1;
      for (let k = i; k < j; k++)
        if (s[k] === s[j])
          dp[i][j] = Math.min(dp[i][j], (k+1 <= j-1 ? dp[k+1][j-1] : 0) + dp[i][k]);
    }
  }
  return dp[0][n-1];
}

// 6. Remove Boxes
function removeBoxes(boxes) {
  const n = boxes.length;
  const dp = Array.from({length: n}, () =>
    Array.from({length: n}, () => new Array(n).fill(0)));
  function solve(l, r, k) {
    if (l > r) return 0;
    if (dp[l][r][k]) return dp[l][r][k];
    let res = (k+1)*(k+1) + solve(l+1, r, 0);
    for (let m = l+1; m <= r; m++)
      if (boxes[m] === boxes[l])
        res = Math.max(res, solve(l+1, m-1, 0) + solve(m, r, k+1));
    return dp[l][r][k] = res;
  }
  return solve(0, n-1, 0);
}

// 7. Merge Stones
function mergeStones(stones, k) {
  const n = stones.length;
  if ((n - 1) % (k - 1) !== 0) return -1;
  const prefix = new Array(n+1).fill(0);
  for (let i = 0; i < n; i++) prefix[i+1] = prefix[i] + stones[i];
  const dp = Array.from({length: n}, () => new Array(n).fill(0));
  for (let len = k; len <= n; len++) {
    for (let i = 0; i <= n-len; i++) {
      const j = i+len-1;
      dp[i][j] = Infinity;
      for (let m = i; m < j; m += k-1)
        dp[i][j] = Math.min(dp[i][j], dp[i][m] + dp[m+1][j]);
      if ((len-1) % (k-1) === 0) dp[i][j] += prefix[j+1] - prefix[i];
    }
  }
  return dp[0][n-1];
}

// 8. Minimum Score Triangulation of Polygon
function minScoreTriangulation(values) {
  const n = values.length;
  const dp = Array.from({length: n}, () => new Array(n).fill(0));
  for (let len = 2; len < n; len++) {
    for (let i = 0; i < n-len; i++) {
      const j = i+len;
      dp[i][j] = Infinity;
      for (let k = i+1; k < j; k++)
        dp[i][j] = Math.min(dp[i][j], dp[i][k] + values[i]*values[k]*values[j] + dp[k][j]);
    }
  }
  return dp[0][n-1];
}

// 9. Optimal BST Problem
function optimalBST(keys, freq) {
  const n = keys.length;
  const dp = Array.from({length: n}, () => new Array(n).fill(0));
  const sum = Array.from({length: n}, () => new Array(n).fill(0));
  for (let i = 0; i < n; i++) { dp[i][i] = freq[i]; sum[i][i] = freq[i]; }
  for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n-len; i++) {
      const j = i+len-1;
      sum[i][j] = sum[i][j-1] + freq[j];
      dp[i][j] = Infinity;
      for (let r = i; r <= j; r++) {
        const left = r > i ? dp[i][r-1] : 0;
        const right = r < j ? dp[r+1][j] : 0;
        dp[i][j] = Math.min(dp[i][j], left + right + sum[i][j]);
      }
    }
  }
  return dp[0][n-1];
}

// 10. Boolean Parenthesization
function countWays(symbols, operators) {
  const n = symbols.length;
  const T = Array.from({length: n}, () => new Array(n).fill(0));
  const F = Array.from({length: n}, () => new Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    T[i][i] = symbols[i] === 'T' ? 1 : 0;
    F[i][i] = symbols[i] === 'F' ? 1 : 0;
  }
  for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n-len; i++) {
      const j = i+len-1;
      for (let k = i; k < j; k++) {
        const lt = T[i][k], lf = F[i][k], rt = T[k+1][j], rf = F[k+1][j];
        const op = operators[k];
        if (op === '&') { T[i][j] += lt*rt; F[i][j] += lt*rf + lf*rt + lf*rf; }
        else if (op === '|') { T[i][j] += lt*rt + lt*rf + lf*rt; F[i][j] += lf*rf; }
        else { T[i][j] += lt*rf + lf*rt; F[i][j] += lt*rt + lf*rf; } // ^
      }
    }
  }
  return T[0][n-1];
}

// 1. Egg Dropping Problem
function eggDrop(eggs, floors) {
  // dp[m][k] = max floors testable with m moves, k eggs
  let m = 0;
  const dp = Array.from({length: floors+1}, () => new Array(eggs+1).fill(0));
  while (dp[m][eggs] < floors) {
    m++;
    for (let k = 1; k <= eggs; k++)
      dp[m][k] = dp[m-1][k-1] + dp[m-1][k] + 1;
  }
  return m;
}

// 2. Super Egg Drop (LC 887, same as above)
function superEggDrop(k, n) {
  let m = 0;
  const dp = Array.from({length: n+1}, () => new Array(k+1).fill(0));
  while (dp[m][k] < n) {
    m++;
    for (let j = 1; j <= k; j++)
      dp[m][j] = dp[m-1][j-1] + dp[m-1][j] + 1;
  }
  return m;
}

// 3. Traveling Salesman Problem (Bitmask DP)
function tsp(dist) {
  const n = dist.length;
  const FULL = (1 << n) - 1;
  const dp = Array.from({length: 1 << n}, () => new Array(n).fill(Infinity));
  dp[1][0] = 0;
  for (let mask = 1; mask <= FULL; mask++) {
    for (let u = 0; u < n; u++) {
      if (!(mask & (1 << u)) || dp[mask][u] === Infinity) continue;
      for (let v = 0; v < n; v++) {
        if (mask & (1 << v)) continue;
        const next = mask | (1 << v);
        dp[next][v] = Math.min(dp[next][v], dp[mask][u] + dist[u][v]);
      }
    }
  }
  let ans = Infinity;
  for (let u = 1; u < n; u++) ans = Math.min(ans, dp[FULL][u] + dist[u][0]);
  return ans;
}

// 4. Bitmask DP Assignment Problem
function assignmentProblem(cost) {
  const n = cost.length;
  const dp = new Array(1 << n).fill(Infinity);
  dp[0] = 0;
  for (let mask = 0; mask < (1 << n); mask++) {
    const person = mask.toString(2).split('').filter(b => b === '1').length; // bit count
    if (person >= n) continue;
    for (let job = 0; job < n; job++) {
      if (mask & (1 << job)) continue;
      dp[mask | (1 << job)] = Math.min(dp[mask | (1 << job)], dp[mask] + cost[person][job]);
    }
  }
  return dp[(1 << n) - 1];
}

// 5. Partition to K Equal Sum Subsets
function canPartitionKSubsets(nums, k) {
  const total = nums.reduce((a, b) => a + b, 0);
  if (total % k !== 0) return false;
  const target = total / k;
  nums.sort((a, b) => b - a);
  if (nums[0] > target) return false;
  const dp = new Array(1 << nums.length).fill(false);
  const curSum = new Array(1 << nums.length).fill(0);
  dp[0] = true;
  for (let mask = 0; mask < (1 << nums.length); mask++) {
    if (!dp[mask]) continue;
    for (let i = 0; i < nums.length; i++) {
      if (mask & (1 << i)) continue;
      const next = mask | (1 << i);
      if (curSum[mask] % target + nums[i] <= target) {
        dp[next] = true;
        curSum[next] = curSum[mask] + nums[i];
      }
    }
  }
  return dp[(1 << nums.length) - 1];
}

// 6. Shortest Superstring (Bitmask DP)
function shortestSuperstring(words) {
  const n = words.length;
  const overlap = Array.from({length: n}, () => new Array(n).fill(0));
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++) {
      if (i === j) continue;
      const maxLen = Math.min(words[i].length, words[j].length);
      for (let k = maxLen; k >= 0; k--)
        if (words[i].endsWith(words[j].slice(0, k))) { overlap[i][j] = k; break; }
    }
  const dp = Array.from({length: 1 << n}, () => new Array(n).fill(Infinity));
  const parent = Array.from({length: 1 << n}, () => new Array(n).fill(-1));
  for (let i = 0; i < n; i++) dp[1 << i][i] = words[i].length;
  for (let mask = 1; mask < (1 << n); mask++) {
    for (let last = 0; last < n; last++) {
      if (!(mask & (1 << last)) || dp[mask][last] === Infinity) continue;
      for (let next = 0; next < n; next++) {
        if (mask & (1 << next)) continue;
        const val = dp[mask][last] + words[next].length - overlap[last][next];
        if (val < dp[mask | (1 << next)][next]) {
          dp[mask | (1 << next)][next] = val;
          parent[mask | (1 << next)][next] = last;
        }
      }
    }
  }
  const FULL = (1 << n) - 1;
  let last = 0;
  for (let i = 1; i < n; i++) if (dp[FULL][i] < dp[FULL][last]) last = i;
  const order = [];
  let mask = FULL;
  while (last !== -1) {
    order.push(last);
    const prev = parent[mask][last];
    mask ^= (1 << last);
    last = prev;
  }
  order.reverse();
  let result = words[order[0]];
  for (let i = 1; i < order.length; i++)
    result += words[order[i]].slice(overlap[order[i-1]][order[i]]);
  return result;
}

// 7. Digit DP (count numbers with digit sum divisible by k in [1..n])
function digitDP(n, k) {
  const digits = String(n).split('').map(Number);
  const len = digits.length;
  const memo = new Map();
  function dp(pos, rem, tight, started) {
    if (pos === len) return started && rem === 0 ? 1 : 0;
    const key = `${pos},${rem},${tight},${started}`;
    if (memo.has(key)) return memo.get(key);
    const limit = tight ? digits[pos] : 9;
    let res = 0;
    for (let d = 0; d <= limit; d++) {
      const newTight = tight && d === limit;
      const newStarted = started || d > 0;
      const newRem = newStarted ? (rem * 10 + d) % k : 0;
      res += dp(pos+1, newRem, newTight, newStarted);
    }
    memo.set(key, res);
    return res;
  }
  return dp(0, 0, true, false);
}

// 8. DP with Monotonic Queue Optimization (sliding window max DP)
// Example: max sum subarray of length at most k
function maxSumSubarrayAtMostK(nums, k) {
  const n = nums.length;
  const prefix = new Array(n+1).fill(0);
  for (let i = 0; i < n; i++) prefix[i+1] = prefix[i] + nums[i];
  const deque = [0]; // indices into prefix
  let ans = -Infinity;
  for (let i = 1; i <= n; i++) {
    if (deque[0] < i - k) deque.shift();
    ans = Math.max(ans, prefix[i] - prefix[deque[0]]);
    while (deque.length && prefix[deque[deque.length-1]] >= prefix[i]) deque.pop();
    deque.push(i);
  }
  return ans;
}

// 9. DP with Convex Hull Trick (min cost of splitting array)
// dp[i] = min cost to split first i elements; cost(j,i) = (prefix[i]-prefix[j])^2
function convexHullTrickDP(nums) {
  const n = nums.length;
  const prefix = new Array(n+1).fill(0);
  for (let i = 0; i < n; i++) prefix[i+1] = prefix[i] + nums[i];
  const dp = new Array(n+1).fill(Infinity);
  dp[0] = 0;
  // line: y = m*x + b where m = -2*prefix[j], b = dp[j] + prefix[j]^2
  const lines = []; // {m, b}
  function getY(line, x) { return line.m * x + line.b; }
  function bad(l1, l2, l3) {
    return (l3.b - l1.b) * (l1.m - l2.m) <= (l2.b - l1.b) * (l1.m - l3.m);
  }
  lines.push({m: -2 * prefix[0], b: dp[0] + prefix[0] * prefix[0]});
  let ptr = 0;
  for (let i = 1; i <= n; i++) {
    while (ptr < lines.length - 1 && getY(lines[ptr], prefix[i]) >= getY(lines[ptr+1], prefix[i])) ptr++;
    dp[i] = getY(lines[ptr], prefix[i]) + prefix[i] * prefix[i];
    const newLine = {m: -2 * prefix[i], b: dp[i] + prefix[i] * prefix[i]};
    while (lines.length >= 2 && bad(lines[lines.length-2], lines[lines.length-1], newLine)) lines.pop();
    lines.push(newLine);
  }
  return dp[n];
}

// 10. SOS DP (Sum over Subsets)
function sosDP(arr, n) {
  // For each mask, compute sum of arr[subset] for all subsets of mask
  const dp = [...arr];
  for (let i = 0; i < n; i++)
    for (let mask = 0; mask < (1 << n); mask++)
      if (mask & (1 << i)) dp[mask] += dp[mask ^ (1 << i)];
  return dp;
}

// 11. State Compression DP (tiling 2xN with 1x2 dominoes)
function tilingDP(n) {
  const dp = new Array(n+1).fill(0n);
  dp[0] = 1n; dp[1] = 1n;
  for (let i = 2; i <= n; i++) dp[i] = dp[i-1] + dp[i-2];
  return Number(dp[n]);
}

// 12. Profile DP on Grids (tiling m x n grid with 1x2 dominoes)
function profileDP(m, n) {
  if ((m * n) % 2 !== 0) return 0;
  const dp = new Array(1 << m).fill(0);
  dp[0] = 1;
  function solve(col, row, mask, nextMask, dp) {
    if (col === n) return row === m ? [mask, nextMask, 1] : null;
    if (row === m) return [[mask, nextMask]];
    // simplified: returns count via recursion
  }
  // Full profile DP (column by column)
  let cur = new Array(1 << m).fill(0);
  cur[0] = 1;
  for (let col = 0; col < n; col++) {
    function fill(row, mask, nextMask, ways, table) {
      if (row === m) { table[nextMask] = (table[nextMask] || 0) + ways; return; }
      if (mask & (1 << row)) { fill(row+1, mask, nextMask, ways, table); }
      else if (row+1 < m && !(mask & (1 << (row+1)))) {
        fill(row+2, mask, nextMask | (1 << row) | (1 << (row+1)), ways, table); // horizontal... simplified
        fill(row+1, mask, nextMask | (1 << row), ways, table);
      } else { fill(row+1, mask, nextMask | (1 << row), ways, table); }
    }
    const next = new Array(1 << m).fill(0);
    for (let mask = 0; mask < (1 << m); mask++) if (cur[mask]) fill(0, mask, 0, cur[mask], next);
    cur = next;
  }
  return cur[0];
}

// 13. Meet in the Middle DP (count subsets with sum = target)
function meetInTheMiddle(nums, target) {
  const n = nums.length, half = n >> 1;
  function getAllSums(arr) {
    const sums = [];
    for (let mask = 0; mask < (1 << arr.length); mask++) {
      let s = 0;
      for (let i = 0; i < arr.length; i++) if (mask & (1 << i)) s += arr[i];
      sums.push(s);
    }
    return sums;
  }
  const left = getAllSums(nums.slice(0, half));
  const right = getAllSums(nums.slice(half));
  right.sort((a, b) => a - b);
  let count = 0;
  for (const s of left) {
    let lo = 0, hi = right.length - 1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (right[mid] < target - s) lo = mid + 1;
      else hi = mid - 1;
    }
    let r = lo;
    while (r < right.length && right[r] === target - s) { count++; r++; }
  }
  return count;
}

// 14. Divide and Conquer DP Optimization
// dp[i][j] = min over k<=j of dp[i-1][k] + cost(k+1, j)
// Requires opt[i][j-1] <= opt[i][j] <= opt[i+1][j]
function divideAndConquerDP(n, m, cost) {
  let dp = new Array(n+1).fill(Infinity);
  dp[0] = 0;
  for (let i = 0; i < m; i++) {
    const newDp = new Array(n+1).fill(Infinity);
    function solve(lo, hi, optLo, optHi) {
      if (lo > hi) return;
      const mid = (lo + hi) >> 1;
      let best = Infinity, optMid = optLo;
      for (let k = optLo; k <= Math.min(mid-1, optHi); k++) {
        const val = dp[k] + cost(k+1, mid);
        if (val < best) { best = val; optMid = k; }
      }
      newDp[mid] = best;
      solve(lo, mid-1, optLo, optMid);
      solve(mid+1, hi, optMid, optHi);
    }
    solve(1, n, 0, n-1);
    dp = newDp;
  }
  return dp[n];
}

// 15. Knuth Optimization (for interval DP with concave/convex cost)
// Reduces O(n^3) interval DP to O(n^2) when opt[i][j-1] <= opt[i][j] <= opt[i+1][j]
function knuthOptimization(n, w) {
  // w[i][j] = weight function (must satisfy quadrangle inequality)
  const dp = Array.from({length: n}, () => new Array(n).fill(Infinity));
  const opt = Array.from({length: n}, () => new Array(n).fill(0));
  for (let i = 0; i < n; i++) { dp[i][i] = 0; opt[i][i] = i; }
  for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1;
      const lo = opt[i][j-1], hi = j > i+1 ? opt[i+1][j] : j-1;
      for (let k = lo; k <= Math.min(hi, j-1); k++) {
        const val = dp[i][k] + dp[k+1][j] + w[i][j];
        if (val < dp[i][j]) { dp[i][j] = val; opt[i][j] = k; }
      }
    }
  }
  return dp[0][n-1];
}

// 1. Catalan Numbers
function catalanNumber(n) {
  const dp = new Array(n+1).fill(0n);
  dp[0] = dp[1] = 1n;
  for (let i = 2; i <= n; i++)
    for (let j = 0; j < i; j++)
      dp[i] += dp[j] * dp[i-1-j];
  return dp[n];
}

// 2. Count BSTs (Unique BSTs - LC 96)
function numTrees(n) {
  const dp = new Array(n+1).fill(0);
  dp[0] = dp[1] = 1;
  for (let i = 2; i <= n; i++)
    for (let j = 1; j <= i; j++)
      dp[i] += dp[j-1] * dp[i-j];
  return dp[n];
}

// 3. Decode Ways II (LC 639)
function numDecodingsII(s) {
  const MOD = 1e9 + 7;
  const n = s.length;
  let prev2 = 1, prev1 = s[0] === '*' ? 9 : s[0] === '0' ? 0 : 1;
  for (let i = 1; i < n; i++) {
    let cur = 0;
    const c = s[i], p = s[i-1];
    if (c === '*') cur = 9 * prev1 % MOD;
    else if (c !== '0') cur = prev1;
    if (p === '*' && c === '*') cur = (cur + 15 * prev2) % MOD;
    else if (p === '*') cur = (cur + (c <= '6' ? 2 : 1) * prev2) % MOD;
    else if (c === '*') cur = (cur + (p === '1' ? 9 : p === '2' ? 6 : 0) * prev2) % MOD;
    else { const two = parseInt(p + c); if (two >= 10 && two <= 26) cur = (cur + prev2) % MOD; }
    prev2 = prev1; prev1 = cur;
  }
  return prev1;
}

// 4. Longest Valid Parentheses
function longestValidParentheses(s) {
  const dp = new Array(s.length).fill(0);
  let ans = 0;
  for (let i = 1; i < s.length; i++) {
    if (s[i] === ')') {
      if (s[i-1] === '(') dp[i] = (i >= 2 ? dp[i-2] : 0) + 2;
      else if (dp[i-1] > 0) {
        const j = i - dp[i-1] - 1;
        if (j >= 0 && s[j] === '(') dp[i] = dp[i-1] + 2 + (j > 0 ? dp[j-1] : 0);
      }
      ans = Math.max(ans, dp[i]);
    }
  }
  return ans;
}

// 5. Maximum Alternating Subsequence Sum
function maxAlternatingSum(nums) {
  let even = 0, odd = 0; // even = sum when next index parity is even (pick gains)
  for (const n of nums) {
    [even, odd] = [Math.max(even, odd + n), Math.max(odd, even - n)];
  }
  return even;
}

// 6. Count Vowel Permutations
function countVowelPermutation(n) {
  const MOD = 1e9 + 7;
  let a = 1, e = 1, i = 1, o = 1, u = 1;
  for (let k = 1; k < n; k++) {
    [a, e, i, o, u] = [
      (e + i + u) % MOD,
      (a + i) % MOD,
      (e + o) % MOD,
      i % MOD,
      (i + o) % MOD
    ];
  }
  return (a + e + i + o + u) % MOD;
}

// 7. Paint House Problem
function minCostPaintHouses(costs) {
  let [r, g, b] = costs[0];
  for (let i = 1; i < costs.length; i++) {
    [r, g, b] = [
      costs[i][0] + Math.min(g, b),
      costs[i][1] + Math.min(r, b),
      costs[i][2] + Math.min(r, g)
    ];
  }
  return Math.min(r, g, b);
}

// 8. Paint Fence Problem
function numWaysFence(n, k) {
  if (n === 1) return k;
  let same = k, diff = k * (k - 1);
  for (let i = 3; i <= n; i++) {
    [same, diff] = [diff, (same + diff) * (k - 1)];
  }
  return same + diff;
}

// 9. Tiling Dominoes (2 x N with 2x1 dominoes)
function tilingDominoes(n) {
  if (n === 0) return 1;
  const dp = new Array(n+1).fill(0);
  dp[0] = 1; dp[1] = 1;
  for (let i = 2; i <= n; i++) dp[i] = dp[i-1] + dp[i-2];
  return dp[n];
}

// 10. DP on DAGs (longest path in DAG)
function longestPathDAG(n, edges) {
  const graph = Array.from({length: n}, () => []);
  const indegree = new Array(n).fill(0);
  for (const [u, v, w] of edges) { graph[u].push([v, w]); indegree[v]++; }
  const queue = [];
  for (let i = 0; i < n; i++) if (indegree[i] === 0) queue.push(i);
  const dist = new Array(n).fill(0);
  while (queue.length) {
    const u = queue.shift();
    for (const [v, w] of graph[u]) {
      dist[v] = Math.max(dist[v], dist[u] + w);
      if (--indegree[v] === 0) queue.push(v);
    }
  }
  return Math.max(...dist);
}

// 11. DP on Game Theory States (Sprague-Grundy / Nim value)
function grundyValue(n, moves) {
  const g = new Array(n+1).fill(0);
  for (let i = 1; i <= n; i++) {
    const reachable = new Set();
    for (const m of moves) if (i >= m) reachable.add(g[i-m]);
    let mex = 0;
    while (reachable.has(mex)) mex++;
    g[i] = mex;
  }
  return g[n];
}

// 12. Minimax DP (predict the winner - LC 486)
function predictTheWinner(nums) {
  const n = nums.length;
  const dp = Array.from({length: n}, (_, i) => new Array(n).fill(0));
  for (let i = 0; i < n; i++) dp[i][i] = nums[i];
  for (let len = 2; len <= n; len++)
    for (let i = 0; i <= n-len; i++) {
      const j = i+len-1;
      dp[i][j] = Math.max(nums[i] - dp[i+1][j], nums[j] - dp[i][j-1]);
    }
  return dp[0][n-1] >= 0;
}

// 13. Stone Game (LC 877)
function stoneGame(piles) {
  const n = piles.length;
  const dp = Array.from({length: n}, (_, i) => new Array(n).fill(0));
  for (let i = 0; i < n; i++) dp[i][i] = piles[i];
  for (let len = 2; len <= n; len++)
    for (let i = 0; i <= n-len; i++) {
      const j = i+len-1;
      dp[i][j] = Math.max(piles[i] - dp[i+1][j], piles[j] - dp[i][j-1]);
    }
  return dp[0][n-1] > 0;
}

// 14. Predict the Winner (generalized, same as #12 above)
// See predictTheWinner above.

// 15. DP with Trie (longest word in dictionary that can be built one char at a time)
class TrieNode { constructor() { this.children = {}; this.end = false; } }
function longestWordTrie(words) {
  const root = new TrieNode();
  for (const w of words) {
    let node = root;
    for (const c of w) { if (!node.children[c]) node.children[c] = new TrieNode(); node = node.children[c]; }
    node.end = true;
  }
  let ans = '';
  function dfs(node, path) {
    if (path.length > ans.length) ans = path;
    for (const [c, child] of Object.entries(node.children))
      if (child.end) dfs(child, path + c);
  }
  dfs(root, '');
  return ans;
}

// 16. DP with Segment Tree (range min/max queries during DP transitions)
class SegTree {
  constructor(n) { this.n = n; this.tree = new Array(4*n).fill(Infinity); }
  update(node, start, end, idx, val) {
    if (start === end) { this.tree[node] = val; return; }
    const mid = (start+end) >> 1;
    if (idx <= mid) this.update(2*node, start, mid, idx, val);
    else this.update(2*node+1, mid+1, end, idx, val);
    this.tree[node] = Math.min(this.tree[2*node], this.tree[2*node+1]);
  }
  query(node, start, end, l, r) {
    if (r < start || end < l) return Infinity;
    if (l <= start && end <= r) return this.tree[node];
    const mid = (start+end) >> 1;
    return Math.min(this.query(2*node, start, mid, l, r), this.query(2*node+1, mid+1, end, l, r));
  }
}
// Example: LIS length using segment tree on compressed values
function lisWithSegTree(nums) {
  const sorted = [...new Set(nums)].sort((a, b) => a - b);
  const rank = new Map(sorted.map((v, i) => [v, i+1]));
  const n = sorted.length;
  const seg = new SegTree(n);
  function update(i, v) { seg.update(1, 1, n, i, -v); } // store negative for max
  function query(i) { return -seg.query(1, 1, n, 1, i); }
  let ans = 0;
  for (const x of nums) {
    const r = rank.get(x);
    const best = r > 1 ? query(r-1) + 1 : 1;
    ans = Math.max(ans, best);
    update(r, best);
  }
  return ans;
}

// 17. DP with Binary Lifting (LCA + path queries on tree)
function buildBinaryLifting(n, parent) {
  const LOG = Math.ceil(Math.log2(n+1));
  const up = Array.from({length: LOG}, () => new Array(n+1).fill(0));
  up[0] = [0, ...parent]; // up[0][i] = direct parent of i
  for (let k = 1; k < LOG; k++)
    for (let v = 1; v <= n; v++)
      up[k][v] = up[k-1][up[k-1][v]];
  function lca(u, v, depth) {
    if (depth[u] < depth[v]) [u, v] = [v, u];
    let diff = depth[u] - depth[v];
    for (let k = 0; diff; k++, diff >>= 1) if (diff & 1) u = up[k][u];
    if (u === v) return u;
    for (let k = LOG-1; k >= 0; k--) if (up[k][u] !== up[k][v]) { u = up[k][u]; v = up[k][v]; }
    return up[0][u];
  }
  return { up, lca };
}

// 18. DP Optimization Using Prefix Sums (LC 1771 variant: max non-empty subarray sum with one deletion)
function maxSumWithOneDeletion(arr) {
  const n = arr.length;
  const fwd = new Array(n).fill(0); // max subarray ending at i
  const bwd = new Array(n).fill(0); // max subarray starting at i
  fwd[0] = bwd[n-1] = arr[0];
  for (let i = 1; i < n; i++) fwd[i] = Math.max(arr[i], fwd[i-1] + arr[i]);
  for (let i = n-2; i >= 0; i--) bwd[i] = Math.max(arr[i], bwd[i+1] + arr[i]);
  let ans = Math.max(...arr);
  for (let i = 1; i < n-1; i++) ans = Math.max(ans, fwd[i-1] + bwd[i+1]);
  return ans;
}

// 19. DP Optimization Using Sparse Tables (range min query in O(1))
function buildSparseTable(arr) {
  const n = arr.length;
  const LOG = Math.floor(Math.log2(n)) + 1;
  const table = Array.from({length: LOG}, () => new Array(n).fill(0));
  table[0] = [...arr];
  for (let k = 1; k < LOG; k++)
    for (let i = 0; i + (1 << k) <= n; i++)
      table[k][i] = Math.min(table[k-1][i], table[k-1][i + (1 << (k-1))]);
  function queryMin(l, r) {
    const k = Math.floor(Math.log2(r - l + 1));
    return Math.min(table[k][l], table[k][r - (1 << k) + 1]);
  }
  return { queryMin };
}

// 20. DP on Probability States (dice roll target probability)
function diceRollProbability(n, faces, target) {
  // Probability of exactly reaching target with n dice each having faces sides
  const dp = Array.from({length: n+1}, () => new Array(target+1).fill(0));
  dp[0][0] = 1;
  for (let i = 1; i <= n; i++)
    for (let s = i; s <= target; s++)
      for (let f = 1; f <= faces && f <= s; f++)
        dp[i][s] += dp[i-1][s-f];
  return dp[n][target] / Math.pow(faces, n);
}