// 4.8 Given two binary trees, determine if one tree is a subtree of the other
function isSubtree(node, tree) {
  if (node === null) {
    return false;
  }
  if (tree === null) {
    return true;
  }

  const isMatch = (nodeContainer, subNode) => {
    if ((nodeContainer === null) && (subNode === null)) return true;
    if ((nodeContainer === null) || (subNode === null)) return false; // values are differen
    return (nodeContainer.data === subNode.data)
            && isMatch(nodeContainer.left, subNode.left)
            && isMatch(nodeContainer.right, subNode.right);
  };

  if ((node.data === tree.head.data) && isMatch(node, tree.head)) {
    return true;
  }
  return isSubtree(node.left, tree) || isSubtree(node.right, tree);
}

module.exports = isSubtree;
