const Deck = require('../../../../lib/algorithms/8-oop/blackjack/deck');

describe('When deck should open new game', () => {
  let deck;

  beforeEach(() => {
    deck = new Deck();
  });

  it('a new deck should have 52 cards', () => {
    expect(deck.cardsLeft()).toEqual(52);
  });

  describe('removing two cards', () => {
    beforeEach(() => {
      deck.getCard();
      deck.getCard();
    });

    it('leaves the deck with 50 cards', () => {
      expect(deck.cardsLeft()).toEqual(50);
    });

    describe('shuffling the deck', () => {
      beforeEach(() => {
        deck.shuffle();
      });

      it('leaves the deck with 50 cards', () => {
        expect(deck.cardsLeft()).toEqual(50);
      });
    });
  });
});
