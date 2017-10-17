const Card = require('./card');
const suites = require('./suites');
const cardValues = require('./cardValues');

class Deck {
  constructor() {
    this.cards = new Set();
    this.fillDeck();
  }
  fillDeck() {
    for (const suit of suites.values()) {
      for (const cardValue of cardValues.values()) {
        this.cards.add(new Card().setSuit(suit).setValue(cardValue));
      }
    }
  }

  getCard() {
    return this.cards.pop();
  }
  cardsLeft() {
    return this.cards.size;
  }
}

module.exports = Deck;
