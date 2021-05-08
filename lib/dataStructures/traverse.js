function traverse(text, node, seps, stringList, ret) {
  Object.values(node.transition).forEach((traNs) => {
    const [s, a, b] = traNs;
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
      cchild.start = `${stringList[position].length - suffix.length}`;
    }
    cchild = traverse(text, s, seps, stringList, cchild);
    ret.children.push(cchild);
  });

  return ret;
}
exports.traverse = traverse;
