var LinkedList = require("../../lib/dataStructures/linkedList.js");

describe('When adding three elements to a linked list', function () {
	var list;
	var testValue1 = "test_string1"
	var testValue2 = "test_string2"
	var testValue3 = "test_string3"

	beforeEach(function() {
		list = new LinkedList();
		list.add(testValue1);
		list.add(testValue2);
		list.add(testValue3);

	});

	afterEach(function() {
		list = null;
	});

	it('the lists length should be 3', function () {
		expect(list.length).toBe(3);
	});

	it('the start element should contain the 1st value.', function () {
		expect(list.start.data).toBe(testValue1);
	});

	it('the end element should contain the 3rd value.', function () {
		expect(list.end.data).toBe(testValue3);
	});

	it('the start next pointer should be point to the 2nd value node.', function () {
		expect(list.start.next.data).toBe(testValue2);
	});

	it('the end next pointer should be null.', function () {
		expect(list.end.next).toBe(null);
	});
});

describe('When adding three elements to a linked list and then removing the 1st element', function () {
	var list;
	var testValue1 = "test_string1"
	var testValue2 = "test_string2"
	var testValue3 = "test_string3"

	beforeEach(function() {
		list = new LinkedList();
		list.add(testValue1);
		list.add(testValue2);
		list.add(testValue3);
		list.remove(testValue1);

	});

	afterEach(function() {
		list = null;
	});

	it('the lists length should be 2', function () {
		expect(list.length).toBe(2);
	});

	it('the start element should contain the 2nd value.', function () {
		expect(list.start.data).toBe(testValue2);
	});

	it('the end element should contain the 3rd value.', function () {
		expect(list.end.data).toBe(testValue3);
	});

	it('the start next pointer should point to the end element.', function () {
		expect(list.start.next).toBe(list.end);
	});

	it('the end next pointer should be null.', function () {
		expect(list.end.next).toBe(null);
	});
});

describe('When adding three elements to a linked list and then removing the 2nd element', function () {
	var list;
	var testValue1 = "test_string1"
	var testValue2 = "test_string2"
	var testValue3 = "test_string3"

	beforeEach(function() {
		list = new LinkedList();
		list.add(testValue1);
		list.add(testValue2);
		list.add(testValue3);
		list.remove(testValue2);

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

	it('the end element should contain the 3rd value.', function () {
		expect(list.end.data).toBe(testValue3);
	});

	it('the start next pointer should point to the end element.', function () {
		expect(list.start.next).toBe(list.end);
	});

	it('the end next pointer should be null.', function () {
		expect(list.end.next).toBe(null);
	});
});


describe('When adding three elements to a linked list and then removing the 3rd element', function () {
	var list;
	var testValue1 = "test_string1"
	var testValue2 = "test_string2"
	var testValue3 = "test_string3"

	beforeEach(function() {
		list = new LinkedList();
		list.add(testValue1);
		list.add(testValue2);
		list.add(testValue3);
		list.remove(testValue3);

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

	it('the end element should contain the 3rd value.', function () {
		expect(list.end.data).toBe(testValue2);
	});

	it('the start next pointer should point to the end element.', function () {
		expect(list.start.next).toBe(list.end);
	});

	it('the end next pointer should be null.', function () {
		expect(list.end.next).toBe(null);
	});
});
