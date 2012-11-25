var card = function() {
	this.suit = null;
	this.value = null;
};

card.suit = {
	Clubs: "Clubs",
	Spades: "Spades",
	Hearts: "Hearts",
	Diamonds: "Diamonds"
};

card.values = {
	Ace: 1,
	Two: 2,
	Three: 3,
	Four: 4,
	Five: 5,
	Six: 6, 
	Seven: 7,
	Eight: 8,
	Nine: 9,
	Ten: 10,
	Jack: 11,
	Queen: 12,
	King: 13
};

card.prototype.isFaceCard = function() {
	return (this.value === "Jack") || (this.value === "Queen") || (this.value === "King"); 
};

module.exports = card;