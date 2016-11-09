const towerOfHanoi = require('../../../lib/algorithms/3-stacks/hanoi');
const stack = require('../../../lib/dataStructures/stack');

describe('When dealing with the Tower of Hanoi', () => {
  let target,
    helper,
    source;

  beforeEach(() => {
    target = new stack();
    helper = new stack();
    source = new stack();
  });

  it('null is less than 1', () => {
    expect(null < 1).toBe(true);
  });

  describe('starting with 1 element', () => {
    beforeEach(() => {
      test(1);
    });

    it('the source stack ends up having 0 elements', () => {
      expect(source.length).toBe(0);
    });

    it('the helper stack ends up having 0 elements', () => {
      expect(helper.length).toBe(0);
    });

    it('the target stack ends up having 1 element', () => {
      expect(target.length).toBe(1);
    });
  });

  describe('starting with 2 elements', () => {
    beforeEach(() => {
      test(2);
    });

    it('the source stack ends up having 0 elements', () => {
      expect(source.length).toBe(0);
    });

    it('the helper stack ends up having 0 elements', () => {
      expect(helper.length).toBe(0);
    });

    it('the target stack ends up having 2 elements', () => {
      expect(target.length).toBe(2);
    });
  });

  describe('starting with 3 elements', () => {
    beforeEach(() => {
      test(3);
    });

    it('the source stack ends up having 0 elements', () => {
      expect(source.length).toBe(0);
    });
    it('the helper stack ends up having 0 elements', () => {
      expect(helper.length).toBe(0);
    });
    it('the target stack ends up having 3 elements', () => {
      expect(target.length).toBe(3);
    });
  });

  function test(number) {
    for (let i = number; i > 0; i--) {
      source.push(i);
    }

    towerOfHanoi(source, helper, target);
  }
});
