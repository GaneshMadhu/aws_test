function rest_api_call(uri, page) {
  if(page == undefined) clear_old_data();
  apply_loaders()
  var page = page ? (parseInt(page) + 1) : 1;
  make_ajax(uri,"GET",frame_request(page));
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

function frame_request(page){
  var params = {filter: {}, page: page};
  if(($('.ugf-attribute').length > 0) && ($('.ugf-attribute').val() != null))
    params['filter']['trait.code'] = $('.ugf-attribute').val();
  if(($('.ugf-country').length > 0) && ($('.ugf-country').val() != null))
    params['filter']['company_group_id'] = $('.ugf-country').val();
  if(($('.ugf-company').length > 0) && ($('.ugf-company').val() != null))
    params['filter']['company_precode'] = $('.ugf-company').val();
  if(($('.ugf-industry').length > 0) && ($('.ugf-industry').val() != null))
    params['filter']['industry'] = $('.ugf-industry').val();
  if(($('.ugf-platform').length > 0) && ($('.ugf-platform').val() != null))
    params['filter']['url_type'] = $('.ugf-platform').val();
  if(($('.ugf-checkboxes').length > 0)){
    if($('#ugffp-organic').prop('checked') || $('#ugffp-sponsored').prop('checked')){
      params['filter']['sponsored_or_organic'] = []
      if($('#ugffp-organic').prop('checked'))
        params['filter']['sponsored_or_organic'].push('Organic')
      if($('#ugffp-sponsored').prop('checked'))
        params['filter']['sponsored_or_organic'].push('Sponsored')
    }
  }
  if(($('#ugff-time-id').length > 0)){
    params['filter']['post_time'] = {}
    if($('#ugf-time-formatted').find('.start').html() != "")
      params['filter']['post_time']['gte'] = $('#ugf-time-formatted').find('.start').html()
    if(($('#ugf-time-formatted').find('.end').html() != "") && ($('#ugf-time-formatted').find('.end').html() != "-"))
    params['filter']['post_time']['lte'] = $('#ugf-time-formatted').find('.end').html()
  }

  if(($('.ugh-sortby').length > 0) && ($('.ugh-sortby').val() != "")){
    params['sort'] = $('.ugh-sortby').val()
  }
  return params;
}