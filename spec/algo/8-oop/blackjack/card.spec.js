const Card = require('../../../../lib/algorithms/8-oop/blackjack/card');
const suites = require('../../../../lib/algorithms/8-oop/blackjack/suites');
const cards = require('../../../../lib/algorithms/8-oop/blackjack/cardValues');

describe('When test a card ', () => {
  let card;
  beforeEach(() => {
    card = new Card();
  });

  it('the card should not set at  ', () => {
    expect(card.suit).toBeNull();
    expect(card.value).toBeNull();
  });

  it('the card setted should have values and a faced card', () => {
    card.setSuit('Spades').setValue('Jack');
    expect(suites.has(card.suit)).toEqual(true);
    expect(cards.has(card.value)).toEqual(true);
    expect(card.isFaceCard()).toEqual(true);
  });

  it('the card setted should have values', () => {
    card.setSuit('Spades').setValue('Ace');
    expect(card.isFaceCard()).toEqual(false);
  });
});
