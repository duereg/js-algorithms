// Code stolen from http://bost.ocks.org/mike/shuffle/
// Was looking for a good example of a Fisher–Yates shuffle
function shuffle(array) {
  let currentPositionInArray = array.length;
  let itemToShuffle;
  let newPositionInArray;
  const shuffleArray = array;
  // While there remain elements to shuffle…
  while (currentPositionInArray) {
    // Pick a remaining element, decrementing the current position
    newPositionInArray = Math.floor(Math.random() * currentPositionInArray--);

    // Swap it with the current element.
    itemToShuffle = shuffleArray[currentPositionInArray];
    shuffleArray[currentPositionInArray] = shuffleArray[newPositionInArray];
    shuffleArray[newPositionInArray] = itemToShuffle;
  }

  // return the original array, which has been mutated by this call
  return array;
}

module.exports = shuffle;
