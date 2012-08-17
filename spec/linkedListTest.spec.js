var LinkedList = require("../lib/linkedList.js");
//var jasmine = require("jasmine-node");

describe('When adding one element', function () {
	var list;
	var testValue = "test_string"

	beforeEach(function() {		
		list = new LinkedList();
		list.add(testValue); 
		console.log(list);
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