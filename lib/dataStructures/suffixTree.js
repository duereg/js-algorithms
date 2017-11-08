// This implementation is adapted from the one here the snippets provided here
// http://www.allisons.org/ll/AlgDS/Tree/Suffix/
// This implementation stolen from https://github.com/maclandrol/SuffixTreeJS

class Node {
  constructor() {
    this.transition = {};
    this.suffixLink = null;
  }
  addTransition(node, start, end, t) {
    this.transition[t] = [node, start, end];
  }
  isLeaf() {
    return Object.keys(this.transition).length === 0;
  }
}

function traverse(node, seps, str_list, ret) {
  for (const t in node.transition) {
    const traNs = node.transition[t];
    let [s, a, b] = traNs;
    let name = text.substring(a, b + 1);
    let position = seps.length - 1;
    for (let pos = name.length - 1; pos > -1; pos--) {
      const insep = seps.indexOf(name[pos]);
      position = insep > -1 ? insep : position;
    }

    const names = name.split(seps[position]);
    if (names.length > 1) {
      name = names[0] + seps[position];
    }
    const suffix = ret.suffix + name;
    let cchild = {
      name,
      parent: ret.name,
      suffix,
      children: [],
    };
    if (s.isLeaf()) {
      cchild.seq = position + 1;
      cchild.start = `${str_list[position].length - suffix.length}`;
    }
    cchild = traverse(s, seps, str_list, cchild);
    ret.children.push(cchild);
  }

  return ret;
}

class SuffixTree {
  constructor() {
    this.text = '';
    this.str_list = [];
    this.seps = [];
    this.root = new Node();
    this.bottom = new Node();
    this.root.suffixLink = this.bottom;
    this.s = this.root;
    this.k = 0;
    this.i = -1;
  }

  addString(str) {
    const temp = this.text.length;
    this.text += str;
    this.seps.push(str[str.length - 1]);
    this.str_list.push(str);
    let s, k, i;
    s = this.s;
    k = this.k;
    i = this.i;

    for (let j = temp; j < this.text.length; j++) {
      this.bottom.addTransition(this.root, j, j, this.text[j]);
    }

    while (this.text[i + 1]) {
      i++;
      let up = this.update(s, k, i);
      up = this.canonize(up[0], up[1], i);
      s = up[0];
      k = up[1];
    }

    this.s = s;
    this.k = k;
    this.i = i;
    return this;
  }

  update(s, k, i) {
    let oldr = this.root;
    let endAndr = this.testAndSplit(s, k, i - 1, this.text[i]);
    var endPoint = endAndr[0]; var r = endAndr[1];

    while (!endPoint) {
      r.addTransition(new Node(), i, Infinity, this.text[i]);

      if (oldr != this.root) {
        oldr.suffixLink = r;
      }

      oldr = r;
      const sAndk = this.canonize(s.suffixLink, k, i - 1);
      s = sAndk[0];
      k = sAndk[1];
      endAndr = this.testAndSplit(s, k, i - 1, this.text[i]);
      var endPoint = endAndr[0]; var r = endAndr[1];
    }

    if (oldr != this.root) {
      oldr.suffixLink = s;
    }

    return [s, k];
  }

  testAndSplit(s, k, p, t) {
    if (k <= p) {
      const traNs = s.transition[this.text[k]];
      let s2 = traNs[0],
        k2 = traNs[1],
        p2 = traNs[2];
      if (t == this.text[k2 + p - k + 1]) {
        return [true, s];
      } else {
        const r = new Node();
        s.addTransition(r, k2, k2 + p - k, this.text[k2]);
        r.addTransition(s2, k2 + p - k + 1, p2, this.text[k2 + p - k + 1]);
        return [false, r];
      }
    } else if (!s.transition[t]) {
      return [false, s];
    } else {
      return [true, s];
    }
  }

  canonize(s, k, p) {
    if (p < k) {
      return [s, k];
    } else {
      var traNs = s.transition[this.text[k]];
      let s2 = traNs[0],
        k2 = traNs[1],
        p2 = traNs[2];

      while (p2 - k2 <= p - k) {
        k = k + p2 - k2 + 1;
        s = s2;

        if (k <= p) {
          var traNs = s.transition[this.text[k]];
          s2 = traNs[0]; k2 = traNs[1]; p2 = traNs[2];
        }
      }

      return [s, k];
    }
  }

  toJson() {
    // convert tree to json to use with d3js

    const text = this.text;
    const ret = {
      name: '',
      parent: 'null',
      suffix: '',
      children: [],
    };

    return traverse(this.root, this.seps, this.str_list, ret);
  }
}

module.exports = SuffixTree;
