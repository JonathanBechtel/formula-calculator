	var state;
	var init = function() {
		state = {
			runInfo: { //object that'll hold manufacturing info - run, desired price, servings/container
				price: null,
				containers: null,
				servings: null
			},
			formula: [],
			servingRows: [],
			servingTotals: {
				carrier: null,
				active: null,
				totalAmount: null,
			},
			bottleRows: [],
			bottleTotals: {
				carrier: null,
				active: null,
				totalAmount: null,
				price: null
			},
			runRows: [],
			runTotals: {
				carrier: null,
				active: null,
				totalAmount: null,
				price: null
			}
		};
	};
	
	//array that'll hold all ingredients w/in formula
	//var formula = [];
	//array that'll hold carrier amounts w/in formula
	//var carrierServingArr = [];
	//array that'll hold total ingredient amounts per serving w/in formula
	//var totalServingArr = [];
	//array that'll hold total amount of carrier for each ingredient in a single bottle
	//var totalCarrierBottleArr = [];
	//array that'll hold total amount of each ingredient in a bottle, carrier + actives included
	//var totalServingBottleArr = [];
	//array that'll hold total amount of carrier for each ingredient in a run
	//var totalCarrierRunArr = [];
	//array that'll hold total amount of each ingredient in a run, carrier + actives included
	//var totalServingRunArr = [];
	
	//calculates amount of carrier in each serving of product
	var carrierPerIngredient = function(ingredient) {
		return (ingredient.carrier/100)*(ingredient.amount/(1-(ingredient.carrier/100)));
	};
	
	// ------ Formulas for Section 3 ----------------- //
	
	//returns array of carrier amounts for each ingredient on a per serving basis
	var	listCarrierPerServing = function() {
			for (var i = 0; i < formula.length; i++) {
				carrierServingArr.push(carrierPerIngredient(formula[i]));
			}
	};
	
	//calculates total amount for each ingredient in serving
	var servingTotalPerIngredient = function(ingredient) {
		return carrierServingArr[ingredient] + formula[ingredient].amount;
	};
	
	//returns array of total ingredient amounts for each ingredient
	var listServingTotalAmount = function() {
		for (var i = 0; i < formula.length; i++) {
			totalServingArr.push(servingTotalPerIngredient(i));
		}
	};
	
	//calculates total carrier amount for individual serving by adding together values in carrierServingArr
	var carrierPerServing = function() {
		return carrierServingArr.reduce(function (i, c) {
			return i + c
		});
	};
	
	//calculates total amount of actives in a serving 
	var totalActivesServing = function() {
		var activesArr = [];
		for (var i = 0; i < formula.length; i++) {
			activesArr.push(formula[i].amount);
		}
		
		return activesArr.reduce(function (i, c) {
			return i + c
		});
	};
	
	//calculates total ingredient amount for a serving, carrier + actives included
	var amountPerServing = function() {
		return totalServingArr.reduce(function (i, c) {
			return i + c
		});
	};
	
	// ------------- Formulas for Section 4 ------------------------- //
	
	//calculates total amount of carrier for an ingredient in a single bottle.
	var carrierAmtPerBottle = function(ingredient) {
		return carrierServingArr[ingredient] * servingsPerBottle;
	};
	
	//stores carrier/bottle amount in an array
	var listCarrierPerBottle = function() {
		for (var i = 0; i < formula.length; i++) {
			totalCarrierBottleArr.push(carrierAmtPerBottle(i));
		}
	};
	
	//calculates total ingredient amt per bottle
	var servingTotalPerBottle = function(ingredient) {
		return totalCarrierBottleArr[ingredient] + (formula[ingredient].amount * servingsPerBottle);
	};
	
	//stores per bottle serving totals for each ingredient in an array
	var listTotalServingPerBottle = function() {
		for (var i = 0; i < formula.length; i++) {
			totalServingBottleArr.push(servingTotalPerBottle(i));
		}
	};
	
	// calculates price of each ingredient in the bottle
	var priceIngredientBottle = function(i) {
		return (totalServingBottleArr[i]/1000000) * formula[i].usdperkilo;
	};
	
	//adds up values of carrier/bottle of each ingredient
	var carrierPerBottle = function() {
		return totalCarrierBottleArr.reduce(function (i, c) {
			return i + c
		});
	};
	
	//calculates total amount of actives in a serving 
	var totalActivesBottle = function() {
		return totalActivesServing() * servingsPerBottle;
	};
	
	//adds up values of total amount of each ingredient per bottle
	var totalPerBottle = function() {
		return totalServingBottleArr.reduce(function (i, c) {
			return i + c
		});
	};
	
	//sums up the total price of the bottle ** - I didn't create an additional array to do this, unlike other functions.  Is this better? 
	var totalPriceBottle = function() {
		tempPriceArray = [];
		for (var i = 0; i < formula.length; i++) {
			tempPriceArray.push(priceIngredientBottle(i));
		}
		
		return tempPriceArray.reduce(function (i, c) {
			return i + c
		});
	}
	
	// --------------- Formulas for Section 5 ---------------------- //
	
	//calculates amount of carrier for each ingredient in a run
	var carrierPerRun = function(ingredient) {
		return carrierAmtPerBottle(ingredient) * bottlesPerRun;
	};
	
	//stores values from carrierPerRun in an array
	var listCarrierPerRun = function() {
		for (var i = 0; i < formula.length; i++) {
			totalCarrierRunArr.push(carrierPerRun(i));
		}
	};
	
	//calculates total amount needed for each ingredient in an entire run
	var totalPerRun = function(ingredient) {
		return totalCarrierRunArr[ingredient] + (formula[ingredient].amount * servingsPerBottle * bottlesPerRun);
	};
	
	//stores values for totalPerRun for each ingredient in an array
	var listTotalPerRun = function() {
		for (var i = 0; i < formula.length; i++) {
			totalServingRunArr.push(totalPerRun(i));
		}
	};
	
	//calculates total price of an ingredient for an entire run
	var priceIngredientRun = function(i) {
		return (totalServingBottleArr[i]/1000000) * formula[i].usdperkilo * bottlesPerRun;
	};
	
	//adds up values in totalCarrierRunArr, giving a total amount of carrier used for the entire run
	var totalCarrierPerRun = function() {
		return totalCarrierRunArr.reduce(function (i, c) {
			return i + c
		});
	};
	
	//sums up the total actives for an entire run
	var totalActivesRun = function() {
		return totalActivesBottle() * bottlesPerRun;
	};
	
	//adds up values in totalServingRunArr, giving a total amount produced for the entire run
	var totalAmtPerRun = function() {
		return totalServingRunArr.reduce(function (i, c) {
			return i + c
		});
	};
	
	//calculates total sum of the price for all ingredients in a run
	var totalPriceRun = function() {
		tempPriceArray = [];
		for (var i = 0; i < formula.length; i++) {
			tempPriceArray.push(priceIngredientRun(i));
		}
		
		return tempPriceArray.reduce(function (i, c) {
			return i + c
		});
	}
		
		var manufacturingInfo = function(price, containers, servings) {
			state.runInfo.price = price;
			state.runInfo.containers = containers;
			state.runInfo.servings = servings;
		};
		
		var addIngredient = function(name, amount, carrier, usdperkilo, origin, packSize) {
			var ingredient = {
				name: name,
				amount: amount,
				carrier: carrier,
				usdperkilo: usdperkilo,
				origin: origin,
				packSize: packSize
			};
			
			state.formula.push(ingredient);
		};
		
	var	addSection3Row = function(x) {
			var ingredient = state.formula[x].name;
			var carrier = (state.formula[x].carrier/100)*(state.formula[x].amount/(1-(state.formula[x].carrier/100)));
			var active = state.formula[x].amount;

		  var row = {
				ingredient: ingredient,
				carrier: carrier,
				active: active,
				totalAmount: carrier + active
			};

			state.servingRows.push(row);
		};
		
		/*section3Totals = function(x) {
			var carrier = function() {
				},
			var active = 
			var totalAmount = 
		}; */
		
	var	addSection4Row = function(x) {
			var ingredient = state.formula[x].name;
			var carrier = state.servingRows[x].carrier * state.runInfo.servings;
			var active = state.servingRows[x].active * state.runInfo.servings;
			var price = (state.servingRows[x].totalAmount * state.runInfo.servings)/1000000 * state.formula[x].usdperkilo;
			
			var row = {
				ingredient: ingredient, 
				carrier: carrier,
				active: active,
				totalAmount: carrier + active,
				price: price
			}
			
			state.bottleRows.push(row);
		};
		
	var	addSection5Row = function(x) {
			var ingredient = state.formula[x].name;
			var carrier = state.bottleRows[x].carrier/1000000 * state.runInfo.containers;
			var active = state.bottleRows[x].active/1000000 * state.runInfo.containers;
			var price = state.bottleRows[x].price * state.runInfo.containers;
			
			var row = {
				ingredient: ingredient,
				carrier: carrier,
				active: active,
				totalAmount: carrier + active,
				price: price
			}
			
			state.runRows.push(row);
		};
		
	var addSection3Totals = function() {
		var totalCarrier = function() {
			total = 0;
			for (var i = 0; i < state.formula.length; i++) {
				total += state.servingRows[i].carrier;
			};
			
			return total;
		};
		var totalActives = function() {
			total = 0;
			for (var i = 0; i < state.formula.length; i++) {
				total += state.servingRows[i].active;
			};
			
			return total;
		};

			state.servingTotals.carrier = totalCarrier;
			state.servingTotals.active = totalActives;
			state.servingTotals.totalAmount = totalCarrier + totalActives;
	};
		
		
		
		//This returned "undefined" but not sure why
/*var totalPriceBottle = function() {
		total = 0;
		for (var i = 0; i < state.formula.length; i++) {
			total += state.bottleRows[i].price;
		}
		
		return total;
}; */
	
var totalCarrierServing = function() {
	total = 0;
	for (var i = 0; i < state.formula.length; i++) {
		total += state.servingRows[i].carrier;
	}
	
	return total;
};

var totalActivesServing = function() {
	total = 0;
	for (var i = 0; i < state.formula.length; i++) {
		total += state.servingRows[i].active;
	}
	
	return total
};

var totalAmountServing = function() {
	return totalActivesServing() + totalCarrierServing();
}

/*var addSection3Totals = function(carrier, actives, total) {
	state.servingTotals.carrier = carrier;
	state.servingTotals.active = actives;
	state.servingTotals.totalAmount = total;
} */

//functions used to test the program is working properly		
//addIngredient("St. John's Wort", 500, 4, 25, true, 25);
//addIngredient("5-HTP", 200, 2, 165, true, 25);
//addIngredient("Stevia", 100, 4, 35, true, 25);
//listCarrierPerServing();
//listServingTotalAmount();
//listCarrierPerBottle();
//listTotalServingPerBottle();
//listCarrierPerRun();
//listTotalPerRun();
//console.log(totalActivesRun());
init();
manufacturingInfo(10, 500, 30);
addIngredient("St. John's Wort", 500, 4, 35, true, 25);
addIngredient("5-HTP", 100, 2, 165, true, 25);
addIngredient("Creatine", 5000, 0, 8, true, 25);
addSection3Row(0);
addSection3Row(1);
addSection3Row(2);
addSection4Row(0);
addSection4Row(1);
addSection4Row(2);
addSection5Row(0);
addSection5Row(1);
addSection5Row(2);
addSection3Totals();
console.log(state);
//console.log(totalPriceBottle());
//console.log(totalCarrierBottle());
//console.log(totalActivesBottle());
//console.log(totalAmountBottle()); 
