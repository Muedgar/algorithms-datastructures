function countRotation(nums) {
    const n = nums.length;
    let left = 0;
    let right = n - 1;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] >= nums[left]) {
            left++;
        } else {
            right--;
        }
    }

    return left;
}

function findPivotRotation(nums) {
    const n = nums.length;
    const min = countRotation(nums)
    return ((min - 1) + n) % n;
}

console.log(findPivotRotation([5,6,7,1,2,3,4]))