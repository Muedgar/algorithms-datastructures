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