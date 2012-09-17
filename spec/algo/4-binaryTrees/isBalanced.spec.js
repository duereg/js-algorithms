var isBalanced = require("../../../lib/algorithms/4-binaryTrees/isBalanced.js"); 
var bst = require("../../../lib/dataStructures/binarySearchTree.js"); 


describe('When testing a binary search tree using isBalanced()', function () {
	var tree;
	var value2 = 2;
	var value1 = 1; 
	var value3 = 3;

	beforeEach(function() {		
		tree = new bst();
	});

	it('if three elements are added in order (middle, least, greatest) the tree will be balanced.', function () {   
		tree.add(value2);
		tree.add(value1);
		tree.add(value3);

		expect(isBalanced(tree.head)).toBe(true);
	});  

	it('if the elements are added in order (least, middle, greatest) the tree will be unbalanced.', function () {   
		tree.add(value1);
		tree.add(value2);
		tree.add(value3);

		expect(isBalanced(tree.head)).toBe(false);
	});  

	it('if the elements are added in order (greatest, middle, least) the tree will be unbalanced.', function () {   
		tree.add(value3);
		tree.add(value2);
		tree.add(value1);

		expect(isBalanced(tree.head)).toBe(false);
	});
});
