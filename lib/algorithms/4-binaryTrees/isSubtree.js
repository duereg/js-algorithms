// 4.8 Given two binary trees, determine if one tree is a subtree of the other
function isSubtree(node, tree) {
  if (node === null) {
    return false;
  }
  if (tree === null) {
    return true;
  }

  if ((node.data === tree.head.data) && isMatch(node, tree.head)) {
    return true;
  } else {
    return isSubtree(node.left, tree) || isSubtree(node.right, tree);
  }

  function isMatch(node, subNode) {
    if ((node === null) && (subNode === null)) return true;
    if ((node === null) || (subNode === null)) return false; // values are different

    return (node.data === subNode.data) && isMatch(node.left, subNode.left) && isMatch(node.right, subNode.right);
  }
};

module.exports = isSubtree;
