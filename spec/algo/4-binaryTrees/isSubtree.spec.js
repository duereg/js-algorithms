const isSubtree = require("../../../lib/algorithms/4-binaryTrees/isSubtree.js");
const bst = require("../../../lib/dataStructures/binarySearchTree.js");

describe('Given two binary trees, determine if one tree is a subtree of the other', function () {
  let parentTree, subTree2, subTree3, subTree4, unSubTree1, unSubTree2, unSubTree4;

  beforeEach(() => {
    parentTree = new bst();
    parentTree.add(10);
    parentTree.add(5);
    parentTree.add(15);
    parentTree.add(8);
    parentTree.add(2);
    parentTree.add(12);
    parentTree.add(16);

    subTree2 = new bst();
    subTree2.add(5);
    subTree2.add(8);
    subTree2.add(2);

    subTree3 = new bst();
    subTree3.add(15);
    subTree3.add(16);
    subTree3.add(12);

    subTree4 = new bst();
    subTree4.add(2);

    unSubTree1 = new bst();
    unSubTree1.add(1);
    unSubTree1.add(2);
    unSubTree1.add(3);

    unSubTree2 = new bst();
    unSubTree2.add(5);
    unSubTree2.add(8);
    unSubTree2.add(1);

    unSubTree4 = new bst();
    unSubTree4.add(10);
    unSubTree4.add(5);
    unSubTree4.add(15);
  });

  it('a subtree for the left branch will verify', function () {
    expect(isSubtree(parentTree.head, subTree2)).toBe(true);
  });

  it('a subtree for the right branch will verify', function () {
    expect(isSubtree(parentTree.head, subTree3)).toBe(true);
  });

  it('a single-node subtree for a bottom leat will verify', function () {
    expect(isSubtree(parentTree.head, subTree4)).toBe(true);
  });

  it('a tree that matches the top three elements will not verify', function () {
    expect(isSubtree(parentTree.head, unSubTree4)).toBe(false);
  });

  it('a bogus tree will not verify', function () {
    expect(isSubtree(parentTree.head, unSubTree1)).toBe(false);
  });

  it('a mostly correct tree will not verify', function () {
    expect(isSubtree(parentTree.head, unSubTree2)).toBe(false);
  });
});
