var maxHeap = require("../../lib/dataStructures/maxHeap.js");

describe('When adding one element to the max heap', function () {
	var list;
	var testValue = "test_string"

	beforeEach(function() {
		list = new maxHeap();
		list.add(testValue);
	});

	afterEach(function() {
		list = null;
	});

	it('the maxHeap length should increase by 1', function () {
		expect(list.array.length).toBe(1);
	});

	it('the 1st element of the maxHeap should contain the added value.', function () {
		expect(list.array[0]).toBe(testValue);
	});
});