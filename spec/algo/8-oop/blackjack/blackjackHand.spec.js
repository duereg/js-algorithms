const Hand = require('../../../../lib/algorithms/8-oop/blackjack/hand');
const BlackJackHand = require('../../../../lib/algorithms/8-oop/blackjack/blackjackHand');
const BlackjackCard = require('../../../../lib/algorithms/8-oop/blackjack/blackjackCard');

describe('::BlackJackHand', () => {
  let hand;

  describe('an empty hand', () => {
    beforeEach(() => {
      hand = new BlackJackHand();
    });

    it('is instance of Hand ', () => {
      expect(hand instanceof Hand).toBeTruthy();
    });

    it('is empty at instantiation', () => {
      expect(hand.numCards()).toEqual(0);
    });
  });

  describe('when playing a hard containing an Ace and a Two', () => {
    beforeEach(() => {
      hand = new BlackJackHand();
      hand
        .addCard(new BlackjackCard().setSuit('Spades').setValue('Ace'))
        .addCard(new BlackjackCard().setSuit('Hearts').setValue('Two'));
    });

    it('should hold the correct value', () => {
      expect(hand.getHandValue()).toEqual(13);
    });

    it('should not be busted', () => {
      expect(hand.isBusted()).toEqual(false);
    });

    it('is not 21', () => {
      expect(hand.is21()).toEqual(false);
    });

    describe('adding three cards which creates a total value over 21', () => {
      beforeEach(() => {
        hand
          .addCard(new BlackjackCard().setSuit('Spades').setValue('Ace'))
          .addCard(new BlackjackCard().setSuit('Hearts').setValue('Two'))
          .addCard(new BlackjackCard().setSuit('Hearts').setValue('Nine'));
      });

      it('the hand is busted', () => {
        expect(hand.isBusted()).toEqual(true);
      });
    });
  });

  describe('holding a face card and an ace', () => {
    beforeEach(() => {
      hand = new BlackJackHand();
      hand
        .addCard(new BlackjackCard().setSuit('Spades').setValue('Ace'))
        .addCard(new BlackjackCard().setSuit('Hearts').setValue('Jack'));
    });

    it('is not busted', () => {
      expect(hand.isBusted()).toEqual(false);
    });

    it('is 21', () => {
      expect(hand.is21()).toEqual(true);
    });
  });
});
