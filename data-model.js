	var state;
	var init = function() {
		state = {
			runInfo: { //object that'll hold manufacturing info - run, desired price, servings/container
				price: null,
				containers: null,
				servings: null
			},
			formula: [],
			totalsServing: [],
			totalsBottle: [],
			totalsRun: []
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
	
	function section3row(arg1, arg2, arg3, arg4) {
		this.ingredient = state.formula[arg1].name;
		this.carrier = function() {
			return (state.formula[arg1].carrier/100)*(state.formula[arg1].amount/(1-(state.formula[arg1].carrier/100)))
			};
		this.amount = state.formula[arg1].amount;
		this.totalAmount = function() {
			return this.carrier + this.amount;
			};
	};
	
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
	
	
	
		//example function to add new Ingredient objects into the formula array from initial form.
	//	addIngredient = function(name, amount, carrier, usdperkilo, origin, packSize) {
		//	var ingredient = {
			//	this.name: "name",
				//this.amount: "amount",
				//this.carrier: "carrier",
				//this.usdperkilo: "usdperkilo",
				//this.origin: "origin",
				//this.packSize: "packSize"
			//};

			//init.state.formula.push(ingredient);
		//};
		
		manufacturingInfo = function(price, containers, servings) {
			state.runInfo.price = price;
			state.runInfo.containers = containers;
			state.runInfo.servings = servings;
		};
		
		addIngredient = function(name, amount, carrier, usdperkilo, origin, packSize) {
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
		
		addSection3Row = function(ingredient) {
			function section3row (ingredient) {
				this.ingredient = state.formula[ingredient].name;
				this.carrier = function() {
					return (state.formula[ingredient].carrier/100)*(state.formula[ingredient].amount/(1-(state.formula[ingredient].carrier/100)))
					};
				this.amount = state.formula[ingredient].amount;
				this.totalAmount = function() {
					return this.carrier + this.amount;
					};
			};
			
			state.totalsServing.push(section3row);
		};

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
addIngredient("St. John's Wort", 500, 4, 25, true, 25);
addIngredient("5-HTP", 100, 2, 165, true, 25);
addSection3Row(0);
console.log(state);

//This returned "undefined" but not sure why
//var totalPriceBottle = function() {
	//	tempPriceArray = 0;
		//for (var i = 0; i < formula.length; i++) {
			//total += priceIngredientBottle(i);
		//}
//	}
