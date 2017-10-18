const Deck = require('../../../../lib/algorithms/8-oop/blackjack/deck');

describe('When deck should open new game', () => {
  let deck;
  beforeEach(() => {
    deck = new Deck();
  });

  it('at the beguining should have 52 sorted cards', () => {
    expect(deck.cardsLeft()).toEqual(52);
    const card1 = deck.getCard();
    const card2 = deck.getCard();
    expect(`${card1.toStr()} ${card2.toStr()}`).toEqual('[King, Diamonds] [Queen, Diamonds]');
    expect(deck.cardsLeft()).toEqual(50);
  });

  it('Shuffle maze and gave card, should be a random card', () => {
    deck.shuffle();
    const card1 = deck.getCard();
    const card2 = deck.getCard();
    expect(`${card1.toStr()} ${card2.toStr()}`).not.toEqual('[King, Diamonds] [Queen, Diamonds]');
    expect(deck.cardsLeft()).toEqual(50);
  });
});
