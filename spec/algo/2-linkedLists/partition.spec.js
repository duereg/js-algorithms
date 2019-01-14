const partition = require('../../../lib/algorithms/2-linkedLists/partition');
const LinkedList = require('../../../lib/dataStructures/linkedList');

const TEN = 10;

describe('When using partition(10) on a linked list of integers', () => {
  let list;

  beforeEach(() => {
    list = new LinkedList();
    list.add(1);
    list.add(2);
    list.add(10);
    list.add(3);
    list.add(40);
    list.add(4);
    list.add(14);
    list.add(5);
    list.add(16);
    list.add(6);
    list.add(69);
  });

  it(`all the numbers under ${TEN} will be before numbers greater than ${TEN}`, () => {
    let result = partition(list.start, TEN);
    let lessThanX = 0;

    while (result != null) {
      if (lessThanX < 6) {
        expect(result.data).toBeLessThan(TEN);
      } else if (lessThanX === 6) {
        expect(result.data).toEqual(TEN);
      } else {
        expect(result.data).toBeGreaterThan(TEN);
      }

      lessThanX++;
      result = result.next;
    }
  });
});
