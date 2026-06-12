// 1. Reverse a string in-place
function reverseString(s) {
    let arr = s.split('');
    let left = 0, right = arr.length - 1;
    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
    return arr.join('');
}

// 2. Check if a string is a palindrome
function isPalindrome(s) {
    let left = 0, right = s.length - 1;
    while (left < right) {
        if (s[left] !== s[right]) return false;
        left++;
        right--;
    }
    return true;
}

// 3. Valid palindrome after deleting at most one character
function validPalindromeAfterDeletion(s) {
    let left = 0, right = s.length - 1;
    while (left < right) {
        if (s[left] !== s[right]) {
            return isPalindrome(s.slice(left, right)) || 
                   isPalindrome(s.slice(left + 1, right + 1));
        }
        left++;
        right--;
    }
    return true;
}

// 4. Reverse words in a sentence
function reverseWords(sentence) {
    return sentence.split(' ').reverse().join(' ');
}

// 5. Reverse words while preserving spaces
function reverseWordsPreserveSpaces(s) {
    let words = s.split(' ').filter(w => w.length > 0);
    let result = [];
    let wordIndex = words.length - 1;
    for (let i = 0; i < s.length; i++) {
        if (s[i] === ' ') {
            result.push(' ');
        } else {
            result.push(words[wordIndex--]);
            while (i + 1 < s.length && s[i + 1] !== ' ') i++;
        }
    }
    return result.join('');
}

// 6. Check if two strings are anagrams
function areAnagrams(s1, s2) {
    if (s1.length !== s2.length) return false;
    let count = {};
    for (let ch of s1) count[ch] = (count[ch] || 0) + 1;
    for (let ch of s2) {
        if (!count[ch]) return false;
        count[ch]--;
    }
    return true;
}

// 7. Group anagrams together
function groupAnagrams(strs) {
    let map = new Map();
    for (let str of strs) {
        let sorted = str.split('').sort().join('');
        if (!map.has(sorted)) map.set(sorted, []);
        map.get(sorted).push(str);
    }
    return Array.from(map.values());
}

// 8. Find first non-repeating character
function firstNonRepeatingChar(s) {
    let count = {};
    for (let ch of s) count[ch] = (count[ch] || 0) + 1;
    for (let i = 0; i < s.length; i++) {
        if (count[s[i]] === 1) return i;
    }
    return -1;
}

// 9. Longest common prefix
function longestCommonPrefix(strs) {
    if (!strs.length) return "";
    let prefix = strs[0];
    for (let i = 1; i < strs.length; i++) {
        while (strs[i].indexOf(prefix) !== 0) {
            prefix = prefix.slice(0, -1);
            if (!prefix) return "";
        }
    }
    return prefix;
}

// 10. Roman numeral to integer
function romanToInt(s) {
    const map = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
    let total = 0;
    for (let i = 0; i < s.length; i++) {
        let curr = map[s[i]];
        let next = map[s[i + 1]] || 0;
        if (curr < next) total -= curr;
        else total += curr;
    }
    return total;
}

// 11. Integer to Roman numeral
function intToRoman(num) {
    const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const symbols = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
    let result = "";
    for (let i = 0; i < values.length; i++) {
        while (num >= values[i]) {
            result += symbols[i];
            num -= values[i];
        }
    }
    return result;
}

// 12. String compression (aaabb → a3b2)
function compressString(s) {
    let compressed = "";
    let count = 1;
    for (let i = 0; i < s.length; i++) {
        if (s[i] === s[i + 1]) count++;
        else {
            compressed += s[i] + count;
            count = 1;
        }
    }
    return compressed.length < s.length ? compressed : s;
}

// 13. Implement atoi() (string to integer)
function myAtoi(s) {
    let i = 0, sign = 1, result = 0;
    while (i < s.length && s[i] === ' ') i++;
    if (s[i] === '+' || s[i] === '-') sign = s[i++] === '-' ? -1 : 1;
    while (i < s.length && s[i] >= '0' && s[i] <= '9') {
        result = result * 10 + (s[i++] - '0');
        if (result * sign > 2 ** 31 - 1) return 2 ** 31 - 1;
        if (result * sign < -(2 ** 31)) return -(2 ** 31);
    }
    return result * sign;
}

// 14. Compare version numbers
function compareVersions(v1, v2) {
    let parts1 = v1.split('.'), parts2 = v2.split('.');
    let len = Math.max(parts1.length, parts2.length);
    for (let i = 0; i < len; i++) {
        let num1 = parseInt(parts1[i] || 0);
        let num2 = parseInt(parts2[i] || 0);
        if (num1 !== num2) return num1 > num2 ? 1 : -1;
    }
    return 0;
}

// 15. Zigzag conversion
function zigzagConvert(s, numRows) {
    if (numRows === 1) return s;
    let rows = Array(numRows).fill('');
    let row = 0, down = false;
    for (let ch of s) {
        rows[row] += ch;
        if (row === 0 || row === numRows - 1) down = !down;
        row += down ? 1 : -1;
    }
    return rows.join('');
}
// 16. Longest substring without repeating characters
function lengthOfLongestSubstring(s) {
    let set = new Set();
    let left = 0, maxLen = 0;
    for (let right = 0; right < s.length; right++) {
        while (set.has(s[right])) set.delete(s[left++]);
        set.add(s[right]);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}

// 17. Longest repeating character replacement
function characterReplacement(s, k) {
    let count = {};
    let left = 0, maxFreq = 0, maxLen = 0;
    for (let right = 0; right < s.length; right++) {
        count[s[right]] = (count[s[right]] || 0) + 1;
        maxFreq = Math.max(maxFreq, count[s[right]]);
        if (right - left + 1 - maxFreq > k) {
            count[s[left]]--;
            left++;
        }
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}

// 18. Minimum window substring
function minWindow(s, t) {
    let need = {};
    for (let ch of t) need[ch] = (need[ch] || 0) + 1;
    let have = {};
    let left = 0, formed = 0, required = Object.keys(need).length;
    let minLen = Infinity, minStart = 0;
    for (let right = 0; right < s.length; right++) {
        let ch = s[right];
        have[ch] = (have[ch] || 0) + 1;
        if (need[ch] && have[ch] === need[ch]) formed++;
        while (formed === required) {
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                minStart = left;
            }
            let leftChar = s[left];
            have[leftChar]--;
            if (need[leftChar] && have[leftChar] < need[leftChar]) formed--;
            left++;
        }
    }
    return minLen === Infinity ? "" : s.substr(minStart, minLen);
}

// 19. Find all anagrams in a string
function findAnagrams(s, p) {
    let need = {}, have = {};
    for (let ch of p) need[ch] = (need[ch] || 0) + 1;
    let left = 0, formed = 0, required = Object.keys(need).length;
    let result = [];
    for (let right = 0; right < s.length; right++) {
        let ch = s[right];
        have[ch] = (have[ch] || 0) + 1;
        if (need[ch] && have[ch] === need[ch]) formed++;
        if (right - left + 1 > p.length) {
            let leftChar = s[left];
            if (need[leftChar] && have[leftChar] === need[leftChar]) formed--;
            have[leftChar]--;
            left++;
        }
        if (formed === required) result.push(left);
    }
    return result;
}

// 20. Permutation in string
function checkInclusion(s1, s2) {
    let need = {}, have = {};
    for (let ch of s1) need[ch] = (need[ch] || 0) + 1;
    let left = 0, formed = 0, required = Object.keys(need).length;
    for (let right = 0; right < s2.length; right++) {
        let ch = s2[right];
        have[ch] = (have[ch] || 0) + 1;
        if (need[ch] && have[ch] === need[ch]) formed++;
        if (right - left + 1 > s1.length) {
            let leftChar = s2[left];
            if (need[leftChar] && have[leftChar] === need[leftChar]) formed--;
            have[leftChar]--;
            left++;
        }
        if (formed === required) return true;
    }
    return false;
}

// 21. Longest substring with at most K distinct characters
function longestSubstringKDistinct(s, k) {
    let count = {};
    let left = 0, maxLen = 0;
    for (let right = 0; right < s.length; right++) {
        count[s[right]] = (count[s[right]] || 0) + 1;
        while (Object.keys(count).length > k) {
            count[s[left]]--;
            if (count[s[left]] === 0) delete count[s[left]];
            left++;
        }
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}

// 22. Longest substring with exactly K unique characters
function longestSubstringKUnique(s, k) {
    let count = {};
    let left = 0, maxLen = -1;
    for (let right = 0; right < s.length; right++) {
        count[s[right]] = (count[s[right]] || 0) + 1;
        while (Object.keys(count).length > k) {
            count[s[left]]--;
            if (count[s[left]] === 0) delete count[s[left]];
            left++;
        }
        if (Object.keys(count).length === k) {
            maxLen = Math.max(maxLen, right - left + 1);
        }
    }
    return maxLen;
}

// 23. Smallest window containing all characters of another string
// Same as minWindow (problem 18)

// 24. Count occurrences of anagrams
function countAnagramOccurrences(s, p) {
    let need = {}, have = {};
    for (let ch of p) need[ch] = (need[ch] || 0) + 1;
    let left = 0, formed = 0, required = Object.keys(need).length;
    let count = 0;
    for (let right = 0; right < s.length; right++) {
        let ch = s[right];
        have[ch] = (have[ch] || 0) + 1;
        if (need[ch] && have[ch] === need[ch]) formed++;
        if (right - left + 1 > p.length) {
            let leftChar = s[left];
            if (need[leftChar] && have[leftChar] === need[leftChar]) formed--;
            have[leftChar]--;
            left++;
        }
        if (formed === required) count++;
    }
    return count;
}

// 25. Substrings containing all three characters (a,b,c)
function numberOfSubstringsContainingABC(s) {
    let last = [-1, -1, -1];
    let count = 0;
    for (let i = 0; i < s.length; i++) {
        last[s.charCodeAt(i) - 97] = i;
        if (last[0] !== -1 && last[1] !== -1 && last[2] !== -1) {
            count += 1 + Math.min(last[0], last[1], last[2]);
        }
    }
    return count;
}

// 26. Valid palindrome II (delete one char) — same as #3

// 27. Backspace string compare
function backspaceCompare(s, t) {
    const build = str => {
        let stack = [];
        for (let ch of str) {
            if (ch === '#') stack.pop();
            else stack.push(ch);
        }
        return stack.join('');
    };
    return build(s) === build(t);
}

// 28. Append characters to make subsequence
function appendCharacters(s, t) {
    let i = 0, j = 0;
    while (i < s.length && j < t.length) {
        if (s[i] === t[j]) j++;
        i++;
    }
    return t.length - j;
}

// 29. Is subsequence
function isSubsequence(s, t) {
    let i = 0;
    for (let ch of t) {
        if (i < s.length && s[i] === ch) i++;
    }
    return i === s.length;
}

// 30. Minimum deletions to make strings equal
function minDeletionsToEqual(s1, s2) {
    const lcs = (a, b) => {
        let dp = Array(a.length + 1).fill().map(() => Array(b.length + 1).fill(0));
        for (let i = 1; i <= a.length; i++) {
            for (let j = 1; j <= b.length; j++) {
                if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
                else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
        return dp[a.length][b.length];
    };
    let lcsLen = lcs(s1, s2);
    return (s1.length - lcsLen) + (s2.length - lcsLen);
}

// 31. Partition labels
function partitionLabels(s) {
    let last = {};
    for (let i = 0; i < s.length; i++) last[s[i]] = i;
    let result = [];
    let start = 0, end = 0;
    for (let i = 0; i < s.length; i++) {
        end = Math.max(end, last[s[i]]);
        if (i === end) {
            result.push(end - start + 1);
            start = i + 1;
        }
    }
    return result;
}

// 32. Break palindrome (lexicographically smallest)
function breakPalindrome(palindrome) {
    if (palindrome.length === 1) return "";
    let arr = palindrome.split('');
    for (let i = 0; i < Math.floor(arr.length / 2); i++) {
        if (arr[i] !== 'a') {
            arr[i] = 'a';
            return arr.join('');
        }
    }
    arr[arr.length - 1] = 'b';
    return arr.join('');
}

// 33. Merge strings alternately
function mergeAlternately(word1, word2) {
    let result = "";
    let i = 0;
    while (i < word1.length || i < word2.length) {
        if (i < word1.length) result += word1[i];
        if (i < word2.length) result += word2[i];
        i++;
    }
    return result;
}

// 34. Largest odd number in string
function largestOddNumber(num) {
    for (let i = num.length - 1; i >= 0; i--) {
        if (parseInt(num[i]) % 2 === 1) return num.slice(0, i + 1);
    }
    return "";
}

// 35. Remove adjacent duplicates in string
function removeDuplicates(s) {
    let stack = [];
    for (let ch of s) {
        if (stack.length && stack[stack.length - 1] === ch) stack.pop();
        else stack.push(ch);
    }
    return stack.join('');
}

// 36. Longest palindrome buildable from characters
function longestPalindromeBuildable(s) {
    let count = {};
    for (let ch of s) count[ch] = (count[ch] || 0) + 1;
    let length = 0;
    let oddExists = false;
    for (let val of Object.values(count)) {
        length += Math.floor(val / 2) * 2;
        if (val % 2 === 1) oddExists = true;
    }
    return length + (oddExists ? 1 : 0);
}

// 37. Ransom note problem
function canConstruct(ransomNote, magazine) {
    let count = {};
    for (let ch of magazine) count[ch] = (count[ch] || 0) + 1;
    for (let ch of ransomNote) {
        if (!count[ch]) return false;
        count[ch]--;
    }
    return true;
}

// 38. Find duplicate files by content
function findDuplicateFiles(paths) {
    let map = new Map();
    for (let path of paths) {
        let parts = path.split(' ');
        let dir = parts[0];
        for (let i = 1; i < parts.length; i++) {
            let [fileName, content] = parts[i].split('(');
            content = content.slice(0, -1);
            let fullPath = dir + '/' + fileName;
            if (!map.has(content)) map.set(content, []);
            map.get(content).push(fullPath);
        }
    }
    return Array.from(map.values()).filter(arr => arr.length > 1);
}

// 39. Sort characters by frequency
function frequencySort(s) {
    let freq = {};
    for (let ch of s) freq[ch] = (freq[ch] || 0) + 1;
    return s.split('').sort((a, b) => {
        if (freq[a] !== freq[b]) return freq[b] - freq[a];
        return a.localeCompare(b);
    }).join('');
}

// 40. Custom sort string
function customSortString(order, s) {
    let freq = {};
    for (let ch of s) freq[ch] = (freq[ch] || 0) + 1;
    let result = "";
    for (let ch of order) {
        if (freq[ch]) {
            result += ch.repeat(freq[ch]);
            delete freq[ch];
        }
    }
    for (let ch in freq) result += ch.repeat(freq[ch]);
    return result;
}

// 41. Determine if two strings are close
function closeStrings(word1, word2) {
    if (word1.length !== word2.length) return false;
    let freq1 = {}, freq2 = {};
    for (let ch of word1) freq1[ch] = (freq1[ch] || 0) + 1;
    for (let ch of word2) freq2[ch] = (freq2[ch] || 0) + 1;
    let chars1 = Object.keys(freq1).sort().join('');
    let chars2 = Object.keys(freq2).sort().join('');
    if (chars1 !== chars2) return false;
    let vals1 = Object.values(freq1).sort((a, b) => a - b);
    let vals2 = Object.values(freq2).sort((a, b) => a - b);
    return vals1.join('') === vals2.join('');
}

// 42. Count binary substrings
function countBinarySubstrings(s) {
    let prevRun = 0, currRun = 1, count = 0;
    for (let i = 1; i < s.length; i++) {
        if (s[i] === s[i - 1]) currRun++;
        else {
            count += Math.min(prevRun, currRun);
            prevRun = currRun;
            currRun = 1;
        }
    }
    count += Math.min(prevRun, currRun);
    return count;
}

// 43. Count homogenous substrings
function countHomogenous(s) {
    let count = 0, currLen = 0;
    for (let i = 0; i < s.length; i++) {
        if (i > 0 && s[i] === s[i - 1]) currLen++;
        else currLen = 1;
        count = (count + currLen) % (1e9 + 7);
    }
    return count;
}

// 44. Number of wonderful substrings (hard bitmasking)
function wonderfulSubstrings(word) {
    let freq = { 0: 1 };
    let mask = 0, count = 0;
    for (let ch of word) {
        mask ^= 1 << (ch.charCodeAt(0) - 97);
        count += freq[mask] || 0;
        for (let i = 0; i < 10; i++) {
            count += freq[mask ^ (1 << i)] || 0;
        }
        freq[mask] = (freq[mask] || 0) + 1;
    }
    return count;
}

// 45. Count vowel substrings
function countVowelSubstrings(word) {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
    let count = 0;
    for (let i = 0; i < word.length; i++) {
        let seen = new Set();
        for (let j = i; j < word.length; j++) {
            if (!vowels.has(word[j])) break;
            seen.add(word[j]);
            if (seen.size === 5) count++;
        }
    }
    return count;
}

// 46. Valid parentheses
function isValid(s) {
    let stack = [];
    let map = { '(': ')', '{': '}', '[': ']' };
    for (let ch of s) {
        if (map[ch]) stack.push(ch);
        else if (stack.length === 0 || map[stack.pop()] !== ch) return false;
    }
    return stack.length === 0;
}

// 47. Minimum remove to make valid parentheses
function minRemoveToMakeValid(s) {
    let arr = s.split('');
    let stack = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '(') stack.push(i);
        else if (arr[i] === ')') {
            if (stack.length) stack.pop();
            else arr[i] = '';
        }
    }
    for (let idx of stack) arr[idx] = '';
    return arr.join('');
}

// 48. Decode string (3[a2[c]])
function decodeString(s) {
    let stack = [];
    for (let ch of s) {
        if (ch !== ']') stack.push(ch);
        else {
            let str = '';
            while (stack.length && stack[stack.length - 1] !== '[') {
                str = stack.pop() + str;
            }
            stack.pop(); // remove '['
            let num = '';
            while (stack.length && !isNaN(stack[stack.length - 1])) {
                num = stack.pop() + num;
            }
            stack.push(str.repeat(parseInt(num)));
        }
    }
    return stack.join('');
}

// 49. Simplify Unix path
function simplifyPath(path) {
    let stack = [];
    let parts = path.split('/');
    for (let part of parts) {
        if (part === '' || part === '.') continue;
        if (part === '..') {
            if (stack.length) stack.pop();
        } else stack.push(part);
    }
    return '/' + stack.join('/');
}

// 50. Remove all adjacent duplicates II
function removeDuplicatesII(s, k) {
    let stack = [];
    for (let ch of s) {
        if (stack.length && stack[stack.length - 1][0] === ch) {
            stack[stack.length - 1][1]++;
            if (stack[stack.length - 1][1] === k) stack.pop();
        } else stack.push([ch, 1]);
    }
    return stack.map(([ch, count]) => ch.repeat(count)).join('');
}

// 51. Score of parentheses
function scoreOfParentheses(s) {
    let stack = [0];
    for (let ch of s) {
        if (ch === '(') stack.push(0);
        else {
            let last = stack.pop();
            stack[stack.length - 1] += Math.max(2 * last, 1);
        }
    }
    return stack[0];
}

// 52. Longest valid parentheses
function longestValidParentheses(s) {
    let stack = [-1];
    let maxLen = 0;
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') stack.push(i);
        else {
            stack.pop();
            if (stack.length === 0) stack.push(i);
            else maxLen = Math.max(maxLen, i - stack[stack.length - 1]);
        }
    }
    return maxLen;
}

// 53. Basic Calculator I
function calculate(s) {
    let stack = [];
    let num = 0, sign = 1, result = 0;
    for (let i = 0; i < s.length; i++) {
        let ch = s[i];
        if (ch >= '0' && ch <= '9') {
            num = num * 10 + (ch - '0');
        } else if (ch === '+' || ch === '-') {
            result += sign * num;
            num = 0;
            sign = ch === '+' ? 1 : -1;
        } else if (ch === '(') {
            stack.push(result);
            stack.push(sign);
            result = 0;
            sign = 1;
        } else if (ch === ')') {
            result += sign * num;
            num = 0;
            result *= stack.pop();
            result += stack.pop();
        }
    }
    result += sign * num;
    return result;
}

// 54. Basic Calculator II
function calculateII(s) {
    let stack = [];
    let num = 0;
    let op = '+';
    for (let i = 0; i <= s.length; i++) {
        let ch = s[i];
        if (ch >= '0' && ch <= '9') {
            num = num * 10 + (ch - '0');
        }
        if (i === s.length || ch === '+' || ch === '-' || ch === '*' || ch === '/') {
            if (op === '+') stack.push(num);
            else if (op === '-') stack.push(-num);
            else if (op === '*') stack.push(stack.pop() * num);
            else if (op === '/') stack.push(Math.trunc(stack.pop() / num));
            op = ch;
            num = 0;
        }
    }
    return stack.reduce((a, b) => a + b, 0);
}

// 55. Remove k digits to form smallest number
function removeKdigits(num, k) {
    let stack = [];
    for (let digit of num) {
        while (k > 0 && stack.length && stack[stack.length - 1] > digit) {
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
    return result === '' ? '0' : result;
}

// 56. Longest palindromic substring
function longestPalindrome(s) {
    let start = 0, maxLen = 1;
    const expand = (left, right) => {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            if (right - left + 1 > maxLen) {
                start = left;
                maxLen = right - left + 1;
            }
            left--;
            right++;
        }
    };
    for (let i = 0; i < s.length; i++) {
        expand(i, i);
        expand(i, i + 1);
    }
    return s.substr(start, maxLen);
}

// 57. Longest palindromic subsequence
function longestPalindromeSubseq(s) {
    let n = s.length;
    let dp = Array(n).fill().map(() => Array(n).fill(0));
    for (let i = n - 1; i >= 0; i--) {
        dp[i][i] = 1;
        for (let j = i + 1; j < n; j++) {
            if (s[i] === s[j]) dp[i][j] = dp[i + 1][j - 1] + 2;
            else dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
        }
    }
    return dp[0][n - 1];
}

// 58. Edit distance (Levenshtein distance)
function minDistance(word1, word2) {
    let m = word1.length, n = word2.length;
    let dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
            else dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        }
    }
    return dp[m][n];
}

// 59. Distinct subsequences
function numDistinct(s, t) {
    let dp = Array(t.length + 1).fill().map(() => Array(s.length + 1).fill(0));
    for (let j = 0; j <= s.length; j++) dp[0][j] = 1;
    for (let i = 1; i <= t.length; i++) {
        for (let j = 1; j <= s.length; j++) {
            dp[i][j] = dp[i][j - 1];
            if (t[i - 1] === s[j - 1]) dp[i][j] += dp[i - 1][j - 1];
        }
    }
    return dp[t.length][s.length];
}

// 60. Regular expression matching (. and *)
function isMatch(s, p) {
    let dp = Array(s.length + 1).fill().map(() => Array(p.length + 1).fill(false));
    dp[0][0] = true;
    for (let j = 1; j <= p.length; j++) {
        if (p[j - 1] === '*') dp[0][j] = dp[0][j - 2];
    }
    for (let i = 1; i <= s.length; i++) {
        for (let j = 1; j <= p.length; j++) {
            if (p[j - 1] === s[i - 1] || p[j - 1] === '.') {
                dp[i][j] = dp[i - 1][j - 1];
            } else if (p[j - 1] === '*') {
                dp[i][j] = dp[i][j - 2];
                if (p[j - 2] === s[i - 1] || p[j - 2] === '.') {
                    dp[i][j] = dp[i][j] || dp[i - 1][j];
                }
            }
        }
    }
    return dp[s.length][p.length];
}
