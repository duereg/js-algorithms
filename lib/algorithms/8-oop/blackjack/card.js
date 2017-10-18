
class Card {
  constructor() {
    this.suit = null;
    this.value = null;
  }

  setSuit(suit) {
    this.suit = suit;
    return (this);
  }

  setValue(value) {
    this.value = value;
    return (this);
  }
  isFaceCard() {
    return (this.value === 'Jack') || (this.value === 'Queen') || (this.value === 'King');
  }
  toStr() {
    return `[${this.value}, ${this.suit}]`;
  }


}

module.exports = Card;
