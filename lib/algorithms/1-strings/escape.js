// 1.4) Write a method to replace all spaces with '%20'.
function escape(sentence) {
  if (typeof sentence !== 'string') { throw new Error('The given sentence is not a string'); }

  let padding = 0;
  let i = 0;

  const { length } = sentence;
  const sentencePieces = sentence.split('');

  for (i = length - 1; i >= 0 && sentencePieces[i] === ' '; i--) {
    padding++;
  }

  for (i = length - padding - 1; i >= 0; i--) {
    if (sentencePieces[i] !== ' ') {
      sentencePieces[i + padding] = sentencePieces[i];
    } else {
      sentencePieces[i + padding - 2] = '%';
      sentencePieces[i + padding - 1] = '2';
      sentencePieces[i + padding] = '0';
      padding -= 2;
    }
  }

  return sentencePieces.join('');
}

module.exports = escape;
