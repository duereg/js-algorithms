const Hand = require('./hand');

class BlackJackHand extends Hand {

  constructor() {
    super();
    this.handValue = 0;
  }

  getHandValue() {
    this.handValue = 0;
    for (const item of this.cards.values()) {
      this.handValue += item.getValue();
    }
    return this.handValue;
  }

  isBusted() {
    return this.handValue > 21;
  }

  is21() {
    return this.handValue === 21;
  }

}

module.exports = BlackJackHand;
