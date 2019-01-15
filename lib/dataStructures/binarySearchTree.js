function getNode(data) {
  return {
    data,
    left: null,
    right: null,
  };
}

class BinarySearchTree {
  constructor() {
    this.head = null;
  }

  add(data) {
    if (this.head === null) {
      this.head = getNode(data);
    } else {
      this.head = this.insert(this.head, data);
    }
    return (this);
  }

  insert(node, data) {
    const currentNode = node;
    if (currentNode.data > data) {
      if (currentNode.left === null) {
        currentNode.left = getNode(data);
      } else {
        this.insert(currentNode.left, data);
      }
    } else if (currentNode.right === null) {
      currentNode.right = getNode(data);
    } else {
      this.insert(currentNode.right, data);
    }
    return currentNode;
  }
}

module.exports = BinarySearchTree;
