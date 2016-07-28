const LinkedList = require("../../lib/dataStructures/linkedList.js");

const testValue1 = "test_string1"
const testValue2 = "test_string2"

describe('When adding two elements to a linked list', function () {
  let list;

  beforeEach(function () {
    list = new LinkedList();
    list.add(testValue1);
    list.add(testValue2);
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
    expect(list.start.next.data).toBe(testValue2);
  });

  it('the end next pointer should be null.', function () {
    expect(list.end.next).toBe(null);
  });

  describe('then removing the 1st element', function () {
    beforeEach(function () {
      list.remove(testValue1);
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

  describe('then removing the 2nd element', function () {
    beforeEach(function () {
      list.remove(testValue2);
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
});
