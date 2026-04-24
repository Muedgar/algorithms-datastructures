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