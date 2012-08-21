var maxHeap = require("../lib/maxHeap.js"); 

describe('When adding ten elements to the max heap', function () {
	var list;

	beforeEach(function() {		
		list = new maxHeap();
		list.add(20);
		list.add(10);
		list.add(100);
		list.add(30);
		list.add(-10);
		list.add(90);
		list.add(70);
		list.add(69);
		list.add(68);
		list.add(67);

		console.log(list.array);
	});

	afterEach(function() {
		list = null;
	});

	it('the maxHeap length should by 10', function () { 
		expect(list.array.length).toBe(10);
	});

	it('the 1st element of the maxHeap should be the largest value of the ten.', function () {   
		expect(list.array[0]).toBe(100);
	});

	it('and you remove the head, it should be the largest element.', function () {   
		expect(list.removeHead()).toBe(100);
	});    
});