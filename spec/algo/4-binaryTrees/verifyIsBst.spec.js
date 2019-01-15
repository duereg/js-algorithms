const verifyIsBinarySearchTree = require('../../../lib/algorithms/4-binaryTrees/verifyIsBst');
const BinarySearchTree = require('../../../lib/dataStructures/binarySearchTree');

describe('Given a binary tree, determine if the tree is a binary search tree', () => {
  it('a BinarySearchTree will verify correctly', () => {
    const balanced = new BinarySearchTree();
    balanced.add(10);
    balanced.add(5);
    balanced.add(15);
    balanced.add(8);
    balanced.add(2);
    balanced.add(12);
    balanced.add(16);
    expect(verifyIsBinarySearchTree(balanced.head)).toBe(true);
  });

  it('a non-BinarySearchTree will not verify correctly', () => {
    const unbalanced = new BinarySearchTree();
    unbalanced.add(10);
    unbalanced.add(1);
    unbalanced.add(20);
    unbalanced.add(5);
    unbalanced.add(8);
    unbalanced.add(15);
    unbalanced.add(18);
    unbalanced.add(12);

    unbalanced.head.left.data = 30;
    expect(verifyIsBinarySearchTree(unbalanced.head)).toBe(false);
  });
});
