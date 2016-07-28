// Code stolen from http://bost.ocks.org/mike/shuffle/
// Was looking for a good example of a Fisher–Yates shuffle
function shuffle(array) {
  let m = array.length,
    t, i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
};

module.exports = shuffle;
