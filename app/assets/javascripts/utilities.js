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

function clear_old_data(){
  $('.mvp-top-post,.mvp-ranked-posts,.no_results_center').each(function(){
    if($(this).length) $(this).addClass('hide');
  });
}

function apply_hover_for_attributes(){
  $('.rpc-attribute').mouseenter(function(){
    var bg_value = $(this).find('input[type=hidden]').val();
    $(this).css('background',bg_value);
    $('#attribute_append_styler').remove();
    $('<style id="attribute_append_styler">.tooltip-trigger.rpc-attribute .tooltip::before{border-color:'+bg_value+' transparent transparent}</style>').appendTo('head');
  });

  $('.rpc-attribute').mouseleave(function(){
    var bg_value = $(this).find('input[type=hidden]').val();
    $(this).css('background-color','#fff');
  });
}
