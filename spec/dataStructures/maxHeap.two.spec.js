var maxHeap = require("../../lib/dataStructures/maxHeap.js");

describe('When adding two elements to the max heap', function () {
	var list;

	beforeEach(function() {
		list = new maxHeap();
		list.add(20);
		list.add(10);
	});

	afterEach(function() {
		list = null;
	});

	it('the maxHeap length should by 2', function () {
		expect(list.array.length).toBe(2);
	});

	it('the 1st element of the maxHeap should be the largest value of the two.', function () {
		expect(list.array[0]).toBe(20);
	});

	it('and you remove the head, it should be the largest element.', function () {
		expect(list.removeHead()).toBe(20);
	});
});