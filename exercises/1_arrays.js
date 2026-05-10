
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


function cyclicRotation(nums, k) {
    if (nums.length === 0) return nums;

    k =  k % nums.length;

    let count = 0;
    let n = nums.length;

    for (let start = 0; count < n; start++) {
        let current = start;
        let prev = nums[start];

        do {
            const next = ( current + k ) % n;
            const temp = nums[next];
            nums[next] = prev;

            prev = temp;
            current = next;
            count++

        } while (start !== current);
    } 

    return nums.join('  ');
}

console.log(cyclicRotation([1,2,3,4,5,6,7], 3));

function cyclicRotation2(nums, k) {
    let n = nums.length;

    if (n === 0) return nums;

    k = k % n;

    let count = 0;

    for (let start = 0; count < n; start++) {
        let current = start;
        let prev = nums[start];

        do {
            let next = ( current + k ) % n;
            let temp = nums[next];
            nums[next] = prev;

            prev = temp;
            current = next;
            count++;
        } while (start !== current)
    }

    return nums.join("  ");
}

console.log(cyclicRotation2([1,2,3,4,5,6,7], 3));