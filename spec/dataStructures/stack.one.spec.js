const stack = require('../../lib/dataStructures/stack.js');

const firstValue = 1;

describe('When pushing an element onto a stack', function () {
  let myStack;

  beforeEach(function () {
    myStack = new stack();
    myStack.push(firstValue);
  });

  it('the stacks` length should be 1', function () {
    expect(myStack.length).toBe(1);
  });

  it('peek should show the item', function () {
    expect(myStack.peek()).toBe(firstValue);
  });

  describe('When the stack contains one element and your remove it', function () {
    beforeEach(function () {
      myStack.pop(firstValue);
    });

    it('the stack`s length should be zero', function () {
      expect(myStack.length).toBe(0);
    });

    it('peek should be null', function () {
      expect(myStack.peek()).toBe(null);
    });
  });
});
