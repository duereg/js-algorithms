// 1.5) Implement Basic string compression using # of repeated chars.
//     If compressed string is longer than original, use original.
function compress(toCompress) {
  const result = [];
  let current = '^';
  let numSame = 0;
  let index = -1; // index of entry in result

  function writeNum() {
    const count = numSame.toString();
    const countSize = count.length;

    if ((index + countSize + 1) > toCompress.length) {
      return false;
    }

    for (let i = 0; i < countSize; i++) {
      result[index + i] = count[i];
    }
    return true;
  }

  for (let j = 0; j < toCompress.length; j++) {
    const letter = toCompress[j];

    if (letter !== current) {
      index = index + numSame.toString().length;

      // reset numSame
      numSame = 1;
      result[index] = letter;
      index++;
      current = letter;
    } else {
      numSame++;
    }

    if (!writeNum()) {
      return toCompress;
    }
  }

  return result.join('');
}

module.exports = compress;
