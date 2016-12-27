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
  $(window).scroll(function(){
    if ($(window).scrollTop() == $(document).height() - $(window).height()){
      var page = $('#post_current_page').val();
      if(parseInt(page) >= parseInt($('#post_total_page').val())) return false;
      if($('#post_scroller').val() == "true"){
        $('#post_scroller').val('false');
        rest_api_call(api_path, page);
      }
    }
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
