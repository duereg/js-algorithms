var stack = require("../../lib/dataStructures/stack.js"); 

describe('When pushing two elements to a stack', function () {
	var myStack;
	var testValue1 = "test_string1"
	var testValue2 = "test_string2"

	beforeEach(function() {		
		myStack = new stack();
		myStack.push(testValue1); 
		myStack.push(testValue2); 
		
	});

	afterEach(function() {
		myStack = null;
	});

	it('the stack`s length should be 2', function () { 
		expect(myStack.length).toBe(2);
	});

});

describe('When pushing two elements to a stack and then popping an element', function () {
	var myStack;
	var testValue1 = "test_string1"
	var testValue2 = "test_string2"

	beforeEach(function() {		
		myStack = new stack();
		myStack.push(testValue1); 
		myStack.push(testValue2);  
	});

	afterEach(function() {
		myStack = null;
	});

	it('the stack`s length should be 1', function () {  
		var result = myStack.pop();
		expect(myStack.length).toBe(1);
	});

	it('the element popped should be the last element added.', function () {   
		var result = myStack.pop();
		expect(result).toBe(testValue2);
	});
 
});

describe('When pushing two elements to a stack and then popping 2 elements', function () {
	var myStack;
	var testValue1 = "test_string1"
	var testValue2 = "test_string2"

	beforeEach(function() {		
		myStack = new stack();
		myStack.push(testValue1); 
		myStack.push(testValue2); 
	});

	afterEach(function() {
		myStack = null;
	});

	it('the stack`s length should be 0', function () { 
		myStack.pop();
		myStack.pop();
		expect(myStack.length).toBe(0);
	});

	it('the elements popped should be in the inverse order to which they were added.', function () {  
		var result1 = myStack.pop();
		var result2 = myStack.pop(); 
		expect(result1).toBe(testValue2);
		expect(result2).toBe(testValue1);
	});
 
});
