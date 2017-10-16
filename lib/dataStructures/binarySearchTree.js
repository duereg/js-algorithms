class BinarySearchTree {
  constructor() {
    this.head = null;
  }
  getNode(data) {
    return {
      data: data,
      left: null,
      right: null,
    };
  }
  add(data) {
    if (this.head === null) {
      this.head = this.getNode(data);
    } else {
      this.head = this.insert(this.head, data);
    }
    return (this);
  }
  insert(node, data) {
    const currentNode = node;
    if (currentNode.data > data) {
      if (currentNode.left === null) {
        currentNode.left = this.getNode(data);
      } else {
        this.insert(currentNode.left, data);
      }
    } else if (currentNode.right === null) {
      currentNode.right = this.getNode(data);
    } else {
      this.insert(currentNode.right, data);
    }
    return currentNode;
  }
}

module.exports = BinarySearchTree;
