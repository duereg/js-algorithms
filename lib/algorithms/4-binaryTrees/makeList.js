/* eslint-disable no-param-reassign */
// 4.4 Given a binary tree, design an algorithm to create a linked list at each depth.
//    If a tree has n depth, create n linked lists
const LinkedList = require('../../dataStructures/linkedList');

function makeListRecursive(node) {
  if (node === null) { return null; }

  function getNode() {
    return { data: null, next: null };
  }

  function makeList(list, listNode) {
    if (listNode === null) {
      return;
    }
    if (list === null) {
      throw new Error('umpossible!');
    }
    if (list.data === null) {
      list.data = new LinkedList();
    }

    list.data.add(listNode.data);

    if ((list.next === null) && ((listNode.left !== null) || (listNode.right !== null))) {
      list.next = getNode();
    }

    makeList(list.next, listNode.left);
    makeList(list.next, listNode.right);
  }

  const list = getNode();
  makeList(list, node);
  return list;
}

module.exports = makeListRecursive;
