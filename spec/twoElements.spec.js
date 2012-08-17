var LinkedList = require("../lib/linkedList.js"); 

describe('When adding two elements', function () {
	var list;
	var testValue1 = "test_string1"
	var testValue2 = "test_string2"

	beforeEach(function() {		
		list = new LinkedList();
		list.add(testValue1); 
		list.add(testValue2); 
		
	});

	afterEach(function() {
		list = null;
	});

	it('the lists length should be 2', function () { 
		expect(list.length).toBe(2);
	});

	it('the start element should contain the 1st value.', function () {   
		expect(list.start.data).toBe(testValue1);
	});

	it('the end element should contain the 2nd value.', function () { 
		expect(list.end.data).toBe(testValue2);
	});

	it('the start next pointer should be point to the 2nd value node.', function () {  
	  console.log(list.start.next);
		expect(list.start.next.data).toBe(testValue2);
	});

	it('the end next pointer should be null.', function () { 
		expect(list.end.next).toBe(null);
	});
});

describe('When adding two elements and then removing the 1st element', function () {
	var list;
	var testValue1 = "test_string1"
	var testValue2 = "test_string2"

	beforeEach(function() {		
		list = new LinkedList();
		list.add(testValue1); 
		list.add(testValue2); 
		list.remove(testValue1);
		
	});

	afterEach(function() {
		list = null;
	});

	it('the lists length should be 1', function () { 
		expect(list.length).toBe(1);
	});

	it('the start element should contain the 2nd value.', function () {   
		expect(list.start.data).toBe(testValue2);
	});

	it('the end element should be the same as the start element.', function () { 
		expect(list.end).toBe(list.start);
	});

	it('the start next pointer should be null.', function () {  
		expect(list.start.next).toBe(null);
	});

	it('the end next pointer should be null.', function () { 
		expect(list.end.next).toBe(null);
	});
});

describe('When adding two elements and then removing the 2nd element', function () {
	var list;
	var testValue1 = "test_string1"
	var testValue2 = "test_string2"

	beforeEach(function() {		
		list = new LinkedList();
		list.add(testValue1); 
		list.add(testValue2); 
		list.remove(testValue2);
		
	});

	afterEach(function() {
		list = null;
	});

	it('the lists length should be 1', function () { 
		expect(list.length).toBe(1);
	});

	it('the start element should contain the 1st value.', function () {   
		expect(list.start.data).toBe(testValue1);
	});

	it('the end element should be the same as the start element.', function () { 
		expect(list.end).toBe(list.start);
	});

	it('the start next pointer should be null.', function () {  
		expect(list.start.next).toBe(null);
	});

	it('the end next pointer should be null.', function () { 
		expect(list.end.next).toBe(null);
	});
});
