var minHeap = require("../lib/minHeap.js"); 

describe('When adding two elements to the min heap', function () {
	var list;

	beforeEach(function() {		
		list = new minHeap();
		list.add(20);
		list.add(10); 
	});

	afterEach(function() {
		list = null;
	});

	it('the minHeap length should by 2', function () { 
		expect(list.array.length).toBe(2);
	});

	it('the 1st element of the minHeap should be the smallest value of the two.', function () {   
		expect(list.array[0]).toBe(10);
	});

	it('and you remove the head, it should be the smallest element.', function () {   
		expect(list.removeHead()).toBe(10);
	});    
});