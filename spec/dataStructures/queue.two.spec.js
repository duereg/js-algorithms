var Queue = require("../../lib/dataStructures/queue.js"); 

describe('When adding two elements to a Queue', function () {
	var myQueue;
	var testValue1 = "test_string1"
	var testValue2 = "test_string2"

	beforeEach(function() {		
		myQueue = new Queue();
		myQueue.add(testValue1); 
		myQueue.add(testValue2); 
		
	});

	afterEach(function() {
		myQueue = null;
	});

	it('the Queue`s length should be 2', function () { 
		expect(myQueue.length).toBe(2);
	});

});

describe('When adding two elements to a Queue and then removing an element', function () {
	var myQueue;
	var testValue1 = "test_string1"
	var testValue2 = "test_string2"

	beforeEach(function() {		
		myQueue = new Queue();
		myQueue.add(testValue1); 
		myQueue.add(testValue2);  
	});

	afterEach(function() {
		myQueue = null;
	});

	it('the Queue`s length should be 1', function () {  
		var result = myQueue.remove();
		expect(myQueue.length).toBe(1);
	});

	it('the element removed should be the first element added.', function () {   
		var result = myQueue.remove();
		expect(result).toBe(testValue1);
	});
 
});

describe('When adding two elements to a Queue and then removing 2 elements', function () {
	var myQueue;
	var testValue1 = "test_string1"
	var testValue2 = "test_string2"

	beforeEach(function() {		
		myQueue = new Queue();
		myQueue.add(testValue1); 
		myQueue.add(testValue2); 
	});

	afterEach(function() {
		myQueue = null;
	});

	it('the Queue`s length should be 0', function () { 
		myQueue.remove();
		myQueue.remove();
		expect(myQueue.length).toBe(0);
	});

	it('the elements removed should be in the order to which they were added.', function () {  
		var result1 = myQueue.remove();
		var result2 = myQueue.remove(); 
		expect(result1).toBe(testValue1);
		expect(result2).toBe(testValue2);
	});
 
});
