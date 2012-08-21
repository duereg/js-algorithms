var LinkedList = require("../lib/linkedList.js"); 

describe('When adding one element to a linked list', function () {
	var list;
	var testValue = "test_string"

	beforeEach(function() {		
		list = new LinkedList();
		list.add(testValue); 
		
	});

	afterEach(function() {
		list = null;
	});

	it('the lists length should increase by 1', function () { 
		expect(list.length).toBe(1);
	});

	it('the start element should contain the added value.', function () {   
		expect(list.start.data).toBe(testValue);
	});

	it('the end element should contain the added value.', function () { 
		expect(list.end.data).toBe(testValue);
	});

	it('the start next pointer should be null.', function () {  
		expect(list.start.next).toBe(null);
	});

	it('the end next pointer should be null.', function () { 
		expect(list.end.next).toBe(null);
	});
});

describe('When the list contains one element and your remove it', function () {
	var list;
	var testValue = "test_string"

	beforeEach(function() {		
		list = new LinkedList();
		list.add(testValue); 
		list.remove(testValue); 
		
	});

	afterEach(function() {
		list = null;
	});

	it('the lists length should be zero', function () { 
		expect(list.length).toBe(0);
	});

	it('the start element should be null', function () {   
		expect(list.start).toBe(null);
	});

	it('the end element should be null', function () { 
		expect(list.end).toBe(null);
	}); 
});
