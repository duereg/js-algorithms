const Queue = require('../../lib/dataStructures/queue.js');

describe('When adding an element onto a Queue', function () {
  let myQueue;
  let firstValue = 1;

  beforeEach(function () {
    myQueue = new Queue();
    myQueue.add(firstValue);
  });

  it('the Queues` length should be 1', function () {
    expect(myQueue.length).toBe(1);
  });

  it('peek should show the item', function () {
    expect(myQueue.peek()).toBe(firstValue);
  });

  describe('you remove an element', function () {
    beforeEach(function () {
      myQueue.remove(firstValue);
    });

    it('the Queue`s length should be zero', function () {
      expect(myQueue.length).toBe(0);
    });

    it('peek should be null', function () {
      expect(myQueue.peek()).toBe(null);
    });
  });
});
