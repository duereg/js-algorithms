function binaryHeap(data) {
  this.array = [];

  if (data && (data instanceof Array)) {
    this.array = data;
    const length = this.array.length;
    for (let i = Math.floor((length - 1) / 2); i >= 0; i--) {
      this.bubbleDown(i, this.array[i]);
    }
  }
};

binaryHeap.prototype.shouldSwap = function () {
  throw new Error('This method is not implemented. Concrete implementations should implement.');
};

binaryHeap.prototype.getParentIndex = function (childIndex) {
  return Math.floor((childIndex - 1) / 2);
};
binaryHeap.prototype.getLeftChild = function (parentIndex) {
  return parentIndex * 2 + 1;
};
binaryHeap.prototype.getRightChild = function (parentIndex) {
  return parentIndex * 2 + 2;
};

binaryHeap.prototype.add = function (data) {
  if (data === undefined) {
    throw 'data must be valid to add';
  }

  this.array.push(data);
  this.bubbleUp(this.array.length - 1, data);
};

binaryHeap.prototype.bubbleUp = function (childIndex, childData) {
  if (childIndex > 0) {
    const parentIndex = this.getParentIndex(childIndex);
    const parentData = this.array[parentIndex];

    if (this.shouldSwap(childData, parentData)) {
      this.array[parentIndex] = childData;
      this.array[childIndex] = parentData;
      this.bubbleUp(parentIndex, childData);
    }
  }
};

binaryHeap.prototype.bubbleDown = function (parentIndex, parentData) {
  if (parentIndex < this.array.length) {
    let targetIndex = parentIndex;
    let targetData = parentData;

    const leftChildIndex = this.getLeftChild(parentIndex);
    const rightChildIndex = this.getRightChild(parentIndex);

    const trySwap = function (index, array, shouldSwap) {
      if (index < array.length) {
        const data = array[index];

        if (shouldSwap(data, targetData)) {
          targetIndex = index;
          targetData = data;
        }
      }
    };

    trySwap(leftChildIndex, this.array, this.shouldSwap);
    trySwap(rightChildIndex, this.array, this.shouldSwap);

    if (targetIndex !== parentIndex) {
      this.array[parentIndex] = targetData;
      this.array[targetIndex] = parentData;
      this.bubbleDown(targetIndex, parentData);
    }
  }
};

binaryHeap.prototype.removeHead = function () {
  const headNode = this.array[0];
  const tailNode = this.array.pop();

  this.array[0] = tailNode;
  this.bubbleDown(0, tailNode);

  return headNode;
};

module.exports = binaryHeap;
