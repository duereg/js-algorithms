const Queue = require('../../lib/dataStructures/queue');

describe('When adding an element onto a Queue', () => {
  let myQueue;
  const firstValue = 1;

  beforeEach(() => {
    myQueue = new Queue();
    myQueue.add(firstValue);
  });

  it('the Queues` length should be 1', () => {
    expect(myQueue.length).toBe(1);
  });

  it('peek should show the item', () => {
    expect(myQueue.peek()).toBe(firstValue);
  });

  describe('you remove an element', () => {
    beforeEach(() => {
      myQueue.remove(firstValue);
    });

    it('the Queue`s length should be zero', () => {
      expect(myQueue.length).toBe(0);
    });

    it('peek should be null', () => {
      expect(myQueue.peek()).toBe(null);
    });
  });
});
