/****************************************************************
  1. Generate All Subsets
****************************************************************/
function subsets(nums) {
  const result = [];

  function backtrack(index, current) {
    if (index === nums.length) {
      result.push([...current]);
      return;
    }

    backtrack(index + 1, current);

    current.push(nums[index]);
    backtrack(index + 1, current);
    current.pop();
  }

  backtrack(0, []);
  return result;
}

/****************************************************************
  2. Generate All Subsequences of String
****************************************************************/
function subsequences(str) {
  const result = [];

  function backtrack(index, current) {
    if (index === str.length) {
      result.push(current);
      return;
    }

    backtrack(index + 1, current);

    backtrack(index + 1, current + str[index]);
  }

  backtrack(0, "");
  return result;
}

/****************************************************************
  3. Generate All Permutations
****************************************************************/
function permutations(nums) {
  const result = [];
  const used = new Array(nums.length).fill(false);

  function backtrack(current) {
    if (current.length === nums.length) {
      result.push([...current]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;

      used[i] = true;
      current.push(nums[i]);

      backtrack(current);

      current.pop();
      used[i] = false;
    }
  }

  backtrack([]);
  return result;
}

/****************************************************************
  4. Generate Permutations With Duplicates
****************************************************************/
function permuteUnique(nums) {
  nums.sort((a, b) => a - b);

  const result = [];
  const used = new Array(nums.length).fill(false);

  function backtrack(current) {
    if (current.length === nums.length) {
      result.push([...current]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;

      if (
        i > 0 &&
        nums[i] === nums[i - 1] &&
        !used[i - 1]
      ) {
        continue;
      }

      used[i] = true;
      current.push(nums[i]);

      backtrack(current);

      current.pop();
      used[i] = false;
    }
  }

  backtrack([]);
  return result;
}

/****************************************************************
  5. Combination Sum
****************************************************************/
function combinationSum(candidates, target) {
  const result = [];

  function backtrack(start, current, sum) {
    if (sum === target) {
      result.push([...current]);
      return;
    }

    if (sum > target) return;

    for (let i = start; i < candidates.length; i++) {
      current.push(candidates[i]);

      backtrack(
        i,
        current,
        sum + candidates[i]
      );

      current.pop();
    }
  }

  backtrack(0, [], 0);
  return result;
}

/****************************************************************
  6. Combination Sum II
****************************************************************/
function combinationSum2(candidates, target) {
  candidates.sort((a, b) => a - b);

  const result = [];

  function backtrack(start, current, sum) {
    if (sum === target) {
      result.push([...current]);
      return;
    }

    if (sum > target) return;

    for (let i = start; i < candidates.length; i++) {
      if (
        i > start &&
        candidates[i] === candidates[i - 1]
      ) {
        continue;
      }

      current.push(candidates[i]);

      backtrack(
        i + 1,
        current,
        sum + candidates[i]
      );

      current.pop();
    }
  }

  backtrack(0, [], 0);
  return result;
}

/****************************************************************
  7. Combination Sum III
****************************************************************/
function combinationSum3(k, n) {
  const result = [];

  function backtrack(start, current, sum) {
    if (
      current.length === k &&
      sum === n
    ) {
      result.push([...current]);
      return;
    }

    if (
      current.length > k ||
      sum > n
    ) {
      return;
    }

    for (let num = start; num <= 9; num++) {
      current.push(num);

      backtrack(
        num + 1,
        current,
        sum + num
      );

      current.pop();
    }
  }

  backtrack(1, [], 0);
  return result;
}

/****************************************************************
  8. Generate Combinations
****************************************************************/
function combine(n, k) {
  const result = [];

  function backtrack(start, current) {
    if (current.length === k) {
      result.push([...current]);
      return;
    }

    for (let num = start; num <= n; num++) {
      current.push(num);

      backtrack(num + 1, current);

      current.pop();
    }
  }

  backtrack(1, []);
  return result;
}

/****************************************************************
  9. Letter Combinations of Phone Number
****************************************************************/
function letterCombinations(digits) {
  if (!digits.length) return [];

  const map = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz"
  };

  const result = [];

  function backtrack(index, current) {
    if (index === digits.length) {
      result.push(current);
      return;
    }

    for (const ch of map[digits[index]]) {
      backtrack(
        index + 1,
        current + ch
      );
    }
  }

  backtrack(0, "");
  return result;
}

/****************************************************************
  10. Generate Balanced Parentheses
****************************************************************/
function generateParenthesis(n) {
  const result = [];

  function backtrack(
    open,
    close,
    current
  ) {
    if (current.length === n * 2) {
      result.push(current);
      return;
    }

    if (open < n) {
      backtrack(
        open + 1,
        close,
        current + "("
      );
    }

    if (close < open) {
      backtrack(
        open,
        close + 1,
        current + ")"
      );
    }
  }

  backtrack(0, 0, "");
  return result;
}

/****************************************************************
  TESTS
****************************************************************/

console.log(subsets([1, 2, 3]));
console.log(permutations([1, 2, 3]));
console.log(generateParenthesis(3));
console.log(letterCombinations("23"));

/****************************************************************
  PART 2 — RECURSION + CHOICE TREE / PERMUTATION / CONSTRAINTS
****************************************************************/

/****************************************************************
  16. Count all possible paths in maze
****************************************************************/
function countMazePaths(rows, cols) {
  function dfs(r, c) {
    if (r === rows - 1 && c === cols - 1) return 1;
    if (r >= rows || c >= cols) return 0;

    return dfs(r + 1, c) + dfs(r, c + 1);
  }

  return dfs(0, 0);
}

/****************************************************************
  17. Rat in a maze
****************************************************************/
function ratInMaze(maze) {
  const n = maze.length;
  const result = [];
  const path = [];
  const visited = Array.from({ length: n }, () => Array(n).fill(false));

  const dirs = [
    [1, 0, "D"],
    [0, -1, "L"],
    [0, 1, "R"],
    [-1, 0, "U"],
  ];

  function dfs(r, c) {
    if (r === n - 1 && c === n - 1) {
      result.push(path.join(""));
      return;
    }

    visited[r][c] = true;

    for (const [dr, dc, move] of dirs) {
      const nr = r + dr;
      const nc = c + dc;

      if (
        nr >= 0 &&
        nc >= 0 &&
        nr < n &&
        nc < n &&
        maze[nr][nc] === 1 &&
        !visited[nr][nc]
      ) {
        path.push(move);
        dfs(nr, nc);
        path.pop();
      }
    }

    visited[r][c] = false;
  }

  if (maze[0][0] === 1) dfs(0, 0);
  return result;
}

/****************************************************************
  18. Print all maze paths
****************************************************************/
function printMazePaths(rows, cols) {
  const result = [];

  function dfs(r, c, path) {
    if (r === rows - 1 && c === cols - 1) {
      result.push(path);
      return;
    }

    if (r + 1 < rows) dfs(r + 1, c, path + "D");
    if (c + 1 < cols) dfs(r, c + 1, path + "R");
  }

  dfs(0, 0, "");
  return result;
}

/****************************************************************
  19. Unique Paths III
****************************************************************/
function uniquePathsIII(grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  let startR = 0;
  let startC = 0;
  let empty = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] !== -1) empty++;
      if (grid[r][c] === 1) {
        startR = r;
        startC = c;
      }
    }
  }

  function dfs(r, c, remain) {
    if (
      r < 0 ||
      c < 0 ||
      r >= rows ||
      c >= cols ||
      grid[r][c] === -1
    ) {
      return 0;
    }

    if (grid[r][c] === 2) {
      return remain === 1 ? 1 : 0;
    }

    const temp = grid[r][c];
    grid[r][c] = -1;

    let count = 0;
    count += dfs(r + 1, c, remain - 1);
    count += dfs(r - 1, c, remain - 1);
    count += dfs(r, c + 1, remain - 1);
    count += dfs(r, c - 1, remain - 1);

    grid[r][c] = temp;
    return count;
  }

  return dfs(startR, startC, empty);
}

/****************************************************************
  20. Word Search in Grid
****************************************************************/
function exist(board, word) {
  const rows = board.length;
  const cols = board[0].length;

  function dfs(r, c, i) {
    if (i === word.length) return true;

    if (
      r < 0 ||
      c < 0 ||
      r >= rows ||
      c >= cols ||
      board[r][c] !== word[i]
    ) {
      return false;
    }

    const temp = board[r][c];
    board[r][c] = "#";

    const found =
      dfs(r + 1, c, i + 1) ||
      dfs(r - 1, c, i + 1) ||
      dfs(r, c + 1, i + 1) ||
      dfs(r, c - 1, i + 1);

    board[r][c] = temp;
    return found;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (dfs(r, c, 0)) return true;
    }
  }

  return false;
}

/****************************************************************
  21. Word Search II
****************************************************************/
function findWords(board, words) {
  const root = {};

  for (const word of words) {
    let node = root;

    for (const ch of word) {
      if (!node[ch]) node[ch] = {};
      node = node[ch];
    }

    node.word = word;
  }

  const rows = board.length;
  const cols = board[0].length;
  const result = [];

  function dfs(r, c, node) {
    if (
      r < 0 ||
      c < 0 ||
      r >= rows ||
      c >= cols
    ) {
      return;
    }

    const ch = board[r][c];
    if (ch === "#" || !node[ch]) return;

    node = node[ch];

    if (node.word) {
      result.push(node.word);
      node.word = null;
    }

    board[r][c] = "#";

    dfs(r + 1, c, node);
    dfs(r - 1, c, node);
    dfs(r, c + 1, node);
    dfs(r, c - 1, node);

    board[r][c] = ch;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dfs(r, c, root);
    }
  }

  return result;
}

/****************************************************************
  22. Flood Fill using backtracking
****************************************************************/
function floodFill(image, sr, sc, color) {
  const original = image[sr][sc];
  if (original === color) return image;

  const rows = image.length;
  const cols = image[0].length;

  function dfs(r, c) {
    if (
      r < 0 ||
      c < 0 ||
      r >= rows ||
      c >= cols ||
      image[r][c] !== original
    ) {
      return;
    }

    image[r][c] = color;

    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  dfs(sr, sc);
  return image;
}

/****************************************************************
  23. Knight's Tour Problem
****************************************************************/
function knightsTour(n) {
  const board = Array.from({ length: n }, () => Array(n).fill(-1));

  const moves = [
    [2, 1], [1, 2], [-1, 2], [-2, 1],
    [-2, -1], [-1, -2], [1, -2], [2, -1],
  ];

  function dfs(r, c, step) {
    if (step === n * n) return true;

    for (const [dr, dc] of moves) {
      const nr = r + dr;
      const nc = c + dc;

      if (
        nr >= 0 &&
        nc >= 0 &&
        nr < n &&
        nc < n &&
        board[nr][nc] === -1
      ) {
        board[nr][nc] = step;

        if (dfs(nr, nc, step + 1)) return true;

        board[nr][nc] = -1;
      }
    }

    return false;
  }

  board[0][0] = 0;
  return dfs(0, 0, 1) ? board : null;
}

/****************************************************************
  24. Hamiltonian Path
****************************************************************/
function hamiltonianPath(graph) {
  const n = graph.length;
  const path = [0];
  const visited = new Array(n).fill(false);
  visited[0] = true;

  function dfs(node) {
    if (path.length === n) return true;

    for (let next = 0; next < n; next++) {
      if (graph[node][next] && !visited[next]) {
        visited[next] = true;
        path.push(next);

        if (dfs(next)) return true;

        path.pop();
        visited[next] = false;
      }
    }

    return false;
  }

  return dfs(0) ? path : null;
}

/****************************************************************
  25. Hamiltonian Cycle
****************************************************************/
function hamiltonianCycle(graph) {
  const n = graph.length;
  const path = [0];
  const visited = new Array(n).fill(false);
  visited[0] = true;

  function dfs(node) {
    if (path.length === n) {
      return graph[node][0] === 1;
    }

    for (let next = 1; next < n; next++) {
      if (graph[node][next] && !visited[next]) {
        visited[next] = true;
        path.push(next);

        if (dfs(next)) return true;

        path.pop();
        visited[next] = false;
      }
    }

    return false;
  }

  return dfs(0) ? [...path, 0] : null;
}

/****************************************************************
  26. Tug of War Partition
****************************************************************/
function tugOfWar(nums) {
  const n = nums.length;
  const total = nums.reduce((a, b) => a + b, 0);

  let bestDiff = Infinity;
  let bestSet = [];

  function dfs(index, chosen, sum) {
    if (chosen.length === Math.floor(n / 2)) {
      const diff = Math.abs(total - 2 * sum);

      if (diff < bestDiff) {
        bestDiff = diff;
        bestSet = [...chosen];
      }

      return;
    }

    if (index === n) return;

    chosen.push(nums[index]);
    dfs(index + 1, chosen, sum + nums[index]);
    chosen.pop();

    dfs(index + 1, chosen, sum);
  }

  dfs(0, [], 0);

  return {
    set1: bestSet,
    difference: bestDiff,
  };
}

/****************************************************************
  27. Partition Array Into K Equal Sum Subsets
****************************************************************/
function canPartitionKSubsets(nums, k) {
  const sum = nums.reduce((a, b) => a + b, 0);
  if (sum % k !== 0) return false;

  const target = sum / k;
  nums.sort((a, b) => b - a);

  const buckets = new Array(k).fill(0);

  function dfs(index) {
    if (index === nums.length) return true;

    for (let i = 0; i < k; i++) {
      if (buckets[i] + nums[index] > target) continue;

      buckets[i] += nums[index];

      if (dfs(index + 1)) return true;

      buckets[i] -= nums[index];

      if (buckets[i] === 0) break;
    }

    return false;
  }

  return dfs(0);
}

/****************************************************************
  28. Matchsticks to Square
****************************************************************/
function makesquare(matchsticks) {
  const sum = matchsticks.reduce((a, b) => a + b, 0);
  if (sum % 4 !== 0) return false;

  const side = sum / 4;
  matchsticks.sort((a, b) => b - a);

  const sides = [0, 0, 0, 0];

  function dfs(index) {
    if (index === matchsticks.length) {
      return sides.every(x => x === side);
    }

    for (let i = 0; i < 4; i++) {
      if (sides[i] + matchsticks[index] > side) continue;

      sides[i] += matchsticks[index];

      if (dfs(index + 1)) return true;

      sides[i] -= matchsticks[index];

      if (sides[i] === 0) break;
    }

    return false;
  }

  return dfs(0);
}

/****************************************************************
  29. Split Array Into Equal Sum Subsets
****************************************************************/
function canPartition(nums) {
  const sum = nums.reduce((a, b) => a + b, 0);
  if (sum % 2 !== 0) return false;

  const target = sum / 2;

  function dfs(index, current) {
    if (current === target) return true;
    if (current > target || index === nums.length) return false;

    return (
      dfs(index + 1, current + nums[index]) ||
      dfs(index + 1, current)
    );
  }

  return dfs(0, 0);
}

/****************************************************************
  30. Maximum Score Words Formed By Letters
****************************************************************/
function maxScoreWords(words, letters, score) {
  const count = new Array(26).fill(0);

  for (const ch of letters) {
    count[ch.charCodeAt(0) - 97]++;
  }

  function getWordScore(word) {
    let total = 0;

    for (const ch of word) {
      total += score[ch.charCodeAt(0) - 97];
    }

    return total;
  }

  function canUse(word) {
    const temp = [...count];

    for (const ch of word) {
      const i = ch.charCodeAt(0) - 97;
      temp[i]--;

      if (temp[i] < 0) return false;
    }

    return true;
  }

  function useWord(word, delta) {
    for (const ch of word) {
      count[ch.charCodeAt(0) - 97] += delta;
    }
  }

  function dfs(index) {
    if (index === words.length) return 0;

    let best = dfs(index + 1);

    if (canUse(words[index])) {
      useWord(words[index], -1);

      best = Math.max(
        best,
        getWordScore(words[index]) + dfs(index + 1)
      );

      useWord(words[index], 1);
    }

    return best;
  }

  return dfs(0);
}

/****************************************************************
  31. Next Permutation
****************************************************************/
function nextPermutation(nums) {
  let i = nums.length - 2;

  while (i >= 0 && nums[i] >= nums[i + 1]) i--;

  if (i >= 0) {
    let j = nums.length - 1;

    while (nums[j] <= nums[i]) j--;

    [nums[i], nums[j]] = [nums[j], nums[i]];
  }

  reverse(nums, i + 1, nums.length - 1);
  return nums;
}

function reverse(nums, l, r) {
  while (l < r) {
    [nums[l], nums[r]] = [nums[r], nums[l]];
    l++;
    r--;
  }
}

/****************************************************************
  32. Beautiful Arrangement
****************************************************************/
function countArrangement(n) {
  let count = 0;
  const used = new Array(n + 1).fill(false);

  function dfs(pos) {
    if (pos > n) {
      count++;
      return;
    }

    for (let num = 1; num <= n; num++) {
      if (
        !used[num] &&
        (num % pos === 0 || pos % num === 0)
      ) {
        used[num] = true;
        dfs(pos + 1);
        used[num] = false;
      }
    }
  }

  dfs(1);
  return count;
}

/****************************************************************
  33. Construct Distanced Sequence
****************************************************************/
function constructDistancedSequence(n) {
  const size = 2 * n - 1;
  const result = new Array(size).fill(0);
  const used = new Array(n + 1).fill(false);

  function dfs(index) {
    if (index === size) return true;
    if (result[index] !== 0) return dfs(index + 1);

    for (let num = n; num >= 1; num--) {
      if (used[num]) continue;

      if (num === 1) {
        result[index] = 1;
        used[num] = true;

        if (dfs(index + 1)) return true;

        result[index] = 0;
        used[num] = false;
      } else {
        const j = index + num;

        if (j < size && result[j] === 0) {
          result[index] = num;
          result[j] = num;
          used[num] = true;

          if (dfs(index + 1)) return true;

          result[index] = 0;
          result[j] = 0;
          used[num] = false;
        }
      }
    }

    return false;
  }

  dfs(0);
  return result;
}

/****************************************************************
  34. Permutations of String With Spaces
****************************************************************/
function permutationsWithSpaces(str) {
  const result = [];

  function dfs(index, current) {
    if (index === str.length) {
      result.push(current);
      return;
    }

    dfs(index + 1, current + str[index]);

    if (index > 0) {
      dfs(index + 1, current + " " + str[index]);
    }
  }

  if (!str.length) return [];
  dfs(1, str[0]);
  return result;
}

/****************************************************************
  35. Seating Arrangement Optimization
****************************************************************/
function bestSeatingArrangement(people, happiness) {
  let bestScore = -Infinity;
  let bestArrangement = null;

  function getScore(arr) {
    let score = 0;

    for (let i = 0; i < arr.length; i++) {
      const a = arr[i];
      const b = arr[(i + 1) % arr.length];

      score += happiness[a]?.[b] || 0;
      score += happiness[b]?.[a] || 0;
    }

    return score;
  }

  function dfs(path, used) {
    if (path.length === people.length) {
      const score = getScore(path);

      if (score > bestScore) {
        bestScore = score;
        bestArrangement = [...path];
      }

      return;
    }

    for (const person of people) {
      if (used.has(person)) continue;

      used.add(person);
      path.push(person);

      dfs(path, used);

      path.pop();
      used.delete(person);
    }
  }

  dfs([], new Set());

  return {
    arrangement: bestArrangement,
    score: bestScore,
  };
}

/****************************************************************
  36. Arrange Numbers to Satisfy Inequalities
  Example: pattern "<><", numbers [1,2,3,4]
****************************************************************/
function arrangeByInequalities(nums, pattern) {
  const result = [];
  const used = new Array(nums.length).fill(false);

  function valid(a, b, sign) {
    if (sign === "<") return a < b;
    if (sign === ">") return a > b;
    return true;
  }

  function dfs(path) {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;

      if (
        path.length > 0 &&
        !valid(path[path.length - 1], nums[i], pattern[path.length - 1])
      ) {
        continue;
      }

      used[i] = true;
      path.push(nums[i]);

      dfs(path);

      path.pop();
      used[i] = false;
    }
  }

  dfs([]);
  return result;
}

/****************************************************************
  37. Generate Lexicographical Permutations
****************************************************************/
function lexicographicalPermutations(str) {
  const chars = str.split("").sort();
  const result = [];
  const used = new Array(chars.length).fill(false);

  function dfs(path) {
    if (path.length === chars.length) {
      result.push(path.join(""));
      return;
    }

    for (let i = 0; i < chars.length; i++) {
      if (used[i]) continue;
      if (i > 0 && chars[i] === chars[i - 1] && !used[i - 1]) continue;

      used[i] = true;
      path.push(chars[i]);

      dfs(path);

      path.pop();
      used[i] = false;
    }
  }

  dfs([]);
  return result;
}

/****************************************************************
  38. Circular Permutation Generation
****************************************************************/
function circularPermutations(nums) {
  const result = [];

  function dfs(path, used) {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }

    for (const num of nums) {
      if (used.has(num)) continue;

      used.add(num);
      path.push(num);

      dfs(path, used);

      path.pop();
      used.delete(num);
    }
  }

  // Fix first element to avoid rotational duplicates
  dfs([nums[0]], new Set([nums[0]]));

  return result;
}

/****************************************************************
  39. Generate All Valid Lock Combinations
****************************************************************/
function lockCombinations(length, digits = "0123456789") {
  const result = [];

  function dfs(path) {
    if (path.length === length) {
      result.push(path);
      return;
    }

    for (const digit of digits) {
      dfs(path + digit);
    }
  }

  dfs("");
  return result;
}

/****************************************************************
  40. Reconstruct Itinerary
****************************************************************/
function findItinerary(tickets) {
  const graph = {};

  for (const [from, to] of tickets) {
    if (!graph[from]) graph[from] = [];
    graph[from].push(to);
  }

  for (const city in graph) {
    graph[city].sort();
  }

  const route = ["JFK"];

  function dfs(city) {
    if (route.length === tickets.length + 1) return true;

    const destinations = graph[city] || [];

    for (let i = 0; i < destinations.length; i++) {
      const next = destinations[i];

      if (next === null) continue;

      destinations[i] = null;
      route.push(next);

      if (dfs(next)) return true;

      route.pop();
      destinations[i] = next;
    }

    return false;
  }

  dfs("JFK");
  return route;
}

/****************************************************************
  41. N-Queens
****************************************************************/
function solveNQueens(n) {
  const result = [];
  const board = Array.from({ length: n }, () => Array(n).fill("."));

  const cols = new Set();
  const diag1 = new Set();
  const diag2 = new Set();

  function dfs(row) {
    if (row === n) {
      result.push(board.map(r => r.join("")));
      return;
    }

    for (let col = 0; col < n; col++) {
      if (
        cols.has(col) ||
        diag1.has(row - col) ||
        diag2.has(row + col)
      ) {
        continue;
      }

      board[row][col] = "Q";
      cols.add(col);
      diag1.add(row - col);
      diag2.add(row + col);

      dfs(row + 1);

      board[row][col] = ".";
      cols.delete(col);
      diag1.delete(row - col);
      diag2.delete(row + col);
    }
  }

  dfs(0);
  return result;
}

/****************************************************************
  42. N-Queens II
****************************************************************/
function totalNQueens(n) {
  let count = 0;

  const cols = new Set();
  const diag1 = new Set();
  const diag2 = new Set();

  function dfs(row) {
    if (row === n) {
      count++;
      return;
    }

    for (let col = 0; col < n; col++) {
      if (
        cols.has(col) ||
        diag1.has(row - col) ||
        diag2.has(row + col)
      ) {
        continue;
      }

      cols.add(col);
      diag1.add(row - col);
      diag2.add(row + col);

      dfs(row + 1);

      cols.delete(col);
      diag1.delete(row - col);
      diag2.delete(row + col);
    }
  }

  dfs(0);
  return count;
}

/****************************************************************
  43. Sudoku Solver
****************************************************************/
function solveSudoku(board) {
  function isValid(r, c, ch) {
    for (let i = 0; i < 9; i++) {
      if (board[r][i] === ch) return false;
      if (board[i][c] === ch) return false;

      const boxR = 3 * Math.floor(r / 3) + Math.floor(i / 3);
      const boxC = 3 * Math.floor(c / 3) + (i % 3);

      if (board[boxR][boxC] === ch) return false;
    }

    return true;
  }

  function dfs() {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] === ".") {
          for (let num = 1; num <= 9; num++) {
            const ch = String(num);

            if (isValid(r, c, ch)) {
              board[r][c] = ch;

              if (dfs()) return true;

              board[r][c] = ".";
            }
          }

          return false;
        }
      }
    }

    return true;
  }

  dfs();
  return board;
}

/****************************************************************
  44. Sudoku Validator With Solving
****************************************************************/
function isValidSudokuThenSolve(board) {
  const seen = new Set();

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const val = board[r][c];
      if (val === ".") continue;

      const rowKey = `row-${r}-${val}`;
      const colKey = `col-${c}-${val}`;
      const boxKey = `box-${Math.floor(r / 3)}-${Math.floor(c / 3)}-${val}`;

      if (
        seen.has(rowKey) ||
        seen.has(colKey) ||
        seen.has(boxKey)
      ) {
        return false;
      }

      seen.add(rowKey);
      seen.add(colKey);
      seen.add(boxKey);
    }
  }

  solveSudoku(board);
  return board;
}

/****************************************************************
  45. Crossword Puzzle Solver
****************************************************************/
function solveCrossword(board, words) {
  const rows = board.length;
  const cols = board[0].length;

  function canPlaceHorizontal(r, c, word) {
    if (c + word.length > cols) return false;
    if (c > 0 && board[r][c - 1] !== "+") return false;
    if (c + word.length < cols && board[r][c + word.length] !== "+") return false;

    for (let i = 0; i < word.length; i++) {
      if (board[r][c + i] !== "-" && board[r][c + i] !== word[i]) {
        return false;
      }
    }

    return true;
  }

  function canPlaceVertical(r, c, word) {
    if (r + word.length > rows) return false;
    if (r > 0 && board[r - 1][c] !== "+") return false;
    if (r + word.length < rows && board[r + word.length][c] !== "+") return false;

    for (let i = 0; i < word.length; i++) {
      if (board[r + i][c] !== "-" && board[r + i][c] !== word[i]) {
        return false;
      }
    }

    return true;
  }

  function placeHorizontal(r, c, word) {
    const changed = [];

    for (let i = 0; i < word.length; i++) {
      if (board[r][c + i] === "-") {
        board[r][c + i] = word[i];
        changed.push([r, c + i]);
      }
    }

    return changed;
  }

  function placeVertical(r, c, word) {
    const changed = [];

    for (let i = 0; i < word.length; i++) {
      if (board[r + i][c] === "-") {
        board[r + i][c] = word[i];
        changed.push([r + i, c]);
      }
    }

    return changed;
  }

  function undo(changed) {
    for (const [r, c] of changed) {
      board[r][c] = "-";
    }
  }

  function dfs(index) {
    if (index === words.length) return true;

    const word = words[index];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (canPlaceHorizontal(r, c, word)) {
          const changed = placeHorizontal(r, c, word);

          if (dfs(index + 1)) return true;

          undo(changed);
        }

        if (canPlaceVertical(r, c, word)) {
          const changed = placeVertical(r, c, word);

          if (dfs(index + 1)) return true;

          undo(changed);
        }
      }
    }

    return false;
  }

  dfs(0);
  return board;
}

/****************************************************************
  46. Cryptarithmetic Puzzle
  Example: SEND + MORE = MONEY
****************************************************************/
function cryptarithmetic(words, result) {
  const letters = [...new Set((words.join("") + result).split(""))];
  if (letters.length > 10) return null;

  const firstLetters = new Set([
    ...words.map(w => w[0]),
    result[0],
  ]);

  const map = {};
  const usedDigits = new Set();

  function wordValue(word) {
    let value = "";

    for (const ch of word) {
      value += map[ch];
    }

    return Number(value);
  }

  function dfs(index) {
    if (index === letters.length) {
      const sum = words.reduce((acc, word) => acc + wordValue(word), 0);
      return sum === wordValue(result);
    }

    const ch = letters[index];

    for (let digit = 0; digit <= 9; digit++) {
      if (usedDigits.has(digit)) continue;
      if (digit === 0 && firstLetters.has(ch)) continue;

      map[ch] = digit;
      usedDigits.add(digit);

      if (dfs(index + 1)) return true;

      delete map[ch];
      usedDigits.delete(digit);
    }

    return false;
  }

  return dfs(0) ? map : null;
}

/****************************************************************
  47. Graph Coloring Problem
****************************************************************/
function graphColoring(graph, colors) {
  const n = graph.length;
  const assigned = new Array(n).fill(null);

  function isSafe(node, color) {
    for (let neighbor = 0; neighbor < n; neighbor++) {
      if (graph[node][neighbor] && assigned[neighbor] === color) {
        return false;
      }
    }

    return true;
  }

  function dfs(node) {
    if (node === n) return true;

    for (const color of colors) {
      if (isSafe(node, color)) {
        assigned[node] = color;

        if (dfs(node + 1)) return true;

        assigned[node] = null;
      }
    }

    return false;
  }

  return dfs(0) ? assigned : null;
}

/****************************************************************
  48. M-Coloring Problem
****************************************************************/
function mColoring(graph, m) {
  const colors = Array.from({ length: m }, (_, i) => i + 1);
  return graphColoring(graph, colors);
}

/****************************************************************
  49. Solve Verbal Arithmetic Puzzle
****************************************************************/
function verbalArithmetic(words, result) {
  return cryptarithmetic(words, result);
}

/****************************************************************
  50. Latin Square Generation
****************************************************************/
function latinSquare(n) {
  const board = Array.from({ length: n }, () => Array(n).fill(0));

  function isSafe(r, c, num) {
    for (let i = 0; i < n; i++) {
      if (board[r][i] === num) return false;
      if (board[i][c] === num) return false;
    }

    return true;
  }

  function dfs(cell) {
    if (cell === n * n) return true;

    const r = Math.floor(cell / n);
    const c = cell % n;

    for (let num = 1; num <= n; num++) {
      if (isSafe(r, c, num)) {
        board[r][c] = num;

        if (dfs(cell + 1)) return true;

        board[r][c] = 0;
      }
    }

    return false;
  }

  dfs(0);
  return board;
}

/****************************************************************
  PART 3 — STRING / GRID / ADVANCED BACKTRACKING CLASSICS
****************************************************************/

/****************************************************************
  51. Remove Invalid Parentheses
****************************************************************/
function removeInvalidParentheses(s) {
  const result = [];
  const visited = new Set([s]);
  const queue = [s];
  let found = false;

  function isValid(str) {
    let count = 0;

    for (const ch of str) {
      if (ch === "(") count++;
      if (ch === ")") count--;
      if (count < 0) return false;
    }

    return count === 0;
  }

  while (queue.length) {
    const current = queue.shift();

    if (isValid(current)) {
      result.push(current);
      found = true;
    }

    if (found) continue;

    for (let i = 0; i < current.length; i++) {
      if (current[i] !== "(" && current[i] !== ")") continue;

      const next = current.slice(0, i) + current.slice(i + 1);

      if (!visited.has(next)) {
        visited.add(next);
        queue.push(next);
      }
    }
  }

  return result;
}

/****************************************************************
  52. Expression Add Operators
****************************************************************/
function addOperators(num, target) {
  const result = [];

  function dfs(index, path, value, prev) {
    if (index === num.length) {
      if (value === target) result.push(path);
      return;
    }

    for (let i = index; i < num.length; i++) {
      if (i !== index && num[index] === "0") break;

      const part = num.slice(index, i + 1);
      const current = Number(part);

      if (index === 0) {
        dfs(i + 1, part, current, current);
      } else {
        dfs(i + 1, path + "+" + part, value + current, current);
        dfs(i + 1, path + "-" + part, value - current, -current);

        dfs(
          i + 1,
          path + "*" + part,
          value - prev + prev * current,
          prev * current
        );
      }
    }
  }

  dfs(0, "", 0, 0);
  return result;
}

/****************************************************************
  53. Different Ways to Add Parentheses
****************************************************************/
function diffWaysToCompute(expression) {
  const memo = new Map();

  function dfs(expr) {
    if (memo.has(expr)) return memo.get(expr);

    const result = [];

    for (let i = 0; i < expr.length; i++) {
      const ch = expr[i];

      if (ch === "+" || ch === "-" || ch === "*") {
        const left = dfs(expr.slice(0, i));
        const right = dfs(expr.slice(i + 1));

        for (const a of left) {
          for (const b of right) {
            if (ch === "+") result.push(a + b);
            if (ch === "-") result.push(a - b);
            if (ch === "*") result.push(a * b);
          }
        }
      }
    }

    if (result.length === 0) result.push(Number(expr));

    memo.set(expr, result);
    return result;
  }

  return dfs(expression);
}

/****************************************************************
  54. Split String Into Descending Consecutive Values
****************************************************************/
function splitString(s) {
  function dfs(index, prev, count) {
    if (index === s.length) return count >= 2;

    let value = 0;

    for (let i = index; i < s.length; i++) {
      value = value * 10 + Number(s[i]);

      if (prev === null || value === prev - 1) {
        if (dfs(i + 1, value, count + 1)) return true;
      }

      if (prev !== null && value >= prev) break;
    }

    return false;
  }

  return dfs(0, null, 0);
}

/****************************************************************
  55. Generate All Abbreviations
****************************************************************/
function generateAbbreviations(word) {
  const result = [];

  function dfs(index, current, count) {
    if (index === word.length) {
      if (count > 0) current += count;
      result.push(current);
      return;
    }

    dfs(index + 1, current, count + 1);

    dfs(
      index + 1,
      current + (count > 0 ? count : "") + word[index],
      0
    );
  }

  dfs(0, "", 0);
  return result;
}

/****************************************************************
  56. Restore Valid Sentences From String
  wordDict is an array of valid words.
****************************************************************/
function wordBreakSentences(s, wordDict) {
  const words = new Set(wordDict);
  const memo = new Map();

  function dfs(start) {
    if (memo.has(start)) return memo.get(start);
    if (start === s.length) return [""];

    const result = [];

    for (let end = start + 1; end <= s.length; end++) {
      const word = s.slice(start, end);

      if (words.has(word)) {
        const sentences = dfs(end);

        for (const sentence of sentences) {
          result.push(word + (sentence ? " " + sentence : ""));
        }
      }
    }

    memo.set(start, result);
    return result;
  }

  return dfs(0);
}

/****************************************************************
  57. Maximum Unique Split of String
****************************************************************/
function maxUniqueSplitString(s) {
  let best = 0;
  const used = new Set();

  function dfs(start) {
    if (start === s.length) {
      best = Math.max(best, used.size);
      return;
    }

    for (let end = start + 1; end <= s.length; end++) {
      const part = s.slice(start, end);

      if (used.has(part)) continue;

      used.add(part);
      dfs(end);
      used.delete(part);
    }
  }

  dfs(0);
  return best;
}

/****************************************************************
  58. Generate Valid Mathematical Expressions
****************************************************************/
function generateMathExpressions(num, target) {
  return addOperators(num, target);
}

/****************************************************************
  59. String Permutations With Constraints
  Example constraint: no two equal chars adjacent.
****************************************************************/
function stringPermutationsWithConstraints(str) {
  const chars = str.split("").sort();
  const used = new Array(chars.length).fill(false);
  const result = [];

  function dfs(path) {
    if (path.length === chars.length) {
      result.push(path.join(""));
      return;
    }

    for (let i = 0; i < chars.length; i++) {
      if (used[i]) continue;
      if (i > 0 && chars[i] === chars[i - 1] && !used[i - 1]) continue;

      if (
        path.length > 0 &&
        path[path.length - 1] === chars[i]
      ) {
        continue;
      }

      used[i] = true;
      path.push(chars[i]);

      dfs(path);

      path.pop();
      used[i] = false;
    }
  }

  dfs([]);
  return result;
}

/****************************************************************
  60. Recursive Regex-Style Matcher
  Supports "." and "*"
****************************************************************/
function isMatch(s, p) {
  const memo = new Map();

  function dfs(i, j) {
    const key = `${i},${j}`;
    if (memo.has(key)) return memo.get(key);

    if (j === p.length) return i === s.length;

    const firstMatch =
      i < s.length &&
      (s[i] === p[j] || p[j] === ".");

    let ans;

    if (j + 1 < p.length && p[j + 1] === "*") {
      ans =
        dfs(i, j + 2) ||
        (firstMatch && dfs(i + 1, j));
    } else {
      ans = firstMatch && dfs(i + 1, j + 1);
    }

    memo.set(key, ans);
    return ans;
  }

  return dfs(0, 0);
}

/****************************************************************
  61. Boggle Board Solver
****************************************************************/
function boggleSolver(board, words) {
  const root = {};

  for (const word of words) {
    let node = root;

    for (const ch of word) {
      if (!node[ch]) node[ch] = {};
      node = node[ch];
    }

    node.word = word;
  }

  const rows = board.length;
  const cols = board[0].length;
  const result = new Set();

  const dirs = [
    [1, 0], [-1, 0], [0, 1], [0, -1],
    [1, 1], [1, -1], [-1, 1], [-1, -1],
  ];

  function dfs(r, c, node) {
    if (
      r < 0 ||
      c < 0 ||
      r >= rows ||
      c >= cols
    ) {
      return;
    }

    const ch = board[r][c];
    if (ch === "#" || !node[ch]) return;

    node = node[ch];

    if (node.word) result.add(node.word);

    board[r][c] = "#";

    for (const [dr, dc] of dirs) {
      dfs(r + dr, c + dc, node);
    }

    board[r][c] = ch;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dfs(r, c, root);
    }
  }

  return [...result];
}

/****************************************************************
  62. Search All Words in Board
****************************************************************/
function searchAllWordsInBoard(board, words) {
  return findWords(board, words);
}

/****************************************************************
  63. Path With Obstacles
  0 = free, 1 = obstacle
****************************************************************/
function pathWithObstacles(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const path = [];
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

  function dfs(r, c) {
    if (
      r < 0 ||
      c < 0 ||
      r >= rows ||
      c >= cols ||
      grid[r][c] === 1 ||
      visited[r][c]
    ) {
      return false;
    }

    path.push([r, c]);
    visited[r][c] = true;

    if (r === rows - 1 && c === cols - 1) return true;

    if (
      dfs(r + 1, c) ||
      dfs(r, c + 1) ||
      dfs(r - 1, c) ||
      dfs(r, c - 1)
    ) {
      return true;
    }

    path.pop();
    return false;
  }

  return dfs(0, 0) ? path : [];
}

/****************************************************************
  64. Count Islands Recursively
****************************************************************/
function numIslands(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  function dfs(r, c) {
    if (
      r < 0 ||
      c < 0 ||
      r >= rows ||
      c >= cols ||
      grid[r][c] !== "1"
    ) {
      return;
    }

    grid[r][c] = "0";

    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === "1") {
        count++;
        dfs(r, c);
      }
    }
  }

  return count;
}

/****************************************************************
  65. Minimum Moves in Grid Puzzle
  Uses BFS, but same search-tree idea.
  0 = free, 1 = wall.
****************************************************************/
function minMovesGrid(grid, start, target) {
  const rows = grid.length;
  const cols = grid[0].length;
  const queue = [[start[0], start[1], 0]];
  const visited = new Set([start.join(",")]);

  const dirs = [
    [1, 0], [-1, 0], [0, 1], [0, -1],
  ];

  while (queue.length) {
    const [r, c, dist] = queue.shift();

    if (r === target[0] && c === target[1]) return dist;

    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      const key = `${nr},${nc}`;

      if (
        nr >= 0 &&
        nc >= 0 &&
        nr < rows &&
        nc < cols &&
        grid[nr][nc] === 0 &&
        !visited.has(key)
      ) {
        visited.add(key);
        queue.push([nr, nc, dist + 1]);
      }
    }
  }

  return -1;
}

/****************************************************************
  66. Solve Maze With Multiple Exits
****************************************************************/
function mazeMultipleExits(maze, start) {
  const rows = maze.length;
  const cols = maze[0].length;
  const paths = [];
  const path = [];
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

  function isExit(r, c) {
    return (
      r === 0 ||
      c === 0 ||
      r === rows - 1 ||
      c === cols - 1
    );
  }

  function dfs(r, c) {
    if (
      r < 0 ||
      c < 0 ||
      r >= rows ||
      c >= cols ||
      maze[r][c] === 1 ||
      visited[r][c]
    ) {
      return;
    }

    path.push([r, c]);
    visited[r][c] = true;

    if (isExit(r, c) && !(r === start[0] && c === start[1])) {
      paths.push(path.map(x => [...x]));
    } else {
      dfs(r + 1, c);
      dfs(r - 1, c);
      dfs(r, c + 1);
      dfs(r, c - 1);
    }

    path.pop();
    visited[r][c] = false;
  }

  dfs(start[0], start[1]);
  return paths;
}

/****************************************************************
  67. Search Hidden Patterns in Matrix
****************************************************************/
function searchPatternMatrix(board, pattern) {
  const rows = board.length;
  const cols = board[0].length;

  function dfs(r, c, index) {
    if (index === pattern.length) return true;

    if (
      r < 0 ||
      c < 0 ||
      r >= rows ||
      c >= cols ||
      board[r][c] !== pattern[index]
    ) {
      return false;
    }

    const temp = board[r][c];
    board[r][c] = "#";

    const found =
      dfs(r + 1, c, index + 1) ||
      dfs(r - 1, c, index + 1) ||
      dfs(r, c + 1, index + 1) ||
      dfs(r, c - 1, index + 1) ||
      dfs(r + 1, c + 1, index + 1) ||
      dfs(r + 1, c - 1, index + 1) ||
      dfs(r - 1, c + 1, index + 1) ||
      dfs(r - 1, c - 1, index + 1);

    board[r][c] = temp;
    return found;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (dfs(r, c, 0)) return true;
    }
  }

  return false;
}

/****************************************************************
  68. Backtracking on Chessboard
  Example: place K knights safely on n x n board.
****************************************************************/
function placeKKnights(n, k) {
  const board = Array.from({ length: n }, () => Array(n).fill("."));
  const result = [];

  const knightMoves = [
    [2, 1], [1, 2], [-1, 2], [-2, 1],
    [-2, -1], [-1, -2], [1, -2], [2, -1],
  ];

  function isSafe(r, c) {
    for (const [dr, dc] of knightMoves) {
      const nr = r + dr;
      const nc = c + dc;

      if (
        nr >= 0 &&
        nc >= 0 &&
        nr < n &&
        nc < n &&
        board[nr][nc] === "K"
      ) {
        return false;
      }
    }

    return true;
  }

  function dfs(cell, placed) {
    if (placed === k) {
      result.push(board.map(row => row.join("")));
      return;
    }

    if (cell === n * n) return;

    const r = Math.floor(cell / n);
    const c = cell % n;

    if (isSafe(r, c)) {
      board[r][c] = "K";
      dfs(cell + 1, placed + 1);
      board[r][c] = ".";
    }

    dfs(cell + 1, placed);
  }

  dfs(0, 0);
  return result;
}

/****************************************************************
  69. Robot Room Cleaner Simulation
  room: 0 = open, 1 = wall
****************************************************************/
function cleanRoomSimulation(room, start) {
  const rows = room.length;
  const cols = room[0].length;
  const cleaned = new Set();

  const dirs = [
    [1, 0], [-1, 0], [0, 1], [0, -1],
  ];

  function dfs(r, c) {
    if (
      r < 0 ||
      c < 0 ||
      r >= rows ||
      c >= cols ||
      room[r][c] === 1 ||
      cleaned.has(`${r},${c}`)
    ) {
      return;
    }

    cleaned.add(`${r},${c}`);

    for (const [dr, dc] of dirs) {
      dfs(r + dr, c + dc);
    }
  }

  dfs(start[0], start[1]);
  return [...cleaned].map(pos => pos.split(",").map(Number));
}

/****************************************************************
  70. Sliding Puzzle Solver
  Works for 2x3 puzzle like LeetCode 773.
****************************************************************/
function slidingPuzzle(board) {
  const target = "123450";
  const start = board.flat().join("");

  const neighbors = {
    0: [1, 3],
    1: [0, 2, 4],
    2: [1, 5],
    3: [0, 4],
    4: [1, 3, 5],
    5: [2, 4],
  };

  const queue = [[start, 0]];
  const visited = new Set([start]);

  while (queue.length) {
    const [state, moves] = queue.shift();

    if (state === target) return moves;

    const zero = state.indexOf("0");

    for (const next of neighbors[zero]) {
      const arr = state.split("");
      [arr[zero], arr[next]] = [arr[next], arr[zero]];

      const nextState = arr.join("");

      if (!visited.has(nextState)) {
        visited.add(nextState);
        queue.push([nextState, moves + 1]);
      }
    }
  }

  return -1;
}

/****************************************************************
  71. Solve Rubik's Cube Simplified
  Simplified state search.
  moves is an object:
  {
    R: state => newState,
    U: state => newState
  }
****************************************************************/
function solveRubiksSimplified(start, target, moves, maxDepth = 7) {
  const moveNames = Object.keys(moves);

  function dfs(state, depth, path, visited) {
    if (state === target) return path;
    if (depth === maxDepth) return null;

    for (const move of moveNames) {
      const next = moves[move](state);

      if (visited.has(next)) continue;

      visited.add(next);

      const found = dfs(next, depth + 1, [...path, move], visited);

      if (found) return found;

      visited.delete(next);
    }

    return null;
  }

  return dfs(start, 0, [], new Set([start]));
}

/****************************************************************
  72. Traveling Salesman Using Backtracking
****************************************************************/
function tspBacktracking(graph) {
  const n = graph.length;
  const visited = new Array(n).fill(false);

  let bestCost = Infinity;
  let bestPath = [];

  function dfs(city, count, cost, path) {
    if (count === n) {
      if (graph[city][0] > 0) {
        const total = cost + graph[city][0];

        if (total < bestCost) {
          bestCost = total;
          bestPath = [...path, 0];
        }
      }

      return;
    }

    for (let next = 0; next < n; next++) {
      if (!visited[next] && graph[city][next] > 0) {
        visited[next] = true;
        path.push(next);

        dfs(
          next,
          count + 1,
          cost + graph[city][next],
          path
        );

        path.pop();
        visited[next] = false;
      }
    }
  }

  visited[0] = true;
  dfs(0, 1, 0, [0]);

  return {
    cost: bestCost,
    path: bestPath,
  };
}

/****************************************************************
  73. Generate All Topological Sorts
****************************************************************/
function allTopologicalSorts(vertices, edges) {
  const graph = {};
  const indegree = {};

  for (const v of vertices) {
    graph[v] = [];
    indegree[v] = 0;
  }

  for (const [u, v] of edges) {
    graph[u].push(v);
    indegree[v]++;
  }

  const result = [];

  function dfs(path, visited) {
    if (path.length === vertices.length) {
      result.push([...path]);
      return;
    }

    for (const v of vertices) {
      if (!visited.has(v) && indegree[v] === 0) {
        visited.add(v);
        path.push(v);

        for (const nei of graph[v]) indegree[nei]--;

        dfs(path, visited);

        for (const nei of graph[v]) indegree[nei]++;

        path.pop();
        visited.delete(v);
      }
    }
  }

  dfs([], new Set());
  return result;
}

/****************************************************************
  74. Branch and Bound Knapsack
****************************************************************/
function knapsackBranchBound(items, capacity) {
  items.sort((a, b) => b.value / b.weight - a.value / a.weight);

  let bestValue = 0;

  function bound(index, weight, value) {
    let totalWeight = weight;
    let totalValue = value;

    for (let i = index; i < items.length; i++) {
      if (totalWeight + items[i].weight <= capacity) {
        totalWeight += items[i].weight;
        totalValue += items[i].value;
      } else {
        const remain = capacity - totalWeight;
        totalValue += remain * (items[i].value / items[i].weight);
        break;
      }
    }

    return totalValue;
  }

  function dfs(index, weight, value) {
    if (weight > capacity) return;

    if (index === items.length) {
      bestValue = Math.max(bestValue, value);
      return;
    }

    if (bound(index, weight, value) < bestValue) return;

    dfs(
      index + 1,
      weight + items[index].weight,
      value + items[index].value
    );

    dfs(index + 1, weight, value);
  }

  dfs(0, 0, 0);
  return bestValue;
}

/****************************************************************
  75. Branch and Bound Job Assignment
****************************************************************/
function jobAssignment(cost) {
  const n = cost.length;
  const assigned = new Array(n).fill(false);

  let bestCost = Infinity;
  let bestAssignment = [];

  function dfs(worker, currentCost, assignment) {
    if (currentCost >= bestCost) return;

    if (worker === n) {
      bestCost = currentCost;
      bestAssignment = [...assignment];
      return;
    }

    for (let job = 0; job < n; job++) {
      if (!assigned[job]) {
        assigned[job] = true;
        assignment.push(job);

        dfs(
          worker + 1,
          currentCost + cost[worker][job],
          assignment
        );

        assignment.pop();
        assigned[job] = false;
      }
    }
  }

  dfs(0, 0, []);

  return {
    cost: bestCost,
    assignment: bestAssignment,
  };
}

/****************************************************************
  76. Exact Cover Problem
****************************************************************/
function exactCover(universe, subsets) {
  const result = [];

  function dfs(remaining, chosen) {
    if (remaining.size === 0) {
      result.push([...chosen]);
      return;
    }

    const element = remaining.values().next().value;

    for (let i = 0; i < subsets.length; i++) {
      const subset = subsets[i];

      if (!subset.includes(element)) continue;

      const newRemaining = new Set(remaining);
      let valid = true;

      for (const x of subset) {
        if (!newRemaining.has(x)) {
          valid = false;
          break;
        }

        newRemaining.delete(x);
      }

      if (!valid) continue;

      chosen.push(i);
      dfs(newRemaining, chosen);
      chosen.pop();
    }
  }

  dfs(new Set(universe), []);
  return result;
}

/****************************************************************
  77. Dancing Links / Algorithm X Simplified
  Matrix contains 0/1.
****************************************************************/
function algorithmX(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = [];

  function getColumns(activeRows) {
    const activeCols = new Set();

    for (const r of activeRows) {
      for (let c = 0; c < cols; c++) {
        if (matrix[r][c] === 1) activeCols.add(c);
      }
    }

    return activeCols;
  }

  function dfs(activeRows, solution) {
    const activeCols = getColumns(activeRows);

    if (activeCols.size === 0) {
      result.push([...solution]);
      return;
    }

    const col = activeCols.values().next().value;

    for (const r of activeRows) {
      if (matrix[r][col] !== 1) continue;

      const conflictingCols = new Set();

      for (let c = 0; c < cols; c++) {
        if (matrix[r][c] === 1) conflictingCols.add(c);
      }

      const nextRows = activeRows.filter(row => {
        for (const c of conflictingCols) {
          if (matrix[row][c] === 1) return false;
        }

        return true;
      });

      solution.push(r);
      dfs(nextRows, solution);
      solution.pop();
    }
  }

  dfs([...Array(rows).keys()], []);
  return result;
}

/****************************************************************
  78. Eight Puzzle Solver
****************************************************************/
function eightPuzzle(start) {
  const target = "123456780";
  const neighbors = {
    0: [1, 3],
    1: [0, 2, 4],
    2: [1, 5],
    3: [0, 4, 6],
    4: [1, 3, 5, 7],
    5: [2, 4, 8],
    6: [3, 7],
    7: [4, 6, 8],
    8: [5, 7],
  };

  const queue = [[start, []]];
  const visited = new Set([start]);

  while (queue.length) {
    const [state, path] = queue.shift();

    if (state === target) return path;

    const zero = state.indexOf("0");

    for (const next of neighbors[zero]) {
      const arr = state.split("");
      [arr[zero], arr[next]] = [arr[next], arr[zero]];

      const nextState = arr.join("");

      if (!visited.has(nextState)) {
        visited.add(nextState);
        queue.push([nextState, [...path, nextState]]);
      }
    }
  }

  return null;
}

/****************************************************************
  79. Fifteen Puzzle Solver Simplified
  Warning: real 15-puzzle needs A* for serious performance.
****************************************************************/
function fifteenPuzzleBFS(start, target, maxStates = 50000) {
  const size = 4;

  function getNeighbors(state) {
    const zero = state.indexOf("0");
    const r = Math.floor(zero / size);
    const c = zero % size;

    const result = [];
    const dirs = [
      [1, 0], [-1, 0], [0, 1], [0, -1],
    ];

    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;

      if (nr < 0 || nc < 0 || nr >= size || nc >= size) continue;

      const next = nr * size + nc;
      const arr = state.split("");

      [arr[zero], arr[next]] = [arr[next], arr[zero]];

      result.push(arr.join(""));
    }

    return result;
  }

  const queue = [[start, 0]];
  const visited = new Set([start]);

  while (queue.length && visited.size < maxStates) {
    const [state, dist] = queue.shift();

    if (state === target) return dist;

    for (const next of getNeighbors(state)) {
      if (!visited.has(next)) {
        visited.add(next);
        queue.push([next, dist + 1]);
      }
    }
  }

  return -1;
}

/****************************************************************
  80. Kakuro Puzzle Solver Simplified
****************************************************************/
function kakuroSolver(cells, constraints) {
  /*
    cells:
    {
      A: [1,2,3,4,5,6,7,8,9],
      B: [1,2,3,4,5,6,7,8,9]
    }

    constraints:
    [
      { cells: ["A", "B"], sum: 10 }
    ]
  */

  const keys = Object.keys(cells);
  const assignment = {};

  function valid() {
    for (const rule of constraints) {
      let sum = 0;
      const seen = new Set();
      let filled = 0;

      for (const cell of rule.cells) {
        if (assignment[cell] == null) continue;

        filled++;
        sum += assignment[cell];

        if (seen.has(assignment[cell])) return false;
        seen.add(assignment[cell]);
      }

      if (sum > rule.sum) return false;
      if (filled === rule.cells.length && sum !== rule.sum) return false;
    }

    return true;
  }

  function dfs(index) {
    if (index === keys.length) return valid();

    const cell = keys[index];

    for (const value of cells[cell]) {
      assignment[cell] = value;

      if (valid() && dfs(index + 1)) return true;

      delete assignment[cell];
    }

    return false;
  }

  return dfs(0) ? assignment : null;
}

/****************************************************************
  81. Nonogram Solver Simplified
****************************************************************/
function nonogramSolver(rowHints, colHints, rows, cols) {
  const board = Array.from({ length: rows }, () => Array(cols).fill(0));

  function groups(arr) {
    const result = [];
    let count = 0;

    for (const x of arr) {
      if (x === 1) count++;
      else if (count > 0) {
        result.push(count);
        count = 0;
      }
    }

    if (count > 0) result.push(count);
    return result;
  }

  function rowValid(r) {
    return JSON.stringify(groups(board[r])) === JSON.stringify(rowHints[r]);
  }

  function colValid(c) {
    const col = board.map(row => row[c]);
    return JSON.stringify(groups(col)) === JSON.stringify(colHints[c]);
  }

  function dfs(cell) {
    if (cell === rows * cols) {
      for (let r = 0; r < rows; r++) {
        if (!rowValid(r)) return false;
      }

      for (let c = 0; c < cols; c++) {
        if (!colValid(c)) return false;
      }

      return true;
    }

    const r = Math.floor(cell / cols);
    const c = cell % cols;

    board[r][c] = 0;
    if (dfs(cell + 1)) return true;

    board[r][c] = 1;
    if (dfs(cell + 1)) return true;

    board[r][c] = 0;
    return false;
  }

  return dfs(0) ? board : null;
}

/****************************************************************
  82. Minesweeper Solver Simplified
****************************************************************/
function minesweeperSolver(numbers, mineCount) {
  const rows = numbers.length;
  const cols = numbers[0].length;
  const board = Array.from({ length: rows }, () => Array(cols).fill(0));

  function neighbors(r, c) {
    const result = [];

    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;

        const nr = r + dr;
        const nc = c + dc;

        if (nr >= 0 && nc >= 0 && nr < rows && nc < cols) {
          result.push([nr, nc]);
        }
      }
    }

    return result;
  }

  function validPartial() {
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (numbers[r][c] == null) continue;

        let mines = 0;

        for (const [nr, nc] of neighbors(r, c)) {
          mines += board[nr][nc];
        }

        if (mines > numbers[r][c]) return false;
      }
    }

    return true;
  }

  function validFinal() {
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (numbers[r][c] == null) continue;

        let mines = 0;

        for (const [nr, nc] of neighbors(r, c)) {
          mines += board[nr][nc];
        }

        if (mines !== numbers[r][c]) return false;
      }
    }

    return board.flat().reduce((a, b) => a + b, 0) === mineCount;
  }

  function dfs(cell) {
    if (cell === rows * cols) return validFinal();

    const r = Math.floor(cell / cols);
    const c = cell % cols;

    board[r][c] = 0;
    if (validPartial() && dfs(cell + 1)) return true;

    board[r][c] = 1;
    if (validPartial() && dfs(cell + 1)) return true;

    board[r][c] = 0;
    return false;
  }

  return dfs(0) ? board : null;
}

/****************************************************************
  83. Crossword Generation Engine Simplified
****************************************************************/
function crosswordGenerator(words, size) {
  const board = Array.from({ length: size }, () => Array(size).fill("."));

  function canPlace(word, r, c, horizontal) {
    if (horizontal && c + word.length > size) return false;
    if (!horizontal && r + word.length > size) return false;

    for (let i = 0; i < word.length; i++) {
      const nr = r + (horizontal ? 0 : i);
      const nc = c + (horizontal ? i : 0);

      if (board[nr][nc] !== "." && board[nr][nc] !== word[i]) {
        return false;
      }
    }

    return true;
  }

  function place(word, r, c, horizontal) {
    const changed = [];

    for (let i = 0; i < word.length; i++) {
      const nr = r + (horizontal ? 0 : i);
      const nc = c + (horizontal ? i : 0);

      if (board[nr][nc] === ".") {
        board[nr][nc] = word[i];
        changed.push([nr, nc]);
      }
    }

    return changed;
  }

  function undo(changed) {
    for (const [r, c] of changed) {
      board[r][c] = ".";
    }
  }

  function dfs(index) {
    if (index === words.length) return true;

    const word = words[index];

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        for (const horizontal of [true, false]) {
          if (canPlace(word, r, c, horizontal)) {
            const changed = place(word, r, c, horizontal);

            if (dfs(index + 1)) return true;

            undo(changed);
          }
        }
      }
    }

    return false;
  }

  return dfs(0) ? board.map(row => row.join("")) : null;
}

/****************************************************************
  84. Recursive Game State Solver
  Generic minimax.
****************************************************************/
function minimax(state, getMoves, applyMove, isTerminal, evaluate, maximizing = true) {
  if (isTerminal(state)) return evaluate(state);

  if (maximizing) {
    let best = -Infinity;

    for (const move of getMoves(state)) {
      const next = applyMove(state, move);
      best = Math.max(
        best,
        minimax(next, getMoves, applyMove, isTerminal, evaluate, false)
      );
    }

    return best;
  } else {
    let best = Infinity;

    for (const move of getMoves(state)) {
      const next = applyMove(state, move);
      best = Math.min(
        best,
        minimax(next, getMoves, applyMove, isTerminal, evaluate, true)
      );
    }

    return best;
  }
}

/****************************************************************
  85. Constraint Propagation System Simplified
****************************************************************/
function constraintPropagation(variables, domains, constraints) {
  const assignment = {};

  function isValid(variable, value) {
    assignment[variable] = value;

    for (const constraint of constraints) {
      if (!constraint(assignment)) {
        delete assignment[variable];
        return false;
      }
    }

    delete assignment[variable];
    return true;
  }

  function selectUnassigned() {
    return variables.find(v => assignment[v] == null);
  }

  function dfs() {
    if (Object.keys(assignment).length === variables.length) {
      return { ...assignment };
    }

    const variable = selectUnassigned();

    for (const value of domains[variable]) {
      if (isValid(variable, value)) {
        assignment[variable] = value;

        const result = dfs();

        if (result) return result;

        delete assignment[variable];
      }
    }

    return null;
  }

  return dfs();
}

/****************************************************************
  SMALL TEST EXAMPLES
****************************************************************/

console.log(removeInvalidParentheses("()())()"));
console.log(addOperators("123", 6));
console.log(diffWaysToCompute("2*3-4*5"));
console.log(generateAbbreviations("word"));
console.log(isMatch("aab", "c*a*b"));

console.log(numIslands([
  ["1", "1", "0"],
  ["0", "1", "0"],
  ["1", "0", "1"],
]));

console.log(slidingPuzzle([
  [1, 2, 3],
  [4, 0, 5],
]));

console.log(tspBacktracking([
  [0, 10, 15, 20],
  [10, 0, 35, 25],
  [15, 35, 0, 30],
  [20, 25, 30, 0],
]));