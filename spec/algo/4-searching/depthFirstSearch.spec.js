/* eslint */
const sinon = require('sinon');

const depthFirstSearch = require('../../../lib/algorithms/4-searching/depthFirstSearch');
const BinarySearchTree = require('../../../lib/dataStructures/binarySearchTree');

describe('Given a binary tree containing the value 8, determine if the depth first search', () => {
  let balanced;

  beforeEach(() => {
    balanced = new BinarySearchTree();
    balanced.add(10);
    balanced.add(5);
    balanced.add(15);
    balanced.add(8);
    balanced.add(2);
    balanced.add(12);
    balanced.add(16);
  });

  it('can find the value 8 in the tree', () => {
    expect(depthFirstSearch(balanced.head, value => value === 8)).toBe(true);
  });

  it('cannot find the value 11', () => {
    expect(depthFirstSearch(balanced.head, value => value === 11)).toBe(false);
  });

  describe('the order of search is correct', () => {
    const sandbox = sinon.createSandbox();

    const matcher = {
      matcher(value) {
        return value === 8;
      },
    };

    beforeEach(() => {
      sandbox.spy(matcher, 'matcher');
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('is correct', () => {
      expect(depthFirstSearch(balanced.head, matcher.matcher)).toBe(true);
      expect(matcher.matcher.calledWith(10)).toBe(true);
      expect(matcher.matcher.calledWith(5)).toBe(true);
      expect(matcher.matcher.calledWith(15)).toBe(true);
      expect(matcher.matcher.calledWith(12)).toBe(true);
      expect(matcher.matcher.calledWith(16)).toBe(true);
      expect(matcher.matcher.calledWith(2)).toBe(true);
      expect(matcher.matcher.calledWith(8)).toBe(true);
    });
  });
});
