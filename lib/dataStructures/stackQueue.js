const LinkedList = require('./linkedList');

class StackQueue {
  constructor() {
    this.list = new LinkedList();
    this.length = 0;
  }
  push(data) {
    this.list.add(data);
    this.length++;
    return (this);
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error('The stack/queue is empty');
    }
    const results = this.peek();
    this.list.remove(results);
    this.length--;
    return results;
  }
  isEmpty() {
    return this.length === 0;
  }
  clear() {
    this.list = new LinkedList();
    this.length = 0;
  }
  peek() {
    return this.isEmpty() ? null : this.getNext();
  }
  getNext() {
    throw new Error('This method is not implemented. Concrete implementations should implement.');
  }
}

module.exports = StackQueue;
