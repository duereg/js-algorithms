const Stack = require('../../../lib/dataStructures/stack');

class StackQueue {
  constructor() {
    this.popStack = new Stack();
    this.pushStack = new Stack();
    this.length = 0;
  }

  moveToPop() {
    while (!this.pushStack.isEmpty()) {
      this.popStack.push(this.pushStack.pop());
    }
  }

  moveToPush() {
    while (!this.popStack.isEmpty()) {
      this.pushStack.push(this.popStack.pop);
    }
  }

  push(data) {
    this.moveToPush();
    this.pushStack.push(data);
    this.length++;
  }

  pop() {
    this.moveToPop();
    this.length--;
    return this.popStack.pop();
  }

  isEmpty() {
    return this.popStack.isEmpty() && this.pushStack.isEmpty();
  }

  peek() {
    this.moveToPop();
    return this.popStack.peek();
  }

}

module.exports = StackQueue;
