/* eslint-disable prefer-destructuring */
/*
 * Based off of work by Eike Send (https://github.com/eikes/suffixtree)
 * Based off of work found here: https://github.com/eikes/suffixtree/blob/master/js/suffixtree.js
 */

class Node {
  constructor() {
    this.value = '';
    this.leaves = [];
    this.nodes = [];
  }

  checkNodes(stringToCheck) {
    let node;

    for (let i = 0; i < this.nodes.length; i++) {
      node = this.nodes[i];
      if (node.value === stringToCheck[0]) {
        node.add(stringToCheck.slice(1));
        return true;
      }
    }

    return false;
  }

  checkLeaves(stringToCheck) {
    for (let i = 0; i < this.leaves.length; i++) {
      const leaf = this.leaves[i];
      if (leaf[0] === stringToCheck[0]) {
        const node = new Node();
        node.value = leaf[0];
        node.add(stringToCheck.slice(1));
        node.add(leaf.slice(1));
        this.nodes.push(node);
        this.leaves.splice(i, 1);
        return;
      }
    }

    this.leaves.push(stringToCheck);
  }

  add(stringToAdd) {
    if (!stringToAdd && !stringToAdd.length) {
      return;
    }

    if (!this.checkNodes(stringToAdd)) {
      this.checkLeaves(stringToAdd);
    }
  }

  getLongestSubstring() {
    let longestSubstring = '';

    for (let i = 0; i < this.nodes.length; i++) {
      const currentSubstring = this.nodes[i].getLongestSubstring();
      if (currentSubstring.length > longestSubstring.length) {
        longestSubstring = currentSubstring;
      }
    }

    return this.value + longestSubstring;
  }
}

module.exports = Node;
