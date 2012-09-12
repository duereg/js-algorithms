var trie = require("../../lib/dataStructures/trie.js"); 

 
describe('Given a trie containing the words "free", "freed", "freedom", and "frees"', function() {
	var tree;
	var testValue1 = "free";
	var testValue2 = "freed";
	var testValue3 = "frees"; 
	var testValue5 = "freedom";

	beforeEach(function() {	
		tree = new trie();
		tree.add(testValue1);
		tree.add(testValue2);	
		tree.add(testValue3);	 
		tree.add(testValue5);
	});

	afterEach(function() {
		tree = null;
	});
 
	it('the sort() method will return a sorted list of strings in the correct order', function() { 
		var sorted = tree.sort();

		expect(sorted.length).toBe(4);
		expect(sorted[0]).toBe(testValue1);
		expect(sorted[1]).toBe(testValue2);
		expect(sorted[2]).toBe(testValue5);
		expect(sorted[3]).toBe(testValue3);
	})
});

 
describe('Given a trie containing the words "apple", "banana", "cherry", and "fejoya"', function() {
	var tree;
	var testValue1 = "apple";
	var testValue2 = "banana";
	var testValue3 = "cherry"; 
	var testValue5 = "fejoya";

	beforeEach(function() {	
		tree = new trie();
		tree.add(testValue1);
		tree.add(testValue2);	
		tree.add(testValue3);	 
		tree.add(testValue5);
	});

	afterEach(function() {
		tree = null;
	});
 
	it('the sort() method will return a sorted list of strings in the correct order', function() { 
		var sorted = tree.sort();

		expect(sorted.length).toBe(4);
		expect(sorted[0]).toBe(testValue1);
		expect(sorted[1]).toBe(testValue2);
		expect(sorted[2]).toBe(testValue3);
		expect(sorted[3]).toBe(testValue5);
	})
});