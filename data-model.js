//array that'll hold all ingredients w/in formula
var formula = [];

//example function to add new Ingredient objects into the formula array from initial form.
var addIngredient = function(name, amount, carrier, usdperkilo, origin, packSize) {
	var ingredient = {
		name: name,
		amount: amount,
		carrier: carrier,
		usdperkilo: usdperkilo,
		origin: origin,
		packSize: packSize
	};

	formula.push(ingredient);
};

//example calculation to determine amount of carrier per serving for each ingredient
var carrierPerServing = function(ingredient) {
	return (ingredient.carrier/100)*(ingredient.amount/(1-(ingredient.carrier/100)));
};

//example formula to list the amounts of each ingredient's carrier, so it can be re-inserted into the DOM in later tables.
var listCarrierPerServing = function() {
	var returnArr = [];
	for (var i = 0; i < formula.length; i++) {
		returnArr.push(carrierPerServing(formula[i]));
	}
	return returnArr;
};

//example ingredient
addIngredient("St. John's Wort", 500, 4, 25, manufacturer, 25);
console.log(listCarrierPerServing());
