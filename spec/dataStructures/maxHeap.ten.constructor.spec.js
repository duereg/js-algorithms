const MaxHeap = require('../../lib/dataStructures/maxHeap');
const HeapValidator = require('./binaryHeap.Validator');

describe('When adding ten elements to the max heap via constructor', () => {
  let array,
    list;

  beforeEach(() => {
    array = [];
    array.push(20);
    array.push(10);
    array.push(100);
    array.push(30);
    array.push(-10);
    array.push(90);
    array.push(70);
    array.push(40);
    array.push(50);
    array.push(60);

    list = new MaxHeap(array);
  });

  it('the maxHeap length should by 10', () => {
    expect(list.array.length).toBe(10);
  });

  it('the 1st element of the maxHeap should be the largest value of the ten.', () => {
    expect(list.array[0]).toBe(100);
  });

  it('and you remove the head, it should be the largest element.', () => {
    expect(list.removeHead()).toBe(100);
  });

  it('and you remove the head twice, you should get the two largest elements.', () => {
    expect(list.removeHead()).toBe(100);
    expect(list.removeHead()).toBe(90);
  });

  it('the max heap is valid', () => {
    const validator = new HeapValidator(list);
    expect(validator.isValid()).toBe(true);
  });

  // todo: add check to actually walk tree and check all relationships
});
