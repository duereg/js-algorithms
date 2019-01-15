const Stack = require('../../lib/dataStructures/stack');

const firstValue = 1;

describe('When pushing an element onto a stack', () => {
  let myStack;

  beforeEach(() => {
    myStack = new Stack();
    myStack.push(firstValue);
  });

  it('the stacks` length should be 1', () => {
    expect(myStack.length).toBe(1);
  });

  it('peek should show the item', () => {
    expect(myStack.peek()).toBe(firstValue);
  });

  describe('When the stack contains one element and your remove it', () => {
    beforeEach(() => {
      myStack.pop(firstValue);
    });

    it('the stack`s length should be zero', () => {
      expect(myStack.length).toBe(0);
    });

    it('peek should be null', () => {
      expect(myStack.peek()).toBe(null);
    });
  });
});
