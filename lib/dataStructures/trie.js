const {
  END_WORD_SYMBOL,
  validate,
  getLastLetterNode,
  tryDelete,
} = require('./trieUtil');

class Trie {
  constructor() {
    this.head = {};
  }

  sortTrie(node, word, sorted) {
    if (END_WORD_SYMBOL in node) {
      sorted.push(word);
    }

    // this call skips Symbols
    const letters = Object.keys(node);

    letters.forEach((letter) => {
      this.sortTrie(node[letter], word + letter, sorted);
    });
  }

  add(word, value = word) {
    validate(word);
    if (value === undefined || value === null) {
      throw new Error('The given value is invalid.');
    }
    // this returns a pointer to the last value
    const current = getLastLetterNode(this.head, word, true);
    current[END_WORD_SYMBOL] = value;
  }

  hasWord(word) {
    validate(word);
    const retValue = getLastLetterNode(this.head, word);
    // Only return true is whole word was found
    return !!retValue.value && !retValue.isSubstring;
  }

  getValue(word) {
    validate(word);
    const retValue = getLastLetterNode(this.head, word);
    // If the full word was found (not a substring/prefix) AND it actually has a value symbol
    if (!retValue.isSubstring && retValue.value !== undefined) {
      return retValue.value;
    }
    // Otherwise, the exact word doesn't exist or doesn't have a value
    return undefined;
  }

  // this returns the longest prefix
  getPrefix(word) {
    validate(word);
    const retValue = getLastLetterNode(this.head, word);
    return !!retValue.value && retValue.word;
  }

  remove(wordToRemove) {
    validate(wordToRemove);
    tryDelete(wordToRemove, -1, this.head);
  }

  sort() {
    const sorted = [];
    this.sortTrie(this.head, '', sorted);
    return sorted;
  }
}

module.exports = Trie;
