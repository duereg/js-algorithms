// Code stolen from http://bost.ocks.org/mike/shuffle/
// Was looking for a good example of a Fisher–Yates shuffle
function shuffle(array) {
  let m = array.length;
  let t;
  let i;
  const shuffleArray = array;
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = shuffleArray[m];
    shuffleArray[m] = shuffleArray[i];
    shuffleArray[i] = t;
  }

  return array;
}

module.exports = shuffle;
