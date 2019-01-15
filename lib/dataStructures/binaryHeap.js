function getParentIndex(childIndex) {
  return Math.floor((childIndex - 1) / 2);
}

function getLeftChild(parentIndex) {
  return (parentIndex * 2) + 1;
}

function getRightChild(parentIndex) {
  return (parentIndex * 2) + 2;
}

class BinaryHeap {
  constructor(data = []) {
    this.array = [];
    if (data && Array.isArray(data)) {
      this.array = data;
      const { length } = this.array;
      for (let i = Math.floor((length - 1) / 2); i >= 0; i--) {
        this.bubbleDown(i, this.array[i]);
      }
    }
  }

  add(data) {
    if (data === undefined) {
      throw new Error('data must be valid to add');
    }
    this.array.push(data);
    this.bubbleUp(this.array.length - 1, data);
  }

  removeHead() {
    const headNode = this.array[0];
    const tailNode = this.array.pop();
    if (this.array.length) {
      this.array[0] = tailNode;
      this.bubbleDown(0, tailNode);
    }
    return headNode;
  }

  bubbleDown(parentIndex, parentData) {
    if (parentIndex < this.array.length) {
      let targetIndex = parentIndex;
      let targetData = parentData;
      const leftChildIndex = getLeftChild(parentIndex);
      const rightChildIndex = getRightChild(parentIndex);
      const trySwap = (index, array, shouldSwap) => {
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
  }

  bubbleUp(childIndex, childData) {
    if (childIndex > 0) {
      const parentIndex = getParentIndex(childIndex);
      const parentData = this.array[parentIndex];
      if (this.shouldSwap(childData, parentData)) {
        this.array[parentIndex] = childData;
        this.array[childIndex] = parentData;
        this.bubbleUp(parentIndex, childData);
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  shouldSwap() {
    throw new Error('This method is not implemented. Concrete implementations should implement.');
  }
}

module.exports = { BinaryHeap, getLeftChild, getRightChild };
