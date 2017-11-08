class Hand {
  constructor() {
    this.cards = new Set();
  }
  numCards() {
    return this.cards.size;
  }
  addCard(card) {
    this.cards.add(card);
    return (this);
  }

}

module.exports = Hand;
