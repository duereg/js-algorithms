const BlackjackCard = require('../../../../lib/algorithms/8-oop/blackjack/blackjackCard');
const Card = require('../../../../lib/algorithms/8-oop/blackjack/card');

describe('When test a card ', () => {
  let card;
  beforeEach(() => {
    card = new BlackjackCard();
  });

  it('test if blackjackCard is instance of Card ', () => {
    expect(card).toEqual(jasmine.any(Card));
  });

  it('should inherit values of Card ', () => {
    expect(card.suit).toBeNull();
    expect(card.value).toBeNull();
  });

  it('test 10 point for faced cards', () => {
    card.setSuit('Spades').setValue('Jack');
    expect(card.getValue()).toEqual(10);
  });

  it('test a eleven point for Ace', () => {
    card.setSuit('Spades').setValue('Ace');
    expect(card.getValue()).toEqual(11);
  });
});
