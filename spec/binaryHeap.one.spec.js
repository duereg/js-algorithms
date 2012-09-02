var binaryHeap = require("../lib/dataStructures/binaryHeap.js"); 

describe('When adding one element to the binary heap', function () {
	var list;
	var testValue = "test_string"

	beforeEach(function() {		
		list = new binaryHeap();
		list.add(testValue);
	});

	afterEach(function() {
		list = null;
	});

	it('the binary heaps length should increase by 1', function () { 
		expect(list.array.length).toBe(1);
	});

	it('the 1st element of the binary heap should contain the added value.', function () {   
		expect(list.array[0]).toBe(testValue);
	});  
});