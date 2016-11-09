const hand = require('./hand');
const blackJackCard = require('./blackjackCard');

function blackJackHand() {
  this.minCardValue = blackJackCard.prototype.minValue;
  this.maxCardValue = blackJackCard.prototype.maxValue;
}

blackJackHand.prototype = new hand();

blackJackHand.prototype.getValue = function (getCardValue) {
  let handValue = 0;

  if (this.cards.length !== 0) {
    for (let i = 0, len = this.cards.length; i < len; i++) {
      handValue = this.cards[i].call(getCardValue);
    }
  }

  return handValue;
};

blackJackHand.prototype.getMinValue = function () {
  return this.getValue(this.minCardValue);
};

blackJackHand.prototype.getMaxValue = function () {
  return this.getValue(this.minCardValue);
};

blackJackHand.prototype.isBusted = function () {
  return this.getMaxValue() > 21;
};

blackJackHand.prototype.is21 = function () {
  return this.getMaxValue() === 21;
};

module.exports = blackJackHand;
