/* eslint */
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

  it('the order of search is correct', () => {
    const matcher = {

      matcher(value) {
        return value === 8;
      },
    };
    spyOn(matcher, 'matcher').and.callThrough();

    expect(depthFirstSearch(balanced.head, matcher.matcher)).toBe(true);
    expect(matcher.matcher).toHaveBeenCalledWith(10);
    expect(matcher.matcher).toHaveBeenCalledWith(5);
    expect(matcher.matcher).toHaveBeenCalledWith(15);
    expect(matcher.matcher).toHaveBeenCalledWith(12);
    expect(matcher.matcher).toHaveBeenCalledWith(16);
    expect(matcher.matcher).toHaveBeenCalledWith(2);
    expect(matcher.matcher).toHaveBeenCalledWith(8);
  });
});
