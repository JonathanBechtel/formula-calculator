	var state;
	var init = function() {
		state = {
			runInfo: {
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
			},
			sourcedIngredientRows: []
		};
	};
	
	//Calculation Functions//
	
	//****Section 3****//
	
	//calculates amount of carrier in each serving of product
	var carrierPerIngredient = function(x) {
		return (state.formula[x].carrier/100)*(state.formula[x].active/(1-(state.formula[x].carrier/100)));
	};
	
	//calculates total amount for each ingredient in serving
	var totalPerIngredient = function(x) {
		return carrierPerIngredient(x) + state.formula[x].active;
	};
	
	//adds together all state.servingRows[x].carrier in servingRows []
	var totalCarrierServing = function() {
		var total = 0;
		for (var i = 0; i < state.formula.length; i++) {
			total += state.servingRows[i].carrier;
		};
	
		return total;
	};
	
	//total amount of active ingredients in a serving
	var totalActivesServing = function() {
		var total = 0;
		for (var i = 0; i < state.formula.length; i++) {
			total += state.servingRows[i].active;
		};
	
		return total;
	};
	
	//total amount in a serving, including actives and carrier
	var totalAmountServing = function() {
		return totalActivesServing() + totalCarrierServing();
	};
	
	// ------------- Formulas for Section 4 ------------------------- //
	
	//calculates total amount of carrier for an ingredient in a single bottle.
	var carrierPerBottle = function(x) {
		return state.servingRows[x].carrier * state.runInfo.servings;
	};
	
	//amount of an active ingredient in a single bottle
	var activePerBottle = function(x) {
		return state.servingRows[x].active * state.runInfo.servings;
	};
	
	//total amount of ingredient in a bottle
	var totalPerBottle = function(x) {
		return carrierPerBottle(x) + activePerBottle(x);
	};
	
	//total ingredient cost of an ingredient within a bottle
	var costPerBottle = function(x) {
		return (totalPerBottle(x)/1000000) * state.formula[x].price;
	};
	
	//total amount of carrier in a bottle for all ingredients
	var totalCarrierBottle = function() {
		var total = 0;
		for (var i = 0; i < state.formula.length; i++) {
			total += state.bottleRows[i].carrier;
		};
	
		return total;
	};
	
	//total amount of active ingredients w/in a bottle
	var totalActivesBottle = function() {
		var total = 0;
		for (var i = 0; i < state.formula.length; i++) {
			total += state.bottleRows[i].active;
		};
	
		return total;
	};
	
	//total amount of all product within a bottle
	var totalAmountBottle = function() {
		return totalCarrierBottle() + totalActivesBottle();
	};
	
	//total Cost to make a bottle
	var totalCostBottle = function() {
		var total = 0;
		for (var i = 0; i < state.formula.length; i++) {
			total += state.bottleRows[i].price;
		};
	
		return total;
	};
	
	
	
	// --------------- Formulas for Section 5 ---------------------- //
	
	//calculates amount of carrier for each ingredient in a run
	var carrierPerRun = function(x) {
		return (state.bottleRows[x].carrier * state.runInfo.containers)/1000000;
	};
	
	//calculates total amount needed for each ingredient in an entire run
	var activePerRun = function(x) {
		return (state.bottleRows[x].active * state.runInfo.containers)/1000000;
	};
	
	//total amount of an ingredient needed for a run
	var totalPerRun = function(x) {
		return carrierPerRun(x) + activePerRun(x);
	};
	
	//total cost of an ingredient for a run
	var costPerRun = function(x) {
		return totalPerRun(x) * state.formula[x].price;
	};
	
	//total amount of carrier for an ingredient in a run
	var totalCarrierRun = function() {
		var total = 0;
		for (var i = 0; i < state.formula.length; i++) {
			total += state.runRows[i].carrier;
		};
	
		return total;
	};
	
	//total amount of active ingredients w/in a run
	var totalActivesRun = function() {
		var total = 0;
		for (var i = 0; i < state.formula.length; i++) {
			total += state.runRows[i].active;
		};
	
		return total;
	};
	
	//total amount used up in a run, carrier + active included
	var totalAmountRun = function() {
		var total = 0;
		for (var i = 0; i < state.formula.length; i++) {
			total += state.runRows[i].totalAmount;
		};
	
		return total;
	};
	
	//total dollar cost for all ingredients w/in a run
	var totalCostRun = function() {
		var total = 0;
		for (var i = 0; i < state.formula.length; i++) {
			total += state.runRows[i].price;
		};
	
		return total;
	};
	
	//******Formulas for Section 6 *******//
	
	//Amount of money you'll have to pay per bottle for ingredients you sourced
	var perBottleCostForYou = function() {
		var total = 0;
		for (var i = 0; i < state.formula.length; i++) {
			if (state.formula[i].origin === false) {
				total += state.bottleRows[i].price;
			};
		};
		return total;
	};
	
	//Amount of money per bottle that's paid for ingredients sourced by your manufacturer
	var perBottleCostForManufacturer = function() {
		var total = 0;
		for (var i = 0; i < state.formula.length; i++) {
			if (state.formula[i].origin === true) {
				total += state.bottleRows[i].price;
			};
		};
		return total;
	};
	
	//total ingredient costs for one run that's paid for ingredients you sourced
	var totalIngredientCostForYou = function() {
		var total = 0;
		for (var i = 0; i < state.formula.length; i++) {
			if (state.formula[i].origin === true) {
				total += state.runRows[i].price;
			};
		};
		return total;
	};
	
	//total ingredient costs for one run for ingredients sourced by your manufacturer
	var totalIngredientCostForManufacturer = function() {
		var total = 0;
		for (var i = 0; i < state.formula.length; i++) {
			if (state.formula[i].origin === false) {
				total += state.runRows[i].price;
			};
		};
		return total;
	};
	
	//estimated per bottle quote from manufacturer accounting for ingredients, materials and profit margin
	var estimatedQuotePrice = function() {
		return perBottleCostForManufacturer() + .25 + (perBottleCostForManufacturer() * 0.2) + ((state.sourcedIngredientRows.length * 50)/state.runInfo.containers);
	};
	
	//*********Function for Ingredients that you sourced yourself in Section 6**********
	
	//calculates total upfront ingredient costs required at beginning of run
	var costPerPack = function(x) {
		return state.formula[x].price * state.formula[x].packSize;
	};
	
	//amount of packs required for sourcing the ingredient
	var packsRequired = function(x) {
		return Math.ceil(state.runRows[x].totalAmount/state.formula[x].packSize);
	};
	
	//total cost for all packs bought
	var costForAllPacks = function(x) {
		return packsRequired(x) * costPerPack(x);
	};
	
	//percent of your ingredient used on your run
	var percentUsed = function(x) {
		return state.runRows[x].totalAmount / (packsRequired(x) * state.formula[x].packSize);
	};
	
	//amount you have leftover after your run
	var amountLeftOver = function(x) {
		return (packsRequired(x) * state.formula[x].packSize) - state.runRows[x].totalAmount;
	};
	
	//number of bottles remaining for your ingredient
	var bottlesRemaining = function(x) {
		return Math.floor(amountLeftOver(x) / (state.bottleRows[x].totalAmount/1000000))
	};
	
	//**********End of Functions for Self-sourced ingredient rows************//
	
	//total purchase price for ingredients at the beginning
	var upfrontIngredientCost = function() {
		total = 0;
		for (var i = 0; i < state.sourcedIngredientRows.length; i++) {
		total += state.sourcedIngredientRows[i].costForAllPacks
		};
		return total;
	};
	
	//value of ingredients used on run
	var upfrontIngredientCostUsedOnRun = function() {	
		total = 0;
		for (var i = 0; i < state.sourcedIngredientRows.length; i++) {
			total += (state.sourcedIngredientRows[i].costForAllPacks * state.sourcedIngredientRows[i].percentUsed);
		};
		return total;
	};
	
	//value of ingredients leftover after run
	var amtIngredientsLeftOver = function() {
		return upfrontIngredientCost() - upfrontIngredientCostUsedOnRun();
	};
	
	//estimated amount to pay to manufacturer - estimated quote price * bottles in run
	var amtPaidToMfctr = function() {
		return estimatedQuotePrice() * state.runInfo.containers;
	};
	
	//value of upfront ingredient costs + amount you'll pay to the manufacturer
	var totalUpfrontCosts = function() {
		return upfrontIngredientCost() + amtPaidToMfctr();
	};
	
	//******Storage Functions******//
	
	//**Adds run info from first row into master object**//
	var manufacturingInfo = function(price, containers, servings) {
		state.runInfo.price = price;
		state.runInfo.containers = containers;
		state.runInfo.servings = servings;
	};
		
	//**Adds ingredient info from section 2 into [formula] array**//
	var addIngredient = function(ingredient, active, carrier, price, origin, packSize) {
		var ingredient = {
			ingredient: ingredient,
			active: active,
			carrier: carrier,
			price: price,
			origin: origin,
			packSize: packSize
		};
			
		state.formula.push(ingredient);
		
	};
		
	//Adds row from section 3 as object literal into servingRows[]	
	var	addSection3Row = function(x) {

		  var row = {
				ingredient: state.formula[x].ingredient,
				carrier: carrierPerIngredient(x),
				active: state.formula[x].active,
				totalAmount: totalPerIngredient(x)
			}

			state.servingRows.push(row);
		};
		
	//Performs addSection3Row for all objects in serving Rows
	var loopSection3 = function() {
		for (var i = 0; i < state.formula.length; i++) {
			addSection3Row(i);
		}
	};
		
	//totals up values from section 3 and adds them in state.servingTotals object
	var addSection3Totals = function() {
		state.servingTotals.carrier = totalCarrierServing();
		state.servingTotals.active = totalActivesServing();
		state.servingTotals.totalAmount = totalAmountServing();
	};	
	
	//Adds row from section 4 as object literal into bottleRows[]
	var	addSection4Row = function(x) {
			
			var row = {
				ingredient: state.formula[x].ingredient, 
				carrier: carrierPerBottle(x),
				active: activePerBottle(x),
				totalAmount: totalPerBottle(x),
				price: costPerBottle(x)
			}
			
			state.bottleRows.push(row);
		};
		
	//Performs addSection4Row for all rows in Bottle Rows
	var loopSection4 = function() {
		for (var i = 0; i < state.formula.length; i++) {
			addSection4Row(i);
		}
	};
		
	//takes sums of all values from section 4 and puts them in state.bottleTotals object	
	var addSection4Totals = function() {
		state.bottleTotals.carrier = totalCarrierBottle();
		state.bottleTotals.active = totalActivesBottle();
		state.bottleTotals.totalAmount = totalAmountBottle();
		state.bottleTotals.price = totalCostBottle();
	};
		
	//Adds row from section 5 as object literal into runRows[]	
	var	addSection5Row = function(x) {
			
			var row = {
				ingredient: state.formula[x].ingredient,
				carrier: carrierPerRun(x),
				active: activePerRun(x),
				totalAmount: totalPerRun(x),
				price: costPerRun(x)
			}
			
			state.runRows.push(row);
	};
	
	//performs addSection5Row for all items in state.RunRows
	var loopSection5 = function() {
		for (var i = 0; i < state.formula.length; i++) {
			addSection5Row(i);
		}
	};
	
	//takes sums of all values from section 5 and puts them in state.RunTotals object
	var addSection5Totals = function() {
		state.runTotals.carrier = totalCarrierRun();
		state.runTotals.active = totalActivesRun();
		state.runTotals.totalAmount = totalAmountRun();
		state.runTotals.price = totalCostRun();
	};
	
	//adds rows for self-sourced ingredients
	var addSourcedIngredientRows = function(x) {
		if (state.formula[x].origin === "false") {
			var row = {
				ingredient: state.formula[x].ingredient,
				costPerPack: costPerPack(x),
				packsRequired: packsRequired(x),
				costForAllPacks: costForAllPacks(x),
				percentUsed: percentUsed(x),
				amountLeftOver: amountLeftOver(x),
				bottlesRemaining: bottlesRemaining(x)
			}
			
			state.sourcedIngredientRows.push(row);
		}
	};
	
	//performs addSourcedIngredientRows for all items in state.formula
	var loopSourcedIngredientRows = function() {
		for (var i = 0; i < state.formula.length; i++) {
			addSourcedIngredientRows(i);
		}
	};

init();
console.log(state);
