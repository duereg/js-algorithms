const StackQueue = require('./stackQueue');

class Stack extends StackQueue {
  getNext() {
    return this.list.end.data;
  }
}

module.exports = Stack;
