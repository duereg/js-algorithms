const Hand = require('../../../../lib/algorithms/8-oop/blackjack/hand');
const Card = require('../../../../lib/algorithms/8-oop/blackjack/card');

describe('When test the abstract class hand ', () => {
  let hand;
  beforeEach(() => {
    hand = new Hand();
  });

  it('the hand should be empty at the start', () => {
    expect(hand.numCards()).toBe(0);
  });

  it('the card setted should have values and a faced card', () => {
    hand.addCard(new Card().setSuit('Spades').setValue('Ace'));
    expect(hand.numCards()).toBe(1);
  });


  it('Do chainining with addCard', () => {
    hand
      .addCard(new Card().setSuit('Spades').setValue('Ace'))
      .addCard(new Card().setSuit('Spades').setValue('Two'));
    expect(hand.numCards()).toBe(2);
  });
});
