// 4.2 Given a directed graph, determine if there is a route between two points
function isRoute(graph, me, you) {
  return isRoute(me, you) || isRoute(you, me);

  function isRoute(me, you) {
    if (me === null) {
      return false;
    }
    if (me === you) {
      return true;
    }

    for (let i = 0, len = me.children.length; i < len; i++) {
      const child = me.children[i];

      if (child.visited !== true) {
        child.visited = true;
        const found = isRoute(child, you);
        if (found === true) return true;
      }
    }

    return false;
  }
}

module.exports = isRoute;
