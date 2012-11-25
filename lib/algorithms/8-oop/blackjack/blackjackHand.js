var hand = require("./hand.js");
var blackJackCard = require("./blackjackCard.js");

var blackJackHand = function() {
	this.minCardValue = blackJackCard.prototype.minValue;
	this.maxCardValue = blackJackCard.prototype.maxValue;
};

blackJackHand.prototype = new hand();

blackJackHand.prototype.getValue = function(getCardValue) {
	var handValue = 0;

	if (this.cards.length !== 0) { 
		for(var i=0, len = this.cards.length; i < len; i++) {
			handValue = this.cards[i].call(getCardValue);
		}
	}

	return handValue;
};

blackJackHand.prototype.getMinValue = function() {
	return this.getValue(this.minCardValue);
};

blackJackHand.prototype.getMaxValue = function() {
	return this.getValue(this.minCardValue);
};

blackJackHand.prototype.isBusted = function () {
	return this.getMaxValue() > 21;
};

blackJackHand.prototype.is21 = function () {
	return this.getMaxValue() === 21;
};


