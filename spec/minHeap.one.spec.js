var minHeap = require("../lib/dataStructures/minHeap.js"); 

describe('When adding one element to the min heap', function () {
	var list;
	var testValue = "test_string"

	beforeEach(function() {		
		list = new minHeap();
		list.add(testValue);
	});

	afterEach(function() {
		list = null;
	});

	it('the minHeap length should increase by 1', function () { 
		expect(list.array.length).toBe(1);
	});

	it('the 1st element of the minHeap should contain the added value.', function () {   
		expect(list.array[0]).toBe(testValue);
	});  
});