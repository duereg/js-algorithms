var addTwoLists = require("../../../lib/algorithms/2-linkedLists/addTwoLists.js");
var LinkedList = require("../../../lib/dataStructures/linkedList.js"); 

describe('When using addTwoLists() on two linked lists', function () {
	var oneTwoThree;
	var twoThreeFour; 
	var nineNineOne;
	var nineNineOneOne;
 
	beforeEach(function() {		
		oneTwoThree = new LinkedList();
		oneTwoThree.add(1); 
		oneTwoThree.add(2); 
		oneTwoThree.add(3);
 
		twoThreeFour = new LinkedList();
		twoThreeFour.add(2); 
		twoThreeFour.add(3); 
		twoThreeFour.add(4); 

		nineNineOne = new LinkedList();
		nineNineOne.add(9); 
		nineNineOne.add(9); 
		nineNineOne.add(1);

		nineNineOneOne = new LinkedList();
		nineNineOneOne.add(9); 
		nineNineOneOne.add(9); 
		nineNineOneOne.add(1);  
		nineNineOneOne.add(1);
	});

	it('given 1->2->3 and 2->3->4, 3->5->7 returned.', function () { 
		var result = addTwoLists(oneTwoThree.start, twoThreeFour.start);

		expect(result.data).toBe(3);
		result = result.next;
		expect(result.data).toBe(5);
		result = result.next;
		expect(result.data).toBe(7);
		result = result.next;
		expect(result.data).toBe(undefined);
	});
 
	it('given 9->9->1 and 2->3->4, 1->3->6 returned.', function () { 
		var result = addTwoLists(twoThreeFour.start, nineNineOne.start);

		//console.log(JSON.stringify(result));

		expect(result.data).toBe(1);
		result = result.next;
		expect(result.data).toBe(3);
		result = result.next;
		expect(result.data).toBe(6);
		result = result.next;
		expect(result.data).toBe(undefined);
	});
 
	it('given 9->9->1->1 and 2->3->4, 1->3->6->1 returned.', function () { 
		var result = addTwoLists(twoThreeFour.start, nineNineOneOne.start);

		//console.log(JSON.stringify(result));

		expect(result.data).toBe(1);
		result = result.next;
		expect(result.data).toBe(3);
		result = result.next;
		expect(result.data).toBe(6);
		result = result.next;
		expect(result.data).toBe(1);
		result = result.next;
		expect(result.data).toBe(undefined);
	});
});