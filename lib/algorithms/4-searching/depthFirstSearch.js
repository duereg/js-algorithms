'use strict';

var Queue = require('../../../lib/dataStructures/queue.js');

var depthFirstSearch = function(root, matches) {
  var nodeQueue = new Queue();

  var found = function(node) {
    if (node === null) { return false; }

    if (!node.visited) {
      node.visited = true;
      nodeQueue.push(node);
    }

    return matches(node.data);
  };

  if (found(root)) {
    return true;
  }

  while (!nodeQueue.isEmpty()) {
    var node = nodeQueue.pop();

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
