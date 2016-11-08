const LinkedList = require('../../lib/dataStructures/linkedList.js');

describe('When adding one element to a linked list', () => {
  let list;
  const testValue = 'test_string';

  beforeEach(() => {
    list = new LinkedList();
    list.add(testValue);
  });

  afterEach(() => {
    list = null;
  });

  it('the lists length should increase by 1', () => {
    expect(list.length).toBe(1);
  });

  it('the start element should contain the added value.', () => {
    expect(list.start.data).toBe(testValue);
  });

  it('the end element should contain the added value.', () => {
    expect(list.end.data).toBe(testValue);
  });

  it('the start next pointer should be null.', () => {
    expect(list.start.next).toBe(null);
  });

  it('the end next pointer should be null.', () => {
    expect(list.end.next).toBe(null);
  });
});

describe('When the list contains one element and your remove it', () => {
  let list;
  const testValue = 'test_string';

  beforeEach(() => {
    list = new LinkedList();
    list.add(testValue);
    list.remove(testValue);
  });

  afterEach(() => {
    list = null;
  });

  it('the lists length should be zero', () => {
    expect(list.length).toBe(0);
  });

  it('the start element should be null', () => {
    expect(list.start).toBe(null);
  });

  it('the end element should be null', () => {
    expect(list.end).toBe(null);
  });
});
