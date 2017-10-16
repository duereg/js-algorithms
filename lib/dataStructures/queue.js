const StackQueue = require('./stackQueue');

class Queue extends StackQueue {
  getNext() {
    return this.list.start.data;
  }
}

module.exports = Queue;
