
function rotateByKSteps(nums, k) {
    if (nums.length === 0) return nums;
    const n = nums.length;
    k = k % n;

    reverse(nums, 0, n - 1);
    reverse(nums, 0, k - 1);
    reverse(nums, k, n - 1);

    return nums.join('  ');
}

function reverse(nums, left, right) {
    while (left < right) {
        [nums[left], nums[right]] = [nums[right], nums[left]];
        left++;
        right--;
    }

    return nums;
}

console.log(rotateByKSteps([1,2,3,4,5,6,7], 3));