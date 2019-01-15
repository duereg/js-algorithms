/* eslint-disable no-use-before-define */

function more(data, node) {
  if (node === null) { return true; }

  return (data < node.data) && less(node.data, node.left) && more(node.data, node.right);
}

function less(data, node) {
  if (node === null) { return true; }

  return (data > node.data) && less(node.data, node.left) && more(node.data, node.right);
}

function verifyIsBst(tree) {
  if (tree === null) { return true; }

  return less(tree.data, tree.left) && more(tree.data, tree.right);
}

module.exports = verifyIsBst;
