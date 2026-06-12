// Node class for singly linked list
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

// Doubly linked list node
class DoublyListNode {
    constructor(val = 0, prev = null, next = null) {
        this.val = val;
        this.prev = prev;
        this.next = next;
    }
}

// ==================== LINKED LIST BASICS (1-16) ====================

// 1. Create a singly linked list from array
function createLinkedList(arr) {
    if (!arr.length) return null;
    let head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}

// 2. Traverse and print a linked list
function printLinkedList(head) {
    let result = [];
    let current = head;
    while (current) {
        result.push(current.val);
        current = current.next;
    }
    console.log(result.join(' → '));
    return result;
}

// 3. Find the length of a linked list
function getLength(head) {
    let length = 0;
    let current = head;
    while (current) {
        length++;
        current = current.next;
    }
    return length;
}

// 4. Search for a value in a linked list
function searchValue(head, target) {
    let current = head;
    let index = 0;
    while (current) {
        if (current.val === target) return index;
        current = current.next;
        index++;
    }
    return -1;
}

// 5. Insert node at the beginning
function insertAtBeginning(head, val) {
    let newNode = new ListNode(val);
    newNode.next = head;
    return newNode;
}

// 6. Insert node at the end
function insertAtEnd(head, val) {
    let newNode = new ListNode(val);
    if (!head) return newNode;
    let current = head;
    while (current.next) {
        current = current.next;
    }
    current.next = newNode;
    return head;
}

// 7. Insert node at a specific position (0-indexed)
function insertAtPosition(head, val, position) {
    let newNode = new ListNode(val);
    if (position === 0) {
        newNode.next = head;
        return newNode;
    }
    let current = head;
    for (let i = 0; i < position - 1 && current; i++) {
        current = current.next;
    }
    if (!current) return head;
    newNode.next = current.next;
    current.next = newNode;
    return head;
}

// 8. Delete first node
function deleteFirst(head) {
    if (!head) return null;
    return head.next;
}

// 9. Delete last node
function deleteLast(head) {
    if (!head) return null;
    if (!head.next) return null;
    let current = head;
    while (current.next.next) {
        current = current.next;
    }
    current.next = null;
    return head;
}

// 10. Delete node by value (first occurrence)
function deleteByValue(head, val) {
    if (!head) return null;
    if (head.val === val) return head.next;
    let current = head;
    while (current.next && current.next.val !== val) {
        current = current.next;
    }
    if (current.next) {
        current.next = current.next.next;
    }
    return head;
}

// 11. Delete node at specific position
function deleteAtPosition(head, position) {
    if (!head) return null;
    if (position === 0) return head.next;
    let current = head;
    for (let i = 0; i < position - 1 && current; i++) {
        current = current.next;
    }
    if (!current || !current.next) return head;
    current.next = current.next.next;
    return head;
}

// 12. Reverse a linked list iteratively
function reverseIterative(head) {
    let prev = null;
    let current = head;
    while (current) {
        let next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    return prev;
}

// 13. Reverse a linked list recursively
function reverseRecursive(head) {
    if (!head || !head.next) return head;
    let newHead = reverseRecursive(head.next);
    head.next.next = head;
    head.next = null;
    return newHead;
}

// 14. Find the middle of a linked list
function findMiddle(head) {
    let slow = head, fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
}

// 15. Find the nth node from the end (1-indexed)
function nthFromEnd(head, n) {
    let slow = head, fast = head;
    for (let i = 0; i < n; i++) {
        if (!fast) return null;
        fast = fast.next;
    }
    while (fast) {
        slow = slow.next;
        fast = fast.next;
    }
    return slow;
}

// ==================== TWO POINTERS / FAST & SLOW POINTER (16-25) ====================

// 16. Detect cycle in a linked list
function hasCycle(head) {
    let slow = head, fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) return true;
    }
    return false;
}

// 17. Find the start of a cycle
function detectCycleStart(head) {
    let slow = head, fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) {
            slow = head;
            while (slow !== fast) {
                slow = slow.next;
                fast = fast.next;
            }
            return slow;
        }
    }
    return null;
}

// 18. Check if linked list has a cycle and find its length
function cycleLength(head) {
    let slow = head, fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) {
            let length = 1;
            fast = fast.next;
            while (slow !== fast) {
                fast = fast.next;
                length++;
            }
            return length;
        }
    }
    return 0;
}

// 19. Remove nth node from end
function removeNthFromEnd(head, n) {
    let dummy = new ListNode(0);
    dummy.next = head;
    let slow = dummy, fast = dummy;
    for (let i = 0; i <= n; i++) {
        fast = fast.next;
    }
    while (fast) {
        slow = slow.next;
        fast = fast.next;
    }
    slow.next = slow.next.next;
    return dummy.next;
}

// 20. Check if linked list is palindrome
function isPalindrome(head) {
    if (!head || !head.next) return true;
    
    let slow = head, fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    let prev = null;
    while (slow) {
        let next = slow.next;
        slow.next = prev;
        prev = slow;
        slow = next;
    }
    
    let left = head, right = prev;
    while (right) {
        if (left.val !== right.val) return false;
        left = left.next;
        right = right.next;
    }
    return true;
}

// 21. Reorder list: L0 → Ln → L1 → Ln-1...
function reorderList(head) {
    if (!head || !head.next) return;
    
    let slow = head, fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    let prev = null;
    while (slow) {
        let next = slow.next;
        slow.next = prev;
        prev = slow;
        slow = next;
    }
    
    let first = head, second = prev;
    while (second.next) {
        let temp1 = first.next;
        let temp2 = second.next;
        first.next = second;
        second.next = temp1;
        first = temp1;
        second = temp2;
    }
}

// 22. Split linked list into two halves
function splitIntoHalves(head) {
    if (!head) return [null, null];
    let slow = head, fast = head;
    let prev = null;
    while (fast && fast.next) {
        prev = slow;
        slow = slow.next;
        fast = fast.next.next;
    }
    if (prev) prev.next = null;
    return [head, slow];
}

// 23. Split linked list into k parts
function splitListToParts(head, k) {
    let length = getLength(head);
    let partSize = Math.floor(length / k);
    let remainder = length % k;
    let result = [];
    let current = head;
    
    for (let i = 0; i < k; i++) {
        let partHead = current;
        let currentSize = partSize + (i < remainder ? 1 : 0);
        
        for (let j = 0; j < currentSize - 1 && current; j++) {
            current = current.next;
        }
        
        if (current) {
            let next = current.next;
            current.next = null;
            current = next;
        }
        result.push(partHead);
    }
    return result;
}

// 24. Find intersection point of two linked lists
function getIntersectionNode(headA, headB) {
    if (!headA || !headB) return null;
    let a = headA, b = headB;
    while (a !== b) {
        a = a ? a.next : headB;
        b = b ? b.next : headA;
    }
    return a;
}

// ==================== REVERSAL / POINTER MANIPULATION (25-36) ====================

// 25. Reverse linked list in groups of k
function reverseKGroup(head, k) {
    if (!head || k === 1) return head;
    
    let dummy = new ListNode(0);
    dummy.next = head;
    let prevGroup = dummy;
    
    while (true) {
        let kth = getKth(prevGroup, k);
        if (!kth) break;
        
        let nextGroup = kth.next;
        let prev = nextGroup;
        let current = prevGroup.next;
        
        while (current !== nextGroup) {
            let next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        
        let temp = prevGroup.next;
        prevGroup.next = kth;
        prevGroup = temp;
    }
    return dummy.next;
}

function getKth(node, k) {
    while (node && k > 0) {
        node = node.next;
        k--;
    }
    return node;
}

// 26. Reverse nodes between positions left and right
function reverseBetween(head, left, right) {
    if (!head || left === right) return head;
    
    let dummy = new ListNode(0);
    dummy.next = head;
    let prev = dummy;
    
    for (let i = 0; i < left - 1; i++) {
        prev = prev.next;
    }
    
    let current = prev.next;
    for (let i = 0; i < right - left; i++) {
        let next = current.next;
        current.next = next.next;
        next.next = prev.next;
        prev.next = next;
    }
    return dummy.next;
}

// 27. Swap nodes in pairs
function swapPairs(head) {
    let dummy = new ListNode(0);
    dummy.next = head;
    let prev = dummy;
    
    while (prev.next && prev.next.next) {
        let first = prev.next;
        let second = first.next;
        
        first.next = second.next;
        second.next = first;
        prev.next = second;
        
        prev = first;
    }
    return dummy.next;
}

// 28. Rotate linked list to the right by k
function rotateRight(head, k) {
    if (!head || !head.next || k === 0) return head;
    
    let length = 1;
    let tail = head;
    while (tail.next) {
        tail = tail.next;
        length++;
    }
    
    k = k % length;
    if (k === 0) return head;
    
    let newTail = head;
    for (let i = 0; i < length - k - 1; i++) {
        newTail = newTail.next;
    }
    
    let newHead = newTail.next;
    newTail.next = null;
    tail.next = head;
    
    return newHead;
}

// 29. Reverse alternate k nodes
function reverseAlternateK(head, k) {
    if (!head || k <= 1) return head;
    
    let current = head;
    let prev = null;
    let shouldReverse = true;
    
    while (current) {
        if (shouldReverse) {
            let count = 0;
            let start = current;
            let temp = null;
            
            while (current && count < k) {
                let next = current.next;
                current.next = temp;
                temp = current;
                current = next;
                count++;
            }
            
            if (prev) prev.next = temp;
            else head = temp;
            start.next = current;
            prev = start;
        } else {
            for (let i = 0; i < k && current; i++) {
                prev = current;
                current = current.next;
            }
        }
        shouldReverse = !shouldReverse;
    }
    return head;
}

// 30. Reverse every even-length group
function reverseEvenLengthGroups(head) {
    if (!head) return head;
    
    let current = head;
    let groupNum = 1;
    
    while (current) {
        let groupStart = current;
        let groupLength = 0;
        
        let temp = current;
        while (temp && groupLength < groupNum) {
            groupLength++;
            temp = temp.next;
        }
        
        if (groupLength % 2 === 0) {
            let prev = null;
            let node = groupStart;
            let nextGroup = temp;
            
            for (let i = 0; i < groupLength; i++) {
                let next = node.next;
                node.next = prev;
                prev = node;
                node = next;
            }
            
            groupStart.next = nextGroup;
            if (groupNum === 1) head = prev;
            else {
                let prevGroup = head;
                for (let i = 1; i < groupNum; i++) {
                    while (prevGroup.next !== groupStart) prevGroup = prevGroup.next;
                }
                prevGroup.next = prev;
            }
            current = nextGroup;
        } else {
            current = temp;
        }
        groupNum++;
    }
    return head;
}

// 31. Reverse a doubly linked list
function reverseDoublyLinkedList(head) {
    if (!head) return null;
    let current = head;
    let temp = null;
    
    while (current) {
        temp = current.prev;
        current.prev = current.next;
        current.next = temp;
        current = current.prev;
    }
    
    if (temp) return temp.prev;
    return head;
}

// 32. Flatten a multilevel doubly linked list
class MultiLevelNode {
    constructor(val = 0, prev = null, next = null, child = null) {
        this.val = val;
        this.prev = prev;
        this.next = next;
        this.child = child;
    }
}

function flattenMultilevel(head) {
    if (!head) return null;
    
    let dummy = new MultiLevelNode(0);
    let prev = dummy;
    let stack = [head];
    
    while (stack.length) {
        let node = stack.pop();
        node.prev = prev;
        prev.next = node;
        
        if (node.next) stack.push(node.next);
        if (node.child) {
            stack.push(node.child);
            node.child = null;
        }
        prev = node;
    }
    
    dummy.next.prev = null;
    return dummy.next;
}

// 33. Convert binary linked list to integer
function binaryToInteger(head) {
    let result = 0;
    let current = head;
    while (current) {
        result = (result << 1) | current.val;
        current = current.next;
    }
    return result;
}

// ==================== SORTING / MERGING / PARTITIONING (34-46) ====================

// 34. Merge two sorted linked lists
function mergeTwoLists(l1, l2) {
    let dummy = new ListNode(0);
    let current = dummy;
    
    while (l1 && l2) {
        if (l1.val < l2.val) {
            current.next = l1;
            l1 = l1.next;
        } else {
            current.next = l2;
            l2 = l2.next;
        }
        current = current.next;
    }
    
    current.next = l1 || l2;
    return dummy.next;
}

// 35. Merge k sorted linked lists
function mergeKLists(lists) {
    if (!lists.length) return null;
    if (lists.length === 1) return lists[0];
    
    function merge(l, r) {
        if (l === r) return lists[l];
        let mid = Math.floor((l + r) / 2);
        let left = merge(l, mid);
        let right = merge(mid + 1, r);
        return mergeTwoLists(left, right);
    }
    
    return merge(0, lists.length - 1);
}

// 36. Sort linked list using merge sort
function sortList(head) {
    if (!head || !head.next) return head;
    
    let slow = head, fast = head, prev = null;
    while (fast && fast.next) {
        prev = slow;
        slow = slow.next;
        fast = fast.next.next;
    }
    prev.next = null;
    
    let left = sortList(head);
    let right = sortList(slow);
    
    return mergeTwoLists(left, right);
}

// 37. Insertion sort on linked list
function insertionSortList(head) {
    if (!head) return null;
    
    let dummy = new ListNode(0);
    let current = head;
    
    while (current) {
        let prev = dummy;
        let next = current.next;
        
        while (prev.next && prev.next.val < current.val) {
            prev = prev.next;
        }
        
        current.next = prev.next;
        prev.next = current;
        current = next;
    }
    
    return dummy.next;
}

// 38. Partition linked list around value x
function partition(head, x) {
    let beforeHead = new ListNode(0);
    let before = beforeHead;
    let afterHead = new ListNode(0);
    let after = afterHead;
    
    while (head) {
        if (head.val < x) {
            before.next = head;
            before = before.next;
        } else {
            after.next = head;
            after = after.next;
        }
        head = head.next;
    }
    
    after.next = null;
    before.next = afterHead.next;
    return beforeHead.next;
}

// 39. Remove duplicates from sorted linked list
function deleteDuplicates(head) {
    let current = head;
    while (current && current.next) {
        if (current.val === current.next.val) {
            current.next = current.next.next;
        } else {
            current = current.next;
        }
    }
    return head;
}

// 40. Remove all duplicates from sorted linked list II
function deleteDuplicatesAll(head) {
    let dummy = new ListNode(0);
    dummy.next = head;
    let prev = dummy;
    let current = head;
    
    while (current) {
        let hasDuplicate = false;
        while (current.next && current.val === current.next.val) {
            current = current.next;
            hasDuplicate = true;
        }
        
        if (hasDuplicate) {
            prev.next = current.next;
        } else {
            prev = prev.next;
        }
        current = current.next;
    }
    return dummy.next;
}

// 41. Merge nodes between zeros
function mergeNodes(head) {
    let dummy = new ListNode(0);
    let current = dummy;
    let sum = 0;
    let node = head.next;
    
    while (node) {
        if (node.val === 0) {
            if (sum > 0) {
                current.next = new ListNode(sum);
                current = current.next;
                sum = 0;
            }
        } else {
            sum += node.val;
        }
        node = node.next;
    }
    return dummy.next;
}

// 42. Odd-even linked list
function oddEvenList(head) {
    if (!head || !head.next) return head;
    
    let odd = head;
    let even = head.next;
    let evenHead = even;
    
    while (even && even.next) {
        odd.next = even.next;
        odd = odd.next;
        even.next = odd.next;
        even = even.next;
    }
    
    odd.next = evenHead;
    return head;
}

// 43. Delete nodes that have greater value on right side
function removeNodesWithGreaterRight(head) {
    if (!head) return null;
    
    let prev = null;
    let current = head;
    while (current) {
        let next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    
    let max = -Infinity;
    let newPrev = null;
    current = prev;
    while (current) {
        if (current.val >= max) {
            max = current.val;
            newPrev = current;
            current = current.next;
        } else {
            newPrev.next = current.next;
            current = current.next;
        }
    }
    
    prev = null;
    current = prev;
    while (current) {
        let next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    return prev;
}

// ==================== ARITHMETIC / NUMBER-BASED (44-53) ====================

// 44. Add two numbers (digits in reverse order)
function addTwoNumbers(l1, l2) {
    let dummy = new ListNode(0);
    let current = dummy;
    let carry = 0;
    
    while (l1 || l2 || carry) {
        let sum = (l1?.val || 0) + (l2?.val || 0) + carry;
        carry = Math.floor(sum / 10);
        current.next = new ListNode(sum % 10);
        current = current.next;
        l1 = l1?.next;
        l2 = l2?.next;
    }
    
    return dummy.next;
}

// 45. Add two numbers II (digits in forward order)
function addTwoNumbersII(l1, l2) {
    let rev1 = reverseIterative(l1);
    let rev2 = reverseIterative(l2);
    let result = addTwoNumbers(rev1, rev2);
    return reverseIterative(result);
}

// 46. Double a number represented as linked list
function doubleNumber(head) {
    let reversed = reverseIterative(head);
    let dummy = new ListNode(0);
    let current = dummy;
    let carry = 0;
    
    while (reversed || carry) {
        let sum = (reversed?.val || 0) * 2 + carry;
        carry = Math.floor(sum / 10);
        current.next = new ListNode(sum % 10);
        current = current.next;
        reversed = reversed?.next;
    }
    
    return reverseIterative(dummy.next);
}

// 47. Multiply two numbers represented by linked lists
function multiplyNumbers(l1, l2) {
    let num1 = 0, num2 = 0;
    let current = l1;
    while (current) {
        num1 = num1 * 10 + current.val;
        current = current.next;
    }
    current = l2;
    while (current) {
        num2 = num2 * 10 + current.val;
        current = current.next;
    }
    
    let product = num1 * num2;
    if (product === 0) return new ListNode(0);
    
    let digits = [];
    while (product > 0) {
        digits.unshift(product % 10);
        product = Math.floor(product / 10);
    }
    
    let head = new ListNode(digits[0]);
    current = head;
    for (let i = 1; i < digits.length; i++) {
        current.next = new ListNode(digits[i]);
        current = current.next;
    }
    return head;
}

// 48. Subtract two numbers represented by linked lists
function subtractNumbers(l1, l2) {
    let num1 = 0, num2 = 0;
    let current = l1;
    while (current) {
        num1 = num1 * 10 + current.val;
        current = current.next;
    }
    current = l2;
    while (current) {
        num2 = num2 * 10 + current.val;
        current = current.next;
    }
    
    let diff = Math.abs(num1 - num2);
    if (diff === 0) return new ListNode(0);
    
    let digits = [];
    while (diff > 0) {
        digits.unshift(diff % 10);
        diff = Math.floor(diff / 10);
    }
    
    let head = new ListNode(digits[0]);
    current = head;
    for (let i = 1; i < digits.length; i++) {
        current.next = new ListNode(digits[i]);
        current = current.next;
    }
    return head;
}

// 49. Add one to a number represented by linked list
function addOne(head) {
    let reversed = reverseIterative(head);
    let carry = 1;
    let current = reversed;
    
    while (current && carry) {
        let sum = current.val + carry;
        current.val = sum % 10;
        carry = Math.floor(sum / 10);
        if (!current.next && carry) {
            current.next = new ListNode(carry);
            break;
        }
        current = current.next;
    }
    
    return reverseIterative(reversed);
}

// 50. Remove leading zeroes from linked list number
function removeLeadingZeroes(head) {
    while (head && head.val === 0 && head.next) {
        head = head.next;
    }
    return head;
}

// 51. Convert linked list number to array/string safely
function listToArray(head) {
    let result = [];
    let current = head;
    while (current) {
        result.push(current.val);
        current = current.next;
    }
    return result;
}

// 52. Compare two numbers represented by linked lists
function compareNumbers(l1, l2) {
    let len1 = getLength(l1);
    let len2 = getLength(l2);
    
    if (len1 !== len2) return len1 - len2;
    
    while (l1 && l2) {
        if (l1.val !== l2.val) return l1.val - l2.val;
        l1 = l1.next;
        l2 = l2.next;
    }
    return 0;
}

// ==================== ADVANCED / HARD CLASSICS (53-57) ====================

// 53. Copy linked list with random pointer
class RandomNode {
    constructor(val = 0, next = null, random = null) {
        this.val = val;
        this.next = next;
        this.random = random;
    }
}

function copyRandomList(head) {
    if (!head) return null;
    
    let current = head;
    while (current) {
        let copy = new RandomNode(current.val);
        copy.next = current.next;
        current.next = copy;
        current = copy.next;
    }
    
    current = head;
    while (current) {
        if (current.random) {
            current.next.random = current.random.next;
        }
        current = current.next.next;
    }
    
    let dummy = new RandomNode(0);
    let copyCurrent = dummy;
    current = head;
    
    while (current) {
        copyCurrent.next = current.next;
        copyCurrent = copyCurrent.next;
        current.next = copyCurrent.next;
        current = current.next;
    }
    
    return dummy.next;
}

// 54. LRU Cache using doubly linked list + hashmap
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
        this.head = new DoublyListNode(0, null, null);
        this.tail = new DoublyListNode(0, this.head, null);
        this.head.next = this.tail;
    }
    
    get(key) {
        if (!this.cache.has(key)) return -1;
        const node = this.cache.get(key);
        this._moveToFront(node);
        return node.val;
    }
    
    put(key, value) {
        if (this.cache.has(key)) {
            const node = this.cache.get(key);
            node.val = value;
            this._moveToFront(node);
        } else {
            if (this.cache.size >= this.capacity) {
                const lru = this.tail.prev;
                this._removeNode(lru);
                this.cache.delete(lru.key);
            }
            const newNode = new DoublyListNode(value, this.head, this.head.next);
            newNode.key = key;
            this.head.next.prev = newNode;
            this.head.next = newNode;
            this.cache.set(key, newNode);
        }
    }
    
    _moveToFront(node) {
        this._removeNode(node);
        node.prev = this.head;
        node.next = this.head.next;
        this.head.next.prev = node;
        this.head.next = node;
    }
    
    _removeNode(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
}

// 55. LFU Cache implementation
class LFUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
        this.freqMap = new Map();
        this.minFreq = 0;
    }
    
    get(key) {
        if (!this.cache.has(key)) return -1;
        this._updateFreq(key);
        return this.cache.get(key).value;
    }
    
    put(key, value) {
        if (this.capacity === 0) return;
        
        if (this.cache.has(key)) {
            this.cache.get(key).value = value;
            this._updateFreq(key);
        } else {
            if (this.cache.size >= this.capacity) {
                const minFreqSet = this.freqMap.get(this.minFreq);
                const lruKey = minFreqSet.values().next().value;
                minFreqSet.delete(lruKey);
                this.cache.delete(lruKey);
            }
            this.cache.set(key, { value, freq: 1 });
            if (!this.freqMap.has(1)) this.freqMap.set(1, new Set());
            this.freqMap.get(1).add(key);
            this.minFreq = 1;
        }
    }
    
    _updateFreq(key) {
        const node = this.cache.get(key);
        const oldFreq = node.freq;
        const newFreq = oldFreq + 1;
        
        this.freqMap.get(oldFreq).delete(key);
        if (this.freqMap.get(oldFreq).size === 0 && oldFreq === this.minFreq) {
            this.minFreq++;
        }
        
        node.freq = newFreq;
        if (!this.freqMap.has(newFreq)) this.freqMap.set(newFreq, new Set());
        this.freqMap.get(newFreq).add(key);
    }
}

// 56. Design Browser History
class BrowserHistory {
    constructor(homepage) {
        this.history = [homepage];
        this.current = 0;
    }
    
    visit(url) {
        this.history = this.history.slice(0, this.current + 1);
        this.history.push(url);
        this.current++;
    }
    
    back(steps) {
        this.current = Math.max(0, this.current - steps);
        return this.history[this.current];
    }
    
    forward(steps) {
        this.current = Math.min(this.history.length - 1, this.current + steps);
        return this.history[this.current];
    }
}

// 57. Design linked list from scratch
class MyLinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }
    
    get(index) {
        if (index < 0 || index >= this.size) return -1;
        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        return current.val;
    }
    
    addAtHead(val) {
        this.head = new ListNode(val, this.head);
        this.size++;
    }
    
    addAtTail(val) {
        if (!this.head) {
            this.addAtHead(val);
            return;
        }
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = new ListNode(val);
        this.size++;
    }
    
    addAtIndex(index, val) {
        if (index < 0 || index > this.size) return;
        if (index === 0) {
            this.addAtHead(val);
            return;
        }
        let current = this.head;
        for (let i = 0; i < index - 1; i++) {
            current = current.next;
        }
        current.next = new ListNode(val, current.next);
        this.size++;
    }
    
    deleteAtIndex(index) {
        if (index < 0 || index >= this.size) return;
        if (index === 0) {
            this.head = this.head.next;
        } else {
            let current = this.head;
            for (let i = 0; i < index - 1; i++) {
                current = current.next;
            }
            current.next = current.next.next;
        }
        this.size--;
    }
}

// ==================== BONUS HARDCORE PROBLEMS (58-70) ====================

// 58. Flatten sorted linked list with bottom pointers
class FlattenNode {
    constructor(val = 0, next = null, bottom = null) {
        this.val = val;
        this.next = next;
        this.bottom = bottom;
    }
}

function flattenBottomList(head) {
    if (!head || !head.next) return head;
    
    head.next = flattenBottomList(head.next);
    return mergeTwoBottomLists(head, head.next);
}

function mergeTwoBottomLists(a, b) {
    if (!a) return b;
    if (!b) return a;
    
    let result;
    if (a.val < b.val) {
        result = a;
        result.bottom = mergeTwoBottomLists(a.bottom, b);
    } else {
        result = b;
        result.bottom = mergeTwoBottomLists(a, b.bottom);
    }
    return result;
}

// 59. Skip list design
class SkipListNode {
    constructor(val, level) {
        this.val = val;
        this.forward = new Array(level + 1).fill(null);
    }
}

class SkipList {
    constructor() {
        this.maxLevel = 16;
        this.p = 0.5;
        this.level = 0;
        this.header = new SkipListNode(-Infinity, this.maxLevel);
    }
    
    randomLevel() {
        let level = 0;
        while (Math.random() < this.p && level < this.maxLevel) {
            level++;
        }
        return level;
    }
    
    search(target) {
        let current = this.header;
        for (let i = this.level; i >= 0; i--) {
            while (current.forward[i] && current.forward[i].val < target) {
                current = current.forward[i];
            }
        }
        current = current.forward[0];
        return current && current.val === target;
    }
    
    insert(val) {
        let update = new Array(this.maxLevel + 1);
        let current = this.header;
        
        for (let i = this.level; i >= 0; i--) {
            while (current.forward[i] && current.forward[i].val < val) {
                current = current.forward[i];
            }
            update[i] = current;
        }
        
        current = current.forward[0];
        
        if (!current || current.val !== val) {
            let newLevel = this.randomLevel();
            if (newLevel > this.level) {
                for (let i = this.level + 1; i <= newLevel; i++) {
                    update[i] = this.header;
                }
                this.level = newLevel;
            }
            
            let newNode = new SkipListNode(val, newLevel);
            for (let i = 0; i <= newLevel; i++) {
                newNode.forward[i] = update[i].forward[i];
                update[i].forward[i] = newNode;
            }
        }
    }
    
    delete(val) {
        let update = new Array(this.maxLevel + 1);
        let current = this.header;
        
        for (let i = this.level; i >= 0; i--) {
            while (current.forward[i] && current.forward[i].val < val) {
                current = current.forward[i];
            }
            update[i] = current;
        }
        
        current = current.forward[0];
        
        if (current && current.val === val) {
            for (let i = 0; i <= this.level; i++) {
                if (update[i].forward[i] !== current) break;
                update[i].forward[i] = current.forward[i];
            }
            
            while (this.level > 0 && !this.header.forward[this.level]) {
                this.level--;
            }
        }
    }
}

// 60. All O(1) Data Structure
class AllOne {
    constructor() {
        this.cache = new Map();
        this.buckets = new Map();
        this.minCount = Infinity;
        this.maxCount = -Infinity;
    }
    
    inc(key) {
        if (!this.cache.has(key)) {
            this.cache.set(key, 1);
            if (!this.buckets.has(1)) this.buckets.set(1, new Set());
            this.buckets.get(1).add(key);
            this.minCount = 1;
            if (this.maxCount < 1) this.maxCount = 1;
        } else {
            let count = this.cache.get(key);
            this.buckets.get(count).delete(key);
            if (this.buckets.get(count).size === 0 && count === this.minCount) {
                this.minCount++;
            }
            count++;
            this.cache.set(key, count);
            if (!this.buckets.has(count)) this.buckets.set(count, new Set());
            this.buckets.get(count).add(key);
            if (count > this.maxCount) this.maxCount = count;
            if (count < this.minCount) this.minCount = count;
        }
    }
    
    dec(key) {
        if (!this.cache.has(key)) return;
        
        let count = this.cache.get(key);
        this.buckets.get(count).delete(key);
        
        if (count === 1) {
            this.cache.delete(key);
            if (this.buckets.get(count).size === 0 && count === this.minCount) {
                this.minCount++;
            }
        } else {
            count--;
            this.cache.set(key, count);
            if (!this.buckets.has(count)) this.buckets.set(count, new Set());
            this.buckets.get(count).add(key);
            if (count < this.minCount) this.minCount = count;
        }
        
        while (this.maxCount > 0 && (!this.buckets.has(this.maxCount) || this.buckets.get(this.maxCount).size === 0)) {
            this.maxCount--;
        }
    }
    
    getMaxKey() {
        if (this.cache.size === 0) return "";
        return this.buckets.get(this.maxCount).values().next().value;
    }
    
    getMinKey() {
        if (this.cache.size === 0) return "";
        while (!this.buckets.has(this.minCount) || this.buckets.get(this.minCount).size === 0) {
            this.minCount++;
        }
        return this.buckets.get(this.minCount).values().next().value;
    }
}

// 61. Quick sort linked list
function quickSortList(head) {
    if (!head || !head.next) return head;
    
    let pivot = head;
    let left = null, right = null;
    let current = head.next;
    
    while (current) {
        let next = current.next;
        if (current.val < pivot.val) {
            current.next = left;
            left = current;
        } else {
            current.next = right;
            right = current;
        }
        current = next;
    }
    
    left = quickSortList(left);
    right = quickSortList(right);
    
    if (left) {
        let tail = left;
        while (tail.next) tail = tail.next;
        tail.next = pivot;
    } else {
        left = pivot;
    }
    
    pivot.next = right;
    return left;
}

// 62. Reverse k-group recursively
function reverseKGroupRecursive(head, k) {
    let count = 0;
    let current = head;
    
    while (current && count < k) {
        current = current.next;
        count++;
    }
    
    if (count === k) {
        current = reverseKGroupRecursive(current, k);
        
        let prev = current;
        let node = head;
        for (let i = 0; i < k; i++) {
            let next = node.next;
            node.next = prev;
            prev = node;
            node = next;
        }
        return prev;
    }
    return head;
}

// 63. Detect and remove loop in linked list
function detectAndRemoveLoop(head) {
    let slow = head, fast = head;
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) break;
    }
    
    if (!fast || !fast.next) return false;
    
    slow = head;
    while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
    }
    
    let loopStart = slow;
    while (fast.next !== loopStart) {
        fast = fast.next;
    }
    fast.next = null;
    
    return true;
}

// 64. Josephus problem using circular linked list
function josephus(n, k) {
    if (n === 1) return 1;
    
    let head = new ListNode(1);
    let prev = head;
    for (let i = 2; i <= n; i++) {
        prev.next = new ListNode(i);
        prev = prev.next;
    }
    prev.next = head;
    
    let current = head;
    let count = 0;
    
    while (current.next !== current) {
        count++;
        if (count === k - 1) {
            current.next = current.next.next;
            count = 0;
        }
        current = current.next;
    }
    
    return current.val;
}

// 65. Convert sorted linked list to balanced BST
class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function sortedListToBST(head) {
    if (!head) return null;
    if (!head.next) return new TreeNode(head.val);
    
    let slow = head, fast = head, prev = null;
    while (fast && fast.next) {
        prev = slow;
        slow = slow.next;
        fast = fast.next.next;
    }
    
    if (prev) prev.next = null;
    
    let root = new TreeNode(slow.val);
    root.left = sortedListToBST(head);
    root.right = sortedListToBST(slow.next);
    
    return root;
}

// 66. Helper function - Create a cycle for testing
function createCycle(arr, pos) {
    let head = createLinkedList(arr);
    if (pos === -1) return head;
    
    let current = head;
    let cycleNode = null;
    let index = 0;
    
    while (current.next) {
        if (index === pos) cycleNode = current;
        current = current.next;
        index++;
    }
    current.next = cycleNode;
    return head;
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ListNode, DoublyListNode, MultiLevelNode, RandomNode, FlattenNode, SkipListNode, TreeNode,
        // 1-16: Basics
        createLinkedList, printLinkedList, getLength, searchValue,
        insertAtBeginning, insertAtEnd, insertAtPosition,
        deleteFirst, deleteLast, deleteByValue, deleteAtPosition,
        reverseIterative, reverseRecursive, findMiddle, nthFromEnd,
        // 16-25: Two Pointers
        hasCycle, detectCycleStart, cycleLength, removeNthFromEnd,
        isPalindrome, reorderList, splitIntoHalves, splitListToParts, getIntersectionNode,
        // 25-36: Reversal
        reverseKGroup, reverseBetween, swapPairs, rotateRight, reverseAlternateK,
        reverseEvenLengthGroups, reverseDoublyLinkedList, flattenMultilevel, binaryToInteger,
        // 34-46: Sorting/Merging
        mergeTwoLists, mergeKLists, sortList, insertionSortList, partition,
        deleteDuplicates, deleteDuplicatesAll, mergeNodes, oddEvenList, removeNodesWithGreaterRight,
        // 44-53: Arithmetic
        addTwoNumbers, addTwoNumbersII, doubleNumber, multiplyNumbers, subtractNumbers,
        addOne, removeLeadingZeroes, listToArray, compareNumbers,
        // 53-57: Advanced
        copyRandomList, LRUCache, LFUCache, BrowserHistory, MyLinkedList,
        // 58-65: Bonus
        flattenBottomList, SkipList, AllOne, quickSortList,
        reverseKGroupRecursive, detectAndRemoveLoop, josephus, sortedListToBST,
        // Helper
        createCycle
    };
}