var Scrollable = React.createClass({
  render: function(){
    var api_path = this.props.api_path;
    window.requestAnimationFrame(function() {
      trigger_scroll(api_path);
      apply_hover_for_attributes();
    });
    return null;
  }
});

function trigger_scroll(api_path){
  var timeout;
  $(window).scroll(function(){
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      if ($(window).scrollTop() == $("#page").height() - $(window).height()){
        var page = $('#post_current_page').val();
        if(page >= $('#post_total_page').val()) return false;
        rest_api_call(api_path, page);
      }
    }, 100);
  });
  remove_loaders();
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
