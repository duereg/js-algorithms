const Hand = require('../../../../lib/algorithms/8-oop/blackjack/hand');
const BlackJacklHand = require('../../../../lib/algorithms/8-oop/blackjack/blackjackHand');
const BlackjackCard = require('../../../../lib/algorithms/8-oop/blackjack/blackjackCard');

describe('When test the concrete class black jack hand ', () => {
  let hand;
  beforeEach(() => {
    hand = new BlackJacklHand();
  });

  it('test if blackjackHand is instance of Hand ', () => {
    expect(hand).toEqual(jasmine.any(Hand));
  });

  it('the blackjackHand should be empty at the start', () => {
    expect(hand.numCards()).toEqual(0);
  });

  it('the blackjackHand shoul have a value and not busted and is not 21', () => {
    hand
        .addCard(new BlackjackCard().setSuit('Spades').setValue('Ace'))
        .addCard(new BlackjackCard().setSuit('Hearts').setValue('Two'));
    expect(hand.getHandValue()).toEqual(13);
    expect(hand.isBusted()).toEqual(false);
    expect(hand.is21()).toEqual(false);
  });

  it('the blackjackHand check is boosted', () => {
    hand
        .addCard(new BlackjackCard().setSuit('Spades').setValue('Ace'))
        .addCard(new BlackjackCard().setSuit('Hearts').setValue('Two'))
        .addCard(new BlackjackCard().setSuit('Hearts').setValue('Nine'));
    hand.getHandValue();
    expect(hand.isBusted()).toEqual(true);
  });

  it('the blackjackHand check is 21', () => {
    hand
        .addCard(new BlackjackCard().setSuit('Spades').setValue('Ace'))
        .addCard(new BlackjackCard().setSuit('Hearts').setValue('Jack'));
    hand.getHandValue();
    expect(hand.isBusted()).toEqual(false);
    expect(hand.is21()).toEqual(true);
  });

});
