var app = (function() {
	//array that'll hold all ingredients w/in formula
	var formula = [];
	var carrierPerServing = function(ingredient) {
		return (ingredient.carrier/100)*(ingredient.amount/(1-(ingredient.carrier/100)));
	};

	return {
		listCarrierPerServing: function() {
			var returnArr = [];
			for (var i = 0; i < formula.length; i++) {
				returnArr.push(carrierPerServing(formula[i]));
			}
			return returnArr;
		},
		//example function to add new Ingredient objects into the formula array from initial form.
		addIngredient: function(name, amount, carrier, usdperkilo, origin, packSize) {
			var ingredient = {
				name: name,
				amount: amount,
				carrier: carrier,
				usdperkilo: usdperkilo,
				origin: origin,
				packSize: packSize
			};

			formula.push(ingredient);
		}
	};
})();

//example ingredient
app.carrierPerServing(); //undefined
app.addIngredient("St. John's Wort", 500, 4, 25, manufacturer, 25);
console.log(app.listCarrierPerServing());
