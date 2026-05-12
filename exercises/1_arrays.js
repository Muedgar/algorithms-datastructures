
// function rotateByKSteps(nums, k) {
//     if (nums.length === 0) return nums;
//     const n = nums.length;
//     k = k % n;

//     reverse(nums, 0, n - 1);
//     reverse(nums, 0, k - 1);
//     reverse(nums, k, n - 1);

//     return nums.join('  ');
// }

// function reverse(nums, left, right) {
//     while (left < right) {
//         [nums[left], nums[right]] = [nums[right], nums[left]];
//         left++;
//         right--;
//     }

//     return nums;
// }

// console.log(rotateByKSteps([1,2,3,4,5,6,7], 3));


// function cyclicRotation(nums, k) {
//     if (nums.length === 0) return nums;

//     k =  k % nums.length;

//     let count = 0;
//     let n = nums.length;

//     for (let start = 0; count < n; start++) {
//         let current = start;
//         let prev = nums[start];

//         do {
//             const next = ( current + k ) % n;
//             const temp = nums[next];
//             nums[next] = prev;

//             prev = temp;
//             current = next;
//             count++

//         } while (start !== current);
//     } 

//     return nums.join('  ');
// }

// console.log(cyclicRotation([1,2,3,4,5,6,7], 3));

// function cyclicRotation2(nums, k) {
//     let n = nums.length;

//     if (n === 0) return nums;

//     k = k % n;

//     let count = 0;

//     for (let start = 0; count < n; start++) {
//         let current = start;
//         let prev = nums[start];

//         do {
//             let next = ( current + k ) % n;
//             let temp = nums[next];
//             nums[next] = prev;

//             prev = temp;
//             current = next;
//             count++;
//         } while (start !== current)
//     }

//     return nums.join("  ");
// }

// console.log(cyclicRotation2([1,2,3,4,5,6,7], 3));

// function searchTarget(nums, target) {
//     let left = 0;
//     let right = nums.length - 1;

//     while(left <= right) {
//         const mid = Math.floor((left + right) / 2);

//         if (nums[mid] === target) return mid;
        
//         if (nums[left] < nums[mid]) {
//             if (nums[left] <= target && target < nums[mid]) {
//                 right = mid - 1;
//             } else {
//                 left = mid + 1;
//             }
//         } else {
//             if (nums[mid] < target && target <= nums[right] ) {
//                 left = mid + 1;
//             } else {
//                 right = mid - 1;
//             }
//         }
//     }

//     return -1;
// }

// console.log(searchTarget([4,5,6,7,1,2,3], 2))

function countRotations(nums) {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        console.log('-------------------------------AFTER-----COMPUTATION---------------------------------------------')
        console.log('left index:    ', left);
        console.log('right index:   ', right);
        console.log('-------------------------------AFTER-----COMPUTATION---------------------------------------------')
        console.log('left number:  ', nums[left]);
        console.log('right number: ', nums[right]);
        if (nums[left] > nums[right]) {
            left++;
        } else {
            right--;
        }

        //
        console.log('-------------------------------AFTER-----COMPUTATION---------------------------------------------')
        console.log('left index:    ', left);
        console.log('right index:   ', right);
        console.log('-------------------------------AFTER-----COMPUTATION---------------------------------------------')
    }

    return left;
}

console.log(countRotations([7,8,9,10,11,1,2,3,4,5,6]))