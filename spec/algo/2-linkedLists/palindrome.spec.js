var palindrome = require("../../../lib/algorithms/2-linkedLists/palindrome.js");
var LinkedList = require("../../../lib/dataStructures/linkedList.js");

describe('When using palindrome() on a linked list of integers', function () {
	var validEven;
	var validOdd;
	var invalid;


	beforeEach(function() {
		validEven = new LinkedList();
		validEven.add(1);
		validEven.add(2);
		validEven.add(3);
		validEven.add(4);
		validEven.add(4);
		validEven.add(3);
		validEven.add(2);
		validEven.add(1);

		validOdd = new LinkedList();
		validOdd.add(1);
		validOdd.add(2);
		validOdd.add(3);
		validOdd.add(4);
		validOdd.add(3);
		validOdd.add(2);
		validOdd.add(1);

		invalid = new LinkedList();
		invalid.add(1);
		invalid.add(2);
		invalid.add(3);
		invalid.add(4);
		invalid.add(5);
		invalid.add(6);

	});

	it('given an even number valid palindrome, true will be returned.', function () {
		var result = palindrome(validEven.start);
		expect(result).toBe(true);
	});

	it('given an odd number valid palindrome, true will be returned.', function () {
		var result = palindrome(validOdd.start);
		expect(result).toBe(true);
	});

	it('given an invalid palindrome, false will be returned.', function () {
		var result = palindrome(invalid.start);
		expect(result).toBe(false);
	});
});