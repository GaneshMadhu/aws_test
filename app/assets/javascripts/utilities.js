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

  $('.post-url-button').hover(
    function () {
    $(this).parent().addClass('add-backdrop');
    }, 
    function () {
    $(this).parent().removeClass('add-backdrop');
    }
  );
}

function set_trait_details(){
  setTimeout(function(){
    var selected_trait  = $(".ugf-attribute option:selected");
    trait_props         = {code: selected_trait.val(), name: selected_trait.text()}
    $('#zoomin_trait_label').text(trait_props.name);
  },150);
}

$(document).ready(function(){
  safe_img_load();
  var path= $(location).attr('pathname');
  $("#mega-menu ul li").each(function() {
    var loop= $(this);
    if (loop.find('a').attr('href') == path) {
      loop.addClass('active');
    }
  });
  $(".ugm-column").click(function () {
    $(".ugm-column").removeClass("expanded");
    $(this).addClass("expanded");
  });
});

function safe_img_load(){
  var safeimageregex = new RegExp('https*%3A[^&]+');
  $( ".ugpc-post-image" ).each(function() {
    var img_tag = $(this).find('img');
    var url=img_tag.attr('src');
    if (safeimageregex.test(url)) {
      var decodedurl = decodeURIComponent(url.match(safeimageregex)[0]);
      var youtubeurlregex = new RegExp('i.ytimg.com[^.]+');
      if(youtubeurlregex.test(decodedurl)) {
        var youtubeembed = decodedurl.match(youtubeurlregex)[0].split('/')[2];
        img_tag.remove();
        $(this).html("<iframe class='postcard-video' src='https://www.youtube.com/embed/"+youtubeembed+"' frameborder='0' allowfullscreen></iframe>");
      }
      img_tag.attr('src',decodedurl);
    }
  });
}
