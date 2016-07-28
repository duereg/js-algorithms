const Stack = require('../../../lib/dataStructures/stack.js');

function depthFirstSearch(root, matches) {
  const nodeStack = new Stack();

  function found(node) {
    if (node === null) {
      return false;
    }

    if (!node.visited) {
      node.visited = true;
      nodeStack.push(node);
    }

    return matches(node.data);
  };

  if (found(root)) {
    return true;
  }

  while (!nodeStack.isEmpty()) {
    const node = nodeStack.pop();

    if (found(node.left)) {
      return true;
    }
    if (found(node.right)) {
      return true;
    }
  }

  return false;
};

module.exports = depthFirstSearch;
