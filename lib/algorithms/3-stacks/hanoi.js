//3.3? Solve the tower of hanoi problem

module.exports = function(source, helper, target) {

    source.name = "source";
    helper.name = "helper";
    target.name = "target";

    function hanoi(source, helper, target) {

        while (source.length > 0) {
            console.log(source.name + ":" + (source.peek() || 0) + " " + helper.name + ":" + (helper.peek() || 0) + " " + target.name + ":" + (target.peek() || 0));
            
            var sourceItem = source.peek();
            var targetItem = target.peek();

            if((targetItem === null) || (sourceItem < targetItem)) {                
                target.push(source.pop());
            } 
            else {
                hanoi(target, source, helper);
                target.push(source.pop());
                hanoi(helper, source, target);
            }
        }
    }

    hanoi(source, helper, target);
}