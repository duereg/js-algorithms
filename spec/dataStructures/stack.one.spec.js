var stack = require("../../lib/dataStructures/stack.js"); 

describe('When pushing an element onto a stack', function () {
	var myStack; 
	var firstValue = 1; 

	beforeEach(function() {		
		myStack = new stack();
		myStack.push(firstValue); 
		
	});

	afterEach(function() {
		myStack = null;
	});

	it('the stacks` length should be 1', function () { 
		expect(myStack.length).toBe(1);
	});

	it('peek should show the item', function() {
		expect(myStack.peek()).toBe(firstValue);
	});

});

describe('When the stack contains one element and your remove it', function () {
	var myStack;
	var testValue = 1;

	beforeEach(function() {		
		myStack = new stack();
		myStack.push(testValue); 
		myStack.pop(testValue); 
		
	});

	afterEach(function() {
		myStack = null;
	});

	it('the stack`s length should be zero', function () { 
		expect(myStack.length).toBe(0);
	});

	it('peek should be null', function() {
		expect(myStack.peek()).toBe(null);
	});
});
