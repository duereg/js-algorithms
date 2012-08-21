var minHeap = require("../lib/minHeap.js"); 

describe('When adding ten elements to the min heap via constructor', function () {
	var list;

	beforeEach(function() {		
		var array = []		
		array.push(20);
		array.push(10);
		array.push(100);
		array.push(30);
		array.push(-10);
		array.push(90);
		array.push(70);
		array.push(40);
		array.push(50);
		array.push(60); 

		list = new minHeap(array); 
	});

	afterEach(function() {
		list = null;
	});

	it('the minHeap length should by 10', function () { 
		expect(list.array.length).toBe(10);
	});

	it('the 1st element of the minHeap should be the smallest value of the ten.', function () {   
		expect(list.array[0]).toBe(-10);
	});

	it('and you remove the head, it should be the smallest element.', function () {   
		expect(list.removeHead()).toBe(-10);
	});    

	it('and you remove the head twice, you should get the two smallest elements.', function () {   
		expect(list.removeHead()).toBe(-10);
		console.log(list.array);
		expect(list.removeHead()).toBe(10);
	});  

	//todo: add check to actually walk tree and check all relationships
});