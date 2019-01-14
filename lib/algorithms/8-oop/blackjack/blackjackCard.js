const Card = require('./card');
const cardValues = require('./cardValues');

class BlackJackCard extends Card {
  getValue() {
    if (!cardValues.has(this.value)) {
      throw new Error('Card has invalid value');
    }
    if (this.value === 'Ace') {
      return 11;
    }
    if (this.isFaceCard()) {
      return 10;
    }
    return cardValues.get(this.value);
  }
}

module.exports = BlackJackCard;
