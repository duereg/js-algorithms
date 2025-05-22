const AhoCorasickFuzzy = require('../../../lib/algorithms/1-strings/ahoCorasickFuzzy');

describe('AhoCorasickFuzzy', () => {
    describe('Constructor', () => {
        it('should throw an error if keywords array is empty', () => {
            expect(() => new AhoCorasickFuzzy([])).toThrowError('Keywords array cannot be empty.');
        });

        it('should throw an error if keywords are not all strings', () => {
            expect(() => new AhoCorasickFuzzy(['apple', 123])).toThrowError('All keywords must be strings.');
        });

        it('should throw an error if defaultMaxDistance is negative', () => {
            expect(() => new AhoCorasickFuzzy(['apple'], { defaultMaxDistance: -1 })).toThrowError('Default maximum edit distance must be a non-negative number.');
        });

        it('should successfully create an instance with valid arguments', () => {
            expect(() => new AhoCorasickFuzzy(['hello', 'world'])).not.toThrow();
            const acf = new AhoCorasickFuzzy(['test']);
            expect(acf.keywords).toEqual(jasmine.arrayContaining(['test']));
        });
    });

    describe('_levenshteinDistance (internal helper test)', () => {
        // Testing a private method is usually not best practice, but it's critical here.
        const acf = new AhoCorasickFuzzy(['dummy']); // Need an instance to access it
        const testCases = [
            { s1: 'kitten', s2: 'sitting', expected: 3 },
            { s1: 'apple', s2: 'apply', expected: 1 },
            { s1: 'banana', s2: 'bandana', expected: 1 },
            { s1: 'book', s2: 'boook', expected: 1 },
            { s1: 'cat', s2: 'caat', expected: 1 },
            { s1: 'test', s2: 'test', expected: 0 },
            { s1: 'test', s2: '', expected: 4 },
            { s1: '', s2: 'test', expected: 4 },
            { s1: '', s2: '', expected: 0 },
            { s1: 'flaw', s2: 'lawn', expected: 2 },
        ];

        testCases.forEach(({ s1, s2, expected }) => {
            it(`should return ${expected} for _levenshteinDistance('${s1}', '${s2}')`, () => {
                expect(acf._levenshteinDistance(s1, s2)).toBe(expected);
            });
        });
    });

    describe('Search Functionality', () => {
        describe('Exact Matches (maxDistance = 0)', () => {
            const keywords = ['he', 'she', 'his', 'hers', 'apple'];
            const acf = new AhoCorasickFuzzy(keywords, { defaultMaxDistance: 0 });

            it('should find all exact matches', () => {
                const text = 'ushershehis';
                // she: (1,4), he: (2,4), hers: (3,7), his: (7,10)
                // Corrected based on typical Aho-Corasick output behavior:
                // text: u s h e r s h e h i s
                // i=0 u: current=(s) -> root
                // i=1 s: current=(s)
                // i=2 h: current=(s,h)
                // i=3 e: current=(s,h,e) -> outputs: she, he
                //      "she" (len 3) ends at index 3. start=3-3+1=1. (she,1,4,0)
                //      "he" (len 2) ends at index 3. start=3-2+1=2. (he,2,4,0)
                // i=4 r: current=(s,h,e) -> fail('h','e') -> fail('e') -> root. current=root
                // i=5 s: current=(s)
                // i=6 h: current=(s,h) -> fail('s') -> root. current=(h) -- if 'h' is a keyword or prefix
                // Let's re-verify the example trace:
                // The provided JS exact search trace:
                // text = "ushershem" keywords = ["ushers", "she", "he", "hers", "his"]
                // (he,2,4,0) (she,1,4,0) (he,6,8,0) (she,5,8,0)
                // For "ushershehis":
                // "she" at index 1 (ushErshehis)
                // "he" at index 2 (usHershehis)
                // "hers" at index 3 (usHERshehis) -> this one is tricky with overlaps. 'h','e','r','s'
                // "his" at index 7 (ushersHEHis)
                const matches = acf.search(text);
                const expectedMatches = [
                    { keyword: 'she', found: 'she', startIndex: 1, endIndex: 4, distance: 0 },
                    { keyword: 'he', found: 'he', startIndex: 2, endIndex: 4, distance: 0 },
                    { keyword: 'hers', found: 'hers', startIndex: 3, endIndex: 7, distance: 0 },
                    { keyword: 'his', found: 'his', startIndex: 7, endIndex: 10, distance: 0 },
                ].sort((a,b) => a.startIndex - b.startIndex || a.keyword.length - b.keyword.length); // Sort for comparison
                
                const sortedMatches = matches.sort((a,b) => a.startIndex - b.startIndex || a.keyword.length - b.keyword.length);
                expect(sortedMatches).toEqual(jasmine.arrayContaining(expectedMatches.map(m => jasmine.objectContaining(m))));
                expect(sortedMatches.length).toBe(expectedMatches.length);

            });

            it('should handle text with no matches', () => {
                const text = 'xyz xyz';
                expect(acf.search(text)).toEqual([]);
            });

            it('should handle empty text', () => {
                expect(acf.search('')).toEqual([]);
            });

            it('should find overlapping matches correctly', () => {
                const acfOverlap = new AhoCorasickFuzzy(['ab', 'b', 'bab', 'ca']);
                const text = 'ababaca';
                // a: []
                // b: [b(1,2), ab(0,2)]
                // a: [a(2,3)] -> from 'bab'
                // b: [b(3,4), ab(2,4), bab(1,4)]
                // a: [a(4,5)]
                // c: []
                // a: [ca(5,7), a(6,7)]
                const matches = acfOverlap.search(text, 0);
                const expected = [
                    { keyword: 'ab', found: 'ab', startIndex: 0, endIndex: 2, distance: 0 },
                    { keyword: 'b', found: 'b', startIndex: 1, endIndex: 2, distance: 0 },
                    // { keyword: 'a', found: 'a', startIndex: 2, endIndex: 3, distance: 0 }, // if 'a' was a keyword
                    { keyword: 'bab', found: 'bab', startIndex: 1, endIndex: 4, distance: 0 },
                    { keyword: 'ab', found: 'ab', startIndex: 2, endIndex: 4, distance: 0 },
                    { keyword: 'b', found: 'b', startIndex: 3, endIndex: 4, distance: 0 },
                    // { keyword: 'a', found: 'a', startIndex: 4, endIndex: 5, distance: 0 }, // if 'a' was a keyword
                    { keyword: 'ca', found: 'ca', startIndex: 5, endIndex: 7, distance: 0 },
                ].sort((a,b) => a.startIndex - b.startIndex || a.keyword.localeCompare(b.keyword) );
                
                const sortedMatches = matches.sort((a,b) => a.startIndex - b.startIndex || a.keyword.localeCompare(b.keyword));
                // Use jasmine.arrayContaining because the exact set of outputs for overlapping patterns can be complex
                // depending on how failure links propagate outputs.
                // The key is that all *expected* individual keywords are found at their correct positions.
                expected.forEach(expectedMatch => {
                    expect(sortedMatches).toEqual(jasmine.arrayContaining([jasmine.objectContaining(expectedMatch)]));
                });
                // Check if all found matches are expected (no extras)
                sortedMatches.forEach(foundMatch => {
                     expect(expected).toEqual(jasmine.arrayContaining([jasmine.objectContaining(foundMatch)]));
                });
            });

            it('should handle keywords that are prefixes of other keywords', () => {
                const acfPrefix = new AhoCorasickFuzzy(['a', 'ap', 'app', 'appl', 'apple']);
                const text = 'applepie';
                const matches = acfPrefix.search(text, 0);
                const expected = [
                    { keyword: 'a', found: 'a', startIndex: 0, endIndex: 1, distance: 0 },
                    { keyword: 'ap', found: 'ap', startIndex: 0, endIndex: 2, distance: 0 },
                    { keyword: 'app', found: 'app', startIndex: 0, endIndex: 3, distance: 0 },
                    { keyword: 'appl', found: 'appl', startIndex: 0, endIndex: 4, distance: 0 },
                    { keyword: 'apple', found: 'apple', startIndex: 0, endIndex: 5, distance: 0 },
                ].sort((a,b) => a.startIndex - b.startIndex || a.keyword.length - b.keyword.length);
                 const sortedMatches = matches.sort((a,b) => a.startIndex - b.startIndex || a.keyword.length - b.keyword.length);
                expect(sortedMatches).toEqual(expected.map(m => jasmine.objectContaining(m)));
            });
        });

        describe('Fuzzy Matches', () => {
            const keywords = ['apple', 'apply', 'apricot', 'banana'];
            const acf = new AhoCorasickFuzzy(keywords, { defaultMaxDistance: 2 }); // Default for these tests

            it('should find matches with 1 substitution', () => {
                const text = 'apble'; // apple (b!=p), apply (b!=p)
                const matches = acf.search(text, 1);
                expect(matches).toEqual(jasmine.arrayContaining([
                    jasmine.objectContaining({ keyword: 'apple', found: 'apble', startIndex: 0, endIndex: 5, distance: 1 }),
                    jasmine.objectContaining({ keyword: 'apply', found: 'apble', startIndex: 0, endIndex: 5, distance: 1 }),
                ]));
                expect(matches.length).toBe(2);
            });

            it('should find matches with 1 deletion (from text / effectively insertion into pattern)', () => {
                // text="cat", pattern="caat" -> delete 'a' from pattern. dist=1
                // My fuzzy search: "caat" vs "cat".
                // c-c(0), a-a(0), a-t(1), t-nothing(1) => ("caat",0,3,2) (caat vs cat)
                // c-c(0), a-a(0), skip 'a' from pattern (cost 1), t-t(0) => ("caat",0,3,1) (caat vs cat, where pattern "caat" had its 3rd 'a' deleted)
                const acfCat = new AhoCorasickFuzzy(['caat']);
                const matches = acfCat.search('cat', 1); // find "caat" in "cat" with dist 1
                expect(matches).toEqual(jasmine.arrayContaining([
                    jasmine.objectContaining({ keyword: 'caat', found: 'cat', startIndex: 0, endIndex: 3, distance: 1 })
                ]));
            });
            
            it('should find matches with 1 insertion (into text / effectively deletion from pattern)', () => {
                // text="boook", pattern="book" -> insert 'o' into pattern. dist=1
                const acfBook = new AhoCorasickFuzzy(['book']);
                const matches = acfBook.search('boook', 1); // find "book" in "boook" with dist 1
                expect(matches).toEqual(jasmine.arrayContaining([
                    jasmine.objectContaining({ keyword: 'book', found: 'boook', startIndex: 0, endIndex: 5, distance: 1 })
                ]));
            });

            it('should find matches with mixed edits up to maxDistance', () => {
                const text = 'baxnana'; // banana: b-b, a-a, x-n (sub), n-a (sub), a-n (sub), n-a (sub) -> too many
                                         // banana: b-b, a-a, skip x (del from text, cost 1), n-n, a-a, n-n, a-a -> dist 1
                const matches = acf.search(text, 1);
                expect(matches).toEqual(jasmine.arrayContaining([
                    jasmine.objectContaining({ keyword: 'banana', found: 'baxnana', startIndex: 0, endIndex: 7, distance: 1 })
                ]));
            });
            
            it('should find matches with up to 2 substitutions', () => {
                const text = 'axply'; // apple (x!=p, y!=e -> 2 subs), apply (x!=p -> 1 sub)
                const matches = acf.search(text, 2);
                 expect(matches).toEqual(jasmine.arrayContaining([
                    jasmine.objectContaining({ keyword: 'apply', found: 'axply', startIndex: 0, endIndex: 5, distance: 1 }),
                    jasmine.objectContaining({ keyword: 'apple', found: 'axply', startIndex: 0, endIndex: 5, distance: 2 }),
                ]));
                expect(matches.length).toBe(2);
            });

            it('should respect the maxDistance override in search', () => {
                const text = 'axply'; // apply (1), apple (2)
                let matches = acf.search(text, 1); // Override default of 2
                expect(matches).toEqual(jasmine.arrayContaining([
                    jasmine.objectContaining({ keyword: 'apply', found: 'axply', startIndex: 0, endIndex: 5, distance: 1 }),
                ]));
                 expect(matches.find(m => m.keyword === 'apple' && m.distance <=1)).toBeUndefined();

                matches = acf.search(text, 0); // Exact only
                expect(matches.length).toBe(0);
            });

            it('should return an empty array if no fuzzy matches are found', () => {
                const text = 'xyz';
                expect(acf.search(text, 1)).toEqual([]);
            });
            
            it('should correctly handle fuzzy matches at different text positions', () => {
                const acfSimple = new AhoCorasickFuzzy(["pattern"]);
                const text = "some patxern here"; // "pattern" with 1 sub at index 5
                const matches = acfSimple.search(text, 1);
                expect(matches).toEqual(jasmine.arrayContaining([
                    jasmine.objectContaining({ keyword: "pattern", found: "patxern", startIndex: 5, endIndex: 12, distance: 1 })
                ]));
            });

            it('should handle empty text for fuzzy search', () => {
                expect(acf.search('', 1)).toEqual([]);
            });

            it('should handle empty keyword if it was added (though typically not used)', () => {
                const acfEmptyKw = new AhoCorasickFuzzy(["", "test"]);
                let matches = acfEmptyKw.search("abc", 0);
                // Expect multiple empty string matches based on implementation
                // The JS version produces: {"keyword":"","found":"","startIndex":1,"endIndex":1,"distance":0}, ... up to len+1
                expect(matches.filter(m => m.keyword === "").length).toBeGreaterThanOrEqual(3); 
                
                matches = acfEmptyKw.search("a", 1); // Fuzzy search for empty string
                 // Empty string vs "a" is 1 deletion.
                expect(matches).toEqual(jasmine.arrayContaining([
                    jasmine.objectContaining({ keyword: "", found: "a", startIndex: 0, endIndex: 1, distance: 1})
                ]));
            });
        });

        describe('Result Merging and Sorting', () => {
            it('should correctly merge exact and fuzzy results, prioritizing exact or better fuzzy matches', () => {
                const keywords = ["apple", "apply"];
                const acf = new AhoCorasickFuzzy(keywords, { defaultMaxDistance: 1 });
                const text = "apple"; // Exact match for "apple", fuzzy for "apply" (1 deletion)
                
                const matches = acf.search(text, 1);
                // Expected:
                // 1. ("apple", 0, 5, 0) - exact
                // 2. ("apply", 0, 5, 1) - fuzzy (text "apple" vs keyword "apply", delete 'y' from "apply")
                
                expect(matches).toEqual(jasmine.arrayContaining([
                    jasmine.objectContaining({ keyword: 'apple', found: 'apple', startIndex: 0, endIndex: 5, distance: 0 }),
                    jasmine.objectContaining({ keyword: 'apply', found: 'apple', startIndex: 0, endIndex: 5, distance: 1 })
                ]));
                expect(matches.length).toBe(2); // Ensure no duplicates or unwanted filtering yet

                // Check sorting: by startIndex, then endIndex, then distance, then keyword
                const sorted = [...matches].sort((a,b) => {
                    if (a.startIndex !== b.startIndex) return a.startIndex - b.startIndex;
                    if (a.endIndex !== b.endIndex) return a.endIndex - b.endIndex;
                    if (a.distance !== b.distance) return a.distance - b.distance;
                    return a.keyword.localeCompare(b.keyword);
                });
                expect(matches).toEqual(sorted); // The search method itself should sort
            });

            it('should not include a fuzzy match if an exact match for the same keyword and span exists', () => {
                // This test depends on the internal merging logic of `search`.
                // The current JS code filters if a fuzzy match (dist > 0) is for the same span
                // as an existing exact match (dist=0) for THE SAME keyword.
                // If fuzzy finds (kw1, s, e, 0) and exact also found (kw1, s, e, 0), it's fine.
                // If fuzzy finds (kw1, s, e, 1) but exact found (kw1, s, e, 0), the fuzzy one is usually discarded or not prioritized.
                // The current JS implementation adds fuzzy results if dist > 0,
                // and then sorts. Duplicates are removed at the very end based on all fields.
                // So, if fuzzy finds (kw1,s,e,0) it would be a duplicate of exact and removed.
                // If fuzzy finds (kw1,s,e,1) and exact has (kw1,s,e,0), both might appear if not filtered carefully.
                // The provided JS code's final deduplication step `exact_matches_for_filtering` handles this.
                const acfTest = new AhoCorasickFuzzy(["test"]);
                const text = "test";
                spyOn(acfTest, '_searchFuzzyRecursive').and.callFake((textOriginalStartIdx, textCurrentCharIdx, trieNode, currentDistance, maxAllowedDistance, text, collectedMatchesSet, memo) => {
                    // Simulate fuzzy finding the same match but also with distance 0
                    if (trieNode.keywordEndsHere && trieNode.keywordEndsHere.has("test")) {
                         collectedMatchesSet.add(JSON.stringify({keyword: "test", found: "test", startIndex: 0, endIndex: 4, distance: 0}));
                         collectedMatchesSet.add(JSON.stringify({keyword: "test", found: "test", startIndex: 0, endIndex: 4, distance: 1})); // A worse one
                    }
                });

                const matches = acfTest.search(text, 1);
                expect(matches.length).toBe(1); // Exact (0) + Fuzzy(0) de-duplicated. Fuzzy(1) should be filtered by merge logic if it's for same span & kw.
                                                // After final deduplication, only the best distance for a given kw,start,end triplet survives.
                expect(matches[0]).toEqual(jasmine.objectContaining({keyword: "test", distance: 0}));
            });
        });
    });
});
