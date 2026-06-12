// ==================== EASY (1-20) - Recursion Fundamentals ====================

// 1. Factorial - Calculate n! recursively
function factorial(n) {
    if (n < 0) return undefined;
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

// 2. Fibonacci number - Find nth Fibonacci number
function fibonacci(n) {
    if (n < 0) return undefined;
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// 3. Sum of natural numbers - Sum from 1 to n
function sumNatural(n) {
    if (n <= 0) return 0;
    return n + sumNatural(n - 1);
}

// 4. Power function - Calculate x^n recursively
function power(x, n) {
    if (n === 0) return 1;
    if (n < 0) return 1 / power(x, -n);
    return x * power(x, n - 1);
}

// 5. Product of array - Multiply all elements recursively
function productArray(arr, index = 0) {
    if (index >= arr.length) return 1;
    return arr[index] * productArray(arr, index + 1);
}

// 6. Count digits - Count number of digits in an integer
function countDigits(n) {
    n = Math.abs(n);
    if (n < 10) return 1;
    return 1 + countDigits(Math.floor(n / 10));
}

// 7. Sum of digits - Sum all digits of a number
function sumOfDigits(n) {
    n = Math.abs(n);
    if (n === 0) return 0;
    return (n % 10) + sumOfDigits(Math.floor(n / 10));
}

// 8. Reverse string - Reverse a string using recursion
function reverseString(str) {
    if (str.length <= 1) return str;
    return reverseString(str.slice(1)) + str[0];
}

// 9. Palindrome check - Check if string is palindrome recursively
function isPalindrome(str) {
    str = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (str.length <= 1) return true;
    if (str[0] !== str[str.length - 1]) return false;
    return isPalindrome(str.slice(1, -1));
}

// 10. Decimal to binary - Convert decimal to binary using recursion
function decimalToBinary(n) {
    if (n === 0) return "0";
    if (n === 1) return "1";
    return decimalToBinary(Math.floor(n / 2)) + (n % 2).toString();
}

// 11. Linear search - Search element in array recursively
function linearSearch(arr, target, index = 0) {
    if (index >= arr.length) return -1;
    if (arr[index] === target) return index;
    return linearSearch(arr, target, index + 1);
}

// 12. Find maximum in array - Find largest element recursively
function findMax(arr, index = 0, max = -Infinity) {
    if (index >= arr.length) return max;
    return findMax(arr, index + 1, Math.max(max, arr[index]));
}

// 13. Find minimum in array - Find smallest element recursively
function findMin(arr, index = 0, min = Infinity) {
    if (index >= arr.length) return min;
    return findMin(arr, index + 1, Math.min(min, arr[index]));
}

// 14. Array sum - Sum of array elements recursively
function arraySum(arr, index = 0) {
    if (index >= arr.length) return 0;
    return arr[index] + arraySum(arr, index + 1);
}

// 15. Array average - Calculate average using recursion
function arrayAverage(arr, index = 0, sum = 0) {
    if (index >= arr.length) return sum / arr.length;
    return arrayAverage(arr, index + 1, sum + arr[index]);
}

// 16. Count occurrences - Count frequency of element in array
function countOccurrences(arr, target, index = 0) {
    if (index >= arr.length) return 0;
    return (arr[index] === target ? 1 : 0) + countOccurrences(arr, target, index + 1);
}

// 17. Check sorted array - Verify if array is sorted recursively
function isSorted(arr, index = 0) {
    if (index >= arr.length - 1) return true;
    if (arr[index] > arr[index + 1]) return false;
    return isSorted(arr, index + 1);
}

// 18. Replace all occurrences - Replace value in array recursively
function replaceAll(arr, target, replacement, index = 0) {
    if (index >= arr.length) return arr;
    if (arr[index] === target) arr[index] = replacement;
    return replaceAll(arr, target, replacement, index + 1);
}

// 19. Remove duplicates - Remove duplicates from sorted array recursively
function removeDuplicatesSorted(arr, index = 0, result = []) {
    if (index >= arr.length) return result;
    if (index === 0 || arr[index] !== arr[index - 1]) {
        result.push(arr[index]);
    }
    return removeDuplicatesSorted(arr, index + 1, result);
}

// 20. Rotate array left - Rotate array by k positions recursively
function rotateLeft(arr, k, rotated = []) {
    if (arr.length === 0) return rotated;
    k = k % arr.length;
    if (rotated.length === arr.length) return rotated;
    if (rotated.length < arr.length - k) {
        rotated.push(arr[k + rotated.length]);
    } else {
        rotated.push(arr[rotated.length - (arr.length - k)]);
    }
    return rotateLeft(arr, k, rotated);
}

// ==================== MEDIUM (21-40) - Classic Recursion Patterns ====================

// 21. Binary search - Implement binary search recursively
function binarySearch(arr, target, left = 0, right = arr.length - 1) {
    if (left > right) return -1;
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] > target) return binarySearch(arr, target, left, mid - 1);
    return binarySearch(arr, target, mid + 1, right);
}

// 22. Merge sort - Sort array using merge sort recursion
function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    let mid = Math.floor(arr.length / 2);
    let left = mergeSort(arr.slice(0, mid));
    let right = mergeSort(arr.slice(mid));
    return merge(left, right);
}

function merge(left, right) {
    let result = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) result.push(left[i++]);
        else result.push(right[j++]);
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
}

// 23. Quick sort - Implement quicksort recursively
function quickSort(arr) {
    if (arr.length <= 1) return arr;
    let pivot = arr[0];
    let left = [], right = [];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < pivot) left.push(arr[i]);
        else right.push(arr[i]);
    }
    return [...quickSort(left), pivot, ...quickSort(right)];
}

// 24. Maximum subarray sum (Divide & Conquer)
function maxSubarraySum(arr, left = 0, right = arr.length - 1) {
    if (left === right) return arr[left];
    let mid = Math.floor((left + right) / 2);
    let leftMax = maxSubarraySum(arr, left, mid);
    let rightMax = maxSubarraySum(arr, mid + 1, right);
    let crossMax = maxCrossingSum(arr, left, mid, right);
    return Math.max(leftMax, rightMax, crossMax);
}

function maxCrossingSum(arr, left, mid, right) {
    let sum = 0;
    let leftSum = -Infinity;
    for (let i = mid; i >= left; i--) {
        sum += arr[i];
        leftSum = Math.max(leftSum, sum);
    }
    sum = 0;
    let rightSum = -Infinity;
    for (let i = mid + 1; i <= right; i++) {
        sum += arr[i];
        rightSum = Math.max(rightSum, sum);
    }
    return leftSum + rightSum;
}

// 25. Majority element - Find element appearing > n/2 times
function majorityElement(arr, left = 0, right = arr.length - 1) {
    if (left === right) return arr[left];
    let mid = Math.floor((left + right) / 2);
    let leftMajority = majorityElement(arr, left, mid);
    let rightMajority = majorityElement(arr, mid + 1, right);
    if (leftMajority === rightMajority) return leftMajority;
    let leftCount = countInRange(arr, leftMajority, left, right);
    let rightCount = countInRange(arr, rightMajority, left, right);
    return leftCount > rightCount ? leftMajority : rightMajority;
}

function countInRange(arr, target, left, right) {
    let count = 0;
    for (let i = left; i <= right; i++) {
        if (arr[i] === target) count++;
    }
    return count;
}

// 26. Find peak element - Find peak in array using binary search recursion
function findPeakElement(arr, left = 0, right = arr.length - 1) {
    if (left === right) return left;
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] > arr[mid + 1]) {
        return findPeakElement(arr, left, mid);
    }
    return findPeakElement(arr, mid + 1, right);
}

// 27. Search in rotated sorted array
function searchRotated(nums, target, left = 0, right = nums.length - 1) {
    if (left > right) return -1;
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[left] <= nums[mid]) {
        if (nums[left] <= target && target < nums[mid]) {
            return searchRotated(nums, target, left, mid - 1);
        }
        return searchRotated(nums, target, mid + 1, right);
    } else {
        if (nums[mid] < target && target <= nums[right]) {
            return searchRotated(nums, target, mid + 1, right);
        }
        return searchRotated(nums, target, left, mid - 1);
    }
}

// 28. Find kth largest element - Quick select algorithm recursively
function findKthLargest(nums, k) {
    return quickSelect(nums, 0, nums.length - 1, nums.length - k);
}

function quickSelect(nums, left, right, k) {
    if (left === right) return nums[left];
    let pivotIndex = partition(nums, left, right);
    if (k === pivotIndex) return nums[k];
    if (k < pivotIndex) return quickSelect(nums, left, pivotIndex - 1, k);
    return quickSelect(nums, pivotIndex + 1, right, k);
}

function partition(nums, left, right) {
    let pivot = nums[right];
    let i = left;
    for (let j = left; j < right; j++) {
        if (nums[j] <= pivot) {
            [nums[i], nums[j]] = [nums[j], nums[i]];
            i++;
        }
    }
    [nums[i], nums[right]] = [nums[right], nums[i]];
    return i;
}

// 29. Median of two sorted arrays
function findMedianSortedArrays(nums1, nums2) {
    let merged = mergeSorted(nums1, nums2);
    let mid = Math.floor(merged.length / 2);
    if (merged.length % 2 === 0) {
        return (merged[mid - 1] + merged[mid]) / 2;
    }
    return merged[mid];
}

function mergeSorted(a, b, result = []) {
    if (a.length === 0) return result.concat(b);
    if (b.length === 0) return result.concat(a);
    if (a[0] < b[0]) {
        result.push(a[0]);
        return mergeSorted(a.slice(1), b, result);
    }
    result.push(b[0]);
    return mergeSorted(a, b.slice(1), result);
}

// 30. Exponential search - Search in unbounded array recursively
function exponentialSearch(arr, target, i = 1) {
    if (arr[0] === target) return 0;
    if (arr[i] === target) return i;
    if (arr[i] < target) {
        return exponentialSearch(arr, target, i * 2);
    }
    return binarySearch(arr, target, Math.floor(i / 2), Math.min(i, arr.length - 1));
}

// 31. Generate all subsequences - Power set of string recursively
function generateSubsequences(str, index = 0, current = "", result = []) {
    if (index === str.length) {
        if (current) result.push(current);
        return result;
    }
    generateSubsequences(str, index + 1, current + str[index], result);
    generateSubsequences(str, index + 1, current, result);
    return result;
}

// 32. Generate all permutations - String permutations recursively
function permuteString(str, current = "", result = []) {
    if (str.length === 0) {
        result.push(current);
        return result;
    }
    for (let i = 0; i < str.length; i++) {
        let remaining = str.slice(0, i) + str.slice(i + 1);
        permuteString(remaining, current + str[i], result);
    }
    return result;
}

// 33. Tower of Hanoi - Solve tower of hanoi with recursion
function towerOfHanoi(n, from, to, aux, result = []) {
    if (n === 1) {
        result.push(`Move disk 1 from ${from} to ${to}`);
        return result;
    }
    towerOfHanoi(n - 1, from, aux, to, result);
    result.push(`Move disk ${n} from ${from} to ${to}`);
    towerOfHanoi(n - 1, aux, to, from, result);
    return result;
}

// 34. Letter combinations of phone number
function letterCombinations(digits) {
    if (!digits.length) return [];
    const map = {
        '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
    };
    let result = [];
    function backtrack(index, current) {
        if (index === digits.length) {
            result.push(current);
            return;
        }
        let letters = map[digits[index]];
        for (let char of letters) {
            backtrack(index + 1, current + char);
        }
    }
    backtrack(0, "");
    return result;
}

// 35. Word break problem - Check if string can be segmented
function wordBreak(s, wordDict, memo = new Map()) {
    if (s.length === 0) return true;
    if (memo.has(s)) return memo.get(s);
    for (let word of wordDict) {
        if (s.startsWith(word)) {
            if (wordBreak(s.slice(word.length), wordDict, memo)) {
                memo.set(s, true);
                return true;
            }
        }
    }
    memo.set(s, false);
    return false;
}

// 36. Generate parentheses - Generate valid parentheses combinations
function generateParentheses(n) {
    let result = [];
    function backtrack(open, close, current) {
        if (current.length === n * 2) {
            result.push(current);
            return;
        }
        if (open < n) backtrack(open + 1, close, current + '(');
        if (close < open) backtrack(open, close + 1, current + ')');
    }
    backtrack(0, 0, "");
    return result;
}

// 37. Wildcard matching - Match pattern with '?' and '*'
function isMatchWildcard(s, p, i = 0, j = 0, memo = new Map()) {
    let key = `${i},${j}`;
    if (memo.has(key)) return memo.get(key);
    if (j === p.length) return i === s.length;
    if (i === s.length) {
        while (j < p.length && p[j] === '*') j++;
        return j === p.length;
    }
    let match = false;
    if (p[j] === s[i] || p[j] === '?') {
        match = isMatchWildcard(s, p, i + 1, j + 1, memo);
    } else if (p[j] === '*') {
        match = isMatchWildcard(s, p, i + 1, j, memo) || isMatchWildcard(s, p, i, j + 1, memo);
    }
    memo.set(key, match);
    return match;
}

// 38. Regular expression matching - Implement regex matching recursively
function isMatchRegex(s, p, i = 0, j = 0, memo = new Map()) {
    let key = `${i},${j}`;
    if (memo.has(key)) return memo.get(key);
    if (j === p.length) return i === s.length;
    
    let firstMatch = i < s.length && (s[i] === p[j] || p[j] === '.');
    
    if (j + 1 < p.length && p[j + 1] === '*') {
        let match = isMatchRegex(s, p, i, j + 2, memo) || (firstMatch && isMatchRegex(s, p, i + 1, j, memo));
        memo.set(key, match);
        return match;
    }
    let match = firstMatch && isMatchRegex(s, p, i + 1, j + 1, memo);
    memo.set(key, match);
    return match;
}

// 39. Longest common subsequence - Find LCS recursively
function longestCommonSubsequence(text1, text2, i = 0, j = 0, memo = new Map()) {
    let key = `${i},${j}`;
    if (memo.has(key)) return memo.get(key);
    if (i === text1.length || j === text2.length) return 0;
    
    if (text1[i] === text2[j]) {
        let result = 1 + longestCommonSubsequence(text1, text2, i + 1, j + 1, memo);
        memo.set(key, result);
        return result;
    }
    let result = Math.max(
        longestCommonSubsequence(text1, text2, i + 1, j, memo),
        longestCommonSubsequence(text1, text2, i, j + 1, memo)
    );
    memo.set(key, result);
    return result;
}

// 40. Edit distance - Compute Levenshtein distance recursively
function editDistance(word1, word2, i = 0, j = 0, memo = new Map()) {
    let key = `${i},${j}`;
    if (memo.has(key)) return memo.get(key);
    if (i === word1.length) return word2.length - j;
    if (j === word2.length) return word1.length - i;
    
    if (word1[i] === word2[j]) {
        let result = editDistance(word1, word2, i + 1, j + 1, memo);
        memo.set(key, result);
        return result;
    }
    let insert = 1 + editDistance(word1, word2, i, j + 1, memo);
    let delete_ = 1 + editDistance(word1, word2, i + 1, j, memo);
    let replace = 1 + editDistance(word1, word2, i + 1, j + 1, memo);
    let result = Math.min(insert, delete_, replace);
    memo.set(key, result);
    return result;
}

// 41. Calculate power using exponentiation - Fast power recursion
function fastPower(x, n) {
    if (n === 0) return 1;
    if (n < 0) return 1 / fastPower(x, -n);
    if (n % 2 === 0) {
        let half = fastPower(x, n / 2);
        return half * half;
    }
    return x * fastPower(x, n - 1);
}

// 42. Staircase problem - Count ways to climb stairs (1,2,3 steps)
function climbStairs(n, steps = [1, 2, 3]) {
    if (n < 0) return 0;
    if (n === 0) return 1;
    let total = 0;
    for (let step of steps) {
        total += climbStairs(n - step, steps);
    }
    return total;
}

// 43. Robot in grid - Count unique paths in grid recursively
function uniquePaths(m, n, memo = new Map()) {
    let key = `${m},${n}`;
    if (memo.has(key)) return memo.get(key);
    if (m === 1 || n === 1) return 1;
    let result = uniquePaths(m - 1, n, memo) + uniquePaths(m, n - 1, memo);
    memo.set(key, result);
    return result;
}

// 44. Nth tribonacci number - Tribonacci sequence recursion
function tribonacci(n, memo = new Map()) {
    if (n === 0) return 0;
    if (n === 1 || n === 2) return 1;
    if (memo.has(n)) return memo.get(n);
    let result = tribonacci(n - 1, memo) + tribonacci(n - 2, memo) + tribonacci(n - 3, memo);
    memo.set(n, result);
    return result;
}

// 45. Josephus problem - Find survivor using recursion
function josephus(n, k) {
    if (n === 1) return 0;
    return (josephus(n - 1, k) + k) % n;
}

// 46. Catalan number - Compute catalan numbers recursively
function catalanNumber(n, memo = new Map()) {
    if (n <= 1) return 1;
    if (memo.has(n)) return memo.get(n);
    let result = 0;
    for (let i = 0; i < n; i++) {
        result += catalanNumber(i, memo) * catalanNumber(n - 1 - i, memo);
    }
    memo.set(n, result);
    return result;
}

// 47. Ways to decode string - Count decoding possibilities
function numDecodings(s, index = 0, memo = new Map()) {
    if (index === s.length) return 1;
    if (s[index] === '0') return 0;
    if (memo.has(index)) return memo.get(index);
    
    let result = numDecodings(s, index + 1, memo);
    if (index + 1 < s.length) {
        let twoDigit = parseInt(s.substring(index, index + 2));
        if (twoDigit >= 10 && twoDigit <= 26) {
            result += numDecodings(s, index + 2, memo);
        }
    }
    memo.set(index, result);
    return result;
}

// 48. Number of ways to partition - Integer partition recursion
function integerPartitions(n, max = n, memo = new Map()) {
    let key = `${n},${max}`;
    if (n === 0) return 1;
    if (n < 0 || max === 0) return 0;
    if (memo.has(key)) return memo.get(key);
    let result = integerPartitions(n - max, max, memo) + integerPartitions(n, max - 1, memo);
    memo.set(key, result);
    return result;
}

// 49. Generate all binary strings - Binary strings of length n
function generateBinaryStrings(n, current = "", result = []) {
    if (current.length === n) {
        result.push(current);
        return result;
    }
    generateBinaryStrings(n, current + "0", result);
    generateBinaryStrings(n, current + "1", result);
    return result;
}

// 50. Generate all balanced parentheses - Parentheses combinations (duplicate of 36)

// ==================== HARD (51-70) - Complex Recursive Problems ====================

// 51. N-Queens problem - Place N queens on chessboard
function solveNQueens(n) {
    let result = [];
    let board = Array(n).fill().map(() => Array(n).fill('.'));
    
    function isSafe(row, col) {
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 'Q') return false;
        }
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 'Q') return false;
        }
        for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if (board[i][j] === 'Q') return false;
        }
        return true;
    }
    
    function backtrack(row) {
        if (row === n) {
            result.push(board.map(row => row.join('')));
            return;
        }
        for (let col = 0; col < n; col++) {
            if (isSafe(row, col)) {
                board[row][col] = 'Q';
                backtrack(row + 1);
                board[row][col] = '.';
            }
        }
    }
    backtrack(0);
    return result;
}

// 52. Sudoku solver - Solve Sudoku recursively with backtracking
function solveSudoku(board) {
    function isValid(row, col, num) {
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === num) return false;
            if (board[i][col] === num) return false;
            let boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
            let boxCol = 3 * Math.floor(col / 3) + (i % 3);
            if (board[boxRow][boxCol] === num) return false;
        }
        return true;
    }
    
    function solve() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] === '.') {
                    for (let num = 1; num <= 9; num++) {
                        let numStr = num.toString();
                        if (isValid(i, j, numStr)) {
                            board[i][j] = numStr;
                            if (solve()) return true;
                            board[i][j] = '.';
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
    solve();
    return board;
}

// 53. Rat in a maze - Find all paths in maze
function ratInMaze(maze) {
    let n = maze.length;
    let result = [];
    let path = Array(n).fill().map(() => Array(n).fill(0));
    
    function isSafe(x, y) {
        return x >= 0 && x < n && y >= 0 && y < n && maze[x][y] === 1 && path[x][y] === 0;
    }
    
    function solve(x, y) {
        if (x === n - 1 && y === n - 1) {
            let solution = path.map(row => [...row]);
            solution[x][y] = 1;
            result.push(solution);
            return;
        }
        
        path[x][y] = 1;
        let dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
        for (let [dx, dy] of dirs) {
            let newX = x + dx, newY = y + dy;
            if (isSafe(newX, newY)) {
                solve(newX, newY);
            }
        }
        path[x][y] = 0;
    }
    
    if (maze[0][0] === 1) solve(0, 0);
    return result;
}

// 54. Word search - Find word in 2D grid recursively
function existWord(board, word) {
    let rows = board.length, cols = board[0].length;
    
    function dfs(i, j, index) {
        if (index === word.length) return true;
        if (i < 0 || i >= rows || j < 0 || j >= cols || board[i][j] !== word[index]) return false;
        
        let temp = board[i][j];
        board[i][j] = '#';
        let found = dfs(i + 1, j, index + 1) || dfs(i - 1, j, index + 1) ||
                    dfs(i, j + 1, index + 1) || dfs(i, j - 1, index + 1);
        board[i][j] = temp;
        return found;
    }
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (dfs(i, j, 0)) return true;
        }
    }
    return false;
}

// 55. Combination sum - Find all combinations summing to target
function combinationSum(candidates, target) {
    let result = [];
    
    function backtrack(start, current, sum) {
        if (sum === target) {
            result.push([...current]);
            return;
        }
        if (sum > target) return;
        
        for (let i = start; i < candidates.length; i++) {
            current.push(candidates[i]);
            backtrack(i, current, sum + candidates[i]);
            current.pop();
        }
    }
    backtrack(0, [], 0);
    return result;
}

// 56. Subsets with duplicates - Generate unique subsets recursively
function subsetsWithDup(nums) {
    nums.sort((a, b) => a - b);
    let result = [];
    
    function backtrack(start, current) {
        result.push([...current]);
        for (let i = start; i < nums.length; i++) {
            if (i > start && nums[i] === nums[i - 1]) continue;
            current.push(nums[i]);
            backtrack(i + 1, current);
            current.pop();
        }
    }
    backtrack(0, []);
    return result;
}

// 57. Palindrome partitioning - Partition string into palindromes
function partitionPalindromes(s) {
    let result = [];
    
    function isPalindrome(str, left, right) {
        while (left < right) {
            if (str[left] !== str[right]) return false;
            left++;
            right--;
        }
        return true;
    }
    
    function backtrack(start, current) {
        if (start === s.length) {
            result.push([...current]);
            return;
        }
        for (let end = start; end < s.length; end++) {
            if (isPalindrome(s, start, end)) {
                current.push(s.substring(start, end + 1));
                backtrack(end + 1, current);
                current.pop();
            }
        }
    }
    backtrack(0, []);
    return result;
}

// 58. Restore IP addresses - Generate valid IP addresses recursively
function restoreIpAddresses(s) {
    let result = [];
    
    function backtrack(start, parts) {
        if (parts.length === 4) {
            if (start === s.length) result.push(parts.join('.'));
            return;
        }
        for (let len = 1; len <= 3; len++) {
            if (start + len > s.length) break;
            let segment = s.substring(start, start + len);
            if ((segment.length > 1 && segment[0] === '0') || parseInt(segment) > 255) continue;
            parts.push(segment);
            backtrack(start + len, parts);
            parts.pop();
        }
    }
    backtrack(0, []);
    return result;
}

// 59. Solve crossword puzzle - Fill crossword recursively
function solveCrossword(board, words) {
    let result = null;
    
    function canPlace(word, row, col, vertical) {
        for (let i = 0; i < word.length; i++) {
            let r = vertical ? row + i : row;
            let c = vertical ? col : col + i;
            if (r >= board.length || c >= board[0].length) return false;
            if (board[r][c] !== '-' && board[r][c] !== word[i]) return false;
        }
        return true;
    }
    
    function place(word, row, col, vertical, placed) {
        for (let i = 0; i < word.length; i++) {
            let r = vertical ? row + i : row;
            let c = vertical ? col : col + i;
            if (board[r][c] === '-') {
                board[r][c] = word[i];
                placed.push([r, c]);
            }
        }
    }
    
    function unplace(placed) {
        for (let [r, c] of placed) {
            board[r][c] = '-';
        }
    }
    
    function backtrack(wordIndex) {
        if (wordIndex === words.length) {
            result = board.map(row => [...row]);
            return true;
        }
        
        let word = words[wordIndex];
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                for (let vertical of [true, false]) {
                    if (canPlace(word, i, j, vertical)) {
                        let placed = [];
                        place(word, i, j, vertical, placed);
                        if (backtrack(wordIndex + 1)) return true;
                        unplace(placed);
                    }
                }
            }
        }
        return false;
    }
    
    backtrack(0);
    return result;
}

// 60. Knight's tour - Find knight path on chessboard
function knightsTour(n) {
    let board = Array(n).fill().map(() => Array(n).fill(-1));
    let moves = [
        [2, 1], [1, 2], [-1, 2], [-2, 1],
        [-2, -1], [-1, -2], [1, -2], [2, -1]
    ];
    
    function isSafe(x, y) {
        return x >= 0 && x < n && y >= 0 && y < n && board[x][y] === -1;
    }
    
    function solve(x, y, moveCount) {
        if (moveCount === n * n) return true;
        
        for (let [dx, dy] of moves) {
            let newX = x + dx, newY = y + dy;
            if (isSafe(newX, newY)) {
                board[newX][newY] = moveCount;
                if (solve(newX, newY, moveCount + 1)) return true;
                board[newX][newY] = -1;
            }
        }
        return false;
    }
    
    board[0][0] = 0;
    if (solve(0, 0, 1)) return board;
    return null;
}

// 61. Expression add operators - Add operators to form target
function addOperators(num, target) {
    let result = [];
    
    function backtrack(index, prev, curr, value, expr) {
        if (index === num.length) {
            if (value === target) result.push(expr);
            return;
        }
        
        for (let i = index; i < num.length; i++) {
            let currStr = num.substring(index, i + 1);
            let currNum = parseInt(currStr);
            if (currStr.length > 1 && currStr[0] === '0') break;
            
            if (index === 0) {
                backtrack(i + 1, currNum, currNum, currNum, currStr);
            } else {
                backtrack(i + 1, currNum, currNum, value + currNum, expr + '+' + currStr);
                backtrack(i + 1, -currNum, -currNum, value - currNum, expr + '-' + currStr);
                backtrack(i + 1, prev * currNum, currNum * curr, value - prev + prev * currNum, expr + '*' + currStr);
            }
        }
    }
    backtrack(0, 0, 0, 0, "");
    return result;
}

// 62. Scramble string - Check if scrambled recursively
function isScramble(s1, s2) {
    if (s1 === s2) return true;
    if (s1.length !== s2.length) return false;
    
    let chars = new Array(26).fill(0);
    for (let i = 0; i < s1.length; i++) {
        chars[s1.charCodeAt(i) - 97]++;
        chars[s2.charCodeAt(i) - 97]--;
    }
    if (!chars.every(c => c === 0)) return false;
    
    for (let i = 1; i < s1.length; i++) {
        if (isScramble(s1.substring(0, i), s2.substring(0, i)) &&
            isScramble(s1.substring(i), s2.substring(i))) return true;
        if (isScramble(s1.substring(0, i), s2.substring(s2.length - i)) &&
            isScramble(s1.substring(i), s2.substring(0, s2.length - i))) return true;
    }
    return false;
}

// 63. Remove invalid parentheses - Remove minimum parentheses recursively
function removeInvalidParentheses(s) {
    let result = [];
    
    function isValid(str) {
        let count = 0;
        for (let char of str) {
            if (char === '(') count++;
            else if (char === ')') count--;
            if (count < 0) return false;
        }
        return count === 0;
    }
    
    function backtrack(str, start, leftCount, rightCount, openCount) {
        if (leftCount === 0 && rightCount === 0) {
            if (isValid(str)) result.push(str);
            return;
        }
        
        for (let i = start; i < str.length; i++) {
            if (i > start && str[i] === str[i - 1]) continue;
            let curr = str[i];
            if (curr === '(' && leftCount > 0) {
                backtrack(str.substring(0, i) + str.substring(i + 1), i, leftCount - 1, rightCount, openCount);
            }
            if (curr === ')' && rightCount > 0) {
                backtrack(str.substring(0, i) + str.substring(i + 1), i, leftCount, rightCount - 1, openCount);
            }
        }
    }
    
    let left = 0, right = 0;
    for (let char of s) {
        if (char === '(') left++;
        else if (char === ')') {
            if (left > 0) left--;
            else right++;
        }
    }
    backtrack(s, 0, left, right, 0);
    return [...new Set(result)];
}

// 64. Strobogrammatic number II - Generate strobogrammatic numbers
function findStrobogrammatic(n) {
    const pairs = [['0', '0'], ['1', '1'], ['6', '9'], ['8', '8'], ['9', '6']];
    
    function build(num, length) {
        if (length === 0) return [num];
        if (length === 1) {
            return ['0', '1', '8'].map(d => num + d);
        }
        let result = [];
        for (let [left, right] of pairs) {
            if (length === n && left === '0') continue;
            let children = build(left + num + right, length - 2);
            result.push(...children);
        }
        return result;
    }
    
    return build("", n);
}

// 65. Number of islands - Count islands in grid (DFS recursion)
function numIslands(grid) {
    if (!grid.length) return 0;
    let count = 0;
    
    function dfs(i, j) {
        if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] === '0') return;
        grid[i][j] = '0';
        dfs(i + 1, j);
        dfs(i - 1, j);
        dfs(i, j + 1);
        dfs(i, j - 1);
    }
    
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === '1') {
                count++;
                dfs(i, j);
            }
        }
    }
    return count;
}

// 66. Surrounded regions - Flip captured regions recursively
function solveSurrounded(board) {
    if (!board.length) return;
    let rows = board.length, cols = board[0].length;
    
    function dfs(i, j) {
        if (i < 0 || i >= rows || j < 0 || j >= cols || board[i][j] !== 'O') return;
        board[i][j] = '#';
        dfs(i + 1, j);
        dfs(i - 1, j);
        dfs(i, j + 1);
        dfs(i, j - 1);
    }
    
    for (let i = 0; i < rows; i++) {
        dfs(i, 0);
        dfs(i, cols - 1);
    }
    for (let j = 0; j < cols; j++) {
        dfs(0, j);
        dfs(rows - 1, j);
    }
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (board[i][j] === 'O') board[i][j] = 'X';
            if (board[i][j] === '#') board[i][j] = 'O';
        }
    }
    return board;
}

// 67. Pacific Atlantic water flow - DFS recursion on matrix
function pacificAtlantic(heights) {
    if (!heights.length) return [];
    let rows = heights.length, cols = heights[0].length;
    let pacific = Array(rows).fill().map(() => Array(cols).fill(false));
    let atlantic = Array(rows).fill().map(() => Array(cols).fill(false));
    
    function dfs(i, j, visited, prevHeight) {
        if (i < 0 || i >= rows || j < 0 || j >= cols || visited[i][j] || heights[i][j] < prevHeight) return;
        visited[i][j] = true;
        dfs(i + 1, j, visited, heights[i][j]);
        dfs(i - 1, j, visited, heights[i][j]);
        dfs(i, j + 1, visited, heights[i][j]);
        dfs(i, j - 1, visited, heights[i][j]);
    }
    
    for (let i = 0; i < rows; i++) {
        dfs(i, 0, pacific, -Infinity);
        dfs(i, cols - 1, atlantic, -Infinity);
    }
    for (let j = 0; j < cols; j++) {
        dfs(0, j, pacific, -Infinity);
        dfs(rows - 1, j, atlantic, -Infinity);
    }
    
    let result = [];
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (pacific[i][j] && atlantic[i][j]) result.push([i, j]);
        }
    }
    return result;
}

// 68. Longest increasing path in matrix - DFS with memoization
function longestIncreasingPath(matrix) {
    if (!matrix.length) return 0;
    let rows = matrix.length, cols = matrix[0].length;
    let memo = Array(rows).fill().map(() => Array(cols).fill(0));
    let dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    
    function dfs(i, j) {
        if (memo[i][j] !== 0) return memo[i][j];
        let maxLen = 1;
        for (let [dx, dy] of dirs) {
            let newI = i + dx, newJ = j + dy;
            if (newI >= 0 && newI < rows && newJ >= 0 && newJ < cols && matrix[newI][newJ] > matrix[i][j]) {
                maxLen = Math.max(maxLen, 1 + dfs(newI, newJ));
            }
        }
        memo[i][j] = maxLen;
        return maxLen;
    }
    
    let longest = 0;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            longest = Math.max(longest, dfs(i, j));
        }
    }
    return longest;
}

// 69. Maximum sum increasing subsequence - Recursive approach
function maxSumIncreasingSubsequence(nums, index = 0, prev = -Infinity, memo = new Map()) {
    let key = `${index},${prev}`;
    if (memo.has(key)) return memo.get(key);
    if (index === nums.length) return 0;
    
    let include = 0;
    if (nums[index] > prev) {
        include = nums[index] + maxSumIncreasingSubsequence(nums, index + 1, nums[index], memo);
    }
    let exclude = maxSumIncreasingSubsequence(nums, index + 1, prev, memo);
    let result = Math.max(include, exclude);
    memo.set(key, result);
    return result;
}

// 70. Minimum falling path sum - Recursive with memoization
function minFallingPathSum(matrix) {
    let n = matrix.length;
    let memo = Array(n).fill().map(() => Array(n).fill(Infinity));
    
    function dfs(i, j) {
        if (i === n) return 0;
        if (j < 0 || j >= n) return Infinity;
        if (memo[i][j] !== Infinity) return memo[i][j];
        
        let result = matrix[i][j] + Math.min(
            dfs(i + 1, j - 1),
            dfs(i + 1, j),
            dfs(i + 1, j + 1)
        );
        memo[i][j] = result;
        return result;
    }
    
    let minSum = Infinity;
    for (let j = 0; j < n; j++) {
        minSum = Math.min(minSum, dfs(0, j));
    }
    return minSum;
}

// ==================== EXPORT ====================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        // Easy (1-20)
        factorial, fibonacci, sumNatural, power, productArray, countDigits, sumOfDigits,
        reverseString, isPalindrome, decimalToBinary, linearSearch, findMax, findMin,
        arraySum, arrayAverage, countOccurrences, isSorted, replaceAll,
        removeDuplicatesSorted, rotateLeft,
        
        // Medium (21-50)
        binarySearch, mergeSort, quickSort, maxSubarraySum, majorityElement,
        findPeakElement, searchRotated, findKthLargest, findMedianSortedArrays,
        exponentialSearch, generateSubsequences, permuteString, towerOfHanoi,
        letterCombinations, wordBreak, generateParentheses, isMatchWildcard,
        isMatchRegex, longestCommonSubsequence, editDistance, fastPower,
        climbStairs, uniquePaths, tribonacci, josephus, catalanNumber,
        numDecodings, integerPartitions, generateBinaryStrings,
        
        // Hard (51-70)
        solveNQueens, solveSudoku, ratInMaze, existWord, combinationSum,
        subsetsWithDup, partitionPalindromes, restoreIpAddresses,
        solveCrossword, knightsTour, addOperators, isScramble,
        removeInvalidParentheses, findStrobogrammatic, numIslands,
        solveSurrounded, pacificAtlantic, longestIncreasingPath,
        maxSumIncreasingSubsequence, minFallingPathSum
    };
}