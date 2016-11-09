const LinkedList = require('./linkedList');

function StackQueue() {
  this.list = new LinkedList();
  this.length = 0;
}

function push(data) {
  this.list.add(data);
  this.length++;
}

function pop() {
  if (this.isEmpty()) {
    throw new Error('The stack/queue is empty');
  }

  const results = this.peek();

  this.list.remove(results);
  this.length--;
  return results;
}

function isEmpty() {
  return this.length === 0;
}

function clear() {
  this.list = new LinkedList();
  this.length = 0;
}

function peek() {
  return this.isEmpty() ? null : this.getNext();
}

StackQueue.prototype = { push, pop, isEmpty, clear, peek };

module.exports = StackQueue;
