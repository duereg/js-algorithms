[![NPM version](https://badge.fury.io/js/js-algorithms.svg)](http://badge.fury.io/js/js-algorithms)

JS-Algorithms
=============

In case you want to prepare yourself for a job interview, or just need access to common data structures.

I've documented the process of creating this code [here](http://blog.mattblair.co).

# Problems

| Algorithm                                                               | Solution                                                                                                                     |
|--------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| [Binary Heap](http://en.wikipedia.org/wiki/Binary_heap)                   | [code](https://github.com/duereg/js-algorithms/blob/master/lib/dataStructures/binaryHeap.js)                               |
| [Binary Search Tree](http://en.wikipedia.org/wiki/Binary_search_tree)     | [code](https://github.com/duereg/js-algorithms/blob/master/lib/dataStructures/binarySearchTree.js)  |
| [Depth First Search](http://en.wikipedia.org/wiki/Depth-first_search)    | [code](https://github.com/duereg/js-algorithms/blob/master/lib/algorithms/4-searching/depthFirstSearch.js) |
| [Fisher–Yates shuffle](http://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle) | [code](https://github.com/duereg/js-algorithms/blob/master/lib/algorithms/1-strings/shuffle.js) |
| [Max Heap](http://en.wikipedia.org/wiki/Binary_heap)                      | [code](https://github.com/duereg/js-algorithms/blob/master/lib/dataStructures/maxHeap.js) |
| [Mergesort algorithm](https://en.wikipedia.org/wiki/Merge_sort)          | [code](https://github.com/duereg/js-algorithms/blob/master/lib/algorithms/11-sorting/mergeSort.js) |
| [Min Heap](http://en.wikipedia.org/wiki/Binary_heap)                      | [code](https://github.com/duereg/js-algorithms/blob/master/lib/dataStructures/minHeap.js) |
| [Queue](http://en.wikipedia.org/wiki/Queue_%28abstract_data_type%29)      | [code](https://github.com/duereg/js-algorithms/blob/master/lib/dataStructures/queue.js)  |
| [Quicksort algorithm](http://en.wikipedia.org/wiki/Quicksort)            | [code](https://github.com/duereg/js-algorithms/blob/master/lib/algorithms/11-sorting/quickSort.js) |
| [Stack](http://en.wikipedia.org/wiki/Stack_%28abstract_data_type%29)      | [code](https://github.com/duereg/js-algorithms/blob/master/lib/dataStructures/stack.js)  |
| [Tower of Hanoi](http://en.wikipedia.org/wiki/Tower_of_Hanoi)            | [code](https://github.com/duereg/js-algorithms/blob/master/lib/algorithms/3-stacks/hanoi.js) |
| [Trie](http://en.wikipedia.org/wiki/Trie)                                 | [code](https://github.com/duereg/js-algorithms/blob/master/lib/dataStructures/trie.js)  |
| [Suffix Tree](http://www.allisons.org/ll/AlgDS/Tree/Suffix/)               |[code](https://github.com/duereg/js-algorithms/blob/master/lib/dataStructures/suffixTree.js) |
| [Basic string compression counting repeated characters](http://codereview.stackexchange.com/questions/65335/basic-string-compression-counting-repeated-characters) | [code](https://github.com/duereg/js-algorithms/blob/master/lib/algorithms/1-strings/compress.js) |
| [Are two strings permutations of each other](http://stackoverflow.com/questions/2131997/checking-if-two-strings-are-permutations-of-each-other) | [code](https://github.com/duereg/js-algorithms/blob/master/lib/algorithms/1-strings/permutation.js) |
| [Is a linked list a palindrome](http://www.geeksforgeeks.org/function-to-check-if-a-singly-linked-list-is-palindrome/) | [code](https://github.com/duereg/js-algorithms/blob/master/lib/algorithms/2-linkedLists/palindrome.js) |
| [Smallest Enclosing Circle](https://www.nayuki.io/page/smallest-enclosing-circle) | [code](https://github.com/duereg/js-algorithms/blob/master/lib/algorithms/4-searching/smallestEnclosingCircle.js)  |

# Description

Classic data structures and algorithms (with tests!) written in JavaScript

* Singly Linked List
* Min/Max Binary Heap
* Trie (With Pre-Order Traversal Sorting)
* Suffix Tree
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

## Usage

If you want access to these data structures in your project, include this package.

```shell
> const algorithms: = require('js-algorithms')
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
    trie: [Function],
    suffixTree: [Function] },
  algorithms: {
    sorting: {
      quickSort: [Function]
      mergeSort: [Function]
    },
    shuffle: [Function],
    enclosingCircle: [Function]
  }}
```
