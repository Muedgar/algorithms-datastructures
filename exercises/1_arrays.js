
function rotate1DArray(nums, k) {
    // handle edge case
    if(nums.length === 0) return nums;

    // 
    let n = nums.length;
    k = k % n;
    // if(n % k < k) return nums;
    // rotate all array
    reverse(nums, 0, n - 1);
    // rotate 0 to k - 1
    reverse(nums, 0, k - 1);
    // rotate k to nums.length - 1
    reverse(nums, k, n - 1);

    return nums;
}

function reverse(nums, left, right) {
 while (left<right) {
    [nums[left], nums[right]] = [nums[right], nums[left]];
    left++;
    right--
 }

 return nums;
}


console.log(rotate1DArray([1,2,3,4,5,6,7], 3))