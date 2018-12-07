// Doubly Linked List
// Good for insert/remove, slow for search
// There is an option for storing key/value pairs in node.value, with methods for searchByKey and removeByKey.
// Cormen: Introduction to algorythms, 2009, pág. 236.
// Aditya Bhargava: Grokking Algorithms, 2016, pág. 21.
// https://www.geeksforgeeks.org/data-structures/linked-list/

const LinkedList = function() {
    this.head = null;
    this.tail = null;
};

const Node = function(value, next, prev) {
    this.value = value;
    this.next = next;
    this.prev = prev;
};

LinkedList.prototype.search = function(searchValue) {
    let currentNode = this.head;

    while (currentNode) {
        if (currentNode.value === searchValue) {
            return currentNode;
        }
        currentNode = currentNode.next;
    }

    return null;
};

LinkedList.prototype.searchByKey = function(searchKey) {
    let currentNode = this.head;
    while (currentNode) {
        if (Object.keys(currentNode.value)[0] === searchKey) {
            return currentNode;
        }
        currentNode = currentNode.next;
    }

    return null;
};

LinkedList.prototype.addToHead = function(value) {
    const newNode = new Node(value, this.head, null);
    if (this.head) {
        this.head.prev = newNode;
    } else {
        this.tail = newNode;
    }
    this.head = newNode;
};

LinkedList.prototype.addToTail = function(value) {
    const newNode = new Node(value, null, this.tail);
    if (this.tail) {
        this.tail.next = newNode;
    } else {
        this.head = newNode;
    }
    this.tail = newNode;
};

LinkedList.prototype.addAfter = function(valueToLookup, valueToInsert) {
    const newNode = new Node(valueToInsert, null, null);
    const nodeBefore = this.search(valueToLookup);
    if (this.head) {
        newNode.prev = nodeBefore;
        newNode.next = nodeBefore.next;
        nodeBefore.next.prev = newNode;
        nodeBefore.next = newNode;
    } else {
        this.head = newNode;
    }
};

LinkedList.prototype.remove = function(value) {
    var nodeToDelete = this.search(value);

    if (nodeToDelete.prev) {
        nodeToDelete.prev.next = nodeToDelete.next;
    } else {
        this.head = nodeToDelete.next;
    }
    if (nodeToDelete.next) {
        nodeToDelete.next.prev = nodeToDelete.prev;
    }
};

LinkedList.prototype.removeByKey = function(searchKey) {
    var nodeToDelete = this.searchByKey(searchKey);

    if (nodeToDelete.prev) {
        nodeToDelete.prev.next = nodeToDelete.next;
    } else {
        this.head = nodeToDelete.next;
    }
    if (nodeToDelete.next) {
        nodeToDelete.next.prev = nodeToDelete.prev;
    } else {
        this.tail = nodeToDelete.prev;
    }
};

LinkedList.prototype.removeHead = function() {
    if (!this.head) {
        return null;
    }
    let value = this.head.value;
    this.head = this.head.next;

    if (this.head) {
        this.head.prev = null;
    } else {
        this.tail = null;
    }

    return value;
};

LinkedList.prototype.removeTail = function() {
    if (!this.tail) {
        return null;
    }
    let value = this.tail.value;
    this.tail = this.tail.prev;

    if (this.tail) {
        this.tail.next = null;
    } else this.head = null;

    return value;
};

LinkedList.prototype.traverse = function(fn) {
    let currentNode = this.head;
    while (currentNode) {
        fn(currentNode);
        currentNode = currentNode.next;
    }

    return null;
};

export default LinkedList;
