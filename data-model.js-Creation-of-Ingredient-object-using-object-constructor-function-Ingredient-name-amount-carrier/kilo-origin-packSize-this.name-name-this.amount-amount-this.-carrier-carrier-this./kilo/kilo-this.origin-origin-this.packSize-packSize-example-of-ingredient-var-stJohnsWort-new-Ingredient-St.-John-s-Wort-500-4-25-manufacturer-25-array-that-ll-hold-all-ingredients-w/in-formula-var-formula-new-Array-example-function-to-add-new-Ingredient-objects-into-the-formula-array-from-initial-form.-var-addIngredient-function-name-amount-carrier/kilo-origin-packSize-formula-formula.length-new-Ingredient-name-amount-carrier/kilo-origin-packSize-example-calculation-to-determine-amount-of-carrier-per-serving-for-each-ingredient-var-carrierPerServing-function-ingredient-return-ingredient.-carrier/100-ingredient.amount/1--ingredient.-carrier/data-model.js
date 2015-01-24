#Creation of Ingredient object using object constructor
function Ingredient (name, amount, %carrier, $$/kilo, origin, packSize) { 
	this.name = name;
	this.amount = amount;
	this.%carrier = %carrier;
	this.$$/kilo = $$/kilo;
	this.origin = origin;
	this.packSize = packSize;
};

#example of ingredient
var stJohnsWort = new Ingredient("St. John's Wort", 500, 4, 25, manufacturer, 25);

#array that'll hold all ingredients w/in formula
var formula = new Array();

#example function to add new Ingredient objects into the formula array from initial form.
var addIngredient = function(name, amount, %carrier, $$/kilo, origin, packSize) {
	formula[formula.length] = new Ingredient(name, amount, %carrier, $$/kilo, origin, packSize);
}

#example calculation to determine amount of carrier per serving for each ingredient
var carrierPerServing = function(ingredient) { 
	return (ingredient.%carrier/100)*(ingredient.amount/(1-(ingredient.%carrier/100)));
};

#example formula to list the amounts of each ingredient's carrier, so it can be re-inserted into the DOM in later tables. 
var listCarrierPerServing = function() {
	for (var i = 0; i < formula.length; i++) {
		return carrierPerServing(formula[i]);
	}
};
