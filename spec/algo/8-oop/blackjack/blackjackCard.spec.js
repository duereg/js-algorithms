const BlackjackCard = require('../../../../lib/algorithms/8-oop/blackjack/blackjackCard');

describe('::BlackjackCard', () => {
  let card;

  beforeEach(() => {
    card = new BlackjackCard();
  });

  it('test if blackjackCard is instance of Card ', () => {
    expect(card instanceof BlackjackCard).toBeTruthy();
  });

  it('should inherit values of Card ', () => {
    expect(card.suit).toBeNull();
    expect(card.value).toBeNull();
  });

  describe('a face card', () => {
    beforeEach(() => {
      card.setSuit('Spades').setValue('Jack');
    });

    it('is worth 10 points', () => {
      expect(card.getValue()).toEqual(10);
    });
  });

  describe('an Ace', () => {
    beforeEach(() => {
      card.setSuit('Spades').setValue('Ace');
    });

    it('is worth 11 points', () => {
      expect(card.getValue()).toEqual(11);
    });
  });
});
