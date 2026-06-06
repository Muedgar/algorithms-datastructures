// ARRAYS = 60.
//1. Rotate an array by k steps in-place
function rotate(nums, k) {
    const n = nums.length;
    if (n === 0) return nums;

    k = k % n;

    reverse(nums, 0, n - 1);
    reverse(nums, 0, k - 1);
    reverse(nums, k, n - 1);

    return nums
}

function reverse(nums, left, right) {
    while (left < right) {
        [nums[left], nums[right]] = [nums[right], nums[left]];
        left++;
        right--;
    }
}

//2. Rotate array using cyclic replacements
function rotateCyclic(nums, k) {
    const n = nums.length;
    if (n === 0) return nums;

    k = k % n;
    let count = 0;

    for (let start = 0; count < n; start++) {
        let current = start;
        let prev = nums[start];

        do {
            const next = (current + k) % n;
            const temp = nums[next];

            nums[next] = prev;

            prev = temp;
            current = next;
            count++;
        } while (start !== current)
    }

    return nums;
}

// 3. Find minimum in a rotated sorted array
function findMin(nums) {
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);

        if (nums[mid] > nums[right]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }

    return nums[left];
}

// 4. Search in rotated sorted array
function search(nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (nums[mid] === target) return mid;

        // Left side is sorted
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }

        // Right side is sorted
        else {
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }

    return -1;
}

// 5. Search in rotated sorted array with duplicates
function searchWithDuplicates(nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (nums[mid] === target) return true;

        // Cannot determine sorted side
        if (nums[left] === nums[mid] && nums[mid] === nums[right]) {
            left++;
            right--;
        }

        // Left side is sorted
        else if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }

        // Right side is sorted
        else {
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }

    return false;
}

// 6. Number of rotations in a rotated sorted array
function countRotations(nums) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);

        if (nums[mid] > nums[right]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }

    return left;
}

// 7. Find pivot index in rotated sorted array
function findPivotMaxIndex(nums) {
    const minIndex = countRotations(nums);
    return (minIndex - 1 + nums.length) % nums.length;
}

// 8. Maximum element in rotated sorted array
function findMax(nums) {
    const n = nums.length;
    const minIndex = countRotations(nums);
    const maxIndex = (minIndex - 1 + n) % n;

    return nums[maxIndex];
}

// 9. Check if an array is sorted and rotated
function checkSortedAndRotated(nums) {
    const n = nums.length;
    let drops = 0;

    for (let i = 0; i < n; i++) {
        const next = (i + 1) % n;

        if (nums[i] > nums[next]) {
            drops++;
        }
    }

    return drops <= 1;
}

// 10. Maximum Subarray Sum
function maxSubArray(nums) {
    let currentSum = nums[0];
    let maxSum = nums[0];

    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }

    return maxSum;
}

// 11. Maximum Product Subarray
function maxProduct(nums) {
    let maxHere = nums[0];
    let minHere = nums[0];
    let result = nums[0];

    for (let i = 1; i < nums.length; i++) {
        const num = nums[i];

        if (num < 0) {
            [maxHere, minHere] = [minHere, maxHere];
        }

        maxHere = Math.max(num, maxHere * num);
        minHere = Math.min(num, minHere * num);

        result = Math.max(result, maxHere);
    }

    return result;
}

// 12. Shortest Subarray With Sum ≥ K
function shortestSubarray(nums, k) {
    const n = nums.length;
    const prefix = new Array(n + 1).fill(0);

    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + nums[i];
    }

    const deque = [];
    let answer = Infinity;

    for (let i = 0; i <= n; i++) {
        while (deque.length > 0 && prefix[i] - prefix[deque[0]] >= k) {
            answer = Math.min(answer, i - deque.shift())
        }

        while (deque.length > 0 && prefix[i] <= prefix[deque[deque.length - 1]]) {
            deque.pop();
        }

        deque.push(i);
    }

    return answer === Infinity ? -1 : answer;
}

// 13. Count Subarrays With Sum = K
function subarraySum(nums, k) {
    const map = new Map();
    map.set(0, 1);

    let prefixSum = 0;
    let count = 0;

    for (const num of nums) {
        prefixSum += num;

        const needed = prefixSum - k;

        if (map.has(needed)) {
            count += map.get(needed);
        }

        map.set(prefixSum, (map.get(prefixSum) || 0) + 1);
    }

    return count;
}

// 14. Maximum Sum of Subarray of Size K
function maxSumSizeK(nums, k) {
    let windowSum = 0;
    let maxSum = -Infinity;

    for (let i = 0; i < nums.length; i++) {
        windowSum += nums[i];

        if (i >= k - 1) {
            maxSum = Math.max(maxSum, windowSum);
            windowSum -= nums[i - k + 1];
        }
    }

    return maxSum;
}

// 15. Longest Subarray With At Most K Distinct Numbers
function longestSubarrayAtMostKDistinct(nums, k) {
    const freq = new Map();

    let left = 0;
    let maxLength = 0;

    for (let right = 0; right < nums.length; right++) {
        freq.set(nums[right], (freq.get(nums[right]) || 0) + 1);

        while (freq.size > k) {
            freq.set(nums[left], freq.get(nums[left]) - 1);

            if (freq.get(nums[left]) === 0) {
                freq.delete(nums[left]);
            }

            left++;
        }

        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}

// 16. Minimum Size Subarray Sum
function minSubArrayLen(target, nums) {
    let left = 0;
    let sum = 0;
    let minLength = Infinity;

    for (let right = 0; right < nums.length; right++) {
        sum += nums[right];

        while (sum >= target) {
            minLength = Math.min(minLength, right - left + 1);
            sum -= nums[left];
            left++;
        }
    }

    return minLength === Infinity ? 0 : minLength;
}

// 17. Subarray Sum Divisible by K
function subarraysDivByK(nums, k) {
    const map = new Map();
    map.set(0, 1);

    let prefixSum = 0;
    let count = 0;

    for (const num of nums) {
        prefixSum += num;

        let remainder = prefixSum % k;

        if (remainder < 0) {
            remainder += k;
        }

        if (map.has(remainder)) {
            count += map.get(remainder);
        }

        map.set(remainder, (map.get(remainder) || 0) + 1);
    }

    return count;
}

// 18. Find All Subarrays With XOR = K
function countSubarraysXorK(nums, k) {
    const map = new Map();
    map.set(0, 1);

    let prefixXor = 0;
    let count = 0;

    for (const num of nums) {
        prefixXor ^= num;

        const needed = prefixXor ^ k;

        if (map.has(needed)) {
            count += map.get(needed);
        }

        map.set(prefixXor, (map.get(prefixXor) || 0) + 1);
    }

    return count;
}

// 19. Circular Subarray Maximum Sum
function maxSubarraySumCircular(nums) {
    let totalSum = 0;
    let currentMax = nums[0];
    let maxSum = nums[0];
    let currentMin = nums[0];
    let minSum = nums[0];

    totalSum = nums[0];

    for (let i = 1; i < nums.length; i++) {
        const num = nums[i];
        
        currentMax = Math.max(num, currentMax + num);
        maxSum = Math.max(maxSum, currentMax);

        currentMin = Math.min(num, currentMin + num);
        minSum = Math.min(minSum, currentMin);

        totalSum += num;
    }

    if (maxSum < 0) {
        return maxSum;
    }

    return Math.max(maxSum, totalSum - minSum);
}

// 20. Sort Colors
function sortColors(nums) {
    let low = 0;
    let mid = 0;
    let high = nums.length - 1;

    while (mid <= high) {
        if (nums[mid] === 0) {
            [nums[low], nums[mid]] = [nums[mid], nums[low]];
            low++;
            mid++;
        } else if (nums[mid] === 1) {
            mid++;
        } else {
            [nums[mid], nums[high]] = [nums[high], nums[mid]];
            high--;
        }
    }

    return nums;
}

// 21. Move Zeros to End
function moveZeroesStable(nums) {
    let insertPos = 0;

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            nums[insertPos] = nums[i];
            insertPos++;
        }
    }

    while (insertPos < nums.length) {
        nums[insertPos] = 0;
        insertPos++;
    }

    return nums;
}

function moveZeroesUnstable(nums) {
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        if (nums[left] !== 0) {
            left++;
        } else {
            [nums[left], nums[right]] = [nums[right], nums[left]];
            right--;
        }
    }

    return nums;
}

// 22. Merge Two Sorted Arrays In-Place
function merge(nums1, m, nums2, n) {
    let i = m - 1;
    let j = n - 1;
    let write = m + n - 1;

    while (j >= 0) {
        if (i >= 0 && nums1[i] > nums2[j]) {
            nums1[write] = nums1[i];
            i--;
        } else {
            nums1[write] = nums2[j];
            j--;
        }

        write--;
    }

    return nums1;
}

// 23. Trapping Rain Water
function trap(height) {
    let left = 0;
    let right = height.length - 1;

    let leftMax = 0;
    let rightMax = 0;

    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                water += leftMax - height[left];
            }

            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                water += rightMax - height[right];
            }

            right--;
        }
    }

    return water;
}

function trapStack(height) {
    const stack = [];
    let water = 0;

    for (let i = 0; i < height.length; i++) {
        while (
            stack.length > 0 &&
            height[i] > height[stack[stack.length - 1]]
        ) {
            const bottom = stack.pop();

            if (stack.length === 0) break;

            const leftWall = stack[stack.length - 1];
            const width = i - leftwall - 1;
            const boundedHeight = Math.min(height[i], height[leftWall] - height[bottom]);

            water += width * boundedHeight;
        }

        stack.push(i);
    }

    return water;
}

// 24. Container With Most Water
function maxArea(height) {
    let left = 0;
    let right = height.length - 1;
    let best = 0;

    while (left < right) {
        const width = right - left;
        const h = Math.min(height[left], height[right]);

        best = Math.max(best, width * h);

        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return best;
}

// 25. 3Sum
function threeSum(nums) {
    nums.sort((a, b) => a - b);

    const result = [];

    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        let left = i + 1;
        let right = nums.length - 1;

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];

            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);

                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right --;

                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }

    return result;
}

// 26. 4Sum
function fourSum(nums, target) {
    nums.sort((a, b) => a - b);

    const result = [];
    const n = nums.length;

    for (let i = 0; i < n - 3; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        // Pruning
        const min1 = nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3];
        if(min1 > target) break;

        const max1 = nums[i] + nums[n - 1] + nums[n - 2] + nums[n - 3];
        if(max1 < target) continue;

        for (let j = i + 1; j < n - 2; j++) {
            if (j > i + 1 && nums[j] === nums[j - 1]) continue;

            const min2 = nums[i] + nums[j] + nums[j + 1] + nums[j + 2];
            if(min2 > target) break;

            const max2 = nums[i] + nums[j] + nums[n - 1] + nums[n - 2];
            if (max2 < target) continue;

            let left = j + 1;
            let right = n - 1;

            while (left < right) {
                const sum = nums[i] + nums[j] + nums[left] + nums[right];

                if (sum === target) {
                    result.push([nums[i], nums[j], nums[left], nums[right]]);

                    while (left < right && nums[left] === nums[left + 1]) left++;
                    while (left < right && nums[right] === nums[right - 1]) right--;

                    left++;
                    right--;
                } else if (sum < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }
    }

    return result;
}

// 27. Minimum Swaps Required to Group All 1s Together
function minSwapsGroupOnes(nums) {
    const ones = nums.reduce((sum, num) => sum + num, 0);

    if (ones <= 1) return 0;

    let currentOnes = 0;
    let maxOnesInWindow = 0;

    for (let i = 0; i < nums.length; i++) {
        currentOnes += nums[i];

        if (i >= ones) {
            currentOnes -= nums[i - ones];
        }

        maxOnesInWindow = Math.max(maxOnesInWindow, currentOnes);
    }

    return ones - maxOnesInWindow;
}

// 28. Median of Two Sorted Arrays
function findMedianSortedArrays(nums1, nums2) {
    if (nums1.length > nums2.length) {
        return findMedianSortedArrays(nums2, nums1);
    }

    const m = nums1.length;
    const n = nums2.length;

    let left = 0;
    let right = m;

    while (left <= right) {
        const partitionA = Math.floor((left + right) / 2);
        const partitionB = Math.floor((m + n + 1) / 2) - partitionA;

        const maxLeftA = partitionA === 0 ? -Infinity : nums1[partitionA - 1];

        const minRightA = partitionA === m ? Infinity : nums1[partitionA];

        const maxLeftB = partitionB === 0 ? -Infinity : nums2[partitionB - 1];

        const minRightB = partitionB === n ? Infinity : nums2[partitionB];

        if (maxLeftA <= minRightB && maxLeftB <= minRightA) {
            if ((m + n) % 2 === 1) {
                return Math.max(maxLeftA, maxLeftB);
            }

            return (
                Math.max(maxLeftA, maxLeftB) + 
                Math.min(minRightA, minRightB)
            ) / 2;
        }

        if (maxLeftA > minRightB) {
            right = partitionA - 1;
        } else {
            left = partitionA + 1;
        }
    }

    throw new Error("Input arrays are not sorted.")
}

// 29. Count Inversions in an Array
function countInversions(nums) {
    const arr = [...nums];

    function mergeSort(left, right) {
        if (left >= right) return 0;

        const mid = Math.floor((left + right) / 2);

        let count = 0;
        count += mergeSort(left, mid);
        count += mergeSort(mid + 1, right);
        count += mergeSort(left, mid, right);

        return count;
    }

    function merge(left, mid, right) {
        const temp = [];
        let i = left;
        let j = mid + 1;
        let count = 0;

        while (i <= mid && j <= right) {
            if (arr[i] <= arr[j]) {
                temp.push(arr[i]);
                i++;
            } else {
                temp.push(arr[j]);

                count += mid - i + 1;
                
                j++;
            }
        }

        while (i <= mid) {
            temp.push(arr[i]);
            i++;
        }

        while (j <= right) {
            temp.push(arr[j]);
            j++;
        }

        for (let k = 0; k < temp.length; k++) {
            arr[left + k] = temp[k];
        }

        return count;
    }

    return mergeSort(0, arr.length - 1);
}

// 30. Rotate N×N Matrix 90° Clockwise In-Place
function rotateClockwise(matrix) {
    const n = matrix.length;

    // transpose
    for (let r = 0; r < n; r++) {
        for (let c = r + 1; c < n; c++) {
            [matrix[r][c], matrix[c][r]] = [matrix[c][r], matrix[r][c]];
        }
    }

    // reverse each row
    for (let r = 0; r < n; r++) {
        matrix[r].reverse();
    }

    return matrix;
}

// 31. Rotate N×N Matrix 90° Anti-Clockwise In-Place
function rotateAntiClockwise(matrix) {
    const n = matrix.length;

    // transpose
    for (let r = 0; r < n; r++) {
        for (let c = r + 1; c < n; c++) {
            [matrix[r][c], matrix[c][r]] = [matrix[c][r], matrix[r][c]];
        }
    }

    // reverse each column
    for (let c = 0; c < n; c++) {
        let top = 0;
        let bottom = n - 1;

        while (top < bottom) {
            [matrix[top][c], matrix[bottom][c]] = [matrix[bottom][c], matrix[top][c]];

            top++;
            bottom--;
        }
    }

    return matrix;
}





// 1. Rotate NxN matrix 90° clockwise in-place
function rotate90Clockwise(matrix) {
  const n = matrix.length;

  // transpose
  for (let r = 0; r < n; r++) {
    for (let c = r + 1; c < n; c++) {
      [matrix[r][c], matrix[c][r]] = [matrix[c][r], matrix[r][c]];
    }
  }

  // reverse each row
  for (let r = 0; r < n; r++) {
    matrix[r].reverse();
  }

  return matrix;
}


// 2. Rotate NxN matrix 90° anti-clockwise in-place
function rotate90AntiClockwise(matrix) {
  const n = matrix.length;

  // transpose
  for (let r = 0; r < n; r++) {
    for (let c = r + 1; c < n; c++) {
      [matrix[r][c], matrix[c][r]] = [matrix[c][r], matrix[r][c]];
    }
  }

  // reverse rows top-to-bottom
  matrix.reverse();

  return matrix;
}


// 3. Rotate matrix 180°
function rotate180(matrix) {
  matrix.reverse();

  for (const row of matrix) {
    row.reverse();
  }

  return matrix;
}


// 4. Rotate matrix rings/layers by k steps
function rotateMatrixRings(matrix, k) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const layers = Math.floor(Math.min(rows, cols) / 2);

  for (let layer = 0; layer < layers; layer++) {
    const values = [];

    const top = layer;
    const bottom = rows - 1 - layer;
    const left = layer;
    const right = cols - 1 - layer;

    for (let c = left; c <= right; c++) values.push(matrix[top][c]);
    for (let r = top + 1; r <= bottom; r++) values.push(matrix[r][right]);
    for (let c = right - 1; c >= left; c--) values.push(matrix[bottom][c]);
    for (let r = bottom - 1; r > top; r--) values.push(matrix[r][left]);

    const len = values.length;
    const shift = k % len;
    const rotated = values.slice(len - shift).concat(values.slice(0, len - shift));

    let i = 0;

    for (let c = left; c <= right; c++) matrix[top][c] = rotated[i++];
    for (let r = top + 1; r <= bottom; r++) matrix[r][right] = rotated[i++];
    for (let c = right - 1; c >= left; c--) matrix[bottom][c] = rotated[i++];
    for (let r = bottom - 1; r > top; r--) matrix[r][left] = rotated[i++];
  }

  return matrix;
}


// 5. Transpose square matrix in-place
function transposeInPlace(matrix) {
  const n = matrix.length;

  for (let r = 0; r < n; r++) {
    for (let c = r + 1; c < n; c++) {
      [matrix[r][c], matrix[c][r]] = [matrix[c][r], matrix[r][c]];
    }
  }

  return matrix;
}


// 6. Flip matrix horizontally / vertically
function flipHorizontally(matrix) {
  for (const row of matrix) {
    row.reverse();
  }

  return matrix;
}

function flipVertically(matrix) {
  matrix.reverse();
  return matrix;
}


// 7. Set matrix zeroes
function setZeroes(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  const zeroRows = new Set();
  const zeroCols = new Set();

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (matrix[r][c] === 0) {
        zeroRows.add(r);
        zeroCols.add(c);
      }
    }
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (zeroRows.has(r) || zeroCols.has(c)) {
        matrix[r][c] = 0;
      }
    }
  }

  return matrix;
}


// 8. Game of Life in-place
function gameOfLife(board) {
  const rows = board.length;
  const cols = board[0].length;

  const dirs = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1],
  ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let live = 0;

      for (const [dr, dc] of dirs) {
        const nr = r + dr;
        const nc = c + dc;

        if (
          nr >= 0 &&
          nr < rows &&
          nc >= 0 &&
          nc < cols &&
          Math.abs(board[nr][nc]) === 1
        ) {
          live++;
        }
      }

      if (board[r][c] === 1 && (live < 2 || live > 3)) {
        board[r][c] = -1; // alive -> dead
      }

      if (board[r][c] === 0 && live === 3) {
        board[r][c] = 2; // dead -> alive
      }
    }
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      board[r][c] = board[r][c] > 0 ? 1 : 0;
    }
  }

  return board;
}


// 9. Spiral order traversal
function spiralOrder(matrix) {
  const result = [];

  let top = 0;
  let bottom = matrix.length - 1;
  let left = 0;
  let right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) result.push(matrix[top][c]);
    top++;

    for (let r = top; r <= bottom; r++) result.push(matrix[r][right]);
    right--;

    if (top <= bottom) {
      for (let c = right; c >= left; c--) result.push(matrix[bottom][c]);
      bottom--;
    }

    if (left <= right) {
      for (let r = bottom; r >= top; r--) result.push(matrix[r][left]);
      left++;
    }
  }

  return result;
}


// 10. Generate spiral matrix
function generateSpiralMatrix(n) {
  const matrix = Array.from({ length: n }, () => Array(n).fill(0));

  let top = 0;
  let bottom = n - 1;
  let left = 0;
  let right = n - 1;
  let num = 1;

  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) matrix[top][c] = num++;
    top++;

    for (let r = top; r <= bottom; r++) matrix[r][right] = num++;
    right--;

    for (let c = right; c >= left; c--) matrix[bottom][c] = num++;
    bottom--;

    for (let r = bottom; r >= top; r--) matrix[r][left] = num++;
    left++;
  }

  return matrix;
}


// 11. Diagonal traversal zigzag
function diagonalTraversal(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = [];

  for (let sum = 0; sum < rows + cols - 1; sum++) {
    const diagonal = [];

    for (let r = 0; r < rows; r++) {
      const c = sum - r;

      if (c >= 0 && c < cols) {
        diagonal.push(matrix[r][c]);
      }
    }

    if (sum % 2 === 0) diagonal.reverse();

    result.push(...diagonal);
  }

  return result;
}


// 12. Print matrix in wave form
function waveTraversal(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = [];

  for (let c = 0; c < cols; c++) {
    if (c % 2 === 0) {
      for (let r = 0; r < rows; r++) result.push(matrix[r][c]);
    } else {
      for (let r = rows - 1; r >= 0; r--) result.push(matrix[r][c]);
    }
  }

  return result;
}


// 13. Boundary traversal
function boundaryTraversal(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = [];

  if (rows === 1) return matrix[0];
  if (cols === 1) return matrix.map(row => row[0]);

  for (let c = 0; c < cols; c++) result.push(matrix[0][c]);
  for (let r = 1; r < rows; r++) result.push(matrix[r][cols - 1]);
  for (let c = cols - 2; c >= 0; c--) result.push(matrix[rows - 1][c]);
  for (let r = rows - 2; r > 0; r--) result.push(matrix[r][0]);

  return result;
}


// 14. Rotate then print spiral
function rotateAndPrintSpiral(matrix) {
  rotate90Clockwise(matrix);
  return spiralOrder(matrix);
}


// 15. Find all elements in sorted matrix in increasing order
function sortedMatrixElements(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  const pointers = Array(rows).fill(0);
  const result = [];

  while (result.length < rows * cols) {
    let minValue = Infinity;
    let minRow = -1;

    for (let r = 0; r < rows; r++) {
      const c = pointers[r];

      if (c < cols && matrix[r][c] < minValue) {
        minValue = matrix[r][c];
        minRow = r;
      }
    }

    result.push(minValue);
    pointers[minRow]++;
  }

  return result;
}


// 16. Search in row-wise and column-wise sorted matrix
function searchSortedRowsCols(matrix, target) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  let r = 0;
  let c = cols - 1;

  while (r < rows && c >= 0) {
    if (matrix[r][c] === target) return true;

    if (matrix[r][c] > target) {
      c--;
    } else {
      r++;
    }
  }

  return false;
}


// 17. Search in fully sorted matrix
function searchFullySortedMatrix(matrix, target) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  let left = 0;
  let right = rows * cols - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    const r = Math.floor(mid / cols);
    const c = mid % cols;

    if (matrix[r][c] === target) return true;

    if (matrix[r][c] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return false;
}


// 18. Find row with maximum number of 1s
function rowWithMaxOnes(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  let bestRow = -1;
  let maxOnes = 0;

  function firstOne(row) {
    let left = 0;
    let right = cols - 1;
    let answer = cols;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (row[mid] === 1) {
        answer = mid;
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    return answer;
  }

  for (let r = 0; r < rows; r++) {
    const index = firstOne(matrix[r]);
    const ones = cols - index;

    if (ones > maxOnes) {
      maxOnes = ones;
      bestRow = r;
    }
  }

  return bestRow;
}


// 19. Find kth smallest element in sorted matrix
function kthSmallest(matrix, k) {
  const n = matrix.length;

  let low = matrix[0][0];
  let high = matrix[n - 1][n - 1];

  function countLessOrEqual(value) {
    let count = 0;
    let r = n - 1;
    let c = 0;

    while (r >= 0 && c < n) {
      if (matrix[r][c] <= value) {
        count += r + 1;
        c++;
      } else {
        r--;
      }
    }

    return count;
  }

  while (low < high) {
    const mid = Math.floor((low + high) / 2);

    if (countLessOrEqual(mid) < k) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return low;
}


// 20. Find median in row-wise sorted matrix
function matrixMedian(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  let low = Infinity;
  let high = -Infinity;

  for (let r = 0; r < rows; r++) {
    low = Math.min(low, matrix[r][0]);
    high = Math.max(high, matrix[r][cols - 1]);
  }

  const desired = Math.floor((rows * cols + 1) / 2);

  function countLessOrEqual(row, value) {
    let left = 0;
    let right = row.length;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      if (row[mid] <= value) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    return left;
  }

  while (low < high) {
    const mid = Math.floor((low + high) / 2);

    let count = 0;

    for (const row of matrix) {
      count += countLessOrEqual(row, mid);
    }

    if (count < desired) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return low;
}


// 21. 2D prefix sum construction
function buildPrefixSum(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  const prefix = Array.from({ length: rows + 1 }, () => Array(cols + 1).fill(0));

  for (let r = 1; r <= rows; r++) {
    for (let c = 1; c <= cols; c++) {
      prefix[r][c] =
        matrix[r - 1][c - 1] +
        prefix[r - 1][c] +
        prefix[r][c - 1] -
        prefix[r - 1][c - 1];
    }
  }

  return prefix;
}


// 22. Range sum query in 2D matrix
function rangeSum2D(prefix, r1, c1, r2, c2) {
  return (
    prefix[r2 + 1][c2 + 1] -
    prefix[r1][c2 + 1] -
    prefix[r2 + 1][c1] +
    prefix[r1][c1]
  );
}


// 23. Maximum sum submatrix
function maxSumSubmatrix(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  let maxSum = -Infinity;

  for (let top = 0; top < rows; top++) {
    const temp = Array(cols).fill(0);

    for (let bottom = top; bottom < rows; bottom++) {
      for (let c = 0; c < cols; c++) {
        temp[c] += matrix[bottom][c];
      }

      let current = temp[0];
      let best = temp[0];

      for (let i = 1; i < cols; i++) {
        current = Math.max(temp[i], current + temp[i]);
        best = Math.max(best, current);
      }

      maxSum = Math.max(maxSum, best);
    }
  }

  return maxSum;
}


// 24. Count submatrices with sum = target
function countSubmatricesWithTarget(matrix, target) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  let count = 0;

  for (let top = 0; top < rows; top++) {
    const colSums = Array(cols).fill(0);

    for (let bottom = top; bottom < rows; bottom++) {
      for (let c = 0; c < cols; c++) {
        colSums[c] += matrix[bottom][c];
      }

      const map = new Map();
      map.set(0, 1);

      let prefix = 0;

      for (const num of colSums) {
        prefix += num;

        if (map.has(prefix - target)) {
          count += map.get(prefix - target);
        }

        map.set(prefix, (map.get(prefix) || 0) + 1);
      }
    }
  }

  return count;
}


// 25. Count submatrices with all ones
function countAllOnesSubmatrices(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  const heights = Array(cols).fill(0);
  let total = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      heights[c] = matrix[r][c] === 1 ? heights[c] + 1 : 0;
    }

    for (let c = 0; c < cols; c++) {
      let minHeight = Infinity;

      for (let k = c; k >= 0; k--) {
        minHeight = Math.min(minHeight, heights[k]);

        if (minHeight === 0) break;

        total += minHeight;
      }
    }
  }

  return total;
}


// 26. Largest square submatrix of 1s
function largestSquareOfOnes(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  const dp = Array.from({ length: rows }, () => Array(cols).fill(0));
  let maxSide = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (matrix[r][c] === 1) {
        if (r === 0 || c === 0) {
          dp[r][c] = 1;
        } else {
          dp[r][c] =
            1 + Math.min(
              dp[r - 1][c],
              dp[r][c - 1],
              dp[r - 1][c - 1]
            );
        }

        maxSide = Math.max(maxSide, dp[r][c]);
      }
    }
  }

  return maxSide * maxSide;
}


// 27. Largest rectangle of 1s
function largestRectangleOfOnes(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  const heights = Array(cols).fill(0);
  let maxArea = 0;

  function largestRectangleInHistogram(heights) {
    const stack = [];
    let best = 0;

    for (let i = 0; i <= heights.length; i++) {
      const currentHeight = i === heights.length ? 0 : heights[i];

      while (
        stack.length > 0 &&
        currentHeight < heights[stack[stack.length - 1]]
      ) {
        const height = heights[stack.pop()];
        const width =
          stack.length === 0 ? i : i - stack[stack.length - 1] - 1;

        best = Math.max(best, height * width);
      }

      stack.push(i);
    }

    return best;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      heights[c] = matrix[r][c] === 1 ? heights[c] + 1 : 0;
    }

    maxArea = Math.max(maxArea, largestRectangleInHistogram(heights));
  }

  return maxArea;
}


// 28. Number of islands
function numIslands(grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  let islands = 0;

  function dfs(r, c) {
    if (
      r < 0 ||
      r >= rows ||
      c < 0 ||
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
        islands++;
        dfs(r, c);
      }
    }
  }

  return islands;
}


// 29. Flood fill
function floodFill(image, sr, sc, newColor) {
  const rows = image.length;
  const cols = image[0].length;

  const oldColor = image[sr][sc];

  if (oldColor === newColor) return image;

  function dfs(r, c) {
    if (
      r < 0 ||
      r >= rows ||
      c < 0 ||
      c >= cols ||
      image[r][c] !== oldColor
    ) {
      return;
    }

    image[r][c] = newColor;

    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  dfs(sr, sc);

  return image;
}


// 30. Shortest path in binary matrix
function shortestPathBinaryMatrix(grid) {
  const n = grid.length;

  if (grid[0][0] !== 0 || grid[n - 1][n - 1] !== 0) {
    return -1;
  }

  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1],
  ];

  const queue = [[0, 0, 1]];
  grid[0][0] = 1;

  let index = 0;

  while (index < queue.length) {
    const [r, c, distance] = queue[index++];

    if (r === n - 1 && c === n - 1) {
      return distance;
    }

    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;

      if (
        nr >= 0 &&
        nr < n &&
        nc >= 0 &&
        nc < n &&
        grid[nr][nc] === 0
      ) {
        grid[nr][nc] = 1;
        queue.push([nr, nc, distance + 1]);
      }
    }
  }

  return -1;
}