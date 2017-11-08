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
    if (this.handValue === 0) {
      throw new Error('Should get some card at hand first');
    }
    return this.handValue > 21;
  }

  is21() {
    if (this.handValue === 0) {
      throw new Error('Should get some card at hand first');
    }
    return this.handValue === 21;
  }

}

module.exports = BlackJackHand;
