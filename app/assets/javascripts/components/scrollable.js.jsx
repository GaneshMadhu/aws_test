var Scrollable = React.createClass({
  render: function(){
    var api_path = this.props.api_path;
    window.requestAnimationFrame(function() {
      trigger_scroll(api_path);
    });
    return null;
  }
});

function trigger_scroll(api_path){
  $(window).scroll(function(){
    if ($(window).scrollTop() == $("#page").height() - $(window).height()){
      var page = $('#post_current_page').val();
      if(page >= $('#post_total_page').val()) return false;
      rest_api_call(api_path, page);
    }
  });
  remove_loaders();
}
