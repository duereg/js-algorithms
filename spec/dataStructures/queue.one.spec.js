var Queue = require("../../lib/dataStructures/queue.js");

describe('When adding an element onto a Queue', function () {
	var myQueue;
	var firstValue = 1;

	beforeEach(function() {
		myQueue = new Queue();
		myQueue.add(firstValue);
	});

	afterEach(function() {
		myQueue = null;
	});

	it('the Queues` length should be 1', function () {
		expect(myQueue.length).toBe(1);
	});

	it('peek should show the item', function() {
		expect(myQueue.peek()).toBe(firstValue);
	});

});

describe('When the Queue contains one element and your remove it', function () {
	var myQueue;
	var testValue = 1;

	beforeEach(function() {
		myQueue = new Queue();
		myQueue.add(testValue);
		myQueue.remove(testValue);

	});

	afterEach(function() {
		myQueue = null;
	});

	it('the Queue`s length should be zero', function () {
		expect(myQueue.length).toBe(0);
	});

	it('peek should be null', function() {
		expect(myQueue.peek()).toBe(null);
	});
});
