// based off of implementation found here: https://github.com/jimmcgaw/suffixtree/blob/master/suffixtree.ts
/* eslint-disable no-underscore-dangle */

const Node = require('./suffixTreeNode');

function maxMatching(str, substr) {
  for (let i = substr.length - 1; i >= 0; i--) {
    const prefix = substr.slice(i, substr.length);
    if (str.startsWith(prefix)) {
      return prefix;
    }
  }

  return '';
}

function getNodeForSuffix(suffixNodeIndex, suffix) {
  let nodeForSuffix;

  if (suffixNodeIndex.index + 1 < suffix.length) {
    const newSuffix = suffix.slice(suffixNodeIndex.index, suffix.length);
    nodeForSuffix = new Node(newSuffix);
  } else {
    nodeForSuffix = new Node(suffix);
  }

  return nodeForSuffix;
}

export default class SuffixTree {
  constructor(inputString) {
    this.root = new Node(null, -1);
    this._build(inputString);
  }

  indexesOf(substring) {
    const nodeIndex = this._crawl(substring);
    if (nodeIndex.index === 0) {
      return [];
    }
    const leafNodes = nodeIndex.node.getAllIndexChildren();
    return leafNodes.map((node) => node.index).sort();
  }

  contains(substring) {
    return this.indexesOf(substring).length > 0;
  }

  // recursive method that traverses the tree until reaching lowest matching
  // suffix text node
  // eslint-disable-next-line no-underscore-dangle
  _crawl(substring, trackingIndex = 0, currentNode = this.root) {
    const matchingNodes = currentNode.getChildFor(substring.charAt(0));

    if (substring === "" || matchingNodes.length === 0) {
      return {
        node: currentNode,
        index: trackingIndex,
      };
    }

    const matchingNode = matchingNodes[0];
    const matching = maxMatching(substring, matchingNode.value);
    const newSubstring = substring.slice(matching.length, substring.length);
    return this._crawl(newSubstring, matching.length, matchingNode);
  }

  // construct the tree for all suffixes, from shortest to longest
  _build(inputString) {
    for (let i = inputString.length - 1; i >= 0; i--) {
      const currentSuffix = inputString.slice(i, inputString.length);
      this._addNodeForSuffix(currentSuffix, i);
    }
  }

  // eslint-disable-next-line no-underscore-dangle
  _addNodeForSuffix(suffix, index) {
    const suffixNodeIndex = this._crawl(suffix);

    const nodeForSuffix = getNodeForSuffix(suffixNodeIndex, suffix);
    nodeForSuffix.addChild(new Node(null, index));
    suffixNodeIndex.node.addChild(nodeForSuffix);
  }
}
