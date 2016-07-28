const bst = require('../../lib/dataStructures/binarySearchTree.js');

describe('When adding an element to a binary search tree', function () {
  let tree;
  let value = 2;

  beforeEach(function () {
    tree = new bst();
    tree.add(value);
  });

  it('the 1st element of the binary search tree should contain the value.', function () {
    expect(tree.head.data).toBe(value);
  });
});


describe('When adding three elements to a binary search tree', function () {
  let tree;
  let value2 = 2;
  let value1 = 1;
  let value3 = 3;

  beforeEach(function () {
    tree = new bst();
  });

  it('if the elements are added in order (middle, least, greatest) the tree will be balanced.', function () {
    tree.add(value2);
    tree.add(value1);
    tree.add(value3);

    expect(tree.head.data).toBe(value2);
    expect(tree.head.left.data).toBe(value1);
    expect(tree.head.right.data).toBe(value3);
  });

  it('if the elements are added in order (least, middle, greatest) the tree will only have right nodes.', function () {
    tree.add(value1);
    tree.add(value2);
    tree.add(value3);

    expect(tree.head.data).toBe(value1);
    expect(tree.head.right.data).toBe(value2);
    expect(tree.head.right.right.data).toBe(value3);
  });

  it('if the elements are added in order (greatest, middle, least) the tree will only have left nodes.', function () {
    tree.add(value3);
    tree.add(value2);
    tree.add(value1);

    expect(tree.head.data).toBe(value3);
    expect(tree.head.left.data).toBe(value2);
    expect(tree.head.left.left.data).toBe(value1);
  });
});
