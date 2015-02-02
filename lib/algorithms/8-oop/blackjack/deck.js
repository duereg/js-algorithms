'use strict';

var Card = require('./card.js');

var deck = function() {
	this.cards = [];
	this.filleDeck();
};

deck.prototype.fillDeck = function() {
  var suits = Object.Keys(Card.suits);
  var cardValues = Object.Keys(Card.values);

	for(var i=0, len = suits.length; i < len; i++) {
		for(var j=0, len_j = cardValues.length; j < len_j; j++) {
			var newCard = new Card();
			newCard.suit = Card.suit[i];
			newCard.value = Card.values[j];
			this.cards.push(newCard);
		}
	}
};

deck.prototype.getCard = function() {
	return this.cards.pop();
};

deck.prototype.cardsLeft = function() {
	return this.cards.length;
};

module.exports = deck;
