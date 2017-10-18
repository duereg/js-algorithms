const Card = require('./blackjackCard');
const suites = require('./suites');
const cardValues = require('./cardValues');

class Deck {
  constructor() {
    this.cards = new Set();
    this.fillDeck();
  }
  fillDeck() {
    for (const suit of suites.values()) {
      for (const cardValue of cardValues.keys()) {
        this.cards.add(new Card().setSuit(suit).setValue(cardValue));
      }
    }
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
    let m = this.cards.size;
    let t = 0;
    let i = 0;
    const suffleCards = Array.from(this.cards);
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = suffleCards[m];
      suffleCards[m] = suffleCards[i];
      suffleCards[i] = t;
    }
    this.cards = new Set(suffleCards);
  }
}

module.exports = Deck;
