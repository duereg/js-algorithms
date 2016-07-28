// 4.4 Given a binary tree, design an algorithm to create a linked list at each depth.
//    If a tree has n depth, create n linked lists
const LinkedList = require('../../../lib/dataStructures/linkedList.js');

function makeListRecursive(node) {
  if (node === null) { return null; }

  function getNode() {
    return { data: null, next: null };
  }

  function makeList(list, node) {
    if (node === null) {
      return;
    }
    if (list === null) {
      throw new Error('umpossible!');
    }
    if (list.data === null) {
      list.data = new LinkedList();
    }

    list.data.add(node.data);

    if ((list.next === null) && ((node.left !== null) || (node.right !== null))) {
      list.next = getNode();
    }

    makeList(list.next, node.left);
    makeList(list.next, node.right);
  }

  const list = getNode();
  makeList(list, node);
  return list;
}

module.exports = makeListRecursive;
