function node(data) {
  this.next = null;
  this.data = data;
};

function linkedList() {
  this.start = null;
  this.end = null;
  this.length = 0;
};

linkedList.prototype.add = function (data) {
  if (data === undefined) {
    throw new Error('data must be valid to add');
  }

  const newNode = new node(data);

  if (this.start === null) {
    this.start = newNode;
  } else {
    this.end.next = newNode;
  }

  this.length++;
  this.end = newNode;
};

linkedList.prototype.remove = function (data) {
  if (data === undefined) {
    throw new Error('data must be valid to add');
  }
  if (this.start === null) {
    return;
  }

  let previous = null;
  let current = this.start;

  while ((current !== null) && (current.data !== data)) {
    previous = current;
    current = current.next;
  }

  if (current !== null) {
    if (previous === null) {
      this.start = this.start.next;
    }
    if (current.next === null) {
      this.end = previous;
      if (this.end !== null) {
        this.end.next = null;
      }
    }
    if ((previous !== null) && (current.next !== null)) {
      previous.next = current.next;
    }
    this.length--;
  }
};

module.exports = linkedList;
