var clean_ingredient = function(ingredient) {
  $(ingredient).find("input").val("");
  $(ingredient).find("select").val("");
  $(ingredient).find(".packSize").prop("disabled", true);
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
    } else {
      $(packSize).prop('disabled', true);
    }
  });
  
  $(".analyze").click(function() {
	$("#part1").hide();
	$("#part2").show();
  });
  $(".formula").click(function() {
	$("#part2").hide();
	$("#part1").show();
  });
  
  $("#ingredientForm").validate({
	rules: {
		ingredient: {
			required: true
		},
		amount: {
			required: true,
			number: true
		},
		carrier: {
			required: true,
			number: true
		},
		kilo: {
			required: true,
			number: true
		}
	}
  });
});
