const Bst = require('../../lib/dataStructures/binarySearchTree');

describe('When adding an element to a binary search tree', () => {
  let tree;
  const value = 2;

  beforeEach(() => {
    tree = new Bst();
    tree.add(value);
  });

  it('the 1st element of the binary search tree should contain the value.', () => {
    expect(tree.head.data).toBe(value);
  });
});

describe('When adding three elements to a binary search tree', () => {
  let tree;
  const value2 = 2;
  const value1 = 1;
  const value3 = 3;

  beforeEach(() => {
    tree = new Bst();
  });

  it('if the elements are added in order (middle, least, greatest) the tree will be balanced.', () => {
    tree.add(value2);
    tree.add(value1);
    tree.add(value3);

    expect(tree.head.data).toBe(value2);
    expect(tree.head.left.data).toBe(value1);
    expect(tree.head.right.data).toBe(value3);
  });

  it('if the elements are added in order (least, middle, greatest) the tree will only have right nodes.', () => {
    tree.add(value1);
    tree.add(value2);
    tree.add(value3);

    expect(tree.head.data).toBe(value1);
    expect(tree.head.right.data).toBe(value2);
    expect(tree.head.right.right.data).toBe(value3);
  });

  it('if the elements are added in order (greatest, middle, least) the tree will only have left nodes.', () => {
    tree.add(value3);
    tree.add(value2);
    tree.add(value1);

    expect(tree.head.data).toBe(value3);
    expect(tree.head.left.data).toBe(value2);
    expect(tree.head.left.left.data).toBe(value1);
  });
});
