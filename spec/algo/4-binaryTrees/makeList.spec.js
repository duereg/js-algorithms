const BinarySearchTree = require('../../../lib/dataStructures/binarySearchTree');
const makeList = require('../../../lib/algorithms/4-binaryTrees/makeList');

describe('Given a binary search tree, create a linked list at each depth', () => {
  let tree;

  beforeEach(() => {
    tree = new BinarySearchTree();
  });

  it('with a binary search tree of size 1', () => {
    tree.add(10);

    const list = makeList(tree.head);

    expect(list).not.toBe(null);
    expect(list.data.start.data).toBe(10);
  });

  it('with a tree of size 2', () => {
    tree.add(10);
    tree.add(9);

    const list = makeList(tree.head);

    expect(list).not.toBe(null);
    expect(list.data.start.data).toBe(10);
    expect(list.next.data.start.data).toBe(9);
  });

  it('with a tree of size 3', () => {
    tree.add(9);
    tree.add(10);
    tree.add(8);

    const list = makeList(tree.head);

    expect(list).not.toBe(null);
    expect(list.data.start.data).toBe(9);
    expect(list.next.data.length).toBe(2);
    expect(list.next.data.start.data).toBe(8);
    expect(list.next.data.end.data).toBe(10);
  });

  it('with a tree of size 4', () => {
    tree.add(5);
    tree.add(8);
    tree.add(3);
    tree.add(1);
    tree.add(4);
    tree.add(6);
    tree.add(9);

    const list = makeList(tree.head);

    expect(list).not.toBe(null);
    expect(list.data.start.data).toBe(5);
    expect(list.next.data.length).toBe(2);
    expect(list.next.data.start.data).toBe(3);
    expect(list.next.data.end.data).toBe(8);
    expect(list.next.next.data.length).toBe(4);
    expect(list.next.next.data.start.data).toBe(1);
    expect(list.next.next.data.end.data).toBe(9);
  });
});
