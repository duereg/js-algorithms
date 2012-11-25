var hand = function() {
	this.cards = [];
};

hand.prototype.numCards = function() {
	return this.cards.length;
};

hand.prototype.addCard = function(card) {
	this.cards.push(card);
};

return hand;