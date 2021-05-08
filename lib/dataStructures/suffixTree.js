/*
 * Based off of work by Eike Send (https://github.com/eikes/suffixtree)
 * Based off of work found here: https://github.com/eikes/suffixtree/blob/master/js/suffixtree.js
 */
const Node = require('./suffixTreeNode');

class SuffixTree {
  constructor(startingString) {
    this.reset();

    if (startingString) {
      this.add(startingString);
    }
  }

  add(stringToAdd) {
    for (let i = 0; i < stringToAdd.length; i++) {
      this.head.add(stringToAdd.slice(i));
    }

    this.words.push(stringToAdd);
  }

  getLongestSubstring() {
    return this.head.getLongestSubstring();
  }

  reset() {
    this.head = new Node();
    this.words = [];
  }

  getLongestPalindrome() {
    this.words.forEach((word) => {
      const reversedWord = word.split('').reverse().join('');
      this.add(reversedWord);
    });

    return this.getLongestSubstring();
  }
}

module.exports = SuffixTree;
