function noKids(node) {
  return Object.keys(node).length === 0;
}

function validate(word) {
  if ((word === undefined) || (word === null)) {
    throw new Error('The given word is invalid.');
  }
  if (typeof word !== 'string') {
    throw new Error('The given word is not a string');
  }
}

const END_WORD_MARKER = Symbol(1);

class Trie {
  constructor() {
    this.head = {};
  }

  sortTrie(node, word, sorted) {
    Object.keys(node).forEach((letter) => {
      if (letter === '$') {
        sorted.push(word);
      } else {
        this.sortTrie(node[letter], word + letter, sorted);
      }
    });
  }

  add(word) {
    validate(word);
    let current = this.head;
    for (let i = 0; i < word.length; i++) {
      if (!(word[i] in current)) {
        current[word[i]] = {};
      }
      current = current[word[i]];
    }
    current.$ = END_WORD_MARKER;
  }

  hasWord(word) {
    validate(word);
    let current = this.head;
    for (let i = 0; i < word.length; i++) {
      if (!(word[i] in current)) {
        return false;
      }
      current = current[word[i]];
    }
    return current.$ === END_WORD_MARKER;
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
      return (delete currentNode.$) && noKids(node);
    }
    const newIndex = word[index + 1];
    if (this.canDelete(word, index + 1, node[newIndex])) {
      return (delete currentNode[newIndex]) && noKids(node);
    }
    return false;
  }
}


module.exports = Trie;
