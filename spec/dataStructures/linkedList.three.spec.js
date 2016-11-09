const LinkedList = require('../../lib/dataStructures/linkedList');

const testValue1 = 'test_string1';
const testValue2 = 'test_string2';
const testValue3 = 'test_string3';

let list;

describe('When adding three elements to a linked list', () => {
  beforeEach(() => {
    list = new LinkedList();
    list.add(testValue1);
    list.add(testValue2);
    list.add(testValue3);
  });

  it('the lists length should be 3', () => {
    expect(list.length).toBe(3);
  });

  it('the start element should contain the 1st value.', () => {
    expect(list.start.data).toBe(testValue1);
  });

  it('the end element should contain the 3rd value.', () => {
    expect(list.end.data).toBe(testValue3);
  });

  it('the start next pointer should be point to the 2nd value node.', () => {
    expect(list.start.next.data).toBe(testValue2);
  });

  it('the end next pointer should be null.', () => {
    expect(list.end.next).toBe(null);
  });

  describe('then removing the 1st element', () => {
    beforeEach(() => {
      list.remove(testValue1);
    });

    it('the lists length should be 2', () => {
      expect(list.length).toBe(2);
    });

    it('the start element should contain the 2nd value.', () => {
      expect(list.start.data).toBe(testValue2);
    });

    it('the end element should contain the 3rd value.', () => {
      expect(list.end.data).toBe(testValue3);
    });

    it('the start next pointer should point to the end element.', () => {
      expect(list.start.next).toBe(list.end);
    });

    it('the end next pointer should be null.', () => {
      expect(list.end.next).toBe(null);
    });
  });

  describe('then removing the 2nd element', () => {
    beforeEach(() => {
      list.remove(testValue2);
    });

    it('the lists length should be 2', () => {
      expect(list.length).toBe(2);
    });

    it('the start element should contain the 1st value.', () => {
      expect(list.start.data).toBe(testValue1);
    });

    it('the end element should contain the 3rd value.', () => {
      expect(list.end.data).toBe(testValue3);
    });

    it('the start next pointer should point to the end element.', () => {
      expect(list.start.next).toBe(list.end);
    });

    it('the end next pointer should be null.', () => {
      expect(list.end.next).toBe(null);
    });
  });

  describe('then removing the 3rd element', () => {
    beforeEach(() => {
      list.remove(testValue3);
    });

    it('the lists length should be 2', () => {
      expect(list.length).toBe(2);
    });

    it('the start element should contain the 1st value.', () => {
      expect(list.start.data).toBe(testValue1);
    });

    it('the end element should contain the 3rd value.', () => {
      expect(list.end.data).toBe(testValue2);
    });

    it('the start next pointer should point to the end element.', () => {
      expect(list.start.next).toBe(list.end);
    });

    it('the end next pointer should be null.', () => {
      expect(list.end.next).toBe(null);
    });
  });
});
