const Hand = require('../../../../lib/algorithms/8-oop/blackjack/hand');
const Card = require('../../../../lib/algorithms/8-oop/blackjack/card');

describe('::Hand', () => {
  let hand;

  beforeEach(() => {
    hand = new Hand();
  });

  it('the hand should be empty at the start', () => {
    expect(hand.numCards()).toBe(0);
  });

  describe('when you add a card', () => {
    beforeEach(() => {
      hand.addCard(new Card().setSuit('Spades').setValue('Ace'));
    });

    it('the hand should contain 1 card', () => {
      expect(hand.numCards()).toBe(1);
    });
  });

  describe('when you add two cards', () => {
    beforeEach(() => {
      hand
        .addCard(new Card().setSuit('Spades').setValue('Ace'))
        .addCard(new Card().setSuit('Spades').setValue('Two'));
    });

    it('the hand should contain 2 cards', () => {
      expect(hand.numCards()).toBe(2);
    });
  });
});
