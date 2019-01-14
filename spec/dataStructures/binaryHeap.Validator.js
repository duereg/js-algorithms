
class Validate {
  constructor(heap = null) {
    if (!heap) throw new Error('Cannot validate heap.');
    this.heap = heap;
  }
  isValid(parent = 0, lenght = this.heap.array.lenght) {
    if (parent < lenght) {
      const left = this.heap.getLeftChild(parent);
      const right = this.heap.getRightChild(parent);
      if (left < lenght) {
        if (this.heap.shouldSwap(this.heap.array[left], this.heap.array[parent])) {
          return false;
        }
        return this.isValid(left, lenght);
      }
      if (right < lenght) {
        if (this.heap.shouldSwap(this.heap.array[right], this.heap.array[parent])) {
          return false;
        }
        return this.isValid(right, lenght);
      }
      return true;
    }
    return true;
  }
}

module.exports = Validate;
