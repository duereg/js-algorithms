const isSubtree = require('../../../lib/algorithms/4-binaryTrees/isSubtree');
const BinarySearchTree = require('../../../lib/dataStructures/binarySearchTree');

describe('Given two binary trees, determine if one tree is a subtree of the other', () => {
  let parentTree,
    subTree2,
    subTree3,
    subTree4,
    unSubTree1,
    unSubTree2,
    unSubTree4;

  beforeEach(() => {
    parentTree = new BinarySearchTree()
      .add(10)
      .add(5)
      .add(15)
      .add(8)
      .add(2)
      .add(12)
      .add(16);
    subTree2 = new BinarySearchTree()
      .add(5)
      .add(8)
      .add(2);
    subTree3 = new BinarySearchTree()
      .add(15)
      .add(16)
      .add(12);
    subTree4 = new BinarySearchTree().add(2);
    unSubTree1 = new BinarySearchTree()
      .add(1)
      .add(2)
      .add(3);
    unSubTree2 = new BinarySearchTree()
      .add(5)
      .add(8)
      .add(1);
    unSubTree4 = new BinarySearchTree()
      .add(10)
      .add(5)
      .add(15);
  });

  it('a subtree for the left branch will verify', () => {
    expect(isSubtree(parentTree.head, subTree2)).toBe(true);
  });

  it('a subtree for the right branch will verify', () => {
    expect(isSubtree(parentTree.head, subTree3)).toBe(true);
  });

  it('a single-node subtree for a bottom leat will verify', () => {
    expect(isSubtree(parentTree.head, subTree4)).toBe(true);
  });

  it('a tree that matches the top three elements will not verify', () => {
    expect(isSubtree(parentTree.head, unSubTree4)).toBe(false);
  });

  it('a bogus tree will not verify', () => {
    expect(isSubtree(parentTree.head, unSubTree1)).toBe(false);
  });

  it('a mostly correct tree will not verify', () => {
    expect(isSubtree(parentTree.head, unSubTree2)).toBe(false);
  });
});
