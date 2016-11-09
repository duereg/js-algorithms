const stackQueue = require('./stackQueue');

function stack() {
  stackQueue.apply(this, arguments);
}

stack.prototype = new stackQueue();

stack.prototype.getNext = function () {
  return this.list.end.data;
};

module.exports = stack;
