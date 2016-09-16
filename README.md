[![Build Status](https://travis-ci.org/duereg/js-algorithms.svg)](https://travis-ci.org/duereg/js-algorithms)
[![Dependencies](https://david-dm.org/duereg/js-algorithms.svg)](https://david-dm.org/duereg/js-algorithms)
[![devDependencies](https://david-dm.org/duereg/js-algorithms/dev-status.svg)](https://david-dm.org/duereg/js-algorithms#info=devDependencies&view=table)
[![NPM version](https://badge.fury.io/js/js-algorithms.svg)](http://badge.fury.io/js/js-algorithms)

JS-Algorithms
=============

In case you want to prepare yourself for a job interview, or just need access to common data structures.

I've documented the process of creating this code [here](http://blog.mattblair.co).

# Problems

| Algorithms                                                               | Solution                                                                                                                     |
|--------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| [Binary Heap](http://en.wikipedia.org/wiki/Binary_heap)                   | [click](https://github.com/duereg/js-algorithms/blob/master/lib/dataStructures/binaryHeap.js)                               |
| [Binary Search Tree](http://en.wikipedia.org/wiki/Binary_search_tree)     | [click](https://github.com/duereg/js-algorithms/blob/master/lib/dataStructures/binarySearchTree.js)  |
| [Depth First Search](http://en.wikipedia.org/wiki/Depth-first_search)    | [click](https://github.com/duereg/js-algorithms/blob/master/lib/algorithms/4-searching/depthFirstSearch.js) |
| [Fisher–Yates shuffle](http://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle) | [click](https://github.com/duereg/js-algorithms/blob/master/lib/algorithms/1-strings/shuffle.js) |
| [Max Heap](http://en.wikipedia.org/wiki/Binary_heap)                      | [click](https://github.com/duereg/js-algorithms/blob/master/lib/dataStructures/maxHeap.js) |
| [Mergesort algorithm](https://en.wikipedia.org/wiki/Merge_sort)          | [click](https://github.com/duereg/js-algorithms/blob/master/lib/algorithms/11-sorting/mergeSort.js) |
| [Min Heap](http://en.wikipedia.org/wiki/Binary_heap)                      | [click](https://github.com/duereg/js-algorithms/blob/master/lib/dataStructures/minHeap.js) |
| [Queue](http://en.wikipedia.org/wiki/Queue_%28abstract_data_type%29)      | [click](https://github.com/duereg/js-algorithms/blob/master/lib/dataStructures/queue.js)  |
| [Quicksort algorithm](http://en.wikipedia.org/wiki/Quicksort)            | [click](https://github.com/duereg/js-algorithms/blob/master/lib/algorithms/11-sorting/quickSort.js) |
| [Stack](http://en.wikipedia.org/wiki/Stack_%28abstract_data_type%29)      | [click](https://github.com/duereg/js-algorithms/blob/master/lib/dataStructures/stack.js)  |
| [Tower of Hanoi](http://en.wikipedia.org/wiki/Tower_of_Hanoi)            | [click](https://github.com/duereg/js-algorithms/blob/master/lib/algorithms/3-stacks/hanoi.js) |
| [Trie](http://en.wikipedia.org/wiki/Trie)                                 | [click](https://github.com/duereg/js-algorithms/blob/master/lib/dataStructures/trie.js)  |
| [Basic string compression counting repeated characters](http://codereview.stackexchange.com/questions/65335/basic-string-compression-counting-repeated-characters) | [click](https://github.com/duereg/js-algorithms/blob/master/lib/algorithms/1-strings/compress.js) |
| [Are two strings permutations of each other](http://stackoverflow.com/questions/2131997/checking-if-two-strings-are-permutations-of-each-other) | [click](https://github.com/duereg/js-algorithms/blob/master/lib/algorithms/1-strings/permutation.js) |
| [Is a linked list a palindrome](http://www.geeksforgeeks.org/function-to-check-if-a-singly-linked-list-is-palindrome/) | [click](https://github.com/duereg/js-algorithms/blob/master/lib/algorithms/2-linkedLists/palindrome.js) |
| [Smallest Enclosing Circle](https://www.nayuki.io/page/smallest-enclosing-circle) | [click](https://github.com/duereg/js-algorithms/blob/master/lib/algorithms/4-searching/smallestEnclosingCircle.js)  |

# Description

Classic data structures and algorithms (with tests!) written in JavaScript

* Singly Linked List
* Min/Max Binary Heap
* Trie (With Pre-Order Traversal Sorting)
* Stack (push, pop, peek, and isEmpty)
* Queue (add, remove, peek, isEmpty)
* Binary Search Tree
* Hash Table

As well as the following algorithms:

* Breadth First Search
* Depth First Search
* Binary Search
* Merge Sort
* Quick Sort
* Shuffle (Fisher–Yates)
* Smallest Enclosing Circle

##Usage

If you want access to these data structures in your project, include this package.

```shell
> var algorithms: = require('js-algorithms')
> algorithms
{
  dataStructures: {
    binaryHeap: [Function],
    binarySearchTree: [Function: bst],
    linkedList: [Function],
    maxHeap: [Function],
    minHeap: [Function],
    queue: [Function],
    stack: [Function],
    stackQueue: [Function],
    trie: [Function] },
  algorithms: {
    sorting: {
      quickSort: [Function]
      mergeSort: [Function]
    },
    shuffle: [Function],
    enclosingCircle: [Function]
  }}
```


