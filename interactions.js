//grabs all input fields, conditional classes, and removes them
var clean_ingredient = function(ingredient) {
  $(ingredient).find("input").val("");
  $(ingredient).find("select").val("");
  $(ingredient).find(".packSize").prop("disabled", true);
  $(ingredient).find("input").parents("td").removeClass("redClass");
  $(ingredient).find(".packSize").removeClass("required");
  $(ingredient).find("p.message").hide();
};

//takes info from 1st row and stores it into state.runInfo
var setRunInfo = function() {
	var desiredPrice = parseInt($(".bottlePrice").val());
	var containers = parseInt($(".containers").val());
	var servings = parseInt($(".servings").val());
			
	manufacturingInfo(desiredPrice, containers, servings);
};

$(document).ready(function(){
  //fn for + sign, clones tr, cleans it, attaches it to end of tbody
  $("span.glyphicon-plus-sign").click(function() {
    var ingredient = $(this).parents('.formulaRow');
    var tbody = $(this).parents('tbody');
    var cloned_ingredient = $(ingredient).clone(true, true);
    clean_ingredient(cloned_ingredient);
    $(tbody).append(cloned_ingredient);

    $('span.glyphicon-minus-sign').show();
  });
  
  //fun for - sign, removes existing tr, sets rule for when - sign should disappear
  $("span.glyphicon-minus-sign").click(function() {
    var ingredients = $('.formulaRow');
    var ingredient = $(this).parents('.formulaRow');
    if(ingredients.length > 1)
      ingredient.remove();
    if(ingredients.length - 1 == 1)
      $("span.glyphicon-minus-sign").hide();
  });

  //fn for select dropdown, changes properties of .packSize field depending on which option is chosen
  $(".tableDropDown").on('change', function(){
    var packSize = $(this).parents('.formulaRow').find('.packSize');
    if ($(this).val() === "false") {
      $(packSize).prop('disabled', false);
	  $(packSize).addClass("required");
    } else {
      $(packSize).prop('disabled', true);
	  $(packSize).parents('td').removeClass("redClass");
	  $(packSize).removeClass("required");
    }
	if ($(this).val() === "false" && $(packSize).val() === "") {
		$(packSize).parents("td").addClass("redClass");
	}
  });
  
   //validation fn for input fields, changes color of field if left empty, shows/hides error message if value is incorrect
  $(".ingredient, .amount, .carrier, .price").blur(function() {
	if ($(this).val() ==="") {
		$(this).parents("td").addClass("redClass");
	}
	
	else if ($(".carrier").val() > 100) {
		$(this).parents("td").addClass("redClass");
		$(this).parents("td").find("p.message").show();
	}
	
	else {
		$(this).parents("td").removeClass("redClass");
		$(this).parents("td").find("p.message").hide();
	}
  });
  
    //validation fn for first 3 inputs on page about the run - changes color if left empty
  $(".bottlePrice, .containers, .servings").blur(function() {
	if ($(this).val() ==="") {
		$(this).addClass("redClass");
	}
	
	else {
		$(this).removeClass("redClass");
	}
  });

  //fn for 'Back to Formula' button, hides/shows divs, re-sets values of master data structure avoid duplicates
  $(".formula").click(function() {
	$("#part2").hide();
	$("#part1").show();
	state.formula = [];
	state.servingRows = [];
	state.bottleRows = [];
	state.runRows = [];
	state.sourcedIngredientRows = [];
	state.runInfo.price = null;
	state.runInfo.servings = null;
	state.runInfo.containers = null;
	$("#servingTable > tbody > tr").remove();
  });
  
  $(".analyze").click(function() {
	//creates a counter to add up empty fields and display alert if there are any - final validation before loading table into state.
    var counter = 0;
    $(".required").each(function() {
        if ($(this).val() === "") {
            $(this).parents("td").addClass("redClass");
            counter++;
        }
		
		else if ($(".carrier").val() > 100) {
			counter++;
		}
    });
	
		if (counter > 0){
			alert("Looks like some of the fields aren't filled out correctly. They're highlighted in red.");
    }
	
	else {
		//iterates over each tablerow, stores values into state.formula
		$(".formulaRow").each(function() {
			var ingredient = $(this).find(".ingredient").val();
			var amount = parseInt($(this).find(".amount").val());
			var carrier = parseInt($(this).find(".carrier").val());
			var price = parseInt($(this).find(".price").val());
			var origin = $(this).find("select").val();	
			var packSize = parseInt($(this).find(".packSize").val());
			
			addIngredient(ingredient, amount, carrier, price, origin, packSize);
			
		});
		
		//run functions to put all table data into master data structure
		setRunInfo();
		loopSection3();
		loopSection4();
		loopSection5();
		loopSourcedIngredientRows();
		addSection3Totals();
		addSection4Totals();
		addSection5Totals();
		
		//takes each object in state.servingRows and outputs it to a new table.
		$.each(state.servingRows, function(index, value) {
			
		$("#servingTable > tbody").append("<tr class='servingRow'><td>" + state.servingRows[index].ingredient + "</td><td>" + state.servingRows[index].carrier + "</td><td>" +state.servingRows[index].active + "</td><td>" + state.servingRows[index].totalAmount + "</td></tr>");
		});
		
		$("#servingTable > tbody").append("<tr class='servingRow'><td><strong>Totals</strong></td><td><strong>" + state.servingTotals.carrier + "</strong></td><td><strong>" + state.servingTotals.active + "</strong></td><td><strong>" + state.servingTotals.totalAmount + "</strong></td>")
		
		$("#part1").hide();
		$("#part2").show();
	}
});

});

//****The Function Graveyard - Removed due to redundancy, afraid to get rid of entirely unless they are all of a sudden needed *****//

  /*$(".packSize").blur(function() { -- Silenced for now.  Want to see if just using .tableDropdown fn is enough for validation
	var tableDropDown = $(this).parents(".formulaRow").find(".tableDropDown");
	if ($(this).val() ==="" && $(tableDropDown).val() === "false") {
		$(this).parents("td").addClass("redClass");
	}
	
	else {
		$(this).parents("td").removeClass("redClass");
	}
  }); */
