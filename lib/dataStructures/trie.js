function trie() {
  this.head = {};
}

function noKids(node) {
  return Object.keys(node).length === 0;
}

function canDelete(word, index, node) {
  if (word === undefined) {
    throw new Error('Bad Word');
  }
  if (index >= word.length) {
    throw new Error('Bad index to check for deletion.');
  }
  if (node === undefined) {
    throw new Error(`Bad Node at ${index} for ${word}`);
  }

  if (index === word.length - 1) {
    // last letter
    // always delete word marker (as we are deleting word)
    return (delete node.$) && noKids(node); // if last letter of word, should be empty.
  }

  // any other letter in word
  // check child, and after child check, I am now empty
  if (canDelete(word, index + 1, node[word[index + 1]])) {
    // delete me
    return (delete node[word[index + 1]]) && noKids(node);
  }

  return false;
}

function sortTrie(node, word, sorted) {
  for (const letter in node) {
    if (letter === '$') {
      sorted.push(word);
    } else {
      sortTrie(node[letter], word + letter, sorted);
    }
  }
}

function validate(word) {
  if ((word === undefined) || (word === null)) {
    throw new Error('The given word is invalid.');
  }
  if (typeof word !== 'string') {
    throw new Error('The given word is not a string');
  }
}

function add(word) {
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

function hasWord(word) {
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

function remove(wordToRemove) {
  this.validate(wordToRemove);

  canDelete(wordToRemove, -1, this.head);
}

function sort() {
  const sorted = [];

  sortTrie(this.head, '', sorted);

  return sorted;
}

trie.prototype = { validate, add, hasWord, remove, sort };

module.exports = trie;
