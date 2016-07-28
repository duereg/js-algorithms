const maxHeap = require("../../lib/dataStructures/maxHeap.js");
const heapValidator = require("./binaryHeap.Validator.js");

describe('When adding ten elements to the max heap via constructor', function () {
  let array, list;

  beforeEach(function () {
    array = []
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

    list = new maxHeap(array);
  });

  it('the maxHeap length should by 10', function () {
    expect(list.array.length).toBe(10);
  });

  it('the 1st element of the maxHeap should be the largest value of the ten.', function () {
    expect(list.array[0]).toBe(100);
  });

  it('and you remove the head, it should be the largest element.', function () {
    expect(list.removeHead()).toBe(100);
  });

  it('and you remove the head twice, you should get the two largest elements.', function () {
    expect(list.removeHead()).toBe(100);
    expect(list.removeHead()).toBe(90);
  });

  it('the max heap is valid', function () {
    let validator = new heapValidator(list);
    expect(validator.isValid()).toBe(true);
  });

  //todo: add check to actually walk tree and check all relationships
});
