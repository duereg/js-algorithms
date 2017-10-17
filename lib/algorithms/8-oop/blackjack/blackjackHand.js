const Hand = require('./hand');
const BlackJackCard = require('./blackjackCard');

class BlackJackHand extends Hand {
  constructor() {
    super();
    this.minCardValue = BlackJackCard.prototype.minValue;
    this.maxCardValue = BlackJackCard.prototype.maxValue;
  }
  getValue(callBackCard) {
    let handValue = 0;
    for (const item of this.cards.values()) {
      handValue = item.call(callBackCard);
    }
    return handValue;
  }

  getMinValue() {
    return this.getValue(this.minCardValue);
  }

  getMaxValue() {
    return this.getValue(this.minCardValue);
  }

  isBusted() {
    return this.getMaxValue() > 21;
  }

  is21() {
    return this.getMaxValue() === 21;
  }

}

module.exports = BlackJackHand;
