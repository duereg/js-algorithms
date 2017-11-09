const addTwoLists = require('../../../lib/algorithms/2-linkedLists/addTwoLists');
const LinkedList = require('../../../lib/dataStructures/linkedList');

describe('When using addTwoLists() on two linked lists', () => {
  let oneTwoThree,
    twoThreeFour,
    nineNineOne,
    nineNineOneOne,
    nineNineNine,
    one;

  beforeEach(() => {
    oneTwoThree = new LinkedList();
    oneTwoThree.add(1).add(2).add(3);

    twoThreeFour = new LinkedList();
    twoThreeFour.add(2).add(3).add(4);

    nineNineOne = new LinkedList();
    nineNineOne.add(9).add(9).add(1);

    nineNineOneOne = new LinkedList();
    nineNineOneOne.add(9).add(9).add(1).add(1);

    nineNineNine = new LinkedList();
    nineNineNine.add(9).add(9).add(9);

    one = new LinkedList();
    one.add(1);
  });

  it('given 1->2->3 and 2->3->4, 3->5->7 returned.', () => {
    let result = addTwoLists(oneTwoThree.start, twoThreeFour.start);

    expect(result.data).toBe(3);
    result = result.next;
    expect(result.data).toBe(5);
    result = result.next;
    expect(result.data).toBe(7);
    result = result.next;
    expect(result.data).toBe(undefined);
  });

  it('given 9->9->1 and 2->3->4, 1->3->6 returned.', () => {
    let result = addTwoLists(twoThreeFour.start, nineNineOne.start);

    expect(result.data).toBe(1);
    result = result.next;
    expect(result.data).toBe(3);
    result = result.next;
    expect(result.data).toBe(6);
    result = result.next;
    expect(result.data).toBe(undefined);
  });

  it('given 9->9->1->1 and 2->3->4, 1->3->6->1 returned.', () => {
    let result = addTwoLists(twoThreeFour.start, nineNineOneOne.start);

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

  it('given 9->9->9 and 1, 0->0->0->1 returned.', () => {
    let result = addTwoLists(nineNineNine.start, one.start);

    expect(result.data).toBe(0);
    result = result.next;
    expect(result.data).toBe(0);
    result = result.next;
    expect(result.data).toBe(0);
    result = result.next;
    expect(result.data).toBe(1);
    result = result.next;
    expect(result.data).toBe(undefined);
  });
});
