// ==================== PATTERN SEARCHING BASICS → INTERMEDIATE FOUNDATIONS (1-15) ====================

// 1. Naive pattern searching
function naivePatternSearch(text, pattern) {
    let positions = [];
    let n = text.length, m = pattern.length;
    
    for (let i = 0; i <= n - m; i++) {
        let j;
        for (j = 0; j < m; j++) {
            if (text[i + j] !== pattern[j]) break;
        }
        if (j === m) positions.push(i);
    }
    return positions;
}

// 2. Find first occurrence of substring
function firstOccurrence(text, pattern) {
    for (let i = 0; i <= text.length - pattern.length; i++) {
        let match = true;
        for (let j = 0; j < pattern.length; j++) {
            if (text[i + j] !== pattern[j]) {
                match = false;
                break;
            }
        }
        if (match) return i;
    }
    return -1;
}

// 3. Find all occurrences of substring
function findAllOccurrences(text, pattern) {
    let positions = [];
    for (let i = 0; i <= text.length - pattern.length; i++) {
        let match = true;
        for (let j = 0; j < pattern.length; j++) {
            if (text[i + j] !== pattern[j]) {
                match = false;
                break;
            }
        }
        if (match) positions.push(i);
    }
    return positions;
}

// 4. Count occurrences of pattern in text
function countOccurrences(text, pattern) {
    let count = 0;
    for (let i = 0; i <= text.length - pattern.length; i++) {
        let match = true;
        for (let j = 0; j < pattern.length; j++) {
            if (text[i + j] !== pattern[j]) {
                match = false;
                break;
            }
        }
        if (match) count++;
    }
    return count;
}

// 5. Case-insensitive pattern search
function caseInsensitiveSearch(text, pattern) {
    let lowerText = text.toLowerCase();
    let lowerPattern = pattern.toLowerCase();
    let positions = [];
    
    for (let i = 0; i <= lowerText.length - lowerPattern.length; i++) {
        let match = true;
        for (let j = 0; j < lowerPattern.length; j++) {
            if (lowerText[i + j] !== lowerPattern[j]) {
                match = false;
                break;
            }
        }
        if (match) positions.push(i);
    }
    return positions;
}

// 6. Search pattern with spaces and symbols
function searchWithSpaces(text, pattern) {
    let positions = [];
    for (let i = 0; i <= text.length - pattern.length; i++) {
        let match = true;
        for (let j = 0; j < pattern.length; j++) {
            if (text[i + j] !== pattern[j]) {
                match = false;
                break;
            }
        }
        if (match) positions.push(i);
    }
    return positions;
}

// 7. Replace pattern in string
function replacePattern(text, pattern, replacement) {
    let result = "";
    let i = 0;
    
    while (i <= text.length - pattern.length) {
        let match = true;
        for (let j = 0; j < pattern.length; j++) {
            if (text[i + j] !== pattern[j]) {
                match = false;
                break;
            }
        }
        if (match) {
            result += replacement;
            i += pattern.length;
        } else {
            result += text[i];
            i++;
        }
    }
    result += text.slice(i);
    return result;
}

// 8. Check if pattern exists in text
function patternExists(text, pattern) {
    for (let i = 0; i <= text.length - pattern.length; i++) {
        let match = true;
        for (let j = 0; j < pattern.length; j++) {
            if (text[i + j] !== pattern[j]) {
                match = false;
                break;
            }
        }
        if (match) return true;
    }
    return false;
}

// 9. Find longest repeating substring
function longestRepeatingSubstring(s) {
    let longest = "";
    
    for (let len = Math.floor(s.length / 2); len > 0; len--) {
        let seen = new Set();
        for (let i = 0; i <= s.length - len; i++) {
            let substring = s.substring(i, i + len);
            if (seen.has(substring)) {
                if (len > longest.length) longest = substring;
                break;
            }
            seen.add(substring);
        }
        if (longest.length > len) break;
    }
    return longest;
}

// 10. Find shortest unique substring
function shortestUniqueSubstring(text) {
    let n = text.length;
    
    for (let len = 1; len <= n; len++) {
        let seen = new Set();
        let unique = null;
        
        for (let i = 0; i <= n - len; i++) {
            let substring = text.substring(i, i + len);
            if (seen.has(substring)) {
                unique = null;
                break;
            }
            seen.add(substring);
            unique = substring;
        }
        
        if (unique) return unique;
    }
    return text;
}

// 11. Prefix matching problem
function prefixMatches(strings, prefix) {
    let matches = [];
    for (let str of strings) {
        let match = true;
        for (let i = 0; i < prefix.length; i++) {
            if (i >= str.length || str[i] !== prefix[i]) {
                match = false;
                break;
            }
        }
        if (match) matches.push(str);
    }
    return matches;
}

// 12. Suffix matching problem
function suffixMatches(strings, suffix) {
    let matches = [];
    for (let str of strings) {
        let match = true;
        let strIdx = str.length - 1;
        for (let i = suffix.length - 1; i >= 0; i--) {
            if (strIdx < 0 || str[strIdx] !== suffix[i]) {
                match = false;
                break;
            }
            strIdx--;
        }
        if (match) matches.push(str);
    }
    return matches;
}

// 13. Pattern search in array of strings
function searchInArray(strings, pattern) {
    let positions = [];
    for (let i = 0; i < strings.length; i++) {
        if (strings[i].includes(pattern)) {
            positions.push(i);
        }
    }
    return positions;
}

// 14. Search word in sentence
function searchWordInSentence(sentence, word) {
    let words = sentence.split(/\s+/);
    let positions = [];
    
    for (let i = 0; i < words.length; i++) {
        if (words[i] === word) positions.push(i);
    }
    return positions;
}

// 15. Pattern search in circular string
function searchInCircularString(text, pattern) {
    let doubled = text + text;
    let positions = [];
    
    for (let i = 0; i < text.length; i++) {
        let match = true;
        for (let j = 0; j < pattern.length; j++) {
            if (doubled[i + j] !== pattern[j]) {
                match = false;
                break;
            }
        }
        if (match) positions.push(i);
    }
    return positions;
}

// ==================== SLIDING WINDOW PATTERN PROBLEMS (16-25) ====================

// 16. Longest substring without repeating characters
function lengthOfLongestSubstring(s) {
    let seen = new Map();
    let maxLength = 0;
    let start = 0;
    
    for (let end = 0; end < s.length; end++) {
        if (seen.has(s[end]) && seen.get(s[end]) >= start) {
            start = seen.get(s[end]) + 1;
        }
        seen.set(s[end], end);
        maxLength = Math.max(maxLength, end - start + 1);
    }
    return maxLength;
}

// 17. Minimum window substring
function minWindowSubstring(s, t) {
    if (s.length < t.length) return "";
    
    let need = new Map();
    for (let char of t) {
        need.set(char, (need.get(char) || 0) + 1);
    }
    
    let have = new Map();
    let required = need.size;
    let formed = 0;
    let left = 0;
    let minLen = Infinity;
    let minLeft = 0;
    
    for (let right = 0; right < s.length; right++) {
        let char = s[right];
        have.set(char, (have.get(char) || 0) + 1);
        
        if (need.has(char) && have.get(char) === need.get(char)) {
            formed++;
        }
        
        while (formed === required && left <= right) {
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                minLeft = left;
            }
            
            let leftChar = s[left];
            have.set(leftChar, have.get(leftChar) - 1);
            if (need.has(leftChar) && have.get(leftChar) < need.get(leftChar)) {
                formed--;
            }
            left++;
        }
    }
    return minLen === Infinity ? "" : s.substring(minLeft, minLeft + minLen);
}

// 18. Permutation in string
function checkInclusion(s1, s2) {
    if (s1.length > s2.length) return false;
    
    let s1Count = new Array(26).fill(0);
    let s2Count = new Array(26).fill(0);
    
    for (let i = 0; i < s1.length; i++) {
        s1Count[s1.charCodeAt(i) - 97]++;
        s2Count[s2.charCodeAt(i) - 97]++;
    }
    
    for (let i = 0; i < 26; i++) {
        if (s1Count[i] !== s2Count[i]) break;
        if (i === 25) return true;
    }
    
    for (let i = s1.length; i < s2.length; i++) {
        s2Count[s2.charCodeAt(i) - 97]++;
        s2Count[s2.charCodeAt(i - s1.length) - 97]--;
        
        let match = true;
        for (let j = 0; j < 26; j++) {
            if (s1Count[j] !== s2Count[j]) {
                match = false;
                break;
            }
        }
        if (match) return true;
    }
    return false;
}

// 19. Find all anagrams in string
function findAnagrams(s, p) {
    let result = [];
    if (s.length < p.length) return result;
    
    let pCount = new Array(26).fill(0);
    let sCount = new Array(26).fill(0);
    
    for (let i = 0; i < p.length; i++) {
        pCount[p.charCodeAt(i) - 97]++;
        sCount[s.charCodeAt(i) - 97]++;
    }
    
    function isEqual() {
        for (let i = 0; i < 26; i++) {
            if (pCount[i] !== sCount[i]) return false;
        }
        return true;
    }
    
    if (isEqual()) result.push(0);
    
    for (let i = p.length; i < s.length; i++) {
        sCount[s.charCodeAt(i) - 97]++;
        sCount[s.charCodeAt(i - p.length) - 97]--;
        if (isEqual()) result.push(i - p.length + 1);
    }
    return result;
}

// 20. Longest repeating character replacement
function characterReplacement(s, k) {
    let count = new Array(26).fill(0);
    let maxCount = 0;
    let maxLength = 0;
    let left = 0;
    
    for (let right = 0; right < s.length; right++) {
        count[s.charCodeAt(right) - 97]++;
        maxCount = Math.max(maxCount, count[s.charCodeAt(right) - 97]);
        
        while (right - left + 1 - maxCount > k) {
            count[s.charCodeAt(left) - 97]--;
            left++;
        }
        maxLength = Math.max(maxLength, right - left + 1);
    }
    return maxLength;
}

// 21. Smallest substring containing all characters
function smallestSubstringContainingAll(text, chars) {
    let need = new Map();
    for (let char of chars) {
        need.set(char, (need.get(char) || 0) + 1);
    }
    
    let have = new Map();
    let required = need.size;
    let formed = 0;
    let left = 0;
    let minLen = Infinity;
    let minLeft = 0;
    
    for (let right = 0; right < text.length; right++) {
        let char = text[right];
        have.set(char, (have.get(char) || 0) + 1);
        
        if (need.has(char) && have.get(char) === need.get(char)) {
            formed++;
        }
        
        while (formed === required && left <= right) {
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                minLeft = left;
            }
            
            let leftChar = text[left];
            have.set(leftChar, have.get(leftChar) - 1);
            if (need.has(leftChar) && have.get(leftChar) < need.get(leftChar)) {
                formed--;
            }
            left++;
        }
    }
    return minLen === Infinity ? "" : text.substring(minLeft, minLeft + minLen);
}

// 22. Maximum vowels in substring of size k
function maxVowels(s, k) {
    let vowels = new Set(['a', 'e', 'i', 'o', 'u']);
    let count = 0;
    
    for (let i = 0; i < k; i++) {
        if (vowels.has(s[i])) count++;
    }
    
    let maxCount = count;
    for (let i = k; i < s.length; i++) {
        if (vowels.has(s[i])) count++;
        if (vowels.has(s[i - k])) count--;
        maxCount = Math.max(maxCount, count);
    }
    return maxCount;
}

// 23. Substring with concatenation of all words
function findSubstring(s, words) {
    if (!words.length) return [];
    
    let wordLen = words[0].length;
    let totalLen = wordLen * words.length;
    let wordCount = new Map();
    
    for (let word of words) {
        wordCount.set(word, (wordCount.get(word) || 0) + 1);
    }
    
    let result = [];
    
    for (let i = 0; i < wordLen; i++) {
        let left = i;
        let seen = new Map();
        let count = 0;
        
        for (let j = i; j <= s.length - wordLen; j += wordLen) {
            let word = s.substring(j, j + wordLen);
            
            if (wordCount.has(word)) {
                seen.set(word, (seen.get(word) || 0) + 1);
                count++;
                
                while (seen.get(word) > wordCount.get(word)) {
                    let leftWord = s.substring(left, left + wordLen);
                    seen.set(leftWord, seen.get(leftWord) - 1);
                    count--;
                    left += wordLen;
                }
                
                if (count === words.length) {
                    result.push(left);
                    let leftWord = s.substring(left, left + wordLen);
                    seen.set(leftWord, seen.get(leftWord) - 1);
                    count--;
                    left += wordLen;
                }
            } else {
                seen.clear();
                count = 0;
                left = j + wordLen;
            }
        }
    }
    return result;
}

// 24. Count binary substrings
function countBinarySubstrings(s) {
    let result = 0;
    let prevLength = 0;
    let currLength = 1;
    
    for (let i = 1; i < s.length; i++) {
        if (s[i] === s[i - 1]) {
            currLength++;
        } else {
            result += Math.min(prevLength, currLength);
            prevLength = currLength;
            currLength = 1;
        }
    }
    result += Math.min(prevLength, currLength);
    return result;
}

// 25. Longest substring with at most k distinct characters
function longestSubstringKDistinct(s, k) {
    if (k === 0) return 0;
    
    let charCount = new Map();
    let left = 0;
    let maxLength = 0;
    
    for (let right = 0; right < s.length; right++) {
        charCount.set(s[right], (charCount.get(s[right]) || 0) + 1);
        
        while (charCount.size > k) {
            charCount.set(s[left], charCount.get(s[left]) - 1);
            if (charCount.get(s[left]) === 0) {
                charCount.delete(s[left]);
            }
            left++;
        }
        maxLength = Math.max(maxLength, right - left + 1);
    }
    return maxLength;
}

// ==================== KMP PATTERN PROBLEMS (26-35) ====================

// 26. Implement KMP algorithm
function KMP(text, pattern) {
    if (!pattern.length) return [];
    
    let lps = buildLPS(pattern);
    let positions = [];
    let i = 0; // index for text
    let j = 0; // index for pattern
    
    while (i < text.length) {
        if (text[i] === pattern[j]) {
            i++;
            j++;
        }
        
        if (j === pattern.length) {
            positions.push(i - j);
            j = lps[j - 1];
        } else if (i < text.length && text[i] !== pattern[j]) {
            if (j !== 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }
    return positions;
}

// 27. Build LPS array
function buildLPS(pattern) {
    let lps = new Array(pattern.length).fill(0);
    let length = 0;
    let i = 1;
    
    while (i < pattern.length) {
        if (pattern[i] === pattern[length]) {
            length++;
            lps[i] = length;
            i++;
        } else {
            if (length !== 0) {
                length = lps[length - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
    return lps;
}

// 28. Repeated substring pattern
function repeatedSubstringPattern(s) {
    let lps = buildLPS(s);
    let last = lps[lps.length - 1];
    let repeatLength = s.length - last;
    return last > 0 && s.length % repeatLength === 0;
}

// 29. Longest prefix which is also suffix
function longestPrefixSuffix(s) {
    let lps = buildLPS(s);
    return lps[lps.length - 1];
}

// 30. Search pattern using KMP in large text
function searchPatternKMP(text, pattern) {
    return KMP(text, pattern);
}

// 31. Find pattern occurrences efficiently (using KMP)
function findAllKMP(text, pattern) {
    return KMP(text, pattern);
}

// 32. Remove repeated pattern using KMP
function removeRepeatedPattern(s) {
    let lps = buildLPS(s);
    let last = lps[lps.length - 1];
    let repeatLength = s.length - last;
    
    if (last > 0 && s.length % repeatLength === 0) {
        return s.substring(0, repeatLength);
    }
    return s;
}

// 33. Find minimum characters to add for palindrome
function minCharsToAddPalindrome(s) {
    let rev = s.split('').reverse().join('');
    let combined = s + '#' + rev;
    let lps = buildLPS(combined);
    return s.length - lps[lps.length - 1];
}

// 34. Detect periodic string pattern
function isPeriodic(s) {
    let lps = buildLPS(s);
    let last = lps[lps.length - 1];
    let period = s.length - last;
    return last > 0 && s.length % period === 0 ? period : s.length;
}

// 35. String matching in streaming text (simulated)
class StreamingMatcher {
    constructor(pattern) {
        this.pattern = pattern;
        this.lps = buildLPS(pattern);
        this.j = 0;
        this.buffer = "";
    }
    
    processChunk(chunk) {
        this.buffer += chunk;
        let matches = [];
        let i = this.buffer.length - chunk.length;
        
        while (i < this.buffer.length) {
            if (this.buffer[i] === this.pattern[this.j]) {
                i++;
                this.j++;
            }
            
            if (this.j === this.pattern.length) {
                matches.push(i - this.j);
                this.j = this.lps[this.j - 1];
            } else if (i < this.buffer.length && this.buffer[i] !== this.pattern[this.j]) {
                if (this.j !== 0) {
                    this.j = this.lps[this.j - 1];
                } else {
                    i++;
                }
            }
        }
        
        if (this.buffer.length > this.pattern.length * 2) {
            let keep = this.pattern.length;
            this.buffer = this.buffer.slice(-keep);
            let adjust = this.buffer.length - keep;
            if (adjust > 0) {
                let tempJ = this.j;
                this.j = 0;
                for (let idx = this.buffer.length - keep; idx < this.buffer.length; idx++) {
                    if (this.buffer[idx] === this.pattern[this.j]) {
                        this.j++;
                        if (this.j === this.pattern.length) {
                            this.j = this.lps[this.j - 1];
                        }
                    } else if (this.j !== 0) {
                        this.j = this.lps[this.j - 1];
                        idx--;
                    }
                }
                if (this.j === 0 && tempJ !== 0) {
                    for (let idx = this.buffer.length - keep; idx < this.buffer.length; idx++) {
                        if (this.buffer[idx] === this.pattern[0]) {
                            this.j = 1;
                            break;
                        }
                    }
                }
            }
        }
        
        return matches;
    }
}

// ==================== RABIN-KARP / HASHING PROBLEMS (36-45) ====================

// 36. Implement Rabin-Karp algorithm
function rabinKarp(text, pattern) {
    const base = 256;
    const mod = 101;
    let positions = [];
    
    if (pattern.length > text.length) return positions;
    
    let patternHash = 0;
    let textHash = 0;
    let h = 1;
    
    for (let i = 0; i < pattern.length - 1; i++) {
        h = (h * base) % mod;
    }
    
    for (let i = 0; i < pattern.length; i++) {
        patternHash = (base * patternHash + pattern.charCodeAt(i)) % mod;
        textHash = (base * textHash + text.charCodeAt(i)) % mod;
    }
    
    for (let i = 0; i <= text.length - pattern.length; i++) {
        if (patternHash === textHash) {
            let match = true;
            for (let j = 0; j < pattern.length; j++) {
                if (text[i + j] !== pattern[j]) {
                    match = false;
                    break;
                }
            }
            if (match) positions.push(i);
        }
        
        if (i < text.length - pattern.length) {
            textHash = (base * (textHash - text.charCodeAt(i) * h) + text.charCodeAt(i + pattern.length)) % mod;
            if (textHash < 0) textHash += mod;
        }
    }
    return positions;
}

// 37. Rolling hash substring matching
function rollingHashMatch(text, pattern) {
    return rabinKarp(text, pattern);
}

// 38. Find duplicate substrings
function findDuplicateSubstrings(s, minLength) {
    let seen = new Map();
    let duplicates = new Set();
    const base = 256;
    const mod = 1000000007;
    
    for (let len = minLength; len <= s.length / 2; len++) {
        let hash = 0;
        let h = 1;
        
        for (let i = 0; i < len - 1; i++) {
            h = (h * base) % mod;
        }
        
        for (let i = 0; i < len; i++) {
            hash = (base * hash + s.charCodeAt(i)) % mod;
        }
        
        seen.clear();
        seen.set(hash, [0]);
        
        for (let i = len; i <= s.length - len; i++) {
            hash = (base * (hash - s.charCodeAt(i - len) * h) + s.charCodeAt(i)) % mod;
            if (hash < 0) hash += mod;
            
            if (seen.has(hash)) {
                let substr = s.substring(i - len + 1, i + 1);
                for (let start of seen.get(hash)) {
                    if (s.substring(start, start + len) === substr) {
                        duplicates.add(substr);
                    }
                }
                seen.get(hash).push(i - len + 1);
            } else {
                seen.set(hash, [i - len + 1]);
            }
        }
    }
    return Array.from(duplicates);
}

// 39. Longest duplicate substring
function longestDupSubstring(s) {
    let left = 1, right = s.length - 1;
    let result = "";
    
    function search(len) {
        let seen = new Map();
        const base = 256;
        const mod = 1000000007;
        let hash = 0;
        let h = 1;
        
        for (let i = 0; i < len - 1; i++) {
            h = (h * base) % mod;
        }
        
        for (let i = 0; i < len; i++) {
            hash = (base * hash + s.charCodeAt(i)) % mod;
        }
        seen.set(hash, [0]);
        
        for (let i = len; i < s.length; i++) {
            hash = (base * (hash - s.charCodeAt(i - len) * h) + s.charCodeAt(i)) % mod;
            if (hash < 0) hash += mod;
            
            if (seen.has(hash)) {
                let substr = s.substring(i - len + 1, i + 1);
                for (let start of seen.get(hash)) {
                    if (s.substring(start, start + len) === substr) {
                        return substr;
                    }
                }
                seen.get(hash).push(i - len + 1);
            } else {
                seen.set(hash, [i - len + 1]);
            }
        }
        return "";
    }
    
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        let dup = search(mid);
        if (dup) {
            result = dup;
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return result;
}

// 40. Group identical strings using hashing
function groupIdenticalStrings(strings) {
    let groups = new Map();
    
    for (let str of strings) {
        let hash = 0;
        for (let char of str) {
            hash = ((hash << 5) - hash) + char.charCodeAt(0);
        }
        if (!groups.has(hash)) groups.set(hash, []);
        groups.get(hash).push(str);
    }
    return Array.from(groups.values());
}

// 41. Find repeated DNA sequences
function findRepeatedDnaSequences(s) {
    let seen = new Set();
    let repeated = new Set();
    
    for (let i = 0; i <= s.length - 10; i++) {
        let sequence = s.substring(i, i + 10);
        if (seen.has(sequence)) {
            repeated.add(sequence);
        }
        seen.add(sequence);
    }
    return Array.from(repeated);
}

// 42. Pattern search in huge files (simulated with streaming)
function searchInLargeFile(content, pattern, chunkSize = 1024) {
    let positions = [];
    let overlap = pattern.length - 1;
    let buffer = "";
    
    for (let i = 0; i < content.length; i += chunkSize - overlap) {
        let chunk = content.substring(i, Math.min(i + chunkSize, content.length));
        buffer += chunk;
        
        if (buffer.length >= pattern.length) {
            let matches = rabinKarp(buffer, pattern);
            for (let pos of matches) {
                positions.push(i + pos - (buffer.length - chunk.length));
            }
        }
        
        if (buffer.length > pattern.length * 2) {
            buffer = buffer.slice(-pattern.length - overlap);
        }
    }
    return positions;
}

// 43. Double hashing collision handling
function doubleHashingSearch(text, pattern) {
    const base1 = 256, mod1 = 1000000007;
    const base2 = 257, mod2 = 1000000009;
    
    if (pattern.length > text.length) return -1;
    
    let patternHash1 = 0, patternHash2 = 0;
    let textHash1 = 0, textHash2 = 0;
    let h1 = 1, h2 = 1;
    
    for (let i = 0; i < pattern.length - 1; i++) {
        h1 = (h1 * base1) % mod1;
        h2 = (h2 * base2) % mod2;
    }
    
    for (let i = 0; i < pattern.length; i++) {
        patternHash1 = (base1 * patternHash1 + pattern.charCodeAt(i)) % mod1;
        patternHash2 = (base2 * patternHash2 + pattern.charCodeAt(i)) % mod2;
        textHash1 = (base1 * textHash1 + text.charCodeAt(i)) % mod1;
        textHash2 = (base2 * textHash2 + text.charCodeAt(i)) % mod2;
    }
    
    for (let i = 0; i <= text.length - pattern.length; i++) {
        if (patternHash1 === textHash1 && patternHash2 === textHash2) {
            let match = true;
            for (let j = 0; j < pattern.length; j++) {
                if (text[i + j] !== pattern[j]) {
                    match = false;
                    break;
                }
            }
            if (match) return i;
        }
        
        if (i < text.length - pattern.length) {
            textHash1 = (base1 * (textHash1 - text.charCodeAt(i) * h1) + text.charCodeAt(i + pattern.length)) % mod1;
            textHash2 = (base2 * (textHash2 - text.charCodeAt(i) * h2) + text.charCodeAt(i + pattern.length)) % mod2;
            if (textHash1 < 0) textHash1 += mod1;
            if (textHash2 < 0) textHash2 += mod2;
        }
    }
    return -1;
}

// 44. Search multiple patterns using rolling hash
function searchMultiplePatterns(text, patterns) {
    let results = new Map();
    for (let pattern of patterns) {
        results.set(pattern, rabinKarp(text, pattern));
    }
    return results;
}

// 45. Palindrome substring using hashing
function countPalindromicSubstrings(s) {
    let count = 0;
    const base = 256;
    const mod = 1000000007;
    
    function hashString(str) {
        let hash = 0;
        for (let char of str) {
            hash = (base * hash + char.charCodeAt(0)) % mod;
        }
        return hash;
    }
    
    function isPalindrome(str) {
        let left = 0, right = str.length - 1;
        while (left < right) {
            if (str[left] !== str[right]) return false;
            left++;
            right--;
        }
        return true;
    }
    
    for (let i = 0; i < s.length; i++) {
        for (let j = i; j < s.length; j++) {
            let substr = s.substring(i, j + 1);
            if (isPalindrome(substr)) count++;
        }
    }
    return count;
}

// ==================== TRIE-BASED PATTERN SEARCHING (46-55) ====================

// 46. Implement Trie
class TrieNode {
    constructor() {
        this.children = new Map();
        this.isEnd = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }
    
    insert(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode());
            }
            node = node.children.get(char);
        }
        node.isEnd = true;
    }
    
    search(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children.has(char)) return false;
            node = node.children.get(char);
        }
        return node.isEnd;
    }
    
    startsWith(prefix) {
        let node = this.root;
        for (let char of prefix) {
            if (!node.children.has(char)) return false;
            node = node.children.get(char);
        }
        return true;
    }
}

// 47. Insert and search word in Trie (same as above)

// 48. Prefix search using Trie
function prefixSearch(trie, prefix) {
    let node = trie.root;
    for (let char of prefix) {
        if (!node.children.has(char)) return [];
        node = node.children.get(char);
    }
    
    let results = [];
    function dfs(node, current) {
        if (node.isEnd) results.push(prefix + current);
        for (let [char, child] of node.children) {
            dfs(child, current + char);
        }
    }
    dfs(node, "");
    return results;
}

// 49. Word dictionary with wildcard support
class WordDictionary {
    constructor() {
        this.root = new TrieNode();
    }
    
    addWord(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode());
            }
            node = node.children.get(char);
        }
        node.isEnd = true;
    }
    
    search(word) {
        function dfs(node, idx) {
            if (idx === word.length) return node.isEnd;
            let char = word[idx];
            
            if (char === '.') {
                for (let child of node.children.values()) {
                    if (dfs(child, idx + 1)) return true;
                }
                return false;
            } else {
                if (!node.children.has(char)) return false;
                return dfs(node.children.get(char), idx + 1);
            }
        }
        return dfs(this.root, 0);
    }
}

// 50. Replace words using Trie
function replaceWords(dictionary, sentence) {
    let trie = new Trie();
    for (let word of dictionary) {
        trie.insert(word);
    }
    
    let words = sentence.split(' ');
    for (let i = 0; i < words.length; i++) {
        let node = trie.root;
        let prefix = "";
        for (let char of words[i]) {
            if (!node.children.has(char)) break;
            node = node.children.get(char);
            prefix += char;
            if (node.isEnd) {
                words[i] = prefix;
                break;
            }
        }
    }
    return words.join(' ');
}

// 51. Search suggestions system
class SearchSuggestions {
    constructor() {
        this.trie = new Trie();
        this.suggestions = [];
    }
    
    insertWord(word) {
        this.trie.insert(word);
    }
    
    search(prefix) {
        let node = this.trie.root;
        for (let char of prefix) {
            if (!node.children.has(char)) return [];
            node = node.children.get(char);
        }
        
        let results = [];
        function dfs(node, current) {
            if (results.length >= 3) return;
            if (node.isEnd) results.push(prefix + current);
            let sortedChars = Array.from(node.children.keys()).sort();
            for (let char of sortedChars) {
                dfs(node.children.get(char), current + char);
            }
        }
        dfs(node, "");
        return results;
    }
}

// 52. Longest common prefix
function longestCommonPrefix(strings) {
    if (!strings.length) return "";
    
    let trie = new Trie();
    for (let str of strings) {
        trie.insert(str);
    }
    
    let prefix = "";
    let node = trie.root;
    
    while (node.children.size === 1 && !node.isEnd) {
        let char = Array.from(node.children.keys())[0];
        prefix += char;
        node = node.children.get(char);
    }
    return prefix;
}

// 53. Word search II
function findWords(board, words) {
    let trie = new Trie();
    for (let word of words) {
        trie.insert(word);
    }
    
    let result = new Set();
    let rows = board.length;
    let cols = board[0].length;
    
    function dfs(node, i, j, path) {
        if (node.isEnd) {
            result.add(path);
        }
        if (i < 0 || i >= rows || j < 0 || j >= cols || board[i][j] === '#') return;
        
        let char = board[i][j];
        if (!node.children.has(char)) return;
        
        board[i][j] = '#';
        dfs(node.children.get(char), i + 1, j, path + char);
        dfs(node.children.get(char), i - 1, j, path + char);
        dfs(node.children.get(char), i, j + 1, path + char);
        dfs(node.children.get(char), i, j - 1, path + char);
        board[i][j] = char;
    }
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            dfs(trie.root, i, j, "");
        }
    }
    return Array.from(result);
}

// 54. Design autocomplete system
class AutocompleteSystem {
    constructor(sentences, times) {
        this.root = new TrieNode();
        this.map = new Map();
        this.currentInput = "";
        
        for (let i = 0; i < sentences.length; i++) {
            this.map.set(sentences[i], times[i]);
            this.insert(sentences[i]);
        }
    }
    
    insert(sentence) {
        let node = this.root;
        for (let char of sentence) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode());
            }
            node = node.children.get(char);
            if (!node.sentences) node.sentences = new Map();
            node.sentences.set(sentence, this.map.get(sentence));
        }
    }
    
    input(c) {
        if (c === '#') {
            this.map.set(this.currentInput, (this.map.get(this.currentInput) || 0) + 1);
            this.insert(this.currentInput);
            this.currentInput = "";
            return [];
        }
        
        this.currentInput += c;
        let node = this.root;
        for (let char of this.currentInput) {
            if (!node.children.has(char)) return [];
            node = node.children.get(char);
        }
        
        if (!node.sentences) return [];
        let suggestions = Array.from(node.sentences.entries());
        suggestions.sort((a, b) => {
            if (a[1] !== b[1]) return b[1] - a[1];
            return a[0].localeCompare(b[0]);
        });
        
        return suggestions.slice(0, 3).map(s => s[0]);
    }
}

// 55. Stream of characters matching
class StreamChecker {
    constructor(words) {
        this.root = new TrieNode();
        this.stream = "";
        
        for (let word of words) {
            let reversed = word.split('').reverse().join('');
            let node = this.root;
            for (let char of reversed) {
                if (!node.children.has(char)) {
                    node.children.set(char, new TrieNode());
                }
                node = node.children.get(char);
            }
            node.isEnd = true;
        }
    }
    
    query(letter) {
        this.stream = letter + this.stream;
        let node = this.root;
        
        for (let i = 0; i < this.stream.length && i < 200; i++) {
            let char = this.stream[i];
            if (!node.children.has(char)) return false;
            node = node.children.get(char);
            if (node.isEnd) return true;
        }
        return false;
    }
}

// ==================== ADVANCED STRING MATCHING ALGORITHMS (56-65) ====================

// 56. Z-algorithm implementation
function zAlgorithm(s) {
    let n = s.length;
    let Z = new Array(n).fill(0);
    let left = 0, right = 0;
    
    for (let i = 1; i < n; i++) {
        if (i > right) {
            left = right = i;
            while (right < n && s[right - left] === s[right]) {
                right++;
            }
            Z[i] = right - left;
            right--;
        } else {
            let k = i - left;
            if (Z[k] < right - i + 1) {
                Z[i] = Z[k];
            } else {
                left = i;
                while (right < n && s[right - left] === s[right]) {
                    right++;
                }
                Z[i] = right - left;
                right--;
            }
        }
    }
    return Z;
}

// 57. Pattern matching using Z-function
function searchPatternZAlgorithm(text, pattern) {
    let combined = pattern + '$' + text;
    let Z = zAlgorithm(combined);
    let positions = [];
    
    for (let i = pattern.length + 1; i < Z.length; i++) {
        if (Z[i] === pattern.length) {
            positions.push(i - pattern.length - 1);
        }
    }
    return positions;
}

// 58. Boyer-Moore algorithm
function boyerMooreSearch(text, pattern) {
    if (pattern.length > text.length) return -1;
    
    function buildBadCharTable(pattern) {
        let table = new Array(256).fill(-1);
        for (let i = 0; i < pattern.length; i++) {
            table[pattern.charCodeAt(i)] = i;
        }
        return table;
    }
    
    let badChar = buildBadCharTable(pattern);
    let shifts = 0;
    
    while (shifts <= text.length - pattern.length) {
        let j = pattern.length - 1;
        
        while (j >= 0 && pattern[j] === text[shifts + j]) {
            j--;
        }
        
        if (j < 0) {
            return shifts;
        } else {
            let badCharShift = j - badChar[text.charCodeAt(shifts + j)];
            shifts += Math.max(1, badCharShift);
        }
    }
    return -1;
}

// 59. Boyer-Moore-Horspool algorithm
function horspoolSearch(text, pattern) {
    if (pattern.length > text.length) return -1;
    
    let shiftTable = new Array(256).fill(pattern.length);
    for (let i = 0; i < pattern.length - 1; i++) {
        shiftTable[pattern.charCodeAt(i)] = pattern.length - 1 - i;
    }
    
    let pos = 0;
    while (pos <= text.length - pattern.length) {
        let j = pattern.length - 1;
        while (j >= 0 && pattern[j] === text[pos + j]) {
            j--;
        }
        if (j < 0) return pos;
        pos += shiftTable[text.charCodeAt(pos + pattern.length - 1)];
    }
    return -1;
}

// 60. Aho-Corasick algorithm (multiple pattern matching)
class AhoCorasickNode {
    constructor() {
        this.children = new Map();
        this.fail = null;
        this.output = [];
    }
}

class AhoCorasick {
    constructor() {
        this.root = new AhoCorasickNode();
    }
    
    insert(pattern) {
        let node = this.root;
        for (let char of pattern) {
            if (!node.children.has(char)) {
                node.children.set(char, new AhoCorasickNode());
            }
            node = node.children.get(char);
        }
        node.output.push(pattern);
    }
    
    buildFailureLinks() {
        let queue = [];
        for (let [char, child] of this.root.children) {
            child.fail = this.root;
            queue.push(child);
        }
        
        while (queue.length) {
            let current = queue.shift();
            
            for (let [char, child] of current.children) {
                let fail = current.fail;
                while (fail !== null && !fail.children.has(char)) {
                    fail = fail.fail;
                }
                child.fail = fail ? fail.children.get(char) || this.root : this.root;
                child.output.push(...child.fail.output);
                queue.push(child);
            }
        }
    }
    
    search(text) {
        let results = new Map();
        let node = this.root;
        
        for (let i = 0; i < text.length; i++) {
            let char = text[i];
            while (node !== this.root && !node.children.has(char)) {
                node = node.fail;
            }
            if (node.children.has(char)) {
                node = node.children.get(char);
            }
            
            for (let pattern of node.output) {
                if (!results.has(pattern)) results.set(pattern, []);
                results.get(pattern).push(i - pattern.length + 1);
            }
        }
        return results;
    }
}

// 61. Multiple pattern matching (using Aho-Corasick)
function multiplePatternSearch(text, patterns) {
    let ac = new AhoCorasick();
    for (let pattern of patterns) {
        ac.insert(pattern);
    }
    ac.buildFailureLinks();
    return ac.search(text);
}

// 62. Finite automata pattern matching
function buildAutomaton(pattern) {
    let alphabet = new Set();
    for (let char of pattern) alphabet.add(char);
    let alphabetArray = Array.from(alphabet);
    let m = pattern.length;
    let tf = new Array(m + 1);
    
    for (let i = 0; i <= m; i++) {
        tf[i] = new Map();
        for (let char of alphabetArray) {
            if (i < m && char === pattern[i]) {
                tf[i].set(char, i + 1);
            } else {
                let k = i;
                while (k > 0 && char !== pattern[k]) {
                    k = tf[k - 1].get(pattern[k]) || 0;
                }
                if (char === pattern[k]) k++;
                tf[i].set(char, k);
            }
        }
    }
    return tf;
}

function finiteAutomataSearch(text, pattern) {
    let tf = buildAutomaton(pattern);
    let state = 0;
    let positions = [];
    
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        state = tf[state].get(char) || 0;
        if (state === pattern.length) {
            positions.push(i - pattern.length + 1);
        }
    }
    return positions;
}

// 63. Suffix array construction (simplified)
function buildSuffixArray(s) {
    let suffixes = [];
    for (let i = 0; i < s.length; i++) {
        suffixes.push({ index: i, suffix: s.substring(i) });
    }
    suffixes.sort((a, b) => a.suffix.localeCompare(b.suffix));
    return suffixes.map(suf => suf.index);
}

// 64. Pattern search using suffix array
function searchSuffixArray(s, pattern) {
    let suffixArray = buildSuffixArray(s);
    let left = 0, right = suffixArray.length - 1;
    
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        let suffix = s.substring(suffixArray[mid]);
        
        if (suffix.startsWith(pattern)) {
            let positions = [];
            let i = mid;
            while (i >= 0 && s.substring(suffixArray[i]).startsWith(pattern)) {
                positions.push(suffixArray[i]);
                i--;
            }
            i = mid + 1;
            while (i < suffixArray.length && s.substring(suffixArray[i]).startsWith(pattern)) {
                positions.push(suffixArray[i]);
                i++;
            }
            return positions.sort((a, b) => a - b);
        } else if (suffix < pattern) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return [];
}

// 65. Longest common substring using suffix array
function longestCommonSubstring(s1, s2) {
    let combined = s1 + '#' + s2;
    let suffixArray = buildSuffixArray(combined);
    
    function lcp(i, j) {
        let len = 0;
        while (i < combined.length && j < combined.length && combined[i] === combined[j]) {
            len++;
            i++;
            j++;
        }
        return len;
    }
    
    let maxLen = 0;
    let result = "";
    
    for (let i = 1; i < suffixArray.length; i++) {
        let idx1 = suffixArray[i - 1];
        let idx2 = suffixArray[i];
        
        let inS1 = idx1 < s1.length;
        let inS2 = idx2 < s1.length;
        
        if ((inS1 && !inS2) || (!inS1 && inS2)) {
            let len = lcp(idx1, idx2);
            if (len > maxLen) {
                maxLen = len;
                result = combined.substring(idx1, idx1 + len);
            }
        }
    }
    return result;
}

// ==================== EXPORT ====================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        // Basics (1-15)
        naivePatternSearch, firstOccurrence, findAllOccurrences, countOccurrences,
        caseInsensitiveSearch, searchWithSpaces, replacePattern, patternExists,
        longestRepeatingSubstring, shortestUniqueSubstring, prefixMatches,
        suffixMatches, searchInArray, searchWordInSentence, searchInCircularString,
        
        // Sliding Window (16-25)
        lengthOfLongestSubstring, minWindowSubstring, checkInclusion, findAnagrams,
        characterReplacement, smallestSubstringContainingAll, maxVowels,
        findSubstring, countBinarySubstrings, longestSubstringKDistinct,
        
        // KMP (26-35)
        KMP, buildLPS, repeatedSubstringPattern, longestPrefixSuffix,
        searchPatternKMP, findAllKMP, removeRepeatedPattern, minCharsToAddPalindrome,
        isPeriodic, StreamingMatcher,
        
        // Rabin-Karp (36-45)
        rabinKarp, rollingHashMatch, findDuplicateSubstrings, longestDupSubstring,
        groupIdenticalStrings, findRepeatedDnaSequences, searchInLargeFile,
        doubleHashingSearch, searchMultiplePatterns, countPalindromicSubstrings,
        
        // Trie (46-55)
        Trie, WordDictionary, replaceWords, SearchSuggestions, longestCommonPrefix,
        findWords, AutocompleteSystem, StreamChecker,
        
        // Advanced (56-65)
        zAlgorithm, searchPatternZAlgorithm, boyerMooreSearch, horspoolSearch,
        AhoCorasick, multiplePatternSearch, finiteAutomataSearch,
        buildSuffixArray, searchSuffixArray, longestCommonSubstring
    };
}