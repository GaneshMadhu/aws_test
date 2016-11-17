$(function () {
  $(".ugh-show-description").click(function (e) {
    e.preventDefault();
  });
});

function apply_loaders(){
  $('.ug-loading-container').fadeIn(function(){
    $(this).addClass('show').removeClass('hide');
  });
}

function remove_loaders(){
  $('.ug-loading-container').fadeOut(function(){
    $(this).addClass('hide').removeClass('show');
  });
}
