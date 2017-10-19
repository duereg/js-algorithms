class Trie {
  constructor() {
    this.head = {};
  }
  noKids(node) {
    return Object.keys(node).length === 0;
  }
  add(word) {
    this.validate(word);
    let current = this.head;
    for (let i = 0; i < word.length; i++) {
      if (!(word[i] in current)) {
        current[word[i]] = {};
      }
      current = current[word[i]];
    }
    current.$ = 1; // word end marker
  }

  hasWord(word) {
    this.validate(word);
    let current = this.head;
    for (let i = 0; i < word.length; i++) {
      if (!(word[i] in current)) {
        return false;
      }
      current = current[word[i]];
    }
    return current.$ === 1; // word end marker
  }

  remove(wordToRemove) {
    this.validate(wordToRemove);
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
      return (delete currentNode.$) && this.noKids(node); 
    }
    const newIndex = word[index + 1];
    if (this.canDelete(word, index + 1, node[newIndex])) {
      return (delete currentNode[newIndex]) && this.noKids(node);
    }
    return false;
  }

  validate(word) {
    if ((word === undefined) || (word === null)) {
      throw new Error('The given word is invalid.');
    }
    if (typeof word !== 'string') {
      throw new Error('The given word is not a string');
    }
  }
  sortTrie(node, word, sorted) {
    for (const letter of Object.keys(node)) {
      if (letter === '$') {
        sorted.push(word);
      } else {
        this.sortTrie(node[letter], word + letter, sorted);
      }
    }
  }
}


module.exports = Trie;
