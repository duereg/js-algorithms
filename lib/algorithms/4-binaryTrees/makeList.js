// 4.4 Given a binary tree, design an algorithm to create a linked list at each depth.
//    If a tree has n depth, create n linked lists
const linkedList = require('../../../lib/dataStructures/linkedList.js');

function makeListRecursive(node) {
  if (node === null) return null;

  const list = getNode();
  makeList(list, node);
  return list;

  function getNode() {
    return {
      data: null,
      next: null
    };
  }

  function makeList(list, node) {
    if (node === null) {
      return;
    }
    if (list === null) {
      throw new Error('umpossible!');
    }
    if (list.data === null) {
      list.data = new linkedList();
    }

    list.data.add(node.data);

    if ((list.next === null) && ((node.left !== null) || (node.right !== null))) {
      list.next = getNode();
    }

    makeList(list.next, node.left);
    makeList(list.next, node.right);
  }
};

module.exports = makeListRecursive;
