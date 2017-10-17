const Card = require('./card');

class BlackJackCard extends Card {
  minValue() {
    if (this.isFaceCard()) {
      return 10;
    }
    return this.value;
  }
  maxValue() {
    if (this.value === this.values.get('Ace')) {
      return 11;
    }
    return this.minValue();
  }

}

module.exports = BlackJackCard;
