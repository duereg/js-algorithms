var card = require("./card.js");
var blackJackCard = function() {};

blackJackCard.prototype = new card();
blackJackCard.prototype.minValue = function() {
	if(this.IsFaceCard()) {
		return 10;
	}

	return this.value;
};

blackJackCard.prototype.maxValue = function() {
	(this.value === card.values.Ace) {
		return 11;
	}

	return this.minValue();
};