const Card = require('../../../../lib/algorithms/8-oop/blackjack/card');
const suites = require('../../../../lib/algorithms/8-oop/blackjack/suites');
const cards = require('../../../../lib/algorithms/8-oop/blackjack/cardValues');

describe('Test a abstract class card', () => {
  let card;
  beforeEach(() => {
    card = new Card();
  });

  it('the card should not set at initial phase', () => {
    expect(card.suit).toBeNull();
    expect(card.value).toBeNull();
  });

  it('the card setted should have values and a faced card', () => {
    card.setSuit('Spades').setValue('Jack');
    expect(suites.has(card.suit)).toEqual(true);
    expect(cards.has(card.value)).toEqual(true);
    expect(card.isFaceCard()).toEqual(true);
    expect(card.toStr()).toEqual('[Jack, Spades]');
  });

  it('the card setted should have values', () => {
    card.setSuit('Spades').setValue('Ace');
    expect(card.isFaceCard()).toEqual(false);
    expect(card.toStr()).toEqual('[Ace, Spades]');
  });
});
