const BAD_VALUE = -1;

function getHeight(n, node) {
  if (node === null) {
    return n;
  }

  const leftHeight = getHeight(n + 1, node.left);
  if (leftHeight === BAD_VALUE) {
    return BAD_VALUE;
  }

  const rightHeight = getHeight(n + 1, node.right);
  if (rightHeight === BAD_VALUE) {
    return BAD_VALUE;
  }

  if (Math.abs(leftHeight - rightHeight) > 1) {
    return BAD_VALUE;
  }

  return Math.max(leftHeight, rightHeight);
};

// 4.1 Determine if a binary tree is balanced
function isBalanced(node) {
  return getHeight(0, node) !== BAD_VALUE;
};

module.exports = isBalanced;
