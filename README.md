# Algorithms and data structures

Basic Javascript implementation of some algorithms and data structures.

## Use

Add to `/libs` folder and import as usual

```js
import myLib from '../shared/libs/algorithms_and_data_structures';
var binarySearchTreeA = new myLib.BinarySearchTreeA();
binarySearchTreeA.insert(10);
console.log(binarySearchTreeA);
```

## Content

-   Algorithms

    -   Binary search
    -   Bubble sort
    -   Quick sort
    -   Selection sort

-   Data structures

    -   Linked list: doubly linked list. Optional key/property values in `node.value`.

        -   search: Return a node matching value. Returns node (Object).
        -   searchByKey: Return a node from list with key/value key matching passed value. Returns node (Object).
        -   addToHead: Prepend node with value to the list.
        -   addToTail: Append node with value to the list.
        -   addAfter: Insert node with value after item with declared value.
        -   remove: Remove matching node from list.
        -   removeByKey: Remove from list node with key/value key matching passed value.
        -   removeHead: Remove first item from list.
        -   removeTail: Remove last item from list.
        -   traverse: Traverse the List and execute the function for each node.

    -   Hash table: hash table with linked lists for collisions. Resizing after items exceed ten times the size of the table.

        -   set: Append a new element in the linked list mathing hashed `key`.
        -   get: Return element matching `key` in linked list matching its hash.
        -   remove: Remove element matching `key` in linked list matching its hash.

    -   Binary Search Tree: version `A` handling duplicates in right leaves, and version `B` handling duplicates with a `node.count` property.

## TODO

-   Add API for Binary Search Tree
-   Add API for Binary Search
-   Add API for Bubble Sort
-   Add API for Quick Sort
-   Add API for Selection Sort
-   Add Stack
-   Add Queue
-   Add Merge Sort
-   Add Insertion sort
-   Add Interpolation Search
-   Add Linear search
