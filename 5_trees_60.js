// Basic TreeNode class
class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// Node for next right pointer
class NodeWithNext {
    constructor(val = 0, left = null, right = null, next = null) {
        this.val = val;
        this.left = left;
        this.right = right;
        this.next = next;
    }
}

// ==================== TREE BASICS → INTERMEDIATE FOUNDATIONS (1-16) ====================

// 1. Create a binary tree from array (level order)
function createBinaryTree(arr) {
    if (!arr.length || arr[0] === null) return null;
    
    let root = new TreeNode(arr[0]);
    let queue = [root];
    let i = 1;
    
    while (queue.length && i < arr.length) {
        let node = queue.shift();
        
        if (i < arr.length && arr[i] !== null) {
            node.left = new TreeNode(arr[i]);
            queue.push(node.left);
        }
        i++;
        
        if (i < arr.length && arr[i] !== null) {
            node.right = new TreeNode(arr[i]);
            queue.push(node.right);
        }
        i++;
    }
    return root;
}

// 2. Create a binary search tree (BST) from array
function createBST(arr) {
    let root = null;
    for (let val of arr) {
        root = insertIntoBST(root, val);
    }
    return root;
}

// 3. Insert node in BST
function insertIntoBST(root, val) {
    if (!root) return new TreeNode(val);
    if (val < root.val) {
        root.left = insertIntoBST(root.left, val);
    } else if (val > root.val) {
        root.right = insertIntoBST(root.right, val);
    }
    return root;
}

// 4. Delete node in BST
function deleteFromBST(root, val) {
    if (!root) return null;
    
    if (val < root.val) {
        root.left = deleteFromBST(root.left, val);
    } else if (val > root.val) {
        root.right = deleteFromBST(root.right, val);
    } else {
        if (!root.left) return root.right;
        if (!root.right) return root.left;
        
        let minNode = findMin(root.right);
        root.val = minNode.val;
        root.right = deleteFromBST(root.right, minNode.val);
    }
    return root;
}

function findMin(root) {
    while (root.left) root = root.left;
    return root;
}

// 5. Search node in BST
function searchBST(root, val) {
    if (!root || root.val === val) return root;
    return val < root.val ? searchBST(root.left, val) : searchBST(root.right, val);
}

// 6. Find height of binary tree
function findHeight(root) {
    if (!root) return -1;
    return 1 + Math.max(findHeight(root.left), findHeight(root.right));
}

// 7. Count total nodes in binary tree
function countNodes(root) {
    if (!root) return 0;
    return 1 + countNodes(root.left) + countNodes(root.right);
}

// 8. Count leaf nodes
function countLeaves(root) {
    if (!root) return 0;
    if (!root.left && !root.right) return 1;
    return countLeaves(root.left) + countLeaves(root.right);
}

// 9. Count internal nodes
function countInternalNodes(root) {
    if (!root || (!root.left && !root.right)) return 0;
    return 1 + countInternalNodes(root.left) + countInternalNodes(root.right);
}

// 10. Find maximum value in binary tree
function findMax(root) {
    if (!root) return -Infinity;
    return Math.max(root.val, findMax(root.left), findMax(root.right));
}

// 11. Find minimum value in BST
function findMinBST(root) {
    if (!root) return null;
    while (root.left) root = root.left;
    return root.val;
}

// 12. Check if tree is empty
function isEmpty(root) {
    return root === null;
}

// 13. Mirror a binary tree
function mirrorTree(root) {
    if (!root) return null;
    let temp = root.left;
    root.left = mirrorTree(root.right);
    root.right = mirrorTree(temp);
    return root;
}

// 14. Copy/clone a binary tree
function cloneTree(root) {
    if (!root) return null;
    let newNode = new TreeNode(root.val);
    newNode.left = cloneTree(root.left);
    newNode.right = cloneTree(root.right);
    return newNode;
}

// 15. Compare two binary trees
function isSameTree(p, q) {
    if (!p && !q) return true;
    if (!p || !q) return false;
    return p.val === q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}

// ==================== DFS TRAVERSAL PROBLEMS (16-30) ====================

// 16. Preorder traversal (recursive)
function preorderRecursive(root, result = []) {
    if (!root) return result;
    result.push(root.val);
    preorderRecursive(root.left, result);
    preorderRecursive(root.right, result);
    return result;
}

// 17. Inorder traversal (recursive)
function inorderRecursive(root, result = []) {
    if (!root) return result;
    inorderRecursive(root.left, result);
    result.push(root.val);
    inorderRecursive(root.right, result);
    return result;
}

// 18. Postorder traversal (recursive)
function postorderRecursive(root, result = []) {
    if (!root) return result;
    postorderRecursive(root.left, result);
    postorderRecursive(root.right, result);
    result.push(root.val);
    return result;
}

// 19. Preorder traversal (iterative)
function preorderIterative(root) {
    if (!root) return [];
    let result = [];
    let stack = [root];
    
    while (stack.length) {
        let node = stack.pop();
        result.push(node.val);
        if (node.right) stack.push(node.right);
        if (node.left) stack.push(node.left);
    }
    return result;
}

// 20. Inorder traversal (iterative)
function inorderIterative(root) {
    let result = [];
    let stack = [];
    let current = root;
    
    while (current || stack.length) {
        while (current) {
            stack.push(current);
            current = current.left;
        }
        current = stack.pop();
        result.push(current.val);
        current = current.right;
    }
    return result;
}

// 21. Postorder traversal (iterative)
function postorderIterative(root) {
    if (!root) return [];
    let result = [];
    let stack = [root];
    
    while (stack.length) {
        let node = stack.pop();
        result.unshift(node.val);
        if (node.left) stack.push(node.left);
        if (node.right) stack.push(node.right);
    }
    return result;
}

// 22. Morris inorder traversal
function morrisInorder(root) {
    let result = [];
    let current = root;
    
    while (current) {
        if (!current.left) {
            result.push(current.val);
            current = current.right;
        } else {
            let predecessor = current.left;
            while (predecessor.right && predecessor.right !== current) {
                predecessor = predecessor.right;
            }
            
            if (!predecessor.right) {
                predecessor.right = current;
                current = current.left;
            } else {
                predecessor.right = null;
                result.push(current.val);
                current = current.right;
            }
        }
    }
    return result;
}

// 23. Morris preorder traversal
function morrisPreorder(root) {
    let result = [];
    let current = root;
    
    while (current) {
        if (!current.left) {
            result.push(current.val);
            current = current.right;
        } else {
            let predecessor = current.left;
            while (predecessor.right && predecessor.right !== current) {
                predecessor = predecessor.right;
            }
            
            if (!predecessor.right) {
                result.push(current.val);
                predecessor.right = current;
                current = current.left;
            } else {
                predecessor.right = null;
                current = current.right;
            }
        }
    }
    return result;
}

// 24. Root-to-leaf path printing
function rootToLeafPaths(root, path = [], result = []) {
    if (!root) return result;
    
    path.push(root.val);
    if (!root.left && !root.right) {
        result.push([...path]);
    } else {
        rootToLeafPaths(root.left, path, result);
        rootToLeafPaths(root.right, path, result);
    }
    path.pop();
    return result;
}

// 25. Sum of root-to-leaf numbers
function sumNumbers(root, currentSum = 0) {
    if (!root) return 0;
    currentSum = currentSum * 10 + root.val;
    if (!root.left && !root.right) return currentSum;
    return sumNumbers(root.left, currentSum) + sumNumbers(root.right, currentSum);
}

// ==================== BFS / LEVEL ORDER PROBLEMS (26-38) ====================

// 26. Level order traversal
function levelOrder(root) {
    if (!root) return [];
    let result = [];
    let queue = [root];
    
    while (queue.length) {
        let levelSize = queue.length;
        let level = [];
        
        for (let i = 0; i < levelSize; i++) {
            let node = queue.shift();
            level.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        result.push(level);
    }
    return result;
}

// 27. Zigzag level order traversal
function zigzagLevelOrder(root) {
    if (!root) return [];
    let result = [];
    let queue = [root];
    let leftToRight = true;
    
    while (queue.length) {
        let levelSize = queue.length;
        let level = [];
        
        for (let i = 0; i < levelSize; i++) {
            let node = queue.shift();
            if (leftToRight) {
                level.push(node.val);
            } else {
                level.unshift(node.val);
            }
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        result.push(level);
        leftToRight = !leftToRight;
    }
    return result;
}

// 28. Right side view of binary tree
function rightSideView(root) {
    if (!root) return [];
    let result = [];
    let queue = [root];
    
    while (queue.length) {
        let levelSize = queue.length;
        for (let i = 0; i < levelSize; i++) {
            let node = queue.shift();
            if (i === levelSize - 1) result.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    return result;
}

// 29. Left side view of binary tree
function leftSideView(root) {
    if (!root) return [];
    let result = [];
    let queue = [root];
    
    while (queue.length) {
        let levelSize = queue.length;
        for (let i = 0; i < levelSize; i++) {
            let node = queue.shift();
            if (i === 0) result.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    return result;
}

// 30. Average of levels in binary tree
function averageOfLevels(root) {
    if (!root) return [];
    let result = [];
    let queue = [root];
    
    while (queue.length) {
        let levelSize = queue.length;
        let sum = 0;
        
        for (let i = 0; i < levelSize; i++) {
            let node = queue.shift();
            sum += node.val;
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        result.push(sum / levelSize);
    }
    return result;
}

// 31. Maximum level sum
function maxLevelSum(root) {
    if (!root) return 0;
    let maxSum = -Infinity;
    let maxLevel = 0;
    let level = 0;
    let queue = [root];
    
    while (queue.length) {
        level++;
        let levelSize = queue.length;
        let sum = 0;
        
        for (let i = 0; i < levelSize; i++) {
            let node = queue.shift();
            sum += node.val;
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        if (sum > maxSum) {
            maxSum = sum;
            maxLevel = level;
        }
    }
    return maxLevel;
}

// 32. Deepest leaves sum
function deepestLeavesSum(root) {
    if (!root) return 0;
    let queue = [root];
    let sum = 0;
    
    while (queue.length) {
        let levelSize = queue.length;
        sum = 0;
        
        for (let i = 0; i < levelSize; i++) {
            let node = queue.shift();
            sum += node.val;
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    return sum;
}

// 33. Binary tree vertical order traversal
function verticalOrder(root) {
    if (!root) return [];
    let map = new Map();
    let queue = [{ node: root, col: 0 }];
    let minCol = Infinity, maxCol = -Infinity;
    
    while (queue.length) {
        let { node, col } = queue.shift();
        
        if (!map.has(col)) map.set(col, []);
        map.get(col).push(node.val);
        
        minCol = Math.min(minCol, col);
        maxCol = Math.max(maxCol, col);
        
        if (node.left) queue.push({ node: node.left, col: col - 1 });
        if (node.right) queue.push({ node: node.right, col: col + 1 });
    }
    
    let result = [];
    for (let i = minCol; i <= maxCol; i++) {
        if (map.has(i)) result.push(map.get(i));
    }
    return result;
}

// 34. Top view of binary tree
function topView(root) {
    if (!root) return [];
    let map = new Map();
    let queue = [{ node: root, col: 0 }];
    
    while (queue.length) {
        let { node, col } = queue.shift();
        
        if (!map.has(col)) {
            map.set(col, node.val);
        }
        
        if (node.left) queue.push({ node: node.left, col: col - 1 });
        if (node.right) queue.push({ node: node.right, col: col + 1 });
    }
    
    return Array.from(map.entries())
        .sort((a, b) => a[0] - b[0])
        .map(entry => entry[1]);
}

// 35. Bottom view of binary tree
function bottomView(root) {
    if (!root) return [];
    let map = new Map();
    let queue = [{ node: root, col: 0 }];
    
    while (queue.length) {
        let { node, col } = queue.shift();
        
        map.set(col, node.val);
        
        if (node.left) queue.push({ node: node.left, col: col - 1 });
        if (node.right) queue.push({ node: node.right, col: col + 1 });
    }
    
    return Array.from(map.entries())
        .sort((a, b) => a[0] - b[0])
        .map(entry => entry[1]);
}

// 36. Boundary traversal of binary tree
function boundaryTraversal(root) {
    if (!root) return [];
    let result = [root.val];
    
    function addLeftBoundary(node) {
        if (!node || (!node.left && !node.right)) return;
        result.push(node.val);
        if (node.left) addLeftBoundary(node.left);
        else addLeftBoundary(node.right);
    }
    
    function addLeaves(node) {
        if (!node) return;
        if (!node.left && !node.right && node !== root) {
            result.push(node.val);
            return;
        }
        addLeaves(node.left);
        addLeaves(node.right);
    }
    
    function addRightBoundary(node) {
        if (!node || (!node.left && !node.right)) return;
        if (node.right) addRightBoundary(node.right);
        else addRightBoundary(node.left);
        result.push(node.val);
    }
    
    addLeftBoundary(root.left);
    addLeaves(root);
    addRightBoundary(root.right);
    
    return result;
}

// 37. Width of binary tree
function widthOfBinaryTree(root) {
    if (!root) return 0;
    let maxWidth = 0;
    let queue = [{ node: root, index: 0n }];
    
    while (queue.length) {
        let levelSize = queue.length;
        let firstIndex = queue[0].index;
        let lastIndex = queue[levelSize - 1].index;
        maxWidth = Math.max(maxWidth, Number(lastIndex - firstIndex + 1n));
        
        for (let i = 0; i < levelSize; i++) {
            let { node, index } = queue.shift();
            if (node.left) queue.push({ node: node.left, index: index * 2n });
            if (node.right) queue.push({ node: node.right, index: index * 2n + 1n });
        }
    }
    return maxWidth;
}

// ==================== TREE CONSTRUCTION PROBLEMS (38-47) ====================

// 38. Construct tree from preorder + inorder
function buildTreeFromPreIn(preorder, inorder) {
    if (!preorder.length || !inorder.length) return null;
    
    let root = new TreeNode(preorder[0]);
    let mid = inorder.indexOf(preorder[0]);
    
    root.left = buildTreeFromPreIn(
        preorder.slice(1, mid + 1),
        inorder.slice(0, mid)
    );
    root.right = buildTreeFromPreIn(
        preorder.slice(mid + 1),
        inorder.slice(mid + 1)
    );
    
    return root;
}

// 39. Construct tree from inorder + postorder
function buildTreeFromInPost(inorder, postorder) {
    if (!inorder.length || !postorder.length) return null;
    
    let rootVal = postorder[postorder.length - 1];
    let root = new TreeNode(rootVal);
    let mid = inorder.indexOf(rootVal);
    
    root.left = buildTreeFromInPost(
        inorder.slice(0, mid),
        postorder.slice(0, mid)
    );
    root.right = buildTreeFromInPost(
        inorder.slice(mid + 1),
        postorder.slice(mid, postorder.length - 1)
    );
    
    return root;
}

// 40. Construct BST from preorder
function bstFromPreorder(preorder) {
    if (!preorder.length) return null;
    
    function build(min, max) {
        if (idx >= preorder.length) return null;
        let val = preorder[idx];
        if (val < min || val > max) return null;
        
        idx++;
        let node = new TreeNode(val);
        node.left = build(min, val);
        node.right = build(val, max);
        return node;
    }
    
    let idx = 0;
    return build(-Infinity, Infinity);
}

// 41. Convert sorted array to BST
function sortedArrayToBST(nums) {
    if (!nums.length) return null;
    
    function build(left, right) {
        if (left > right) return null;
        let mid = Math.floor((left + right) / 2);
        let node = new TreeNode(nums[mid]);
        node.left = build(left, mid - 1);
        node.right = build(mid + 1, right);
        return node;
    }
    
    return build(0, nums.length - 1);
}

// 42. Convert sorted linked list to BST
function sortedListToBST(head) {
    if (!head) return null;
    
    function findMiddle(start, end) {
        let slow = start, fast = start;
        while (fast !== end && fast.next !== end) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }
    
    function build(start, end) {
        if (start === end) return null;
        let mid = findMiddle(start, end);
        let node = new TreeNode(mid.val);
        node.left = build(start, mid);
        node.right = build(mid.next, end);
        return node;
    }
    
    return build(head, null);
}

// 43. Serialize binary tree
function serialize(root) {
    if (!root) return "null";
    return `${root.val},${serialize(root.left)},${serialize(root.right)}`;
}

// 44. Deserialize binary tree
function deserialize(data) {
    let values = data.split(',');
    let index = 0;
    
    function build() {
        if (index >= values.length || values[index] === "null") {
            index++;
            return null;
        }
        let node = new TreeNode(parseInt(values[index]));
        index++;
        node.left = build();
        node.right = build();
        return node;
    }
    
    return build();
}

// 45. Recover binary tree from traversal string
function recoverFromTraversal(traversal) {
    let stack = [];
    let i = 0;
    
    while (i < traversal.length) {
        let depth = 0;
        while (i < traversal.length && traversal[i] === '-') {
            depth++;
            i++;
        }
        
        let val = 0;
        while (i < traversal.length && traversal[i] !== '-') {
            val = val * 10 + parseInt(traversal[i]);
            i++;
        }
        
        let node = new TreeNode(val);
        
        while (stack.length > depth) {
            stack.pop();
        }
        
        if (stack.length) {
            if (!stack[stack.length - 1].left) {
                stack[stack.length - 1].left = node;
            } else {
                stack[stack.length - 1].right = node;
            }
        }
        
        stack.push(node);
    }
    
    return stack[0];
}

// ==================== BST PATTERN PROBLEMS (46-57) ====================

// 46. Validate BST
function isValidBST(root, min = -Infinity, max = Infinity) {
    if (!root) return true;
    if (root.val <= min || root.val >= max) return false;
    return isValidBST(root.left, min, root.val) && 
           isValidBST(root.right, root.val, max);
}

// 47. Lowest common ancestor in BST
function lowestCommonAncestorBST(root, p, q) {
    if (!root) return null;
    if (p.val < root.val && q.val < root.val) {
        return lowestCommonAncestorBST(root.left, p, q);
    }
    if (p.val > root.val && q.val > root.val) {
        return lowestCommonAncestorBST(root.right, p, q);
    }
    return root;
}

// 48. Kth smallest element in BST
function kthSmallest(root, k) {
    let result = null;
    
    function inorder(node) {
        if (!node || result !== null) return;
        inorder(node.left);
        k--;
        if (k === 0) result = node.val;
        inorder(node.right);
    }
    
    inorder(root);
    return result;
}

// 49. Kth largest element in BST
function kthLargest(root, k) {
    let result = null;
    
    function reverseInorder(node) {
        if (!node || result !== null) return;
        reverseInorder(node.right);
        k--;
        if (k === 0) result = node.val;
        reverseInorder(node.left);
    }
    
    reverseInorder(root);
    return result;
}

// 50. BST iterator
class BSTIterator {
    constructor(root) {
        this.stack = [];
        this._pushAllLeft(root);
    }
    
    _pushAllLeft(node) {
        while (node) {
            this.stack.push(node);
            node = node.left;
        }
    }
    
    next() {
        let node = this.stack.pop();
        if (node.right) this._pushAllLeft(node.right);
        return node.val;
    }
    
    hasNext() {
        return this.stack.length > 0;
    }
}

// 51. Convert BST to sorted doubly linked list
function bstToDoublyList(root) {
    if (!root) return null;
    let head = null;
    let prev = null;
    
    function inorder(node) {
        if (!node) return;
        inorder(node.left);
        
        if (!head) head = node;
        if (prev) {
            prev.right = node;
            node.left = prev;
        }
        prev = node;
        
        inorder(node.right);
    }
    
    inorder(root);
    if (head && prev) {
        head.left = prev;
        prev.right = head;
    }
    return head;
}

// 52. Trim BST within range
function trimBST(root, low, high) {
    if (!root) return null;
    
    if (root.val < low) return trimBST(root.right, low, high);
    if (root.val > high) return trimBST(root.left, low, high);
    
    root.left = trimBST(root.left, low, high);
    root.right = trimBST(root.right, low, high);
    return root;
}

// 53. Balance a BST
function balanceBST(root) {
    let values = [];
    
    function inorder(node) {
        if (!node) return;
        inorder(node.left);
        values.push(node.val);
        inorder(node.right);
    }
    
    inorder(root);
    return sortedArrayToBST(values);
}

// 54. Find inorder successor in BST
function inorderSuccessor(root, p) {
    let successor = null;
    
    while (root) {
        if (p.val < root.val) {
            successor = root;
            root = root.left;
        } else {
            root = root.right;
        }
    }
    return successor;
}

// 55. Find inorder predecessor in BST
function inorderPredecessor(root, p) {
    let predecessor = null;
    
    while (root) {
        if (p.val > root.val) {
            predecessor = root;
            root = root.right;
        } else {
            root = root.left;
        }
    }
    return predecessor;
}

// ==================== PATH / RECURSION PROBLEMS (56-66) ====================

// 56. Maximum depth of binary tree
function maxDepth(root) {
    if (!root) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

// 57. Minimum depth of binary tree
function minDepth(root) {
    if (!root) return 0;
    if (!root.left) return 1 + minDepth(root.right);
    if (!root.right) return 1 + minDepth(root.left);
    return 1 + Math.min(minDepth(root.left), minDepth(root.right));
}

// 58. Diameter of binary tree
function diameterOfBinaryTree(root) {
    let diameter = 0;
    
    function height(node) {
        if (!node) return 0;
        let leftHeight = height(node.left);
        let rightHeight = height(node.right);
        diameter = Math.max(diameter, leftHeight + rightHeight);
        return 1 + Math.max(leftHeight, rightHeight);
    }
    
    height(root);
    return diameter;
}

// 59. Maximum path sum
function maxPathSum(root) {
    let maxSum = -Infinity;
    
    function maxGain(node) {
        if (!node) return 0;
        let leftGain = Math.max(maxGain(node.left), 0);
        let rightGain = Math.max(maxGain(node.right), 0);
        let currentMax = node.val + leftGain + rightGain;
        maxSum = Math.max(maxSum, currentMax);
        return node.val + Math.max(leftGain, rightGain);
    }
    
    maxGain(root);
    return maxSum;
}

// 60. Path sum I (has path sum)
function hasPathSum(root, targetSum) {
    if (!root) return false;
    if (!root.left && !root.right) return targetSum === root.val;
    return hasPathSum(root.left, targetSum - root.val) ||
           hasPathSum(root.right, targetSum - root.val);
}

// 61. Path sum II (all paths)
function pathSum(root, targetSum) {
    let result = [];
    
    function dfs(node, target, path) {
        if (!node) return;
        path.push(node.val);
        
        if (!node.left && !node.right && target === node.val) {
            result.push([...path]);
        }
        
        dfs(node.left, target - node.val, path);
        dfs(node.right, target - node.val, path);
        path.pop();
    }
    
    dfs(root, targetSum, []);
    return result;
}

// 62. Path sum III (count paths that sum to target)
function pathSumIII(root, targetSum) {
    let count = 0;
    let prefixSum = new Map();
    prefixSum.set(0, 1);
    
    function dfs(node, currentSum) {
        if (!node) return;
        currentSum += node.val;
        count += prefixSum.get(currentSum - targetSum) || 0;
        prefixSum.set(currentSum, (prefixSum.get(currentSum) || 0) + 1);
        
        dfs(node.left, currentSum);
        dfs(node.right, currentSum);
        
        prefixSum.set(currentSum, prefixSum.get(currentSum) - 1);
    }
    
    dfs(root, 0);
    return count;
}

// 63. Longest univalue path
function longestUnivaluePath(root) {
    let maxLength = 0;
    
    function dfs(node) {
        if (!node) return 0;
        let leftLen = dfs(node.left);
        let rightLen = dfs(node.right);
        let leftPath = 0, rightPath = 0;
        
        if (node.left && node.left.val === node.val) {
            leftPath = leftLen + 1;
        }
        if (node.right && node.right.val === node.val) {
            rightPath = rightLen + 1;
        }
        
        maxLength = Math.max(maxLength, leftPath + rightPath);
        return Math.max(leftPath, rightPath);
    }
    
    dfs(root);
    return maxLength;
}

// 64. Sum tree check
function isSumTree(root) {
    function sum(node) {
        if (!node) return 0;
        if (!node.left && !node.right) return node.val;
        
        let leftSum = sum(node.left);
        let rightSum = sum(node.right);
        
        if (leftSum === -1 || rightSum === -1 || node.val !== leftSum + rightSum) {
            return -1;
        }
        return node.val + leftSum + rightSum;
    }
    
    return sum(root) !== -1;
}

// 65. Children sum property
function isChildrenSumProperty(root) {
    if (!root || (!root.left && !root.right)) return true;
    
    let leftVal = root.left ? root.left.val : 0;
    let rightVal = root.right ? root.right.val : 0;
    
    return root.val === leftVal + rightVal &&
           isChildrenSumProperty(root.left) &&
           isChildrenSumProperty(root.right);
}

// ==================== TREE TRANSFORMATION / POINTER MANIPULATION (66-75) ====================

// 66. Flatten binary tree to linked list
function flatten(root) {
    if (!root) return;
    let current = root;
    
    while (current) {
        if (current.left) {
            let rightmost = current.left;
            while (rightmost.right) rightmost = rightmost.right;
            rightmost.right = current.right;
            current.right = current.left;
            current.left = null;
        }
        current = current.right;
    }
}

// 67. Invert binary tree
function invertTree(root) {
    if (!root) return null;
    let temp = root.left;
    root.left = invertTree(root.right);
    root.right = invertTree(temp);
    return root;
}

// 68. Populate next right pointers
function connectNextRight(root) {
    if (!root) return null;
    let queue = [root];
    
    while (queue.length) {
        let levelSize = queue.length;
        for (let i = 0; i < levelSize; i++) {
            let node = queue.shift();
            if (i < levelSize - 1) node.next = queue[0];
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    return root;
}

// 69. Convert binary tree to doubly linked list
function treeToDoublyList(root) {
    if (!root) return null;
    let head = null;
    let prev = null;
    
    function inorder(node) {
        if (!node) return;
        inorder(node.left);
        
        if (!head) head = node;
        if (prev) {
            prev.right = node;
            node.left = prev;
        }
        prev = node;
        
        inorder(node.right);
    }
    
    inorder(root);
    if (head && prev) {
        head.left = prev;
        prev.right = head;
    }
    return head;
}

// 70. Delete leaves with target value
function removeLeafNodes(root, target) {
    if (!root) return null;
    root.left = removeLeafNodes(root.left, target);
    root.right = removeLeafNodes(root.right, target);
    
    if (!root.left && !root.right && root.val === target) {
        return null;
    }
    return root;
}

// 71. Prune binary tree (remove subtrees with no 1)
function pruneTree(root) {
    if (!root) return null;
    root.left = pruneTree(root.left);
    root.right = pruneTree(root.right);
    
    if (!root.left && !root.right && root.val === 0) return null;
    return root;
}

// 72. Add one row to tree
function addOneRow(root, val, depth) {
    if (depth === 1) {
        let newRoot = new TreeNode(val);
        newRoot.left = root;
        return newRoot;
    }
    
    function dfs(node, currentDepth) {
        if (!node) return;
        if (currentDepth === depth - 1) {
            let leftChild = node.left;
            let rightChild = node.right;
            node.left = new TreeNode(val);
            node.right = new TreeNode(val);
            node.left.left = leftChild;
            node.right.right = rightChild;
        } else {
            dfs(node.left, currentDepth + 1);
            dfs(node.right, currentDepth + 1);
        }
    }
    
    dfs(root, 1);
    return root;
}

// 73. Reverse odd levels of binary tree
function reverseOddLevels(root) {
    if (!root) return null;
    let queue = [root];
    let level = 0;
    
    while (queue.length) {
        let levelSize = queue.length;
        let levelNodes = [];
        
        for (let i = 0; i < levelSize; i++) {
            let node = queue.shift();
            levelNodes.push(node);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        if (level % 2 === 1) {
            let values = levelNodes.map(n => n.val);
            values.reverse();
            for (let i = 0; i < levelNodes.length; i++) {
                levelNodes[i].val = values[i];
            }
        }
        level++;
    }
    return root;
}

// 74. Merge two binary trees
function mergeTrees(t1, t2) {
    if (!t1 && !t2) return null;
    if (!t1) return t2;
    if (!t2) return t1;
    
    let merged = new TreeNode(t1.val + t2.val);
    merged.left = mergeTrees(t1.left, t2.left);
    merged.right = mergeTrees(t1.right, t2.right);
    return merged;
}

// 75. Expand tree into parent-child graph
function expandToParentChild(root) {
    let result = [];
    
    function dfs(node, parent = null) {
        if (!node) return;
        result.push({
            node: node.val,
            parent: parent ? parent.val : null,
            children: [
                node.left ? node.left.val : null,
                node.right ? node.right.val : null
            ]
        });
        dfs(node.left, node);
        dfs(node.right, node);
    }
    
    dfs(root);
    return result;
}

// ==================== ADVANCED / HARD TREE CLASSICS (76-87) ====================

// 76. Lowest common ancestor in binary tree
function lowestCommonAncestor(root, p, q) {
    if (!root || root === p || root === q) return root;
    let left = lowestCommonAncestor(root.left, p, q);
    let right = lowestCommonAncestor(root.right, p, q);
    if (left && right) return root;
    return left || right;
}

// 77. Lowest common ancestor with parent pointers
class ParentNode {
    constructor(val = 0, parent = null, left = null, right = null) {
        this.val = val;
        this.parent = parent;
        this.left = left;
        this.right = right;
    }
}

function LCAWithParent(p, q) {
    let pAncestors = new Set();
    while (p) {
        pAncestors.add(p);
        p = p.parent;
    }
    while (q) {
        if (pAncestors.has(q)) return q;
        q = q.parent;
    }
    return null;
}

// 78. Binary tree cameras
function minCameraCover(root) {
    let cameras = 0;
    const NOT_MONITORED = 0;
    const MONITORED_NO_CAM = 1;
    const HAS_CAMERA = 2;
    
    function dfs(node) {
        if (!node) return MONITORED_NO_CAM;
        let left = dfs(node.left);
        let right = dfs(node.right);
        
        if (left === NOT_MONITORED || right === NOT_MONITORED) {
            cameras++;
            return HAS_CAMERA;
        }
        if (left === HAS_CAMERA || right === HAS_CAMERA) {
            return MONITORED_NO_CAM;
        }
        return NOT_MONITORED;
    }
    
    if (dfs(root) === NOT_MONITORED) cameras++;
    return cameras;
}

// 79. House robber III
function rob(root) {
    function dfs(node) {
        if (!node) return [0, 0];
        let left = dfs(node.left);
        let right = dfs(node.right);
        let rob = node.val + left[1] + right[1];
        let notRob = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);
        return [rob, notRob];
    }
    
    return Math.max(...dfs(root));
}

// 80. Distribute coins in binary tree
function distributeCoins(root) {
    let moves = 0;
    
    function dfs(node) {
        if (!node) return 0;
        let leftExcess = dfs(node.left);
        let rightExcess = dfs(node.right);
        moves += Math.abs(leftExcess) + Math.abs(rightExcess);
        return node.val + leftExcess + rightExcess - 1;
    }
    
    dfs(root);
    return moves;
}

// 81. Recover swapped BST
function recoverTree(root) {
    let first = null, second = null, prev = null;
    
    function inorder(node) {
        if (!node) return;
        inorder(node.left);
        
        if (prev && prev.val > node.val) {
            if (!first) first = prev;
            second = node;
        }
        prev = node;
        
        inorder(node.right);
    }
    
    inorder(root);
    [first.val, second.val] = [second.val, first.val];
}

// 82. Count complete tree nodes efficiently
function countCompleteNodes(root) {
    if (!root) return 0;
    
    function getLeftHeight(node) {
        let height = 0;
        while (node) {
            height++;
            node = node.left;
        }
        return height;
    }
    
    function getRightHeight(node) {
        let height = 0;
        while (node) {
            height++;
            node = node.right;
        }
        return height;
    }
    
    let leftHeight = getLeftHeight(root);
    let rightHeight = getRightHeight(root);
    
    if (leftHeight === rightHeight) {
        return Math.pow(2, leftHeight) - 1;
    }
    
    return 1 + countCompleteNodes(root.left) + countCompleteNodes(root.right);
}

// 83. Largest BST in binary tree
function largestBSTSubtree(root) {
    let maxSize = 0;
    
    function dfs(node) {
        if (!node) return { size: 0, min: Infinity, max: -Infinity, isBST: true };
        
        let left = dfs(node.left);
        let right = dfs(node.right);
        
        let isBST = left.isBST && right.isBST && 
                    node.val > left.max && node.val < right.min;
        let size = left.size + right.size + 1;
        let min = Math.min(node.val, left.min);
        let max = Math.max(node.val, right.max);
        
        if (isBST) maxSize = Math.max(maxSize, size);
        return { size, min, max, isBST };
    }
    
    dfs(root);
    return maxSize;
}

// 84. Binary tree maximum width using indexing (already implemented as widthOfBinaryTree above)

// 85. Construct quad tree
class QuadNode {
    constructor(val, isLeaf, topLeft, topRight, bottomLeft, bottomRight) {
        this.val = val;
        this.isLeaf = isLeaf;
        this.topLeft = topLeft;
        this.topRight = topRight;
        this.bottomLeft = bottomLeft;
        this.bottomRight = bottomRight;
    }
}

function constructQuadTree(grid) {
    function build(x, y, size) {
        if (size === 1) {
            return new QuadNode(grid[x][y] === 1, true, null, null, null, null);
        }
        
        let half = size / 2;
        let topLeft = build(x, y, half);
        let topRight = build(x, y + half, half);
        let bottomLeft = build(x + half, y, half);
        let bottomRight = build(x + half, y + half, half);
        
        if (topLeft.isLeaf && topRight.isLeaf && bottomLeft.isLeaf && bottomRight.isLeaf &&
            topLeft.val === topRight.val && topRight.val === bottomLeft.val && 
            bottomLeft.val === bottomRight.val) {
            return new QuadNode(topLeft.val, true, null, null, null, null);
        }
        
        return new QuadNode(true, false, topLeft, topRight, bottomLeft, bottomRight);
    }
    
    return build(0, 0, grid.length);
}

// 86. Segment tree implementation
class SegmentTree {
    constructor(arr) {
        this.n = arr.length;
        this.tree = new Array(4 * this.n);
        this.build(arr, 0, 0, this.n - 1);
    }
    
    build(arr, node, start, end) {
        if (start === end) {
            this.tree[node] = arr[start];
        } else {
            let mid = Math.floor((start + end) / 2);
            this.build(arr, 2 * node + 1, start, mid);
            this.build(arr, 2 * node + 2, mid + 1, end);
            this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
        }
    }
    
    update(idx, val, node = 0, start = 0, end = null) {
        if (end === null) end = this.n - 1;
        if (start === end) {
            this.tree[node] = val;
        } else {
            let mid = Math.floor((start + end) / 2);
            if (idx <= mid) {
                this.update(idx, val, 2 * node + 1, start, mid);
            } else {
                this.update(idx, val, 2 * node + 2, mid + 1, end);
            }
            this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
        }
    }
    
    query(l, r, node = 0, start = 0, end = null) {
        if (end === null) end = this.n - 1;
        if (l > end || r < start) return 0;
        if (l <= start && end <= r) return this.tree[node];
        let mid = Math.floor((start + end) / 2);
        return this.query(l, r, 2 * node + 1, start, mid) +
               this.query(l, r, 2 * node + 2, mid + 1, end);
    }
}

// 87. Fenwick tree / Binary Indexed Tree
class FenwickTree {
    constructor(size) {
        this.n = size;
        this.bit = new Array(size + 1).fill(0);
    }
    
    update(idx, delta) {
        idx++;
        while (idx <= this.n) {
            this.bit[idx] += delta;
            idx += idx & -idx;
        }
    }
    
    query(idx) {
        idx++;
        let sum = 0;
        while (idx > 0) {
            sum += this.bit[idx];
            idx -= idx & -idx;
        }
        return sum;
    }
    
    rangeQuery(l, r) {
        return this.query(r) - this.query(l - 1);
    }
}

// ==================== TRIE PROBLEMS (88-91) ====================

// 88. Trie implementation
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

// 89. Word dictionary with wildcard search
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

// 90. Autocomplete system using Trie
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

// ==================== HEAP / PRIORITY QUEUE TREE PROBLEMS (91-100) ====================

// 91. Implement min heap
class MinHeap {
    constructor() {
        this.heap = [];
    }
    
    push(val) {
        this.heap.push(val);
        this.bubbleUp(this.heap.length - 1);
    }
    
    bubbleUp(idx) {
        while (idx > 0) {
            let parentIdx = Math.floor((idx - 1) / 2);
            if (this.heap[parentIdx] <= this.heap[idx]) break;
            [this.heap[parentIdx], this.heap[idx]] = [this.heap[idx], this.heap[parentIdx]];
            idx = parentIdx;
        }
    }
    
    pop() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        let min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.sinkDown(0);
        return min;
    }
    
    sinkDown(idx) {
        let length = this.heap.length;
        while (true) {
            let leftChild = 2 * idx + 1;
            let rightChild = 2 * idx + 2;
            let swap = null;
            let element = this.heap[idx];
            
            if (leftChild < length && this.heap[leftChild] < element) {
                swap = leftChild;
            }
            if (rightChild < length) {
                if ((swap === null && this.heap[rightChild] < element) ||
                    (swap !== null && this.heap[rightChild] < this.heap[leftChild])) {
                    swap = rightChild;
                }
            }
            if (swap === null) break;
            [this.heap[idx], this.heap[swap]] = [this.heap[swap], this.heap[idx]];
            idx = swap;
        }
    }
    
    size() {
        return this.heap.length;
    }
}

// 92. Implement max heap
class MaxHeap {
    constructor() {
        this.heap = [];
    }
    
    push(val) {
        this.heap.push(val);
        this.bubbleUp(this.heap.length - 1);
    }
    
    bubbleUp(idx) {
        while (idx > 0) {
            let parentIdx = Math.floor((idx - 1) / 2);
            if (this.heap[parentIdx] >= this.heap[idx]) break;
            [this.heap[parentIdx], this.heap[idx]] = [this.heap[idx], this.heap[parentIdx]];
            idx = parentIdx;
        }
    }
    
    pop() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        let max = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.sinkDown(0);
        return max;
    }
    
    sinkDown(idx) {
        let length = this.heap.length;
        while (true) {
            let leftChild = 2 * idx + 1;
            let rightChild = 2 * idx + 2;
            let swap = null;
            let element = this.heap[idx];
            
            if (leftChild < length && this.heap[leftChild] > element) {
                swap = leftChild;
            }
            if (rightChild < length) {
                if ((swap === null && this.heap[rightChild] > element) ||
                    (swap !== null && this.heap[rightChild] > this.heap[leftChild])) {
                    swap = rightChild;
                }
            }
            if (swap === null) break;
            [this.heap[idx], this.heap[swap]] = [this.heap[swap], this.heap[idx]];
            idx = swap;
        }
    }
}

// 93. Heap sort
function heapSort(arr) {
    let heap = new MinHeap();
    for (let val of arr) heap.push(val);
    let result = [];
    while (heap.size()) result.push(heap.pop());
    return result;
}

// 94. Kth largest element using heap
function findKthLargest(nums, k) {
    let minHeap = new MinHeap();
    for (let num of nums) {
        minHeap.push(num);
        if (minHeap.size() > k) minHeap.pop();
    }
    return minHeap.pop();
}

// 95. Merge k sorted arrays using heap
function mergeKSortedArrays(arrays) {
    let heap = new MinHeap();
    let result = [];
    
    for (let i = 0; i < arrays.length; i++) {
        if (arrays[i].length) {
            heap.push({ val: arrays[i][0], arrIdx: i, elemIdx: 0 });
        }
    }
    
    while (heap.size()) {
        let { val, arrIdx, elemIdx } = heap.pop();
        result.push(val);
        
        if (elemIdx + 1 < arrays[arrIdx].length) {
            heap.push({
                val: arrays[arrIdx][elemIdx + 1],
                arrIdx: arrIdx,
                elemIdx: elemIdx + 1
            });
        }
    }
    return result;
}

// 96. Find median from data stream
class MedianFinder {
    constructor() {
        this.maxHeap = new MaxHeap();
        this.minHeap = new MinHeap();
    }
    
    addNum(num) {
        if (this.maxHeap.size() === 0 || num <= this.maxHeap.heap[0]) {
            this.maxHeap.push(num);
        } else {
            this.minHeap.push(num);
        }
        
        if (this.maxHeap.size() > this.minHeap.size() + 1) {
            this.minHeap.push(this.maxHeap.pop());
        } else if (this.minHeap.size() > this.maxHeap.size()) {
            this.maxHeap.push(this.minHeap.pop());
        }
    }
    
    findMedian() {
        if (this.maxHeap.size() > this.minHeap.size()) {
            return this.maxHeap.heap[0];
        }
        return (this.maxHeap.heap[0] + this.minHeap.heap[0]) / 2;
    }
}

// 97. Sliding window maximum
function maxSlidingWindow(nums, k) {
    let result = [];
    let deque = [];
    
    for (let i = 0; i < nums.length; i++) {
        while (deque.length && nums[deque[deque.length - 1]] <= nums[i]) {
            deque.pop();
        }
        deque.push(i);
        
        if (deque[0] <= i - k) deque.shift();
        if (i >= k - 1) result.push(nums[deque[0]]);
    }
    return result;
}

// 98. Top k frequent elements
function topKFrequent(nums, k) {
    let freq = new Map();
    for (let num of nums) {
        freq.set(num, (freq.get(num) || 0) + 1);
    }
    
    let minHeap = new MinHeap();
    for (let [num, count] of freq) {
        minHeap.push({ num, count });
        if (minHeap.size() > k) minHeap.pop();
    }
    
    let result = [];
    while (minHeap.size()) {
        result.push(minHeap.pop().num);
    }
    return result.reverse();
}

// 99. Reorganize string using heap
function reorganizeString(s) {
    let freq = new Map();
    for (let char of s) {
        freq.set(char, (freq.get(char) || 0) + 1);
    }
    
    let maxHeap = new MaxHeap();
    for (let [char, count] of freq) {
        maxHeap.push({ char, count });
    }
    
    let result = [];
    let prev = null;
    
    while (maxHeap.size()) {
        let current = maxHeap.pop();
        result.push(current.char);
        current.count--;
        
        if (prev && prev.count > 0) {
            maxHeap.push(prev);
        }
        prev = current;
    }
    
    return result.length === s.length ? result.join('') : "";
}

// 100. Task scheduler problem
function leastInterval(tasks, n) {
    let freq = new Array(26).fill(0);
    for (let task of tasks) {
        freq[task.charCodeAt(0) - 65]++;
    }
    freq.sort((a, b) => b - a);
    
    let maxFreq = freq[0];
    let idleSlots = (maxFreq - 1) * n;
    
    for (let i = 1; i < freq.length; i++) {
        idleSlots -= Math.min(maxFreq - 1, freq[i]);
    }
    
    return tasks.length + Math.max(0, idleSlots);
}

// ==================== BONUS HARDCORE TREE PROBLEMS (101-120) ====================

// 101. AVL tree implementation
class AVLNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class AVLTree {
    constructor() {
        this.root = null;
    }
    
    height(node) {
        return node ? node.height : 0;
    }
    
    getBalance(node) {
        return node ? this.height(node.left) - this.height(node.right) : 0;
    }
    
    rightRotate(y) {
        let x = y.left;
        let T2 = x.right;
        x.right = y;
        y.left = T2;
        y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;
        x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;
        return x;
    }
    
    leftRotate(x) {
        let y = x.right;
        let T2 = y.left;
        y.left = x;
        x.right = T2;
        x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;
        y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;
        return y;
    }
    
    insert(node, val) {
        if (!node) return new AVLNode(val);
        if (val < node.val) node.left = this.insert(node.left, val);
        else if (val > node.val) node.right = this.insert(node.right, val);
        else return node;
        
        node.height = 1 + Math.max(this.height(node.left), this.height(node.right));
        let balance = this.getBalance(node);
        
        if (balance > 1 && val < node.left.val) return this.rightRotate(node);
        if (balance < -1 && val > node.right.val) return this.leftRotate(node);
        if (balance > 1 && val > node.left.val) {
            node.left = this.leftRotate(node.left);
            return this.rightRotate(node);
        }
        if (balance < -1 && val < node.right.val) {
            node.right = this.rightRotate(node.right);
            return this.leftRotate(node);
        }
        return node;
    }
    
    insertVal(val) {
        this.root = this.insert(this.root, val);
    }
}

// 102. B-Tree implementation (simplified 2-3 tree)
class BTreeNode {
    constructor(leaf = true) {
        this.leaf = leaf;
        this.keys = [];
        this.children = [];
    }
}

class BTree {
    constructor(t) {
        this.root = new BTreeNode(true);
        this.t = t; // minimum degree
    }
    
    splitChild(parent, i) {
        let t = this.t;
        let node = parent.children[i];
        let newNode = new BTreeNode(node.leaf);
        
        parent.keys.splice(i, 0, node.keys[t - 1]);
        parent.children.splice(i + 1, 0, newNode);
        
        newNode.keys = node.keys.splice(t, t - 1);
        if (!node.leaf) {
            newNode.children = node.children.splice(t, t);
        }
    }
    
    insertNonFull(node, key) {
        let i = node.keys.length - 1;
        if (node.leaf) {
            while (i >= 0 && key < node.keys[i]) {
                i--;
            }
            node.keys.splice(i + 1, 0, key);
        } else {
            while (i >= 0 && key < node.keys[i]) {
                i--;
            }
            i++;
            if (node.children[i].keys.length === 2 * this.t - 1) {
                this.splitChild(node, i);
                if (key > node.keys[i]) i++;
            }
            this.insertNonFull(node.children[i], key);
        }
    }
    
    insert(key) {
        let root = this.root;
        if (root.keys.length === 2 * this.t - 1) {
            let newRoot = new BTreeNode(false);
            newRoot.children.push(root);
            this.root = newRoot;
            this.splitChild(newRoot, 0);
            this.insertNonFull(newRoot, key);
        } else {
            this.insertNonFull(root, key);
        }
    }
}

// 103. Splay tree operations
class SplayNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
        this.parent = null;
    }
}

class SplayTree {
    constructor() {
        this.root = null;
    }
    
    rotateRight(x) {
        let y = x.left;
        x.left = y.right;
        if (y.right) y.right.parent = x;
        y.parent = x.parent;
        if (!x.parent) this.root = y;
        else if (x === x.parent.left) x.parent.left = y;
        else x.parent.right = y;
        y.right = x;
        x.parent = y;
    }
    
    rotateLeft(x) {
        let y = x.right;
        x.right = y.left;
        if (y.left) y.left.parent = x;
        y.parent = x.parent;
        if (!x.parent) this.root = y;
        else if (x === x.parent.left) x.parent.left = y;
        else x.parent.right = y;
        y.left = x;
        x.parent = y;
    }
    
    splay(x) {
        while (x.parent) {
            if (!x.parent.parent) {
                if (x === x.parent.left) this.rotateRight(x.parent);
                else this.rotateLeft(x.parent);
            } else if (x === x.parent.left && x.parent === x.parent.parent.left) {
                this.rotateRight(x.parent.parent);
                this.rotateRight(x.parent);
            } else if (x === x.parent.right && x.parent === x.parent.parent.right) {
                this.rotateLeft(x.parent.parent);
                this.rotateLeft(x.parent);
            } else if (x === x.parent.right && x.parent === x.parent.parent.left) {
                this.rotateLeft(x.parent);
                this.rotateRight(x.parent);
            } else {
                this.rotateRight(x.parent);
                this.rotateLeft(x.parent);
            }
        }
    }
    
    insert(val) {
        let node = new SplayNode(val);
        if (!this.root) {
            this.root = node;
            return;
        }
        
        let current = this.root;
        while (current) {
            if (val < current.val) {
                if (!current.left) {
                    current.left = node;
                    node.parent = current;
                    break;
                }
                current = current.left;
            } else if (val > current.val) {
                if (!current.right) {
                    current.right = node;
                    node.parent = current;
                    break;
                }
                current = current.right;
            } else {
                return;
            }
        }
        this.splay(node);
    }
    
    search(val) {
        let current = this.root;
        while (current) {
            if (val < current.val) current = current.left;
            else if (val > current.val) current = current.right;
            else {
                this.splay(current);
                return true;
            }
        }
        return false;
    }
}

// 104. Treap implementation (Randomized BST)
class TreapNode {
    constructor(val) {
        this.val = val;
        this.priority = Math.random();
        this.left = null;
        this.right = null;
    }
}

function rotateRight(root) {
    let newRoot = root.left;
    root.left = newRoot.right;
    newRoot.right = root;
    return newRoot;
}

function rotateLeft(root) {
    let newRoot = root.right;
    root.right = newRoot.left;
    newRoot.left = root;
    return newRoot;
}

function treapInsert(root, val) {
    if (!root) return new TreapNode(val);
    if (val < root.val) {
        root.left = treapInsert(root.left, val);
        if (root.left.priority > root.priority) {
            root = rotateRight(root);
        }
    } else if (val > root.val) {
        root.right = treapInsert(root.right, val);
        if (root.right.priority > root.priority) {
            root = rotateLeft(root);
        }
    }
    return root;
}

// 105. Interval tree
class Interval {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
}

class IntervalNode {
    constructor(interval) {
        this.interval = interval;
        this.max = interval.end;
        this.left = null;
        this.right = null;
    }
}

class IntervalTree {
    constructor() {
        this.root = null;
    }
    
    insert(root, interval) {
        if (!root) return new IntervalNode(interval);
        if (interval.start < root.interval.start) {
            root.left = this.insert(root.left, interval);
        } else {
            root.right = this.insert(root.right, interval);
        }
        root.max = Math.max(root.interval.end, 
                           root.left ? root.left.max : -Infinity,
                           root.right ? root.right.max : -Infinity);
        return root;
    }
    
    overlapSearch(root, interval) {
        if (!root) return null;
        if (interval.start <= root.interval.end && interval.end >= root.interval.start) {
            return root.interval;
        }
        if (root.left && root.left.max >= interval.start) {
            return this.overlapSearch(root.left, interval);
        }
        return this.overlapSearch(root.right, interval);
    }
}

// 106. Persistent segment tree
class PersistentSegmentTree {
    constructor(arr) {
        this.roots = [];
        this.build(arr);
    }
    
    build(arr, l = 0, r = arr.length - 1) {
        let node = { left: null, right: null, sum: 0 };
        if (l === r) {
            node.sum = arr[l];
            return node;
        }
        let mid = Math.floor((l + r) / 2);
        node.left = this.build(arr, l, mid);
        node.right = this.build(arr, mid + 1, r);
        node.sum = node.left.sum + node.right.sum;
        return node;
    }
    
    update(prevNode, idx, val, l = 0, r = this.roots[0] ? this.getRange(this.roots[0]) - 1 : 0) {
        let newNode = { left: null, right: null, sum: 0 };
        if (l === r) {
            newNode.sum = val;
            return newNode;
        }
        let mid = Math.floor((l + r) / 2);
        if (idx <= mid) {
            newNode.left = this.update(prevNode.left, idx, val, l, mid);
            newNode.right = prevNode.right;
        } else {
            newNode.left = prevNode.left;
            newNode.right = this.update(prevNode.right, idx, val, mid + 1, r);
        }
        newNode.sum = (newNode.left?.sum || 0) + (newNode.right?.sum || 0);
        return newNode;
    }
    
    getRange(node) {
        function count(node) {
            if (!node) return 0;
            return 1 + count(node.left) + count(node.right);
        }
        return count(node);
    }
}

// 107. Heavy-Light Decomposition
class HLDNode {
    constructor(val) {
        this.val = val;
        this.children = [];
        this.parent = null;
        this.depth = 0;
        this.size = 1;
        this.heavy = null;
        this.head = null;
        this.pos = 0;
    }
}

class HeavyLightDecomposition {
    constructor(root) {
        this.root = root;
        this.currentPos = 0;
        this.decompose();
    }
    
    dfs(node) {
        node.size = 1;
        let maxSize = 0;
        for (let child of node.children) {
            child.depth = node.depth + 1;
            child.parent = node;
            this.dfs(child);
            node.size += child.size;
            if (child.size > maxSize) {
                maxSize = child.size;
                node.heavy = child;
            }
        }
    }
    
    decomposeUtil(node, head) {
        node.head = head;
        node.pos = this.currentPos++;
        if (node.heavy) {
            this.decomposeUtil(node.heavy, head);
        }
        for (let child of node.children) {
            if (child !== node.heavy) {
                this.decomposeUtil(child, child);
            }
        }
    }
    
    decompose() {
        this.dfs(this.root);
        this.decomposeUtil(this.root, this.root);
    }
    
    queryPath(u, v) {
        let res = [];
        while (u.head !== v.head) {
            if (u.head.depth < v.head.depth) {
                [u, v] = [v, u];
            }
            res.push([u.head.pos, u.pos]);
            u = u.head.parent;
        }
        if (u.depth > v.depth) [u, v] = [v, u];
        res.push([u.pos, v.pos]);
        return res;
    }
}

// 108. Binary lifting LCA
class LCABinaryLifting {
    constructor(root, n) {
        this.root = root;
        this.n = n;
        this.LOG = Math.ceil(Math.log2(n)) + 1;
        this.up = new Array(n);
        this.depth = new Array(n);
        this.preprocess();
    }
    
    dfs(node, parent, depth) {
        this.depth[node.val] = depth;
        this.up[node.val][0] = parent;
        for (let i = 1; i < this.LOG; i++) {
            this.up[node.val][i] = this.up[this.up[node.val][i - 1]][i - 1];
        }
        if (node.left) this.dfs(node.left, node.val, depth + 1);
        if (node.right) this.dfs(node.right, node.val, depth + 1);
    }
    
    preprocess() {
        for (let i = 0; i < this.n; i++) {
            this.up[i] = new Array(this.LOG);
        }
        this.dfs(this.root, this.root.val, 0);
    }
    
    lca(a, b) {
        if (this.depth[a] < this.depth[b]) [a, b] = [b, a];
        let diff = this.depth[a] - this.depth[b];
        for (let i = 0; i < this.LOG; i++) {
            if (diff & (1 << i)) {
                a = this.up[a][i];
            }
        }
        if (a === b) return a;
        for (let i = this.LOG - 1; i >= 0; i--) {
            if (this.up[a][i] !== this.up[b][i]) {
                a = this.up[a][i];
                b = this.up[b][i];
            }
        }
        return this.up[a][0];
    }
}

// 109. Euler tour technique
class EulerTour {
    constructor(root) {
        this.root = root;
        this.euler = [];
        this.first = new Map();
        this.last = new Map();
        this.depth = new Map();
        this.performTour(root, 0);
    }
    
    performTour(node, d) {
        if (!node) return;
        this.first.set(node.val, this.euler.length);
        this.depth.set(node.val, d);
        this.euler.push(node.val);
        if (node.left) {
            this.performTour(node.left, d + 1);
            this.euler.push(node.val);
        }
        if (node.right) {
            this.performTour(node.right, d + 1);
            this.euler.push(node.val);
        }
        this.last.set(node.val, this.euler.length - 1);
    }
    
    isAncestor(u, v) {
        return this.first.get(u) <= this.first.get(v) && 
               this.last.get(u) >= this.last.get(v);
    }
}

// 110. Centroid decomposition
class CentroidDecomposition {
    constructor(root, n) {
        this.root = root;
        this.n = n;
        this.size = new Array(n);
        this.deleted = new Array(n);
        this.parent = new Array(n);
        this.buildCentroid(root);
    }
    
    getSize(node, parent) {
        this.size[node.val] = 1;
        if (node.left && node.left.val !== parent && !this.deleted[node.left.val]) {
            this.getSize(node.left, node.val);
            this.size[node.val] += this.size[node.left.val];
        }
        if (node.right && node.right.val !== parent && !this.deleted[node.right.val]) {
            this.getSize(node.right, node.val);
            this.size[node.val] += this.size[node.right.val];
        }
    }
    
    findCentroid(node, parent, totalSize) {
        for (let child of [node.left, node.right]) {
            if (child && child.val !== parent && !this.deleted[child.val] && 
                this.size[child.val] > totalSize / 2) {
                return this.findCentroid(child, node.val, totalSize);
            }
        }
        return node;
    }
    
    buildCentroid(node) {
        this.getSize(node, -1);
        let centroid = this.findCentroid(node, -1, this.size[node.val]);
        this.deleted[centroid.val] = true;
        
        if (centroid.left && !this.deleted[centroid.left.val]) {
            let subCentroid = this.buildCentroid(centroid.left);
            this.parent[subCentroid.val] = centroid.val;
        }
        if (centroid.right && !this.deleted[centroid.right.val]) {
            let subCentroid = this.buildCentroid(centroid.right);
            this.parent[subCentroid.val] = centroid.val;
        }
        
        return centroid;
    }
}

// 111. Rope data structure
class RopeNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
        this.length = data.length;
    }
}

class Rope {
    constructor(str) {
        this.root = this.buildRope(str);
    }
    
    buildRope(str) {
        if (str.length <= 4) return new RopeNode(str);
        let mid = Math.floor(str.length / 2);
        let node = new RopeNode("");
        node.left = this.buildRope(str.substring(0, mid));
        node.right = this.buildRope(str.substring(mid));
        node.length = (node.left?.length || 0) + (node.right?.length || 0);
        return node;
    }
    
    index(node, idx) {
        if (!node) return "";
        if (node.data) return node.data[idx];
        if (idx < node.left.length) return this.index(node.left, idx);
        return this.index(node.right, idx - node.left.length);
    }
    
    concatenate(r1, r2) {
        let node = new RopeNode("");
        node.left = r1.root;
        node.right = r2.root;
        node.length = (node.left?.length || 0) + (node.right?.length || 0);
        return new Rope("", node);
    }
    
    split(node, idx) {
        if (!node) return [null, null];
        if (node.data) {
            return [
                new RopeNode(node.data.substring(0, idx)),
                new RopeNode(node.data.substring(idx))
            ];
        }
        if (idx < node.left.length) {
            let [leftLeft, leftRight] = this.split(node.left, idx);
            node.left = leftRight;
            node.length = (node.left?.length || 0) + (node.right?.length || 0);
            return [leftLeft, node];
        } else {
            let [rightLeft, rightRight] = this.split(node.right, idx - node.left.length);
            node.right = rightLeft;
            node.length = (node.left?.length || 0) + (node.right?.length || 0);
            return [node, rightRight];
        }
    }
}

// 112. Huffman coding tree
class HuffmanNode {
    constructor(char, freq) {
        this.char = char;
        this.freq = freq;
        this.left = null;
        this.right = null;
    }
}

function buildHuffmanTree(chars, freqs) {
    let heap = new MinHeap();
    for (let i = 0; i < chars.length; i++) {
        heap.push(new HuffmanNode(chars[i], freqs[i]));
    }
    
    while (heap.size() > 1) {
        let left = heap.pop();
        let right = heap.pop();
        let parent = new HuffmanNode(null, left.freq + right.freq);
        parent.left = left;
        parent.right = right;
        heap.push(parent);
    }
    
    return heap.pop();
}

function getHuffmanCodes(root, code = "", codes = {}) {
    if (!root) return codes;
    if (root.char) {
        codes[root.char] = code;
    }
    getHuffmanCodes(root.left, code + "0", codes);
    getHuffmanCodes(root.right, code + "1", codes);
    return codes;
}

// 113. KD-tree basics (2D)
class KDNode {
    constructor(point, left = null, right = null) {
        this.point = point;
        this.left = left;
        this.right = right;
    }
}

class KDTree {
    constructor(points) {
        this.root = this.build(points, 0);
    }
    
    build(points, depth) {
        if (!points.length) return null;
        let axis = depth % 2;
        points.sort((a, b) => a[axis] - b[axis]);
        let median = Math.floor(points.length / 2);
        let node = new KDNode(points[median]);
        node.left = this.build(points.slice(0, median), depth + 1);
        node.right = this.build(points.slice(median + 1), depth + 1);
        return node;
    }
    
    distanceSquared(p1, p2) {
        return (p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2;
    }
    
    nearestNeighbor(node, target, depth, best) {
        if (!node) return best;
        let axis = depth % 2;
        let nextBranch = null;
        let oppositeBranch = null;
        
        if (target[axis] < node.point[axis]) {
            nextBranch = node.left;
            oppositeBranch = node.right;
        } else {
            nextBranch = node.right;
            oppositeBranch = node.left;
        }
        
        best = this.nearestNeighbor(nextBranch, target, depth + 1, best);
        
        let dist = this.distanceSquared(node.point, target);
        if (dist < this.distanceSquared(best, target)) {
            best = node.point;
        }
        
        if ((target[axis] - node.point[axis]) ** 2 < this.distanceSquared(best, target)) {
            best = this.nearestNeighbor(oppositeBranch, target, depth + 1, best);
        }
        
        return best;
    }
}

// 114. Merkle tree basics
class MerkleNode {
    constructor(hash, left = null, right = null) {
        this.hash = hash;
        this.left = left;
        this.right = right;
    }
}

class MerkleTree {
    constructor(leaves) {
        this.leaves = leaves.map(l => this.hash(l));
        this.root = this.buildTree(this.leaves);
    }
    
    hash(data) {
        // Simple hash function (in practice use crypto)
        let hash = 0;
        for (let i = 0; i < data.length; i++) {
            hash = ((hash << 5) - hash) + data.charCodeAt(i);
            hash |= 0;
        }
        return hash.toString();
    }
    
    buildTree(hashes) {
        if (hashes.length === 1) return new MerkleNode(hashes[0]);
        let nextLevel = [];
        for (let i = 0; i < hashes.length; i += 2) {
            if (i + 1 < hashes.length) {
                let combined = this.hash(hashes[i] + hashes[i + 1]);
                nextLevel.push(combined);
            } else {
                nextLevel.push(hashes[i]);
            }
        }
        return this.buildTree(nextLevel);
    }
    
    getRoot() {
        return this.root.hash;
    }
}

// 115. File system tree traversal
class FileNode {
    constructor(name, isFile = false, content = "") {
        this.name = name;
        this.isFile = isFile;
        this.content = content;
        this.children = new Map();
    }
}

class FileSystem {
    constructor() {
        this.root = new FileNode("/");
    }
    
    mkdir(path) {
        let parts = path.split('/').filter(p => p);
        let current = this.root;
        for (let part of parts) {
            if (!current.children.has(part)) {
                current.children.set(part, new FileNode(part));
            }
            current = current.children.get(part);
        }
    }
    
    addFile(path, content) {
        let parts = path.split('/').filter(p => p);
        let fileName = parts.pop();
        let current = this.root;
        for (let part of parts) {
            if (!current.children.has(part)) {
                current.children.set(part, new FileNode(part));
            }
            current = current.children.get(part);
        }
        current.children.set(fileName, new FileNode(fileName, true, content));
    }
    
    readFile(path) {
        let parts = path.split('/').filter(p => p);
        let current = this.root;
        for (let part of parts) {
            if (!current.children.has(part)) return null;
            current = current.children.get(part);
        }
        return current.isFile ? current.content : null;
    }
    
    ls(path) {
        let parts = path.split('/').filter(p => p);
        let current = this.root;
        for (let part of parts) {
            if (!current.children.has(part)) return [];
            current = current.children.get(part);
        }
        return Array.from(current.children.keys()).sort();
    }
    
    traverse(node = this.root, indent = 0) {
        if (!node) return;
        console.log("  ".repeat(indent) + node.name + (node.isFile ? ` (file: ${node.content})` : "/"));
        for (let child of node.children.values()) {
            this.traverse(child, indent + 1);
        }
    }
}

// 116. Expression tree evaluation
class ExpressionNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function buildExpressionTree(postfix) {
    let stack = [];
    for (let token of postfix) {
        if (!isNaN(token)) {
            stack.push(new ExpressionNode(parseInt(token)));
        } else {
            let right = stack.pop();
            let left = stack.pop();
            stack.push(new ExpressionNode(token, left, right));
        }
    }
    return stack[0];
}

function evaluateExpressionTree(root) {
    if (!root) return 0;
    if (!root.left && !root.right) return root.val;
    
    let leftVal = evaluateExpressionTree(root.left);
    let rightVal = evaluateExpressionTree(root.right);
    
    switch (root.val) {
        case '+': return leftVal + rightVal;
        case '-': return leftVal - rightVal;
        case '*': return leftVal * rightVal;
        case '/': return leftVal / rightVal;
        default: return 0;
    }
}

function inorderExpression(root, result = []) {
    if (!root) return result;
    if (root.left || root.right) result.push('(');
    inorderExpression(root.left, result);
    result.push(root.val);
    inorderExpression(root.right, result);
    if (root.left || root.right) result.push(')');
    return result;
}

// ==================== EXPORT ====================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        TreeNode, NodeWithNext, AVLNode, BTreeNode, IntervalNode, SplayNode, 
        TreapNode, KDNode, MerkleNode, FileNode, ExpressionNode,
        // 1-16: Basics
        createBinaryTree, createBST, insertIntoBST, deleteFromBST, searchBST,
        findHeight, countNodes, countLeaves, countInternalNodes, findMax,
        findMinBST, isEmpty, mirrorTree, cloneTree, isSameTree,
        // 16-25: DFS
        preorderRecursive, inorderRecursive, postorderRecursive,
        preorderIterative, inorderIterative, postorderIterative,
        morrisInorder, morrisPreorder, rootToLeafPaths, sumNumbers,
        // 26-37: BFS
        levelOrder, zigzagLevelOrder, rightSideView, leftSideView,
        averageOfLevels, maxLevelSum, deepestLeavesSum, verticalOrder,
        topView, bottomView, boundaryTraversal, widthOfBinaryTree,
        // 38-45: Construction
        buildTreeFromPreIn, buildTreeFromInPost, bstFromPreorder,
        sortedArrayToBST, sortedListToBST, serialize, deserialize,
        recoverFromTraversal,
        // 46-55: BST Patterns
        isValidBST, lowestCommonAncestorBST, kthSmallest, kthLargest,
        BSTIterator, bstToDoublyList, trimBST, balanceBST,
        inorderSuccessor, inorderPredecessor,
        // 56-65: Path/Recursion
        maxDepth, minDepth, diameterOfBinaryTree, maxPathSum,
        hasPathSum, pathSum, pathSumIII, longestUnivaluePath,
        isSumTree, isChildrenSumProperty,
        // 66-75: Transformation
        flatten, invertTree, connectNextRight, treeToDoublyList,
        removeLeafNodes, pruneTree, addOneRow, reverseOddLevels,
        mergeTrees, expandToParentChild,
        // 76-87: Advanced
        lowestCommonAncestor, LCAWithParent, minCameraCover, rob,
        distributeCoins, recoverTree, countCompleteNodes, largestBSTSubtree,
        constructQuadTree, SegmentTree, FenwickTree,
        // 88-90: Trie
        Trie, WordDictionary, AutocompleteSystem,
        // 91-100: Heap
        MinHeap, MaxHeap, heapSort, findKthLargest, mergeKSortedArrays,
        MedianFinder, maxSlidingWindow, topKFrequent, reorganizeString,
        leastInterval,
        // 101-116: Bonus
        AVLTree, BTree, SplayTree, treapInsert, IntervalTree,
        PersistentSegmentTree, HeavyLightDecomposition, LCABinaryLifting,
        EulerTour, CentroidDecomposition, Rope, buildHuffmanTree,
        getHuffmanCodes, KDTree, MerkleTree, FileSystem,
        buildExpressionTree, evaluateExpressionTree, inorderExpression
    };
}