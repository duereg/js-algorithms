const MinHeap = require('../../lib/dataStructures/minHeap');
const HeapValidator = require('./binaryHeap.Validator');

describe('When adding ten elements to the min heap', () => {
  let list;

  beforeEach(() => {
    list = new MinHeap();
    list.add(20);
    list.add(10);
    list.add(100);
    list.add(30);
    list.add(-10);
    list.add(90);
    list.add(70);
    list.add(40);
    list.add(50);
    list.add(60);
  });

  it('the minHeap length should by 10', () => {
    expect(list.array.length).toBe(10);
  });

  it('the 1st element of the minHeap should be the smallest value of the ten.', () => {
    expect(list.array[0]).toBe(-10);
  });

  it('and you remove the head, it should be the smallest element.', () => {
    expect(list.removeHead()).toBe(-10);
  });

  it('and you remove the head twice, you should get the two smallest elements.', () => {
    expect(list.removeHead()).toBe(-10);
    expect(list.removeHead()).toBe(10);
  });

  it('the min heap is valid', () => {
    const validator = new HeapValidator(list);
    expect(validator.isValid()).toBe(true);
  });

  // todo: add check to actually walk tree and check all relationships
});
