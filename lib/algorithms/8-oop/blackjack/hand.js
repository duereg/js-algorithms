class Hand {
  constructor() {
    this.cards = new Set();
  }
  numCards() {
    return this.cards.size;
  }
  addCard(card) {
    this.cards.add(card);
  }

}

module.exports = Hand;
