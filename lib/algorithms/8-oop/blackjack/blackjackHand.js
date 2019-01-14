const Hand = require('./hand');

class BlackJackHand extends Hand {
  getHandValue() {
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
