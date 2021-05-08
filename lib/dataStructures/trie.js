const END_WORD_SYMBOL = Symbol('$');

function noKids(node) {
  return Reflect.ownKeys(node).length === 0;
}

function validate(word) {
  if (word === undefined || word === null) {
    throw new Error('The given word is invalid.');
  }
  if (typeof word !== 'string') {
    throw new Error('The given word is not a string');
  }
}

function getLastLetterNode(head, word, isAdd = false) {
  let current = head;

  // walk through word
  for (let i = 0; i < word.length; i++) {
    // could not find
    if (!(word[i] in current)) {
      if (isAdd) {
        // create
        current[word[i]] = {};
      } else {
        // found a substring
        return {
          value: current[END_WORD_SYMBOL],
          word: word.substring(0, i),
          isSubstring: true,
        };
      }
    }
    // keep traversing
    current = current[word[i]];
  }

  if (isAdd) {
    return current;
  }

  // found the word
  return {
    value: current[END_WORD_SYMBOL],
    word,
    isSubstring: false,
  };
}

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
    return retValue.value;
  }

  getPrefix(word) {
    validate(word);
    const retValue = getLastLetterNode(this.head, word);
    return !!retValue.value && retValue.word;
  }

  remove(wordToRemove) {
    validate(wordToRemove);
    this.canDelete(wordToRemove, -1, this.head);
  }

  sort() {
    const sorted = [];
    this.sortTrie(this.head, '', sorted);
    return sorted;
  }

  canDelete(word = '', index = 0, node = null) {
    if (word === undefined) {
      throw new Error('Bad Word');
    }
    if (index >= word.length) {
      throw new Error('Bad index to check for deletion.');
    }
    if (node === null) {
      throw new Error(`Bad Node at ${index} for ${word}`);
    }
    const currentNode = node;
    if (index === word.length - 1) {
      return delete currentNode[END_WORD_SYMBOL] && noKids(node);
    }
    const newIndex = word[index + 1];
    if (this.canDelete(word, index + 1, node[newIndex])) {
      return delete currentNode[newIndex] && noKids(node);
    }
    return false;
  }
}

module.exports = Trie;
