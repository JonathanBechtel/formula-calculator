var clean_ingredient = function(ingredient) {
  $(ingredient).find("input").val("");
  $(ingredient).find("select").val("");
};

$(document).ready(function(){
  $("span.glyphicon-plus-sign").click(function() {
    var ingredient = $(this).parents('.ingredient');
    var tbody = $(this).parents('tbody');
    var cloned_ingredient = $(ingredient).clone(true, true);
    clean_ingredient(cloned_ingredient);
    $(tbody).append(cloned_ingredient);

    $('span.glyphicon-minus-sign').show();
  });

  $("span.glyphicon-minus-sign").click(function() {
    var ingredients = $('.ingredient');
    var ingredient = $(this).parents('.ingredient');
    if(ingredients.length > 1)
      ingredient.remove();
    if(ingredients.length - 1 == 1)
      $("span.glyphicon-minus-sign").hide();
  });

  $(".tableDropDown").on('change', function(){
    var packSize = $(this).parents('.ingredient').find('.packSize');
    if ($(this).val() === "me") {
      $(packSize).prop('disabled', false);
    } else {
      $(packSize).prop('disabled', true);
    }
  });
});
