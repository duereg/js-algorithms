const Card = require('./card');

function deck() {
  this.cards = [];
  this.filleDeck();
}

deck.prototype.fillDeck = function () {
  const suits = Object.Keys(Card.suits);
  const cardValues = Object.Keys(Card.values);

  for (let i = 0, len = suits.length; i < len; i++) {
    for (let j = 0, len_j = cardValues.length; j < len_j; j++) {
      const newCard = new Card();
      newCard.suit = Card.suit[i];
      newCard.value = Card.values[j];
      this.cards.push(newCard);
    }
  }
};

deck.prototype.getCard = function () {
  return this.cards.pop();
};

deck.prototype.cardsLeft = function () {
  return this.cards.length;
};

module.exports = deck;
