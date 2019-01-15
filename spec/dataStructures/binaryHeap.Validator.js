const { getLeftChild, getRightChild } = require('../../lib/dataStructures/binaryHeap');

class Validate {
  constructor(heap = null) {
    if (!heap) throw new Error('Cannot validate heap.');
    this.heap = heap;
  }

  isValid(parent = 0, length = this.heap.array.length) {
    if (parent < length) {
      const left = getLeftChild(parent);
      const right = getRightChild(parent);

      if (left < length) {
        if (this.heap.shouldSwap(this.heap.array[left], this.heap.array[parent])) {
          return false;
        }
        return this.isValid(left, length);
      }
      if (right < length) {
        if (this.heap.shouldSwap(this.heap.array[right], this.heap.array[parent])) {
          return false;
        }
        return this.isValid(right, length);
      }
      return true;
    }
    return true;
  }
}

module.exports = Validate;
