var trie = require("../lib/trie.js"); 

describe('After adding the word "Philadelphia" to the trie', function () {
	var tree;
	var testValue = "Philadelphia"

	beforeEach(function() {	
		tree = new trie();
		tree.add(testValue);	
	});

	afterEach(function() {
		tree = null;
	});

	it('the tree`s head should only contain one entry', function () {  
		expect(Object.keys(tree.head).length).toBe(1);
	});

	it('the tree`s head should contain the property P.', function () {   
		expect(tree.head.P).toBeDefined();
	}); 

	it('the hasWord() method should be able to find Philadelphia', function() {
		expect(tree.hasWord(testValue)).toBe(true);
	});
});

describe('After adding the words "Philadelphia" and "Phil" to the trie', function () {
	var tree;
	var testValue = "Philadelphia"
	var testValue2 = "Phil";

	beforeEach(function() {	
		tree = new trie();
		tree.add(testValue);
		tree.add(testValue2);	
	});

	afterEach(function() {
		tree = null;
	});

	it('the tree`s head should only contain one entry', function () {  
		expect(Object.keys(tree.head).length).toBe(1);
	});

	it('the tree`s head should contain the property P.', function () {   
		expect(tree.head.P).toBeDefined();
	}); 

	it('the hasWord() method should be able to find ' + testValue, function() {
		expect(tree.hasWord(testValue)).toBe(true);
	});

	it('the hasWord() method should be able to find ' + testValue2, function() {
		expect(tree.hasWord(testValue2)).toBe(true);
	});
});

describe('After adding the words "apple", "banana", and "orange" to the trie', function () {
	var tree;
	var testValue1 = "apple";
	var testValue2 = "banana";
	var testValue3 = "orange";

	beforeEach(function() {	
		tree = new trie();
		tree.add(testValue1);
		tree.add(testValue2);	
		tree.add(testValue3);	
	});

	afterEach(function() {
		tree = null;
	});

	it('the tree`s head should contain three entries', function () {  
		expect(Object.keys(tree.head).length).toBe(3);
	});

	it('the tree`s head should contain the property a.', function () {   
		expect(tree.head.a).toBeDefined();
	}); 

	it('the tree`s head should contain the property b.', function () {   
		expect(tree.head.b).toBeDefined();
	}); 

	it('the tree`s head should contain the property o.', function () {   
		expect(tree.head.o).toBeDefined();
	}); 

	it('the hasWord() method should be able to find ' + testValue1 ,  function() {
		expect(tree.hasWord(testValue1)).toBe(true);
	});

	it('the hasWord() method should be able to find ' + testValue2, function() {
		expect(tree.hasWord(testValue2)).toBe(true);
	});

	it('the hasWord() method should be able to find ' + testValue3, function() {
		expect(tree.hasWord(testValue3)).toBe(true);
	});
});

describe("When adding undefined to the trie", function() {

	it('the add() method will throw an exception if given undefined', function() {
		var tree = new trie();
		expect(tree.add).toThrow();
	})
});