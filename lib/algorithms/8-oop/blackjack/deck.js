var card = require("./card.js");

var deck = function() {
	this.cards = [];
	this.filleDeck();
};

deck.prototype.fillDeck = function() {
	for(var i=0, len = Object.Keys(card.suits); i < len; i++) {
		for(var j=0, len_j = Object.Keys(card.values); j < len_j; j++) {
			var newCard = new card();
			card.suit = card.suit[i];
			card.value = card.values[j];
			this.cards.push(card);
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