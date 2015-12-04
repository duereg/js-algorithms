'use strict';

var Stack = require('../../../lib/dataStructures/stack.js');

var depthFirstSearch = function(root, matches) {
  var nodeStack = new stack();

  var found = function(node) {
    if (node === null) { return false; }

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
    var node = nodeStack.pop();

    if(found(node.left)) {
      return true;
    }
    if(found(node.right)) {
      return true;
    }
  }

  return false;
};

module.exports = depthFirstSearch;
