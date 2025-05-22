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

# New Utility Algorithms (JavaScript)

This section details newer, niche utility algorithms added to the library.

## Aho-Corasick with Fuzzy Matching

Efficiently searches for multiple keywords in a text, with optional fuzzy matching to allow for a specified number of edits (insertions, deletions, substitutions) based on Levenshtein distance.

*   **File Location:** `lib/algorithms/1-strings/ahoCorasickFuzzy.js`
*   **Key Options:**
    *   `defaultMaxDistance` (constructor): Default Levenshtein distance for fuzzy matching (default: 0).
    *   `maxDistanceOverride` (search method): Override default distance for a specific search.
*   **Usage Example:**
    ```javascript
    const AhoCorasickFuzzy = require('./lib/algorithms/1-strings/ahoCorasickFuzzy');

    const keywords = ["apple", "apply", "apricot"];
    const acf = new AhoCorasickFuzzy(keywords, { defaultMaxDistance: 1 });

    // Exact match
    console.log(acf.search("An apple a day.", 0));
    // Expected: [{ keyword: "apple", found: "apple", startIndex: 3, endIndex: 8, distance: 0 }]

    // Fuzzy match
    console.log(acf.search("An apble a day.", 1));
    // Expected: [{ keyword: "apple", found: "apble", startIndex: 3, endIndex: 8, distance: 1 },
    //            { keyword: "apply", found: "apble", startIndex: 3, endIndex: 8, distance: 1 }]
    
    console.log(acf.search("aply", 1)); // Fuzzy for "apply" (deletion of 'p') or "apple" (sub 'p' for 'l', del 'e')
    // Example output:
    // [
    //   { keyword: 'apply', found: 'aply', startIndex: 0, endIndex: 4, distance: 1 },
    //   { keyword: 'apple', found: 'aply', startIndex: 0, endIndex: 4, distance: 2 } // if maxDistance allows
    // ]
    ```

## HyperLogLog++

A probabilistic algorithm for estimating the cardinality (number of distinct elements) of very large datasets with high accuracy using minimal memory. Includes small and large range corrections.

*   **File Location:** `lib/dataStructures/hyperloglog-plus-plus.js`
*   **Key Options:**
    *   `p` (constructor): Precision parameter (default: 14), `m = 2^p` registers. Range 4-16.
*   **Usage Example:**
    ```javascript
    const HyperLogLogPlusPlus = require('./lib/dataStructures/hyperloglog-plus-plus');

    const hll = new HyperLogLogPlusPlus({ p: 10 }); // m = 1024 registers

    hll.add("user1");
    hll.add("user2");
    hll.add("user1"); // Duplicate
    hll.add("user3");

    console.log(`Estimated cardinality: ${hll.estimate()}`); // Expected: Close to 3

    const hll2 = new HyperLogLogPlusPlus({ p: 10 });
    hll2.add("user4");
    hll2.add("user3"); // Common element

    hll.merge(hll2);
    console.log(`Merged estimated cardinality: ${hll.estimate()}`); // Expected: Close to 4
    ```

## Cuckoo Filter

A probabilistic data structure for approximate set membership testing that supports additions and, importantly, deletions. Offers better space efficiency than Bloom filters in some cases.

*   **File Location:** `lib/dataStructures/cuckoo-filter.js`
*   **Key Options:**
    *   `capacity` (constructor): Approximate number of items (default: 10000).
    *   `fingerprintSize` (constructor): Bits per fingerprint (default: 8).
    *   `entriesPerBucket` (constructor): Fingerprints per bucket (default: 4).
    *   `maxKicks` (constructor): Max evictions on collision (default: 500).
*   **Usage Example:**
    ```javascript
    const CuckooFilter = require('./lib/dataStructures/cuckoo-filter');

    const filter = new CuckooFilter({ capacity: 100, fingerprintSize: 8, entriesPerBucket: 2 });

    console.log("Add 'apple':", filter.add("apple"));       // true
    console.log("Contains 'apple':", filter.contains("apple")); // true
    console.log("Contains 'banana':", filter.contains("banana"));// false (probably)

    console.log("Remove 'apple':", filter.remove("apple"));     // true
    console.log("Contains 'apple':", filter.contains("apple")); // false (probably)
    console.log(`Current item count: ${filter.count()}`);
    ```

## Distributed Fixed Window Rate Limiter

Controls the number of requests allowed for a given key within fixed time windows (e.g., 100 requests per minute). Designed conceptually for distributed stores like Redis but includes an in-memory adapter.

*   **File Location:** `lib/algorithms/networking/distributed-fixed-window-rate-limiter.js`
*   **Key Options:**
    *   `limit` (constructor): Max requests per window.
    *   `windowMs` (constructor): Window duration in milliseconds.
    *   `storeAdapter` (constructor): Optional. Defaults to `InMemoryStoreAdapter`. For distributed use, a Redis-backed adapter would be provided.
*   **Usage Example:**
    ```javascript
    const { DistributedFixedWindowRateLimiter, InMemoryStoreAdapter } = require('./lib/algorithms/networking/distributed-fixed-window-rate-limiter');

    // Using the default InMemoryStoreAdapter
    const limiter = new DistributedFixedWindowRateLimiter({
        limit: 5,       // 5 requests
        windowMs: 2000  // per 2 seconds
    });

    async function test() {
        for (let i = 1; i <= 7; i++) {
            const result = await limiter.isAllowed("user123");
            console.log(`Request ${i}: Allowed: ${result.allowed}, Remaining: ${result.remaining}`);
        }
        // After 2 seconds, the window resets.
        setTimeout(async () => {
            console.log("\\nAfter window reset:");
            const result = await limiter.isAllowed("user123");
            console.log(`Request (new window): Allowed: ${result.allowed}, Remaining: ${result.remaining}`);
        }, 2100);
    }
    test();
    ```

## Concave Hull (k-Nearest Neighbors based)

Calculates a non-convex boundary (concave hull) for a set of 2D points using a k-Nearest Neighbors approach. This can produce a tighter fit around points than a convex hull.

*   **File Location:** `lib/algorithms/geospatial/concave-hull-knn.js`
*   **Key Options:**
    *   `k` (constructor): The number of nearest neighbors to consider for selecting the next hull point.
*   **Usage Example:**
    ```javascript
    const ConcaveHullKNN = require('./lib/algorithms/geospatial/concave-hull-knn');

    const points = [
        { x: 0, y: 0 }, { x: 5, y: 0 }, { x: 5, y: 5 }, { x: 0, y: 5 }, // Outer square
        { x: 1, y: 1 }, { x: 4, y: 1 }, { x: 1, y: 4 }, { x: 4, y: 4 }  // Inner points
    ];
    const k = 3; // A smaller k tends to produce more concavity

    const concaveHullBuilder = new ConcaveHullKNN(points, k);
    const hull = concaveHullBuilder.getHull();

    console.log("Concave Hull Points:", JSON.stringify(hull));
    // Expected output will be a list of points forming a CCW polygon,
    // potentially including some inner points to create concavities.
    // e.g., for a "U" shape, it would trace the "U".
    ```
