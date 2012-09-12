var maxHeap = require("../../lib/dataStructures/maxHeap.js"); 
var heapValidator = require("./binaryHeap.Validator.js"); 

describe('When adding ten elements to the max heap via constructor', function () {
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

		list = new maxHeap(array); 
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

	it('and you remove the head twice, you should get the two largest elements.', function () {   
		expect(list.removeHead()).toBe(100);
		console.log(list.array);
		expect(list.removeHead()).toBe(90);
	});    

	it('the max heap is valid', function() {
		var validator = new heapValidator(list);
		expect(validator.isValid()).toBe(true);
	});

	//todo: add check to actually walk tree and check all relationships
});