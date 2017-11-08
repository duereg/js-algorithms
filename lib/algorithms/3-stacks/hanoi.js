// 3.3? Solve the tower of hanoi problem
module.exports = function towerOfHanoi(source, helper, target) {
  const localSource = source;
  const localHelper = helper;
  const localTarget = target;

  localSource.name = 'source';
  localHelper.name = 'helper';
  localTarget.name = 'target';

  function moveDisks(n, innerSource, innerHelper, innerTarget) {
    if (n <= 0) { return; }

    moveDisks(n - 1, innerSource, innerTarget, innerHelper);
    innerTarget.push(innerSource.pop());
    moveDisks(n - 1, innerHelper, innerSource, innerTarget);
  };

  moveDisks(localSource.length, localSource, localHelper, localTarget);
};
