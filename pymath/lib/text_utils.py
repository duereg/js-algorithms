# -*- coding: utf-8 -*-
"""
Text utilities including Aho-Corasick with fuzzy matching.
"""

class AhoCorasickFuzzy:
    """
    Aho-Corasick algorithm implementation with fuzzy matching capabilities.

    This class allows for efficient searching of multiple keywords in a text,
    with an option to allow for a certain number of edits (insertions,
    deletions, substitutions) using Levenshtein distance.
    """

    def __init__(self, keywords: list[str], default_max_distance: int = 0):
        """
        Initializes the AhoCorasickFuzzy instance.

        Args:
            keywords: A list of keywords (strings) to search for.
            default_max_distance: The default maximum edit distance allowed for a match.
                                 Must be a non-negative integer.

        Raises:
            ValueError: If keywords list is empty, contains non-string elements,
                        or if default_max_distance is negative.
        """
        if not keywords:
            raise ValueError("Keywords list cannot be empty.")
        if not all(isinstance(kw, str) for kw in keywords):
            raise ValueError("All keywords must be strings.")
        if default_max_distance < 0:
            raise ValueError("Default maximum edit distance cannot be negative.")

        self._keywords = set(keywords) # Store unique keywords
        self._default_max_distance = default_max_distance
        self._trie = {}  # Trie structure: {'char': {'char': {..., '_keyword_': keyword_val, '_path_': ('c','h',...)}}}
        self._failure_links = {} # Dict[Tuple[char,...], Tuple[char,...]] (path to failure path)
        self._output_links = {}  # Dict[Tuple[char,...], Set[str]] (path to set of keywords)
        self._nodes_by_path = {} # Dict[Tuple[char,...], Dict] (path to actual node object) - for easy access

        self._build_trie_and_paths()
        self._build_failure_links_with_paths()

    def _levenshtein_distance(self, s1: str, s2: str) -> int:
        """
        Calculates the Levenshtein distance between two strings.

        Args:
            s1: The first string.
            s2: The second string.

        Returns:
            The Levenshtein distance between s1 and s2.
        """
        if len(s1) < len(s2):
            return self._levenshtein_distance(s2, s1)

        if len(s2) == 0:
            return len(s1)

        previous_row = range(len(s2) + 1)
        for i, c1 in enumerate(s1):
            current_row = [i + 1]
            for j, c2 in enumerate(s2):
                insertions = previous_row[j + 1] + 1
                deletions = current_row[j] + 1
                substitutions = previous_row[j] + (c1 != c2)
                current_row.append(min(insertions, deletions, substitutions))
            previous_row = current_row

        return previous_row[-1]

    def _build_trie_and_paths(self):
        """
        Builds the trie (keyword tree) from the list of keywords.
        Each node in the trie is a dictionary.
        A special key '_keyword_' indicates that a keyword ends at this node.
        A special key '_path_' stores the tuple path to this node.
        Initializes _output_links for keywords ending at nodes.
        Populates _nodes_by_path for easy node retrieval.
        """
        self._trie['_path_'] = () # Path to root
        self._nodes_by_path[()] = self._trie # Root node

        for keyword in self._keywords:
            node = self._trie
            current_path_list = []
            for char in keyword:
                current_path_list.append(char)
                path_tuple = tuple(current_path_list)
                
                # node.setdefault(char, {}) creates the node if it doesn't exist
                # then we add '_path_' to it.
                child_node = node.get(char)
                if child_node is None:
                    child_node = {}
                    node[char] = child_node
                    child_node['_path_'] = path_tuple
                    self._nodes_by_path[path_tuple] = child_node
                node = child_node # Move to the child node

            # Mark end of keyword
            node['_keyword_'] = keyword
            # Initialize output link for this node (using its path)
            keyword_path_tuple = tuple(keyword)
            self._output_links.setdefault(keyword_path_tuple, set()).add(keyword)


    def _build_failure_links_with_paths(self):
        """
        Builds the failure links for the Aho-Corasick automaton using tuple paths as keys.
        Output links are also populated: if a node has a failure link to
        a node that represents a keyword, that keyword is added to the
        current node's output.
        """
        root_path = ()
        queue = [] # Stores paths of nodes to process (tuples of characters)

        # Initialize failure links and output links for depth 1 nodes (children of root)
        # Also, ensure root itself has an empty output link set initialized.
        self._output_links.setdefault(root_path, set())

        for char_in_edge, child_node_obj in self._trie.items():
            if char_in_edge == '_path_': # Skip special keys like '_path_'
                continue
            
            # child_path = child_node_obj['_path_'] # This was how it was before, but node doesn't have path yet
            # Path for direct children of root is just (char_in_edge,)
            child_path = (char_in_edge,)
            # child_node_obj = self._nodes_by_path[child_path] # Get the actual node object

            self._failure_links[child_path] = root_path # Fail to root
            queue.append(child_path)

            # Initialize output links for depth 1 nodes
            self._output_links.setdefault(child_path, set())
            if '_keyword_' in child_node_obj: # Check if this child node itself is a keyword
                self._output_links[child_path].add(child_node_obj['_keyword_'])
            # No need to add from failure link (root) here, as root has no keywords.

        head = 0
        while head < len(queue):
            current_path = queue[head]
            head += 1
            current_node_obj = self._nodes_by_path[current_path]

            for char_in_edge, next_node_candidate_obj in current_node_obj.items():
                # Skip special keys like '_keyword_' or '_path_' when iterating children
                if char_in_edge == '_keyword_' or char_in_edge == '_path_':
                    continue

                # next_path = next_node_candidate_obj['_path_'] # This was the old way
                next_path = current_path + (char_in_edge,) # Construct path for the next node
                next_node_obj = self._nodes_by_path[next_path] # Get the actual node object for next_path

                queue.append(next_path)

                # Find failure link for next_path
                # Start from current_node's failure link path and traverse up
                failure_path_candidate = self._failure_links[current_path]
                
                # Traverse failure links until we find a node with a transition for char_in_edge, or reach root
                while True:
                    # Get the node object for the current failure_path_candidate
                    failure_node_obj_for_candidate = self._nodes_by_path[failure_path_candidate]
                    
                    if char_in_edge in failure_node_obj_for_candidate:
                        # Found a state with transition for char_in_edge
                        self._failure_links[next_path] = failure_node_obj_for_candidate[char_in_edge]['_path_']
                        break
                    elif failure_path_candidate == root_path: # Reached root
                        self._failure_links[next_path] = root_path # Default to root if no other path found
                        break
                    else: # Go to next failure link
                        failure_path_candidate = self._failure_links[failure_path_candidate]
                
                # Populate output links for next_path
                self._output_links.setdefault(next_path, set())
                if '_keyword_' in next_node_obj: # Keyword ending at next_path itself
                    self._output_links[next_path].add(next_node_obj['_keyword_'])

                # Add output from the node reached by its failure link
                failure_link_target_path = self._failure_links[next_path]
                if failure_link_target_path in self._output_links: # Check if path exists in output_links
                    for kw in self._output_links[failure_link_target_path]:
                        self._output_links[next_path].add(kw)


    def search(self, text: str, max_distance: int = None) -> list[tuple[str, int, int, int]]:
        """
        Searches for keywords in the given text, allowing for fuzzy matching.

        Args:
            text: The text to search within.
            max_distance: The maximum edit distance allowed for a match.
                          If None, uses the default_max_distance set during initialization.
                          Must be a non-negative integer.

        Returns:
            A list of tuples, where each tuple contains:
            (keyword, start_index, end_index, distance).
            - keyword: The keyword found.
            - start_index: The starting index of the match in the text.
            - end_index: The ending index (exclusive) of the match in the text.
            - distance: The edit distance of the match (0 for exact matches).

        Raises:
            ValueError: If max_distance is negative.
        """
        if not isinstance(text, str):
            raise ValueError("Input text must be a string.")
        if max_distance is None:
            max_distance = self._default_max_distance
        if max_distance < 0:
            raise ValueError("Maximum edit distance cannot be negative.")

        results = []
        # Implementation of search logic (exact and fuzzy) will go here.
        # For now, returning an empty list.
        # Exact search logic will be added first.
        # Then fuzzy search logic.
        
        results = []
        current_path = () # Start at the root path

        for i, char_in_text in enumerate(text):
            # Try to transition with the current character
            # If no direct transition, follow failure links
            # current_path will always point to a valid node path in self._nodes_by_path
            
            # State transition logic of Aho-Corasick
            while True:
                current_node_obj = self._nodes_by_path[current_path]
                if char_in_text in current_node_obj:
                    current_path = current_node_obj[char_in_text]['_path_']
                    break 
                elif current_path == (): # Already at root, cannot go further up
                    # No transition from root for this char, current_path remains root
                    break 
                else: # Follow failure link
                    current_path = self._failure_links[current_path]

            # Check for outputs at the current state (path)
            if current_path in self._output_links:
                for keyword in self._output_links[current_path]:
                    # Exact match found
                    start_index = i - len(keyword) + 1
                    # Ensure start_index is not negative (e.g. if a short pattern matches early)
                    # This basic check might need refinement for overlapping matches or specific definitions of start.
                    # For Aho-Corasick, the 'end_index' is `i+1`.
                    # The `start_index` is `i - len(keyword) + 1`.
                    if start_index >= 0: # Basic validation
                         results.append((keyword, start_index, i + 1, 0))
        
        # Fuzzy matching logic will be added later.
        # For now, this only returns exact matches.
        # If max_distance > 0, the fuzzy logic part should run.
        # If max_distance == 0, this exact search is sufficient.

        if max_distance > 0:
            # Placeholder for where fuzzy search would extend results
            # This part will be significantly more complex, likely involving
            # techniques like BFS/DFS on (text_index, trie_node_path, current_distance)
            # or integrating Levenshtein calculation more deeply into the traversal.
            pass # TODO: Implement fuzzy search logic

        return results

if __name__ == '__main__':
    # Example Usage (for basic testing, will be expanded)
    keywords1 = ["he", "she", "his", "hers", "apple", "apply"]
    try:
        print(f"Testing with keywords: {keywords1}")
        acf1 = AhoCorasickFuzzy(keywords1, default_max_distance=1)
        print("Trie, failure links, and output links built.")
        # print(f"  Trie: {acf1._trie}") # Can be very verbose
        print(f"  Nodes by path keys: {sorted(list(acf1._nodes_by_path.keys()))}")
        print(f"  Failure links: {acf1._failure_links}")
        print(f"  Output links: {acf1._output_links}")
        print("-" * 20)

        # Test Levenshtein
        print(f"Distance between 'apple' and 'apply': {acf1._levenshtein_distance('apple', 'apply')}")
        print(f"Distance between 'apple' and 'axpyl': {acf1._levenshtein_distance('apple', 'axpyl')}")
        print("-" * 20)

        keywords2 = ["a", "ab", "abc"]
        print(f"Testing with keywords: {keywords2}")
        acf2 = AhoCorasickFuzzy(keywords2)
        print("Trie, failure links, and output links built.")
        print(f"  Nodes by path keys: {sorted(list(acf2._nodes_by_path.keys()))}")
        print(f"  Failure links: {acf2._failure_links}")
        print(f"  Output links: {acf2._output_links}")
        # Expected for "abc":
        # Failure: {('a',): (), ('a', 'b'): (), ('a', 'b', 'c'): ()}
        # Output: {(): set(), ('a',): {'a'}, ('a', 'b'): {'ab'}, ('a', 'b', 'c'): {'abc'}}
        print("-" * 20)

        keywords3 = ["hers", "his", "she", "he"] # Different order
        print(f"Testing with keywords: {keywords3}")
        acf3 = AhoCorasickFuzzy(keywords3)
        print("Trie, failure links, and output links built.")
        print(f"  Nodes by path keys: {sorted(list(acf3._nodes_by_path.keys()))}")
        # Example: path ('s', 'h', 'e')
        # failure of ('s', 'h', 'e') should be ('h', 'e')
        # output of ('s', 'h', 'e') should include "she" and "he"
        print(f"  Failure link for ('s','h','e'): {acf3._failure_links.get(('s','h','e'))}")
        print(f"  Output for ('s','h','e'): {acf3._output_links.get(('s','h','e'))}")
        print(f"  Output for ('h','e'): {acf3._output_links.get(('h','e'))}")
        print(f"  Output for ('h','i','s'): {acf3._output_links.get(('h','i','s'))}")
        print(f"  Output for ('h','e','r','s'): {acf3._output_links.get(('h','e','r','s'))}")
        print("-" * 20)
        
        keywords4 = ["x", "y", "z"]
        print(f"Testing with keywords: {keywords4}")
        acf4 = AhoCorasickFuzzy(keywords4)
        print(f"  Nodes by path keys: {sorted(list(acf4._nodes_by_path.keys()))}")
        print(f"  Failure links: {acf4._failure_links}")
        print(f"  Output links: {acf4._output_links}")
        print("-" * 20)

        # --- Test Search (Exact for now) ---
        print("--- Testing Search (Exact Matches) ---")
        search_keywords = ["ushers", "she", "he", "hers", "his"]
        search_text = "ushershem" # he, she, hers, (ushers - if "ushers" was a keyword)
        
        acf_search = AhoCorasickFuzzy(search_keywords, default_max_distance=0)
        print(f"Searching for {search_keywords} in '{search_text}' (exact only)")
        exact_matches = acf_search.search(search_text)
        print(f"  Exact matches found: {exact_matches}")
        # Expected:
        # ('he', 1, 3, 0)  -- for u[she]rshem
        # ('she', 1, 4, 0) -- for u[she]rshem
        # ('hers', 3, 7, 0)-- for ushe[rshe]m -> No, 'hers' is at text index 3 of "ushers"
        # Let's trace "ushershem":
        # u: root -> root (no 'u' output)
        # s: root -> ('s',) (no output)
        # h: ('s',) -> ('s','h') (no output)
        # e: ('s','h') -> ('s','h','e') outputs: {'she', 'he'}
        #    - "she" (len 3) ends at index 3 (0-indexed "she"): text "ush[e]" is i=3. start = 3-3+1=1. (she, 1, 4, 0) -> Correct
        #    - "he" (len 2) ends at index 3 (0-indexed "he"): text "us[h]e" is i=3. start = 3-2+1=2. (he, 2, 4, 0) -> Correct
        # r: ('s','h','e') -> root (no 'r' from ('s','h','e'), fail('s','h','e') is ('h','e'), no 'r' from ('h','e'), fail('h','e') is ('e'), no 'r' from ('e'), fail('e') is root, no 'r' from root). current_path = root
        # s: root -> ('s',)
        # h: ('s',) -> ('s','h')
        # e: ('s','h') -> ('s','h','e') outputs: {'she', 'he'}
        #    - "she" ends at index 7 ("ushersh[e]"): i=7. start = 7-3+1=5. (she, 5, 8, 0) -> Correct
        #    - "he" ends at index 7 ("ushers[h]e"): i=7. start = 7-2+1=6. (he, 6, 8, 0) -> Correct
        # m: ('s','h','e') -> root.

        # Test with "hers" in "ushers"
        # Text: "ushers"
        # u: root
        # s: ('s')
        # h: ('s','h')
        # e: ('s','h','e') -> output: she, he.  (she, 1, 4, 0), (he, 2, 4, 0)
        # r: ('s','h','e') fails to ('h','e'). 'r' not in ('h','e'). fails to ('e'). 'r' not in ('e'). fails to root. 'r' not in root. current_path = root.
        # s: root -> ('s'). output: (none for 's' itself, unless 's' is a keyword)
        # So for "ushers", matches are (she,1,4,0), (he,2,4,0)

        # If keyword "ushers" was present:
        # u -> ('u')
        # s -> ('u','s')
        # h -> ('u','s','h')
        # e -> ('u','s','h','e')
        # r -> ('u','s','h','e','r')
        # s -> ('u','s','h','e','r','s') -> output "ushers", "hers", "she", "he"
        #   "ushers" (len 6) ends at i=5. start=5-6+1=0. (ushers, 0, 6, 0)
        #   "hers" (len 4) ends at i=5 (via failure from "ushers"). start=5-4+1=2. (hers, 2, 6, 0)
        #   "she" (len 3) ends at i=5. start=5-3+1=3. (she, 3, 6, 0)
        #   "he" (len 2) ends at i=5. start=5-2+1=4. (he, 4, 6, 0)

        text_b = "ababa"
        keywords_b = ["ab", "baba", "a"]
        acf_b = AhoCorasickFuzzy(keywords_b)
        print(f"Searching for {keywords_b} in '{text_b}' (exact only)")
        matches_b = acf_b.search(text_b)
        print(f"  Exact matches found: {sorted(matches_b)}")
        # Expected: [('a', 0, 1, 0), ('a', 2, 3, 0), ('a', 4, 5, 0), ('ab', 0, 2, 0), ('ab', 2, 4, 0), ('baba', 1, 5, 0)]
        # Trace "ababa" with ["ab", "baba", "a"]
        # Trie:
        #   a -> _keyword_ "a", _path_ ('a',)
        #     b -> _keyword_ "ab", _path_ ('a','b')
        #   b -> _path_ ('b',)
        #     a -> _path_ ('b','a')
        #       b -> _path_ ('b','a','b')
        #         a -> _keyword_ "baba", _path_ ('b','a','b','a')
        # Failure:
        # ('a',): ()
        # ('b',): ()
        # ('a','b'): ('b',)  -- if current is 'ab', next char fails, new state is 'b'
        # ('b','a'): ('a',)
        # ('b','a','b'): ('a','b')
        # ('b','a','b','a'): ('a',)
        # Output:
        # (): set()
        # ('a',): {'a'}
        # ('b',): set()
        # ('a','b'): {'ab'}
        # ('b','a'): {'a'}  -- because fail('b','a') is ('a') which has 'a'
        # ('b','a','b'): {'ab'} -- because fail('b','a','b') is ('a','b') which has 'ab'
        # ('b','a','b','a'): {'baba', 'a'} -- 'baba' itself, fail('b','a','b','a') is ('a') which has 'a'

        # Search "ababa":
        # i=0, char='a': current_path=() -> ('a',). Output: {('a',0,1,0)}. current_path=('a',)
        # i=1, char='b': current_path=('a',) -> ('a','b'). Output: {('ab',0,2,0)}. current_path=('a','b')
        # i=2, char='a': current_path=('a','b'). 'a' not in node ('a','b'). Fail -> ('b',). 'a' in node ('b',). current_path=('b','a'). Output: {('a',2,3,0)}. current_path=('b','a')
        # i=3, char='b': current_path=('b','a',) -> ('b','a','b'). Output: {('ab',2,4,0)}. current_path=('b','a','b')
        # i=4, char='a': current_path=('b','a','b',) -> ('b','a','b','a'). Output: {('baba',1,5,0), ('a',4,5,0)}. current_path=('b','a','b','a')
        # Result: [('a',0,1,0), ('ab',0,2,0), ('a',2,3,0), ('ab',2,4,0), ('baba',1,5,0), ('a',4,5,0)] -> Matches expected.

    except ValueError as e:
        print(f"Error: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        import traceback
        traceback.print_exc()


"""
Plan for next steps:
1. Implement the exact search part of the `search` method using the trie and failure links.
   This will form the basis before adding fuzzy logic.

2. Implement the fuzzy search logic within the `search` method. This is the most complex part.
   - For each position in the text, and for each state in the Aho-Corasick automaton,
     we might need to explore paths that deviate from the exact match, up to `max_distance`.
   - This could involve a recursive or iterative approach that keeps track of the current
     edit distance, current position in text, and current node in the trie.
   - When a character in the text does not match a transition from the current trie node:
     - Try substitution: consume character from text, increment distance, stay at/move in trie.
     - Try deletion (from text): consume character from text, increment distance, stay at current trie node.
     - Try insertion (to text): consume character from trie, increment distance, move to next trie node.
   - This needs to be done carefully to avoid re-exploring same states inefficiently.
     A common approach for fuzzy trie search is to use something like a state stack or BFS/DFS
     that includes (text_index, trie_node_path, current_distance).

3. Add comprehensive tests for both exact and fuzzy matching.
"""
