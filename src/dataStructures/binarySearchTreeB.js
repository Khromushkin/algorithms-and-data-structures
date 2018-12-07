// Version B handle duplicates with a `count` value in the nodes
// Cormen: Introduction to algorythms, 2009, pág. 286.
// Aditya Bhargava: Grokking Algorithms, 2016, pág. 203.
// https://www.geeksforgeeks.org/how-to-handle-duplicates-in-binary-search-tree/

function Node(value) {
    this.value = value;
    this.count = 1;
    this.left = null;
    this.right = null;
}

function BinarySearchTreeB() {
    this.root = null;
}

BinarySearchTreeB.prototype.insert = function(value) {
    let node = new Node(value);
    if (!this.root) {
        this.root = node;
    } else {
        let current = this.root;
        while (current) {
            if (node.value < current.value) {
                if (!current.left) {
                    current.left = node;
                    break;
                }
                current = current.left;
            } else if (node.value > current.value) {
                if (!current.right) {
                    current.right = node;
                    break;
                }
                current = current.right;
            } else {
                current.count++;
                break;
            }
        }
    }

    return this;
};

BinarySearchTreeB.prototype.contains = function(value) {
    let current = this.root;
    while (current) {
        if (value === current.value) {
            return true;
        }
        if (value < current.value) {
            current = current.left;
        }
        if (value > current.value) {
            current = current.right;
        }
    }

    return false;
};

BinarySearchTreeB.prototype.getMin = function(node) {
    if (!node) {
        node = this.root;
    }
    while (node.left) {
        node = node.left;
    }

    return node.value;
};

BinarySearchTreeB.prototype.getMax = function(node) {
    if (!node) {
        node = this.root;
    }
    while (node.right) {
        node = node.right;
    }

    return node.value;
};

BinarySearchTreeB.prototype.removeNode = function(node, value) {
    if (!node) {
        return null;
    }
    if (value === node.value) {
        if (node.count > 1) {
            node.count--;

            return node;
        }
        if (!node.left && !node.right) {
            return null;
        }
        if (!node.left) {
            node.right;
        }
        if (!node.right) {
            node.left;
        }

        const temp = this.getMin(node.right);
        node.value = temp;
        node.right = this.removeNode(node.right, temp);

        return node;
    } else if (value < node.value) {
        node.left = this.removeNode(node.left, value);

        return node;
    } else {
        node.right = this.removeNode(node.right, value);

        return node;
    }
};

BinarySearchTreeB.prototype.remove = function(value) {
    this.root = this.removeNode(this.root, value);
};

BinarySearchTreeB.prototype.traverseBreadthFirst = function(fn) {
    let queue = [];
    queue.push(this.root);
    while (queue.length) {
        let node = queue.shift();
        fn(node);
        node.left && queue.push(node.left);
        node.right && queue.push(node.right);
    }
};

BinarySearchTreeB.prototype.traverseDepthFirst = function(fn, method) {
    let current = this.root;
    if (method) {
        this[method](current, fn);
    } else {
        this._preOrder(current, fn);
    }
};

BinarySearchTreeB.prototype._inOrder = function(node, fn) {
    if (node) {
        this._inOrder(node.left, fn);
        if (fn) {
            fn(node);
        }
        this._inOrder(node.right, fn);
    }
};

BinarySearchTreeB.prototype._preOrder = function(node, fn) {
    if (node) {
        if (fn) {
            fn(node);
        }
        this._preOrder(node.left, fn);
        this._preOrder(node.right, fn);
    }
};

BinarySearchTreeB.prototype._postOrder = function(node, fn) {
    if (node) {
        this._postOrder(node.left, fn);
        this._postOrder(node.right, fn);
        if (fn) {
            fn(node);
        }
    }
};

BinarySearchTreeB.prototype._getHeights = function(node) {
    if (!node) {
        return -1;
    }
    let left = this._getHeights(node.left);
    let right = this._getHeights(node.right);

    return Math.max(left, right) + 1;
};

BinarySearchTreeB.prototype.getHeight = function(node) {
    if (!node) {
        node = this.root;
    }

    return this._getHeights(node);
};

BinarySearchTreeB.prototype._isBalanced = function(node) {
    if (!node) {
        return true;
    }
    let heightLeft = this._getHeights(node.left);
    let heightRight = this._getHeights(node.right);
    let diff = Math.abs(heightLeft - heightRight);
    if (diff > 1) {
        return false;
    } else {
        return this._isBalanced(node.left) && this._isBalanced(node.right);
    }
};

BinarySearchTreeB.prototype.isBalanced = function(node) {
    if (!node) {
        node = this.root;
    }

    return this._isBalanced(node);
};

export default BinarySearchTreeB;
