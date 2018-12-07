// Values are stored in key/values pairs inside double linked lists.
// Linked list can be found in ./linkedList.
// The search method performs a search for the proper hashed key, which will be a linked list. Inside this linked list it will perform a search by key.
// Cormen: Introduction to algorythms, 2009, pág. 253.
// Aditya Bhargava: Grokking Algorithms, 2016, pág. 73.
// http://www.mattzeunert.com/2017/02/01/implementing-a-hash-table-in-javascript.html

import myLib from '../..';

function HashTable() {
	this.SIZE = 5;
	this.currentSize = 0;
	this.storage = new Array(this.SIZE);
}

HashTable.prototype.hashCode = function(string, size) {
	var hash = 0;
	if (string.length == 0) return hash;
	for (let i = 0; i < string.length; i++) {
		var letter = string.charCodeAt(i);
		hash = (hash << 5) - hash + letter;
		hash = hash & hash;
	}

	return Math.abs(hash) % size;
};

HashTable.prototype.rehash = function(resize, size) {
	var self = this;
	if (resize === true) {
		this.SIZE *= 2;
	} else {
		this.SIZE = Math.ceil(this.SIZE / 2);
	}
	this.currentSize = 0;
	let storage = this.storage;
	this.storage = new Array(this.SIZE);
	storage.forEach(list => {
		list.traverse(function(node) {
			let key = Object.keys(node.value)[0];
			self.set(key, node.value[key]);
		});
	});
};

HashTable.prototype.set = function(key, value) {
	if (!value) {
		value = undefined;
	}
	let hashKey = this.hashCode(key, this.SIZE);
	if (!this.storage[hashKey]) {
		var newLinkedList = new myLib.LinkedList();
		newLinkedList.addToTail({
			[key]: value
		});

		this.storage[hashKey] = newLinkedList;
		this.currentSize++;
	} else {
		this.storage[hashKey].addToTail({
			[key]: value
		});
		this.currentSize++;
	}

	if (this.currentSize >= 10 * this.SIZE) {
		this.rehash(true);
	}
};

HashTable.prototype.get = function(key) {
	let hashKey = this.hashCode(key, this.SIZE);
	if (this.storage[hashKey]) {
		return this.storage[hashKey].searchByKey(key).value[key];
	} else {
		return null;
	}
};

HashTable.prototype.remove = function(key) {
	let value = this.get(key);
	let hashKey = this.hashCode(key, this.SIZE);
	if (value !== null) {
		this.storage[hashKey].removeByKey(key);
		if (this.storage[hashKey].head === null && this.storage[hashKey].tail === null) {
			delete this.storage[hashKey];
		}
	}
	if (this.currentSize < 10 * this.SIZE) {
		this.rehash(false);
	}

	return value;
};

export default HashTable;
