// ==================== GREEDY BASICS → INTERMEDIATE FOUNDATIONS (1-15) ====================

// 1. Activity selection problem
function activitySelection(activities) {
    // activities: [[start, end], ...]
    if (!activities.length) return [];
    activities.sort((a, b) => a[1] - b[1]);
    let result = [activities[0]];
    let lastEnd = activities[0][1];
    
    for (let i = 1; i < activities.length; i++) {
        if (activities[i][0] >= lastEnd) {
            result.push(activities[i]);
            lastEnd = activities[i][1];
        }
    }
    return result;
}

// 2. Fractional knapsack
function fractionalKnapsack(items, capacity) {
    // items: [[value, weight], ...]
    items.sort((a, b) => (b[0] / b[1]) - (a[0] / a[1]));
    let totalValue = 0;
    let remainingCapacity = capacity;
    
    for (let [value, weight] of items) {
        if (weight <= remainingCapacity) {
            totalValue += value;
            remainingCapacity -= weight;
        } else {
            totalValue += (value / weight) * remainingCapacity;
            break;
        }
    }
    return totalValue;
}

// 3. Assign cookies
function findContentChildren(greed, cookieSize) {
    greed.sort((a, b) => a - b);
    cookieSize.sort((a, b) => a - b);
    let child = 0, cookie = 0;
    
    while (child < greed.length && cookie < cookieSize.length) {
        if (cookieSize[cookie] >= greed[child]) {
            child++;
        }
        cookie++;
    }
    return child;
}

// 4. Minimum number of coins
function minCoins(coins, amount) {
    coins.sort((a, b) => b - a);
    let count = 0;
    let remaining = amount;
    
    for (let coin of coins) {
        if (remaining >= coin) {
            let numCoins = Math.floor(remaining / coin);
            count += numCoins;
            remaining -= numCoins * coin;
        }
    }
    return remaining === 0 ? count : -1;
}

// 5. Lemonade change
function lemonadeChange(bills) {
    let five = 0, ten = 0;
    for (let bill of bills) {
        if (bill === 5) five++;
        else if (bill === 10) {
            if (five === 0) return false;
            five--;
            ten++;
        } else {
            if (ten > 0 && five > 0) {
                ten--;
                five--;
            } else if (five >= 3) {
                five -= 3;
            } else {
                return false;
            }
        }
    }
    return true;
}

// 6. Maximum units on a truck
function maximumUnits(boxTypes, truckSize) {
    boxTypes.sort((a, b) => b[1] - a[1]);
    let totalUnits = 0;
    let remaining = truckSize;
    
    for (let [count, units] of boxTypes) {
        let take = Math.min(count, remaining);
        totalUnits += take * units;
        remaining -= take;
        if (remaining === 0) break;
    }
    return totalUnits;
}

// 7. Can place flowers
function canPlaceFlowers(flowerbed, n) {
    let count = 0;
    for (let i = 0; i < flowerbed.length; i++) {
        if (flowerbed[i] === 0 && 
            (i === 0 || flowerbed[i - 1] === 0) && 
            (i === flowerbed.length - 1 || flowerbed[i + 1] === 0)) {
            flowerbed[i] = 1;
            count++;
        }
    }
    return count >= n;
}

// 8. Buy two chocolates
function buyTwoChocolates(prices, money) {
    prices.sort((a, b) => a - b);
    let total = prices[0] + prices[1];
    return total <= money ? money - total : money;
}

// 9. Largest perimeter triangle
function largestPerimeter(nums) {
    nums.sort((a, b) => b - a);
    for (let i = 0; i < nums.length - 2; i++) {
        if (nums[i] < nums[i + 1] + nums[i + 2]) {
            return nums[i] + nums[i + 1] + nums[i + 2];
        }
    }
    return 0;
}

// 10. Maximum product of three numbers
function maximumProduct(nums) {
    nums.sort((a, b) => a - b);
    let n = nums.length;
    return Math.max(
        nums[n - 1] * nums[n - 2] * nums[n - 3],
        nums[0] * nums[1] * nums[n - 1]
    );
}

// 11. Best time to buy and sell stock
function maxProfit(prices) {
    let minPrice = Infinity;
    let maxProfit = 0;
    for (let price of prices) {
        minPrice = Math.min(minPrice, price);
        maxProfit = Math.max(maxProfit, price - minPrice);
    }
    return maxProfit;
}

// 12. Minimum absolute difference pairs
function minAbsoluteDifference(nums) {
    nums.sort((a, b) => a - b);
    let minDiff = Infinity;
    for (let i = 1; i < nums.length; i++) {
        minDiff = Math.min(minDiff, Math.abs(nums[i] - nums[i - 1]));
    }
    return minDiff;
}

// 13. Maximum subarray using Kadane’s Algorithm
function maxSubArray(nums) {
    let maxSum = nums[0];
    let currentSum = nums[0];
    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    return maxSum;
}

// 14. Partition array into three equal parts
function canThreePartsEqualSum(arr) {
    let total = arr.reduce((a, b) => a + b, 0);
    if (total % 3 !== 0) return false;
    let target = total / 3;
    let sum = 0, count = 0;
    
    for (let num of arr) {
        sum += num;
        if (sum === target) {
            sum = 0;
            count++;
        }
    }
    return count >= 3;
}

// 15. Minimum operations to make array increasing
function minOperationsToMakeIncreasing(nums) {
    let operations = 0;
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] <= nums[i - 1]) {
            let needed = nums[i - 1] - nums[i] + 1;
            operations += needed;
            nums[i] = nums[i - 1] + 1;
        }
    }
    return operations;
}

// ==================== SORTING + GREEDY PROBLEMS (16-30) ====================

// 16. Non-overlapping intervals
function eraseOverlapIntervals(intervals) {
    if (!intervals.length) return 0;
    intervals.sort((a, b) => a[1] - b[1]);
    let count = 0;
    let lastEnd = intervals[0][1];
    
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < lastEnd) {
            count++;
        } else {
            lastEnd = intervals[i][1];
        }
    }
    return count;
}

// 17. Merge intervals
function mergeIntervals(intervals) {
    if (!intervals.length) return [];
    intervals.sort((a, b) => a[0] - b[0]);
    let result = [intervals[0]];
    
    for (let i = 1; i < intervals.length; i++) {
        let last = result[result.length - 1];
        if (intervals[i][0] <= last[1]) {
            last[1] = Math.max(last[1], intervals[i][1]);
        } else {
            result.push(intervals[i]);
        }
    }
    return result;
}

// 18. Insert interval
function insertInterval(intervals, newInterval) {
    let result = [];
    let i = 0;
    
    while (i < intervals.length && intervals[i][1] < newInterval[0]) {
        result.push(intervals[i]);
        i++;
    }
    
    while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    result.push(newInterval);
    
    while (i < intervals.length) {
        result.push(intervals[i]);
        i++;
    }
    return result;
}

// 19. Minimum number of arrows to burst balloons
function findMinArrowShots(points) {
    if (!points.length) return 0;
    points.sort((a, b) => a[1] - b[1]);
    let arrows = 1;
    let end = points[0][1];
    
    for (let i = 1; i < points.length; i++) {
        if (points[i][0] > end) {
            arrows++;
            end = points[i][1];
        }
    }
    return arrows;
}

// 20. Queue reconstruction by height
function reconstructQueue(people) {
    people.sort((a, b) => {
        if (a[0] === b[0]) return a[1] - b[1];
        return b[0] - a[0];
    });
    
    let result = [];
    for (let person of people) {
        result.splice(person[1], 0, person);
    }
    return result;
}

// 21. Reorganize string
function reorganizeString(s) {
    let freq = new Array(26).fill(0);
    for (let char of s) {
        freq[char.charCodeAt(0) - 97]++;
        if (freq[char.charCodeAt(0) - 97] > (s.length + 1) / 2) return "";
    }
    
    let result = [];
    let maxHeap = [];
    for (let i = 0; i < 26; i++) {
        if (freq[i] > 0) {
            maxHeap.push([String.fromCharCode(i + 97), freq[i]]);
        }
    }
    maxHeap.sort((a, b) => b[1] - a[1]);
    
    while (maxHeap.length) {
        let first = maxHeap.shift();
        if (result.length && result[result.length - 1] === first[0]) return "";
        result.push(first[0]);
        first[1]--;
        
        if (maxHeap.length) {
            let second = maxHeap.shift();
            result.push(second[0]);
            second[1]--;
            if (second[1] > 0) maxHeap.push(second);
        }
        if (first[1] > 0) maxHeap.push(first);
        maxHeap.sort((a, b) => b[1] - a[1]);
    }
    return result.join('');
}

// 22. Largest number formation
function largestNumber(nums) {
    nums = nums.map(String);
    nums.sort((a, b) => (b + a) - (a + b));
    let result = nums.join('');
    return result[0] === '0' ? '0' : result;
}

// 23. Minimum platforms required for trains
function findPlatforms(arr, dep) {
    arr.sort((a, b) => a - b);
    dep.sort((a, b) => a - b);
    let platforms = 0, maxPlatforms = 0;
    let i = 0, j = 0;
    
    while (i < arr.length && j < dep.length) {
        if (arr[i] <= dep[j]) {
            platforms++;
            i++;
            maxPlatforms = Math.max(maxPlatforms, platforms);
        } else {
            platforms--;
            j++;
        }
    }
    return maxPlatforms;
}

// 24. Meeting rooms I (can attend all meetings)
function canAttendMeetings(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < intervals[i - 1][1]) return false;
    }
    return true;
}

// 25. Meeting rooms II (minimum rooms needed)
function minMeetingRooms(intervals) {
    if (!intervals.length) return 0;
    let start = intervals.map(i => i[0]).sort((a, b) => a - b);
    let end = intervals.map(i => i[1]).sort((a, b) => a - b);
    let rooms = 0;
    let endIdx = 0;
    
    for (let i = 0; i < start.length; i++) {
        if (start[i] < end[endIdx]) {
            rooms++;
        } else {
            endIdx++;
        }
    }
    return rooms;
}

// 26. Attend maximum events
function maxEvents(events) {
    events.sort((a, b) => a[1] - b[1]);
    let attended = new Set();
    let count = 0;
    
    for (let [start, end] of events) {
        for (let day = start; day <= end; day++) {
            if (!attended.has(day)) {
                attended.add(day);
                count++;
                break;
            }
        }
    }
    return count;
}

// 27. Car pooling feasibility
function carPooling(trips, capacity) {
    let stops = new Array(1001).fill(0);
    for (let [passengers, start, end] of trips) {
        stops[start] += passengers;
        stops[end] -= passengers;
    }
    
    let current = 0;
    for (let i = 0; i <= 1000; i++) {
        current += stops[i];
        if (current > capacity) return false;
    }
    return true;
}

// 28. Boats to save people
function numRescueBoats(people, limit) {
    people.sort((a, b) => a - b);
    let boats = 0;
    let left = 0, right = people.length - 1;
    
    while (left <= right) {
        if (people[left] + people[right] <= limit) {
            left++;
        }
        right--;
        boats++;
    }
    return boats;
}

// 29. Bag of tokens
function bagOfTokensScore(tokens, power) {
    tokens.sort((a, b) => a - b);
    let score = 0;
    let maxScore = 0;
    let left = 0, right = tokens.length - 1;
    
    while (left <= right) {
        if (power >= tokens[left]) {
            power -= tokens[left];
            score++;
            left++;
            maxScore = Math.max(maxScore, score);
        } else if (score > 0) {
            power += tokens[right];
            score--;
            right--;
        } else {
            break;
        }
    }
    return maxScore;
}

// 30. Advantage shuffle
function advantageCount(nums1, nums2) {
    nums1.sort((a, b) => a - b);
    let sortedNums2 = [...nums2].map((val, idx) => [val, idx]).sort((a, b) => a[0] - b[0]);
    let result = new Array(nums1.length);
    let left = 0, right = nums1.length - 1;
    
    for (let i = sortedNums2.length - 1; i >= 0; i--) {
        let [val, idx] = sortedNums2[i];
        if (nums1[right] > val) {
            result[idx] = nums1[right];
            right--;
        } else {
            result[idx] = nums1[left];
            left++;
        }
    }
    return result;
}

// ==================== JUMP / REACHABILITY GREEDY PROBLEMS (31-41) ====================

// 31. Jump game
function canJump(nums) {
    let maxReach = 0;
    for (let i = 0; i < nums.length; i++) {
        if (i > maxReach) return false;
        maxReach = Math.max(maxReach, i + nums[i]);
    }
    return true;
}

// 32. Jump game II
function jump(nums) {
    let jumps = 0;
    let currentEnd = 0;
    let farthest = 0;
    
    for (let i = 0; i < nums.length - 1; i++) {
        farthest = Math.max(farthest, i + nums[i]);
        if (i === currentEnd) {
            jumps++;
            currentEnd = farthest;
        }
    }
    return jumps;
}

// 33. Gas station circuit
function canCompleteCircuit(gas, cost) {
    let totalTank = 0;
    let currentTank = 0;
    let startStation = 0;
    
    for (let i = 0; i < gas.length; i++) {
        totalTank += gas[i] - cost[i];
        currentTank += gas[i] - cost[i];
        if (currentTank < 0) {
            startStation = i + 1;
            currentTank = 0;
        }
    }
    return totalTank >= 0 ? startStation : -1;
}

// 34. Candy distribution
function candy(ratings) {
    let candies = new Array(ratings.length).fill(1);
    for (let i = 1; i < ratings.length; i++) {
        if (ratings[i] > ratings[i - 1]) {
            candies[i] = candies[i - 1] + 1;
        }
    }
    for (let i = ratings.length - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i + 1]) {
            candies[i] = Math.max(candies[i], candies[i + 1] + 1);
        }
    }
    return candies.reduce((a, b) => a + b, 0);
}

// 35. Wiggle subsequence
function wiggleMaxLength(nums) {
    if (nums.length < 2) return nums.length;
    let up = 1, down = 1;
    
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > nums[i - 1]) {
            up = down + 1;
        } else if (nums[i] < nums[i - 1]) {
            down = up + 1;
        }
    }
    return Math.max(up, down);
}

// 36. Reach end with minimum jumps (same as jump game II)

// 37. Minimum taps to water garden
function minTaps(n, ranges) {
    let intervals = [];
    for (let i = 0; i < ranges.length; i++) {
        if (ranges[i] > 0) {
            intervals.push([Math.max(0, i - ranges[i]), Math.min(n, i + ranges[i])]);
        }
    }
    intervals.sort((a, b) => a[0] - b[0]);
    
    let taps = 0;
    let currentEnd = 0;
    let i = 0;
    let farthest = 0;
    
    while (currentEnd < n) {
        while (i < intervals.length && intervals[i][0] <= currentEnd) {
            farthest = Math.max(farthest, intervals[i][1]);
            i++;
        }
        if (farthest <= currentEnd) return -1;
        taps++;
        currentEnd = farthest;
    }
    return taps;
}

// 38. Video stitching
function videoStitching(clips, time) {
    clips.sort((a, b) => a[0] - b[0]);
    let count = 0;
    let currentEnd = 0;
    let i = 0;
    let farthest = 0;
    
    while (currentEnd < time) {
        while (i < clips.length && clips[i][0] <= currentEnd) {
            farthest = Math.max(farthest, clips[i][1]);
            i++;
        }
        if (farthest <= currentEnd) return -1;
        count++;
        currentEnd = farthest;
    }
    return count;
}

// 39. Patching array
function minPatches(nums, n) {
    let patches = 0;
    let maxReach = 0;
    let i = 0;
    
    while (maxReach < n) {
        if (i < nums.length && nums[i] <= maxReach + 1) {
            maxReach += nums[i];
            i++;
        } else {
            patches++;
            maxReach += maxReach + 1;
        }
    }
    return patches;
}

// 40. Furthest building you can reach
function furthestBuilding(heights, bricks, ladders) {
    let heap = [];
    
    for (let i = 0; i < heights.length - 1; i++) {
        let diff = heights[i + 1] - heights[i];
        if (diff <= 0) continue;
        
        heap.push(diff);
        heap.sort((a, b) => b - a);
        
        if (heap.length > ladders) {
            bricks -= heap.pop();
            if (bricks < 0) return i;
        }
    }
    return heights.length - 1;
}

// ==================== STRING GREEDY PROBLEMS (41-50) ====================

// 41. Remove duplicate letters
function removeDuplicateLetters(s) {
    let lastOccurrence = new Array(26).fill(-1);
    for (let i = 0; i < s.length; i++) {
        lastOccurrence[s.charCodeAt(i) - 97] = i;
    }
    
    let stack = [];
    let inStack = new Set();
    
    for (let i = 0; i < s.length; i++) {
        let char = s[i];
        if (inStack.has(char)) continue;
        
        while (stack.length && stack[stack.length - 1] > char && 
               lastOccurrence[stack[stack.length - 1].charCodeAt(0) - 97] > i) {
            inStack.delete(stack.pop());
        }
        stack.push(char);
        inStack.add(char);
    }
    return stack.join('');
}

// 42. Partition labels
function partitionLabels(s) {
    let lastIndex = new Array(26).fill(-1);
    for (let i = 0; i < s.length; i++) {
        lastIndex[s.charCodeAt(i) - 97] = i;
    }
    
    let result = [];
    let start = 0;
    let end = 0;
    
    for (let i = 0; i < s.length; i++) {
        end = Math.max(end, lastIndex[s.charCodeAt(i) - 97]);
        if (i === end) {
            result.push(end - start + 1);
            start = end + 1;
        }
    }
    return result;
}

// 43. Valid parenthesis string with stars
function checkValidString(s) {
    let low = 0, high = 0;
    for (let char of s) {
        if (char === '(') {
            low++;
            high++;
        } else if (char === ')') {
            low = Math.max(low - 1, 0);
            high--;
        } else {
            low = Math.max(low - 1, 0);
            high++;
        }
        if (high < 0) return false;
    }
    return low === 0;
}

// 44. Remove k digits to form smallest number
function removeKdigits(num, k) {
    let stack = [];
    for (let digit of num) {
        while (stack.length && k > 0 && stack[stack.length - 1] > digit) {
            stack.pop();
            k--;
        }
        stack.push(digit);
    }
    
    while (k > 0) {
        stack.pop();
        k--;
    }
    
    let result = stack.join('').replace(/^0+/, '');
    return result || '0';
}

// 45. Construct smallest number from pattern
function smallestNumber(pattern) {
    let result = [];
    let stack = [];
    
    for (let i = 0; i <= pattern.length; i++) {
        stack.push(i + 1);
        if (i === pattern.length || pattern[i] === 'I') {
            while (stack.length) {
                result.push(stack.pop());
            }
        }
    }
    return result.join('');
}

// 46. Minimum additions to make parentheses valid
function minAddToMakeValid(s) {
    let open = 0, close = 0;
    for (let char of s) {
        if (char === '(') {
            open++;
        } else {
            if (open > 0) open--;
            else close++;
        }
    }
    return open + close;
}

// 47. Longest palindrome from characters
function longestPalindrome(s) {
    let freq = new Array(128).fill(0);
    for (let char of s) {
        freq[char.charCodeAt(0)]++;
    }
    
    let length = 0;
    let oddExists = false;
    for (let count of freq) {
        length += Math.floor(count / 2) * 2;
        if (count % 2 === 1) oddExists = true;
    }
    return length + (oddExists ? 1 : 0);
}

// 48. Shortest palindrome greedy approach
function shortestPalindrome(s) {
    let i = 0;
    for (let j = s.length - 1; j >= 0; j--) {
        if (s[i] === s[j]) i++;
    }
    if (i === s.length) return s;
    let suffix = s.substring(i);
    return suffix.split('').reverse().join('') + shortestPalindrome(s.substring(0, i)) + suffix;
}

// 49. Split string into balanced substrings
function balancedStringSplit(s) {
    let count = 0;
    let balance = 0;
    for (let char of s) {
        if (char === 'L') balance++;
        else balance--;
        if (balance === 0) count++;
    }
    return count;
}

// 50. Maximum binary string after changes
function maximumBinaryString(binary) {
    let zeros = 0;
    let ones = 0;
    for (let char of binary) {
        if (char === '0') zeros++;
        else if (zeros > 0) ones++;
    }
    if (zeros <= 1) return binary;
    return '1'.repeat(ones + zeros - 1) + '0' + '1'.repeat(binary.length - (ones + zeros));
}

// ==================== HEAP + GREEDY PROBLEMS (51-60) ====================

// 51. Connect ropes with minimum cost
function minCostToConnectRopes(ropes) {
    ropes.sort((a, b) => a - b);
    let cost = 0;
    
    while (ropes.length > 1) {
        let sum = ropes.shift() + ropes.shift();
        cost += sum;
        ropes.push(sum);
        ropes.sort((a, b) => a - b);
    }
    return cost;
}

// 52. Huffman coding
class HuffmanNode {
    constructor(char, freq) {
        this.char = char;
        this.freq = freq;
        this.left = null;
        this.right = null;
    }
}

function huffmanCoding(chars, freqs) {
    let nodes = [];
    for (let i = 0; i < chars.length; i++) {
        nodes.push(new HuffmanNode(chars[i], freqs[i]));
    }
    nodes.sort((a, b) => a.freq - b.freq);
    
    while (nodes.length > 1) {
        let left = nodes.shift();
        let right = nodes.shift();
        let parent = new HuffmanNode(null, left.freq + right.freq);
        parent.left = left;
        parent.right = right;
        nodes.push(parent);
        nodes.sort((a, b) => a.freq - b.freq);
    }
    
    let codes = {};
    function generateCodes(node, code) {
        if (!node) return;
        if (node.char) {
            codes[node.char] = code;
            return;
        }
        generateCodes(node.left, code + '0');
        generateCodes(node.right, code + '1');
    }
    generateCodes(nodes[0], '');
    return codes;
}

// 53. Task scheduler (already implemented above as leastInterval)

// 54. IPO problem
function findMaximizedCapital(k, w, profits, capital) {
    let projects = [];
    for (let i = 0; i < profits.length; i++) {
        projects.push([capital[i], profits[i]]);
    }
    projects.sort((a, b) => a[0] - b[0]);
    
    let maxHeap = [];
    let i = 0;
    
    for (let j = 0; j < k; j++) {
        while (i < projects.length && projects[i][0] <= w) {
            maxHeap.push(projects[i][1]);
            maxHeap.sort((a, b) => b - a);
            i++;
        }
        if (maxHeap.length === 0) break;
        w += maxHeap.shift();
    }
    return w;
}

// 55. Maximum performance of team
function maxPerformance(n, speed, efficiency, k) {
    let engineers = [];
    for (let i = 0; i < n; i++) {
        engineers.push([efficiency[i], speed[i]]);
    }
    engineers.sort((a, b) => b[0] - a[0]);
    
    let minHeap = [];
    let sumSpeed = 0;
    let maxPerf = 0;
    const MOD = 1000000007;
    
    for (let [eff, spd] of engineers) {
        minHeap.push(spd);
        minHeap.sort((a, b) => a - b);
        sumSpeed += spd;
        
        if (minHeap.length > k) {
            sumSpeed -= minHeap.shift();
        }
        
        maxPerf = Math.max(maxPerf, sumSpeed * eff);
    }
    return maxPerf % MOD;
}

// 56. Kth largest stream element
class KthLargest {
    constructor(k, nums) {
        this.k = k;
        this.heap = [];
        for (let num of nums) {
            this.add(num);
        }
    }
    
    add(val) {
        this.heap.push(val);
        this.heap.sort((a, b) => a - b);
        if (this.heap.length > this.k) {
            this.heap.shift();
        }
        return this.heap[0];
    }
}

// 57. Reorganize string using heap (already implemented above)

// 58. Minimum refueling stops
function minRefuelStops(target, startFuel, stations) {
    let maxHeap = [];
    let fuel = startFuel;
    let stops = 0;
    let i = 0;
    
    while (fuel < target) {
        while (i < stations.length && stations[i][0] <= fuel) {
            maxHeap.push(stations[i][1]);
            maxHeap.sort((a, b) => b - a);
            i++;
        }
        if (maxHeap.length === 0) return -1;
        fuel += maxHeap.shift();
        stops++;
    }
    return stops;
}

// 59. Course schedule III
function scheduleCourse(courses) {
    courses.sort((a, b) => a[1] - b[1]);
    let maxHeap = [];
    let time = 0;
    
    for (let [duration, lastDay] of courses) {
        time += duration;
        maxHeap.push(duration);
        maxHeap.sort((a, b) => b - a);
        
        if (time > lastDay) {
            time -= maxHeap.shift();
        }
    }
    return maxHeap.length;
}

// 60. Hand of straights
function isNStraightHand(hand, groupSize) {
    if (hand.length % groupSize !== 0) return false;
    
    let freq = new Map();
    for (let card of hand) {
        freq.set(card, (freq.get(card) || 0) + 1);
    }
    
    let sortedCards = [...freq.keys()].sort((a, b) => a - b);
    
    for (let card of sortedCards) {
        let count = freq.get(card);
        if (count > 0) {
            for (let i = 0; i < groupSize; i++) {
                let nextCard = card + i;
                let nextCount = freq.get(nextCard) || 0;
                if (nextCount < count) return false;
                freq.set(nextCard, nextCount - count);
            }
        }
    }
    return true;
}

// ==================== INTERVAL / SCHEDULING GREEDY PROBLEMS (61-70) ====================

// 61. Job sequencing with deadlines
function jobSequencing(jobs) {
    // jobs: [jobId, deadline, profit]
    jobs.sort((a, b) => b[2] - a[2]);
    let maxDeadline = Math.max(...jobs.map(j => j[1]));
    let slots = new Array(maxDeadline + 1).fill(false);
    let totalProfit = 0;
    let jobCount = 0;
    
    for (let [id, deadline, profit] of jobs) {
        for (let i = Math.min(deadline, maxDeadline); i >= 1; i--) {
            if (!slots[i]) {
                slots[i] = true;
                totalProfit += profit;
                jobCount++;
                break;
            }
        }
    }
    return { jobCount, totalProfit };
}

// 62. Weighted job scheduling
function weightedJobScheduling(jobs) {
    // jobs: [start, end, profit]
    jobs.sort((a, b) => a[1] - b[1]);
    let n = jobs.length;
    let dp = new Array(n);
    dp[0] = jobs[0][2];
    
    function findLastNonConflict(idx) {
        for (let i = idx - 1; i >= 0; i--) {
            if (jobs[i][1] <= jobs[idx][0]) return i;
        }
        return -1;
    }
    
    for (let i = 1; i < n; i++) {
        let inclProfit = jobs[i][2];
        let last = findLastNonConflict(i);
        if (last !== -1) inclProfit += dp[last];
        dp[i] = Math.max(dp[i - 1], inclProfit);
    }
    return dp[n - 1];
}

// 63. CPU task scheduling (already implemented as leastInterval)

// 64. Maximum compatible jobs (same as weighted job scheduling with unit profit)

// 65. Minimum removals to avoid overlap (same as eraseOverlapIntervals)

// 66. Interval covering problem
function minIntervalCover(intervals, target) {
    intervals.sort((a, b) => a[0] - b[0]);
    let count = 0;
    let currentEnd = target[0];
    let i = 0;
    
    while (currentEnd < target[1]) {
        let maxEnd = currentEnd;
        while (i < intervals.length && intervals[i][0] <= currentEnd) {
            maxEnd = Math.max(maxEnd, intervals[i][1]);
            i++;
        }
        if (maxEnd === currentEnd) return -1;
        count++;
        currentEnd = maxEnd;
    }
    return count;
}

// 67. Railway station scheduling (same as minPlatforms)

// 68. Event conflict detection
function hasConflict(events) {
    events.sort((a, b) => a[0] - b[0]);
    for (let i = 1; i < events.length; i++) {
        if (events[i][0] < events[i - 1][1]) return true;
    }
    return false;
}

// 69. Split intervals into minimum groups
function minGroups(intervals) {
    let starts = intervals.map(i => i[0]).sort((a, b) => a - b);
    let ends = intervals.map(i => i[1]).sort((a, b) => a - b);
    let groups = 0;
    let endIdx = 0;
    
    for (let start of starts) {
        if (start > ends[endIdx]) {
            endIdx++;
        } else {
            groups++;
        }
    }
    return groups;
}

// 70. Earliest full bloom problem
function earliestFullBloom(plantTime, growTime) {
    let flowers = [];
    for (let i = 0; i < plantTime.length; i++) {
        flowers.push([plantTime[i], growTime[i]]);
    }
    flowers.sort((a, b) => b[1] - a[1]);
    
    let currentDay = 0;
    let maxBloom = 0;
    for (let [plant, grow] of flowers) {
        currentDay += plant;
        maxBloom = Math.max(maxBloom, currentDay + grow);
    }
    return maxBloom;
}

// ==================== EXPORT ====================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        // Basics (1-15)
        activitySelection, fractionalKnapsack, findContentChildren, minCoins,
        lemonadeChange, maximumUnits, canPlaceFlowers, buyTwoChocolates,
        largestPerimeter, maximumProduct, maxProfit, minAbsoluteDifference,
        maxSubArray, canThreePartsEqualSum, minOperationsToMakeIncreasing,
        
        // Sorting + Greedy (16-30)
        eraseOverlapIntervals, mergeIntervals, insertInterval, findMinArrowShots,
        reconstructQueue, reorganizeString, largestNumber, findPlatforms,
        canAttendMeetings, minMeetingRooms, maxEvents, carPooling,
        numRescueBoats, bagOfTokensScore, advantageCount,
        
        // Jump (31-40)
        canJump, jump, canCompleteCircuit, candy, wiggleMaxLength,
        minTaps, videoStitching, minPatches, furthestBuilding,
        
        // String (41-50)
        removeDuplicateLetters, partitionLabels, checkValidString, removeKdigits,
        smallestNumber, minAddToMakeValid, longestPalindrome, shortestPalindrome,
        balancedStringSplit, maximumBinaryString,
        
        // Heap (51-60)
        minCostToConnectRopes, huffmanCoding, findMaximizedCapital,
        maxPerformance, KthLargest, minRefuelStops, scheduleCourse, isNStraightHand,
        
        // Interval (61-70)
        jobSequencing, weightedJobScheduling, minIntervalCover,
        hasConflict, minGroups, earliestFullBloom
    };
}