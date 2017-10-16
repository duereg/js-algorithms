// 3.3? Solve the tower of hanoi problem
module.exports = function towerOfHanoi(source, helper, target) {
  const localsource = source;
  const localhelper = helper;
  const localtarget = target;

  localsource.name = 'source';
  localhelper.name = 'helper';
  localtarget.name = 'target';

  const moveDisks = (n, innersource, innerhelper, innertarget) => {
    if (n <= 0) {
      return;
    }
    moveDisks(n - 1, innersource, innertarget, innerhelper);
    innertarget.push(innersource.pop());
    moveDisks(n - 1, innerhelper, innersource, innertarget);
  };

  moveDisks(localsource.length, localsource, localhelper, localtarget);
};
