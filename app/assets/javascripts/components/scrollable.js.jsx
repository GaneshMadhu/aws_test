var Scrollable = React.createClass({
  render: function(){
    var api_path = this.props.api_path;
    $(window).scroll(function(){
      if ($(window).scrollTop() == $(document).height() - $(window).height()){
        var page = $('#post_current_page').val();
        if(page >= $('#post_total_page').val()) return false;
        rest_api_call(api_path, page);
      }
    });
    remove_loaders();
    return null;
  }
});
