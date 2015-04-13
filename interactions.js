var clean_ingredient = function(ingredient) {
  $(ingredient).find("input").val("");
  $(ingredient).find("select").val("");
  $(ingredient).find(".packSize").prop("disabled", true);
  $(ingredient).find("input").parents("td").removeClass("redClass");
  $(ingredient).find(".packSize").removeClass("required");
};

$(document).ready(function(){
  $("span.glyphicon-plus-sign").click(function() {
    var ingredient = $(this).parents('.formulaRow');
    var tbody = $(this).parents('tbody');
    var cloned_ingredient = $(ingredient).clone(true, true);
    clean_ingredient(cloned_ingredient);
    $(tbody).append(cloned_ingredient);

    $('span.glyphicon-minus-sign').show();
  });

  $("span.glyphicon-minus-sign").click(function() {
    var ingredients = $('.formulaRow');
    var ingredient = $(this).parents('.formulaRow');
    if(ingredients.length > 1)
      ingredient.remove();
    if(ingredients.length - 1 == 1)
      $("span.glyphicon-minus-sign").hide();
  });

  $(".tableDropDown").on('change', function(){
    var packSize = $(this).parents('.formulaRow').find('.packSize');
    if ($(this).val() === "me") {
      $(packSize).prop('disabled', false);
	  $(packSize).addClass("required");
    } else {
      $(packSize).prop('disabled', true);
	  $(packSize).parents('td').removeClass("redClass");
	  $(packSize).removeClass("required");
    }
	if ($(this).val() === "me" && $(packSize).val() === "") {
		$(packSize).parents("td").addClass("redClass");
	}
  });

  $(".formula").click(function() {
	$("#part2").hide();
	$("#part1").show();
  });
  
  $(".ingredient, .amount, .carrier, .kilo").blur(function() {
	if ($(this).val() ==="") {
		$(this).parents("td").addClass("redClass");
	}
	
	else if ($(".carrier").val() > 100) {
		$(this).parents("td").addClass("redClass");
		$("p.hidden").show();
	}
	
	else {
		$(this).parents("td").removeClass("redClass");
		$("p.hidden").hide();
	}
  });
  
  $(".packSize").blur(function() {
	var tableDropDown = $(this).parents(".formulaRow").find(".tableDropDown");
	if ($(this).val() ==="" && $(tableDropDown).val() === "me") {
		$(this).parents("td").addClass("redClass");
	}
	
	else {
		$(this).parents("td").removeClass("redClass");
	}
  });
  
  $(".analyze").click(function() {
    var counter = 0;
	var ingredient = $(".formulaRow").find("input").val();
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
		$(ingredient).each(function() {
			addIngredient($(this));
		};
		console.log(ingredient);
		$("#part1").hide();
		$("#part2").show();
	}
});

});
