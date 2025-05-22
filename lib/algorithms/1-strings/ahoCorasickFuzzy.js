/**
 * @fileoverview Implementation of the Aho-Corasick algorithm with fuzzy matching.
 */

/**
 * Class representing an Aho-Corasick automaton with fuzzy matching capabilities.
 */
class AhoCorasickFuzzy {
    /**
     * Calculates the Levenshtein distance between two strings.
     * Private helper method.
     * @param {string} s1 - The first string.
     * @param {string} s2 - The second string.
     * @returns {number} The Levenshtein distance.
     * @private
     */
    _levenshteinDistance(s1, s2) {
        if (s1.length < s2.length) {
            return this._levenshteinDistance(s2, s1);
        }
        if (s2.length === 0) {
            return s1.length;
        }

        const previousRow = Array.from({ length: s2.length + 1 }, (_, i) => i);

        for (let i = 0; i < s1.length; i++) {
            const c1 = s1[i];
            const currentRow = [i + 1];
            for (let j = 0; j < s2.length; j++) {
                const c2 = s2[j];
                const insertions = previousRow[j + 1] + 1;
                const deletions = currentRow[j] + 1;
                const substitutions = previousRow[j] + (c1 !== c2 ? 1 : 0);
                currentRow.push(Math.min(insertions, deletions, substitutions));
            }
            previousRow.splice(0, previousRow.length, ...currentRow); // Replace previousRow with currentRow
        }
        return previousRow[s2.length];
    }

    /**
     * Creates an AhoCorasickFuzzy instance.
     * @param {string[]} keywords - An array of keywords to search for.
     * @param {object} [options={}] - Optional settings.
     * @param {number} [options.defaultMaxDistance=0] - The default maximum Levenshtein distance for a fuzzy match.
     * @throws {Error} If keywords array is empty, contains non-strings, or if defaultMaxDistance is negative.
     */
    constructor(keywords, options = {}) {
        if (!Array.isArray(keywords) || keywords.length === 0) {
            throw new Error('Keywords array cannot be empty.');
        }
        if (!keywords.every(kw => typeof kw === 'string')) {
            throw new Error('All keywords must be strings.');
        }
        
        this.options = {
            defaultMaxDistance: 0,
            ...options
        };

        if (typeof this.options.defaultMaxDistance !== 'number' || this.options.defaultMaxDistance < 0) {
            throw new Error('Default maximum edit distance must be a non-negative number.');
        }

        this.keywords = [...new Set(keywords)]; // Store unique keywords
        
        /**
         * The root node of the trie.
         * Each node is an object: {
         *   children: Map<string, TrieNode>, // Character to child node
         *   failure: TrieNode | null,        // Failure link node
         *   outputs: Set<string>,            // Set of keywords ending at this node (or via failure links)
         *   keywordEndsHere: Set<string>     // Set of keywords that *actually* end at this node
         *   path: string                     // String path from root to this node (for debugging/ID)
         * }
         * @private
         */
        this._rootNode = {
            children: new Map(),
            failure: null, // Root's failure link is often itself or null
            outputs: new Set(),
            keywordEndsHere: new Set(),
            path: ''
        };
        this._rootNode.failure = this._rootNode; // Root fails to itself

        this._buildTrieAndInitialOutputs();
        this._buildFailureLinks();
    }

    /**
     * Builds the trie from the keywords and populates initial output links.
     * @private
     */
    _buildTrieAndInitialOutputs() {
        for (const keyword of this.keywords) {
            if (keyword === "") { // Handle empty string keyword if necessary
                this._rootNode.keywordEndsHere.add(keyword);
                this._rootNode.outputs.add(keyword); // Empty string matches at every position with 0 length
                continue;
            }
            let currentNode = this._rootNode;
            let currentPath = '';
            for (const char of keyword) {
                currentPath += char;
                if (!currentNode.children.has(char)) {
                    currentNode.children.set(char, {
                        children: new Map(),
                        failure: null,
                        outputs: new Set(),
                        keywordEndsHere: new Set(),
                        path: currentPath
                    });
                }
                currentNode = currentNode.children.get(char);
            }
            currentNode.keywordEndsHere.add(keyword);
            currentNode.outputs.add(keyword); // Initially, output is just the keyword ending here
        }
    }

    /**
     * Builds the failure links for all nodes in the trie using a BFS approach.
     * Also augments output sets based on failure links.
     * @private
     */
    _buildFailureLinks() {
        const queue = [];

        // Initialize failure links for depth 1 nodes (children of root)
        for (const node of this._rootNode.children.values()) {
            node.failure = this._rootNode; // Children of root fail to root
            queue.push(node);
        }

        while (queue.length > 0) {
            const currentNode = queue.shift();

            for (const [char, childNode] of currentNode.children) {
                let failureCandidateNode = currentNode.failure;
                
                // Traverse failure links until we find a node with a transition for 'char' or reach root
                while (failureCandidateNode !== this._rootNode && !failureCandidateNode.children.has(char)) {
                    failureCandidateNode = failureCandidateNode.failure;
                }

                if (failureCandidateNode.children.has(char)) {
                    childNode.failure = failureCandidateNode.children.get(char);
                } else { // char not in failure_state (even after going to root's children)
                    childNode.failure = this._rootNode;
                }

                // Augment childNode's outputs with outputs from its failure link target
                // This ensures that if "she" is a keyword and childNode represents "hershe",
                # and "hershe" (or a suffix part) fails to "she", then "she" is part of "hershe"'s effective output.
                for (const outputKeyword of childNode.failure.outputs) {
                    childNode.outputs.add(outputKeyword);
                }
                
                queue.push(childNode);
            }
        }
    }

    /**
     * Searches for keywords in the given text, allowing for fuzzy matching.
     * @param {string} text - The text to search within.
     * @param {number|null} [maxDistanceOverride=null] - Overrides the default max distance for this search.
     * @returns {Array<object>} An array of match objects. Each object:
     *   { keyword: string, found: string, startIndex: number, endIndex: number, distance: number }
     * @throws {Error} If text is not a string or maxDistanceOverride is invalid.
     */
    search(text, maxDistanceOverride = null) {
        if (typeof text !== 'string') {
            throw new Error('Input text must be a string.');
        }

        let maxDistance = this.options.defaultMaxDistance;
        if (maxDistanceOverride !== null) {
            if (typeof maxDistanceOverride !== 'number' || maxDistanceOverride < 0) {
                throw new Error('Max distance override must be a non-negative number.');
            }
            maxDistance = maxDistanceOverride;
        }

        const results = [];
        
        // --- Exact Aho-Corasick Search ---
        let currentNode = this._rootNode;
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            
            while (currentNode !== this._rootNode && !currentNode.children.has(char)) {
                currentNode = currentNode.failure;
            }
            if (currentNode.children.has(char)) {
                currentNode = currentNode.children.get(char);
            } else {
                // If char is not found even from root, stay at root.
                // (currentNode will be _rootNode if previous loop exited due to currentNode === _rootNode)
            }

            // currentNode is now the state after processing text[i]
            if (currentNode.outputs.size > 0) {
                for (const keyword of currentNode.outputs) {
                    // For empty string keyword, behavior might need specific definition.
                    // Standard Aho-Corasick usually implies non-empty keywords.
                    // If "" is a keyword, it matches at every position with length 0.
                    if (keyword === "") {
                        results.push({
                            keyword: "",
                            found: "",
                            startIndex: i + 1, // or i, depending on definition for empty string match end
                            endIndex: i + 1,   // or i
                            distance: 0
                        });
                        continue;
                    }
                    const startIndex = i - keyword.length + 1;
                    // Basic validation, although Aho-Corasick ensures keyword is a suffix of text[0...i]
                    if (startIndex >= 0) { 
                        results.push({
                            keyword: keyword,
                            found: text.substring(startIndex, i + 1),
                            startIndex: startIndex,
                            endIndex: i + 1,
                            distance: 0
                        });
                    }
                }
            }
        }

        // --- Fuzzy Search (if maxDistance > 0) ---
        if (maxDistance > 0) {
            const fuzzyResultsSet = new Set(); // To store unique fuzzy matches as JSON strings
            const memo = new Map(); // For memoization

            for (let i = 0; i < text.length; i++) { // Starting position in text
                this._searchFuzzyRecursive(
                    i, // textOriginalStartIdx
                    i, // textCurrentCharIdx
                    this._rootNode,
                    0, // currentDistance
                    maxDistance,
                    text,
                    fuzzyResultsSet,
                    memo
                );
            }

            // Merge fuzzy results
            const exactMatchesForFiltering = new Set(results.map(r => `${r.keyword}|${r.startIndex}|${r.endIndex}|${r.distance}`));

            for (const matchStr of fuzzyResultsSet) {
                const match = JSON.parse(matchStr);
                if (match.distance === 0) {
                    // Only add if not already found by exact search (should be rare if exact is correct)
                    if (!exactMatchesForFiltering.has(`${match.keyword}|${match.startIndex}|${match.endIndex}|0`)) {
                        results.push(match);
                    }
                } else {
                    // Check if a more precise (or equally precise) exact match for the same keyword and span already exists
                    let addFuzzy = true;
                    for(const r of results) {
                        if (r.keyword === match.keyword && r.startIndex === match.startIndex && r.endIndex === match.endIndex && match.distance >= r.distance) {
                            addFuzzy = false;
                            break;
                        }
                    }
                    if(addFuzzy) {
                         results.push(match);
                    }
                }
            }
        }
        
        // Sort results: primary by startIndex, secondary by endIndex, then by distance, then by keyword
        results.sort((a, b) => {
            if (a.startIndex !== b.startIndex) return a.startIndex - b.startIndex;
            if (a.endIndex !== b.endIndex) return a.endIndex - b.endIndex;
            if (a.distance !== b.distance) return a.distance - b.distance;
            return a.keyword.localeCompare(b.keyword);
        });
        
        // Deduplicate based on all fields (especially after merging fuzzy results which might rediscover exact ones)
        const finalResults = [];
        const seenResults = new Set();
        for (const r of results) {
            const key = `${r.keyword}|${r.startIndex}|${r.endIndex}|${r.distance}`;
            if (!seenResults.has(key)) {
                finalResults.push(r);
                seenResults.add(key);
            }
        }
        return finalResults;
    }

    /**
     * Recursive helper for fuzzy search.
     * @param {number} textOriginalStartIdx - The starting index in the text for the current fuzzy search attempt.
     * @param {number} textCurrentCharIdx - The current character index in the text being processed.
     * @param {object} trieNode - The current node in the trie.
     * @param {number} currentDistance - The accumulated Levenshtein distance.
     * @param {number} maxAllowedDistance - The maximum allowed Levenshtein distance.
     * @param {string} text - The input text.
     * @param {Set<string>} collectedMatchesSet - A set to store found match objects (as JSON strings) to avoid duplicates.
     * @param {Map<string, boolean>} memo - Memoization table for (textIdx, trieNode.path, distance).
     * @private
     */
    _searchFuzzyRecursive(
        textOriginalStartIdx,
        textCurrentCharIdx,
        trieNode,
        currentDistance,
        maxAllowedDistance,
        text,
        collectedMatchesSet,
        memo
    ) {
        if (currentDistance > maxAllowedDistance) {
            return;
        }

        const memoKey = `${textCurrentCharIdx}|${trieNode.path}|${currentDistance}`;
        if (memo.has(memoKey)) {
            return;
        }
        memo.set(memoKey, true);

        // Check if current trie path itself corresponds to a keyword
        // This means the sequence of characters taken in the trie to reach trieNode spells out a keyword.
        if (trieNode.keywordEndsHere.size > 0) {
            for (const keywordStr of trieNode.keywordEndsHere) {
                 if (keywordStr === "" && textCurrentCharIdx !== textOriginalStartIdx) continue; // Empty keyword only matches empty span

                // The substring matched is text[textOriginalStartIdx...textCurrentCharIdx-1]
                // Its length is textCurrentCharIdx - textOriginalStartIdx
                if (textCurrentCharIdx >= textOriginalStartIdx) { // Ensure span is valid
                     const match = {
                        keyword: keywordStr,
                        found: text.substring(textOriginalStartIdx, textCurrentCharIdx),
                        startIndex: textOriginalStartIdx,
                        endIndex: textCurrentCharIdx,
                        distance: currentDistance
                    };
                    collectedMatchesSet.add(JSON.stringify(match));
                }
            }
        }

        // --- Recursive calls for Levenshtein operations ---

        // Option 1: Deletion (character from text is "deleted")
        // Action: Consume text[textCurrentCharIdx]. Trie node remains the same. Cost +1.
        if (textCurrentCharIdx < text.length) {
            this._searchFuzzyRecursive(
                textOriginalStartIdx,
                textCurrentCharIdx + 1,
                trieNode,
                currentDistance + 1,
                maxAllowedDistance,
                text,
                collectedMatchesSet,
                memo
            );
        }

        // Iterate over children of trieNode for Match/Substitution and Insertion
        for (const [charInTrieEdge, childNode] of trieNode.children) {
            // Option 2: Match or Substitute
            // Action: Consume text[textCurrentCharIdx] and transition to childNode.
            // Cost +0 for match, +1 for substitution.
            if (textCurrentCharIdx < text.length) {
                const cost = (text[textCurrentCharIdx] === charInTrieEdge) ? 0 : 1;
                this._searchFuzzyRecursive(
                    textOriginalStartIdx,
                    textCurrentCharIdx + 1,
                    childNode,
                    currentDistance + cost,
                    maxAllowedDistance,
                    text,
                    collectedMatchesSet,
                    memo
                );
            } else { 
                // End of text: only insertions from trie are possible to complete a keyword match
                // This is like Option 3 but specifically when text is exhausted. Cost is 1 for insertion.
                 this._searchFuzzyRecursive(
                    textOriginalStartIdx,
                    textCurrentCharIdx, // text index does not advance
                    childNode,
                    currentDistance + 1, // Cost of insertion
                    maxAllowedDistance,
                    text,
                    collectedMatchesSet,
                    memo
                );
            }

            // Option 3: Insertion (charInTrieEdge is "inserted" into text)
            // Action: Transition to childNode. textCurrentCharIdx does not advance for this op. Cost +1.
            // This operation can be performed even if textCurrentCharIdx == text.length (insertions at the end of text).
            this._searchFuzzyRecursive(
                textOriginalStartIdx,
                textCurrentCharIdx,
                childNode,
                currentDistance + 1,
                maxAllowedDistance,
                text,
                collectedMatchesSet,
                memo
            );
        }
    }
}

// Example Usage (for testing purposes)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AhoCorasickFuzzy; // Export class for Node.js environment

    // Basic test cases (can be run with Node.js)
    try {
        console.log("--- AhoCorasickFuzzy Basic Tests ---");

        const keywords = ["he", "she", "his", "hers", "apple", "apply"];
        const acf = new AhoCorasickFuzzy(keywords, { defaultMaxDistance: 1 });

        console.log("\nTest Levenshtein:");
        console.log(`'apple' vs 'apply': ${acf._levenshteinDistance('apple', 'apply')} (Expected: 1)`);
        console.log(`'banana' vs 'bandana': ${acf._levenshteinDistance('banana', 'bandana')} (Expected: 1)`);
        console.log(`'book' vs 'boook': ${acf._levenshteinDistance('book', 'boook')} (Expected: 1)`);
        console.log(`'cat' vs 'caat': ${acf._levenshteinDistance('cat', 'caat')} (Expected: 1)`);


        console.log("\n--- Exact Search Tests ---");
        let text = "ushers";
        let matches = acf.search(text, 0);
        console.log(`Exact matches in "${text}":`, JSON.stringify(matches));
        // Expected: [{"keyword":"she","found":"she","startIndex":1,"endIndex":4,"distance":0},{"keyword":"he","found":"he","startIndex":2,"endIndex":4,"distance":0},{"keyword":"hers","found":"hers","startIndex":2,"endIndex":6,"distance":0}]
        
        text = "ababa";
        const acf2 = new AhoCorasickFuzzy(["a", "ab", "baba"]);
        matches = acf2.search(text, 0);
        console.log(`Exact matches in "${text}" (keywords: a, ab, baba):`, JSON.stringify(matches));
        // Expected: [{"keyword":"a","found":"a","startIndex":0,"endIndex":1,"distance":0},{"keyword":"ab","found":"ab","startIndex":0,"endIndex":2,"distance":0},{"keyword":"a","found":"a","startIndex":2,"endIndex":3,"distance":0},{"keyword":"ab","found":"ab","startIndex":2,"endIndex":4,"distance":0},{"keyword":"baba","found":"baba","startIndex":1,"endIndex":5,"distance":0},{"keyword":"a","found":"a","startIndex":4,"endIndex":5,"distance":0}]


        console.log("\n--- Fuzzy Search Tests ---");
        const fuzzyKeywords = ["apple", "apply", "apricot"];
        const acfFuzzy = new AhoCorasickFuzzy(fuzzyKeywords, { defaultMaxDistance: 2 });

        let fuzzyText = "apble"; // apple (1), apply (1)
        let fuzzyMatches = acfFuzzy.search(fuzzyText, 1);
        console.log(`Fuzzy matches in "${fuzzyText}" (maxDist=1):`, JSON.stringify(fuzzyMatches));
        // Expected: [{"keyword":"apple","found":"apble","startIndex":0,"endIndex":5,"distance":1},{"keyword":"apply","found":"apble","startIndex":0,"endIndex":5,"distance":1}]

        fuzzyText = "axply"; // apply (1), apple (2)
        fuzzyMatches = acfFuzzy.search(fuzzyText, 1);
        console.log(`Fuzzy matches in "${fuzzyText}" (maxDist=1):`, JSON.stringify(fuzzyMatches));
        // Expected: [{"keyword":"apply","found":"axply","startIndex":0,"endIndex":5,"distance":1}]
        
        fuzzyMatches = acfFuzzy.search(fuzzyText, 2);
        console.log(`Fuzzy matches in "${fuzzyText}" (maxDist=2):`, JSON.stringify(fuzzyMatches));
        // Expected: [{"keyword":"apply","found":"axply","startIndex":0,"endIndex":5,"distance":1},{"keyword":"apple","found":"axply","startIndex":0,"endIndex":5,"distance":2}]

        const acfBandana = new AhoCorasickFuzzy(["bandana"]);
        fuzzyMatches = acfBandana.search("banana", 1);
        console.log(`Fuzzy matches in "banana" for "bandana" (maxDist=1):`, JSON.stringify(fuzzyMatches));
        // Expected: [{"keyword":"bandana","found":"banana","startIndex":0,"endIndex":6,"distance":1}]
        
        const acfBoook = new AhoCorasickFuzzy(["boook"]);
        fuzzyMatches = acfBoook.search("book", 1);
        console.log(`Fuzzy matches in "book" for "boook" (maxDist=1):`, JSON.stringify(fuzzyMatches));
        // Expected: [{"keyword":"boook","found":"book","startIndex":0,"endIndex":4,"distance":1}]

        const acfCat = new AhoCorasickFuzzy(["cat"]);
        fuzzyMatches = acfCat.search("caat", 1);
        console.log(`Fuzzy matches in "caat" for "cat" (maxDist=1):`, JSON.stringify(fuzzyMatches));
        // Expected: [{"keyword":"cat","found":"caa","startIndex":0,"endIndex":3,"distance":1}] (cat vs caa, t deleted)
        // Or: [{"keyword":"cat","found":"aat","startIndex":1,"endIndex":4,"distance":1}] (cat vs aat, c deleted)
        // The current fuzzy logic might produce multiple alignments. Let's see.
        // Actual output might be: [{"keyword":"cat","found":"caat","startIndex":0,"endIndex":4,"distance":1}] (delete one 'a' from text "caat" to match "cat")

        console.log("\n--- Empty Keyword Test ---");
        const acfEmpty = new AhoCorasickFuzzy(["test", ""]);
        matches = acfEmpty.search("abc", 0);
        console.log(`Matches in "abc" (keywords: test, ""):`, JSON.stringify(matches));
        // Expected: [{"keyword":"","found":"","startIndex":1,"endIndex":1,"distance":0},{"keyword":"","found":"","startIndex":2,"endIndex":2,"distance":0},{"keyword":"","found":"","startIndex":3,"endIndex":3,"distance":0}]
        // Plus potentially: {"keyword":"","found":"","startIndex":0,"endIndex":0,"distance":0}
        // My code adds empty string matches with startIndex = i+1, endIndex = i+1 for text[i]
        // So for "abc": (idx 0, char a) -> empty match at 1,1. (idx 1, char b) -> empty match at 2,2. (idx 2, char c) -> empty match at 3,3.


    } catch (e) {
        console.error("Error during tests:", e);
    }
}
