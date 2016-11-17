function rest_api_call(uri, sort) {
  make_ajax(uri,"GET",frame_request(sort));
}

function make_ajax(uri, method, data, path) {
  var request = {
      url: uri + (path ? ['/', path].join('') : ''),
      type: method,
      cache: false,
      data: data ? data : {},
      error: function(jqXHR) {
          console.log("ajax error " + jqXHR.status);
      }
  };

  return $.ajax(request);
};

function frame_request(sort){
  var params = {filter: {}};
  if(($('.ugf-attribute').length > 0) && ($('.ugf-attribute').val() != null))
    params['filter']['traits.code'] = $('.ugf-attribute').val();
  if(($('.ugf-country').length > 0) && ($('.ugf-country').val() != null))
    params['filter']['company_group_name'] = $('.ugf-country').val();
  if(($('.ugf-company').length > 0) && ($('.ugf-company').val() != null))
    params['filter']['company_precode'] = $('.ugf-company').val();
  if(($('.ugf-industry').length > 0) && ($('.ugf-industry').val() != null))
    params['filter']['industry_type'] = $('.ugf-industry').val();
  if(($('.ugf-platform').length > 0) && ($('.ugf-platform').val() != null))
    params['filter']['platforms'] = $('.ugf-platform').val();
  if(($('.ugf-checkboxes').length > 0)){
    if($('#ugffp-organic').prop('checked') || $('#ugffp-sponsored').prop('checked')){
      params['filter']['post_type'] = []
      if($('#ugffp-organic').prop('checked'))
        params['filter']['post_type'] << 'organic'
      if($('#ugffp-sponsored').prop('checked'))
        params['filter']['post_type'] << 'sponsored'
    }
  }
  if(($('#ugff-time-id').length > 0)){
    params['filter']['post_time'] = {}
    if($('#ugf-time-formatted').find('.start').html() != "")
      params['filter']['post_time']['gte'] = $('#ugf-time-formatted').find('.start').html()
    if(($('#ugf-time-formatted').find('.end').html() != "") && ($('#ugf-time-formatted').find('.end').html() != "-"))
    params['filter']['post_time']['lte'] = $('#ugf-time-formatted').find('.end').html()
  }

  if(sort && (($('.ugh-sortby').length > 0) && ($('.ugh-sortby').val() != ""))){
    params['sort'] = $('.ugh-sortby').val()
  }

  return params;
}
