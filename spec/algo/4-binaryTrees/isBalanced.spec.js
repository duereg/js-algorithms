const isBalanced = require('../../../lib/algorithms/4-binaryTrees/isBalanced');
const bst = require('../../../lib/dataStructures/binarySearchTree');

describe('When testing a binary search tree using isBalanced()', () => {
  let tree;
  const value2 = 2;
  const value1 = 1;
  const value3 = 3;

  beforeEach(() => {
    tree = new bst();
  });

  it('if three elements are added in order (middle, least, greatest) the tree will be balanced.', () => {
    tree.add(value2);
    tree.add(value1);
    tree.add(value3);

    expect(isBalanced(tree.head)).toBe(true);
  });

  it('if the elements are added in order (least, middle, greatest) the tree will be unbalanced.', () => {
    tree.add(value1);
    tree.add(value2);
    tree.add(value3);

    expect(isBalanced(tree.head)).toBe(false);
  });

  it('if the elements are added in order (greatest, middle, least) the tree will be unbalanced.', () => {
    tree.add(value3);
    tree.add(value2);
    tree.add(value1);

    expect(isBalanced(tree.head)).toBe(false);
  });
});
