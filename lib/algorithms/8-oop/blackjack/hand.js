class Hand {
  constructor() {
    this.cards = new Set();
    this.handValue = 0;
  }

  numCards() {
    return this.cards.size;
  }

  addCard(card) {
    this.cards.add(card);
    this.handValue += card.getValue();
    return (this);
  }
}

module.exports = Hand;
