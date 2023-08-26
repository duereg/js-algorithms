const Card = require('./blackjackCard');
const suites = require('./suites');
const cardValues = require('./cardValues');
const shuffle = require('../../1-strings/shuffle');

class Deck {
  constructor() {
    this.cards = new Set();
    this.fillDeck();
  }

  fillDeck() {
    suites.forEach((suit) => {
      cardValues.forEach((cardValue) => {
        this.cards.add(new Card().setSuit(suit).setValue(cardValue));
      });
    });
  }

  getCard() {
    const temp = [...this.cards];
    const card = temp.pop();
    this.cards = new Set(temp);
    return card;
  }

  cardsLeft() {
    return this.cards.size;
  }

  shuffle() {
    const shuffledCards = shuffle([...this.cards]);
    this.cards = new Set(shuffledCards);
  }
}

module.exports = Deck;
