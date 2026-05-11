// reverse a string in place

function reverseStringInPlace(str) {
    let n = str.length;
    
    if (n === 0) return str;

    let left = 0;
    let right = n - 1;

    while (left < right) {
        [str[left], str[right]] = [str[right], str[left]];
        left++;
        right--;
    }

    return str;
}

console.log(reverseStringInPlace(['h', 'e', 'l', 'l', 'o']))