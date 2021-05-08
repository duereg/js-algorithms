// based off of implementation found here: https://github.com/jimmcgaw/suffixtree/blob/master/suffixtree.ts

class Node {
  constructor() {
    this.children = [];
  }

  addChild(node) {
    this.children.push(node);
  }

  // given a substring, get child nodes with value
  getChildFor(character) {
    return this.getSuffixChildren().filter((node) => node.value.startsWith(character));
  }

  // get all immediate child suffix node
  getSuffixChildren() {
    return this.children.filter((node) => Boolean(node.value));
  }

  // get all immediate child index nodes
  getIndexChildren() {
    return this.children.filter((node) => !node.value);
  }

  // BFS to get all leaf nodes under node
  getAllIndexChildren() {
    let suffixChildrenToCheck = [];
    suffixChildrenToCheck.push(this);

    let allIndexChildren = [];

    while (suffixChildrenToCheck.length > 0) {
      const node = suffixChildrenToCheck[0];
      allIndexChildren = allIndexChildren.concat(node.getIndexChildren());
      suffixChildrenToCheck = suffixChildrenToCheck.concat(
        node.getSuffixChildren(),
      );
      suffixChildrenToCheck.shift();
    }
    return allIndexChildren;
  }
}
module.exports = Node;
