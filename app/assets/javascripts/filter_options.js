function custom_select(filter_options){
  var input            = $(filter_options.class_name);
  var clearButton      = input.parents('.ugf-filter').find('.clear-values');
  var resultsContainer = $(filter_options.results_containter);
  var options_data     = filter_options.traits;
  var dropdownParent   = $(filter_options.dropdown_parent);
  var placeholder      = filter_options.placeholder;
  var rest_url         = filter_options.rest_url;
  var filter_group     = filter_options.filter_group;
  var selected_values  = filter_options.selected || [];
  var is_multiple      = filter_options.is_multiple;

    // Need to revisit here
    // var openMobFilter = $('.btn-filters');
    // openMobFilter.ugToggle({
    //     container: '.page-content',
    //     showClass: 'ugf-open',
    //     closeButton: '.page-content .ugf-close',
    //     onClose: function(current) {
    //         $('#ugf-time').data('datepicker').hide();
    //         $(window).trigger('scroll');
    //     }
    // });

  var format_select_row = function(filter_group,row_data){
    var html_string;
    switch(filter_group) {
      case 'attribute':
          html_string = "<div><strong class='colored' style='color: "+row_data.label+"'>"+row_data.id+"</strong><span>"+row_data.text+"</span></div>";
          break;
      case 'country':
          html_string = "<div><span class='flag-icon flag-icon-"+row_data.label+"'></span><span>"+row_data.text+"</span></div>";
          break;
      case 'company':
          if(row_data.label == null || row_data.label == undefined)
            html_string = "<div><span>"+row_data.text+"</span></div>";
          else
            html_string = "<div><img src='"+row_data.label+"' alt='"+row_data.text+"'><span>"+row_data.text+"</span></div>";
          break;
      case 'platform':
          html_string = "<div><span class='ug-icon i-"+row_data.label+"'></span><span>"+row_data.text+"</span></div>";
          break;
      default:
          html_string = "<div><span>"+row_data.text+"</span></div>";
    }
    return $.parseHTML(html_string);
  };

  var format_selected_card = function(filter_group,row_data){
    var html_string;
    switch(filter_group) {
      case 'attribute':
          html_string = "<div class='card mini-card'><a href='#!' class='mcard-remove'><i class='ug-icon i-close'></i></a><strong class='colored' style='color: "+row_data.label+"'>"+row_data.id+"</strong><span>"+row_data.text+"</span></div>";
          break;
      case 'country':
          html_string = "<div class='card mini-card'><a href='#!' class='mcard-remove'><i class='ug-icon i-close'></i></a><span class='flag-icon flag-icon-"+row_data.label+"'></span><span>"+row_data.text+"</span></div>";
          break;
      case 'company':
          if(row_data.label == null || row_data.label == undefined)
            html_string = "<div class='card mini-card'><a href='#!' class='mcard-remove'><i class='ug-icon i-close'></i></a><span>"+row_data.text+"</span></div>";
          else
            html_string = "<div class='card mini-card'><a href='#!' class='mcard-remove'><i class='ug-icon i-close'></i></a><img src='"+row_data.label+"' alt='"+row_data.text+"'><span>"+row_data.text+"</span></div>";
          break;
      case 'platform':
          html_string = "<div class='card mini-card'><a href='#!' class='mcard-remove'><i class='ug-icon i-close'></i></a><span class='ug-icon i-"+row_data.label+"'></span><span>"+row_data.text+"</span></div>";
          break;
      default:
          html_string = "<div class='card mini-card'><span class='mcard-remove'><i class='ug-icon i-close'></i></span><span>"+row_data.text+"</span></div>";
    }
    return $.parseHTML(html_string);;
  };

  var resultsToAutocomplete = function(results) {
    var data = [];
    $.map(results,function(result) {
        data.push({
            id: result.id,
            text: result.text,
            selected: (selected_values.indexOf(result.id) > -1) ? true : false
        });
    });
    return data;
  }

  var populateResultsView = function (_results) {
      resultsContainer.html('');
      _results.map(function (_result) {
          var resultCard = format_selected_card(filter_group,_result);
          resultsContainer.append(resultCard);
          $(resultCard).find('.mcard-remove').on('click', function () {
              removeResult(_result);
          });
      })
  };

  var removeResult = function (_result) {
      var value = input.val() || [];
      input.val(value.filter(function (val) {
          return val != String(_result.id);
      })).trigger('change');
  };

  var formatResult = function (_result) {
    return format_select_row(filter_group,_result);
  };

  var getSelected = function (results) {
    var selected = [];
    results.map(function(result) {
        if (result.selected) {
            selected.push(result.id);
        }
    });
    populateResultsViewFromData(selected_values);
    return selected;
  };

  var populateResultsViewFromData = function(values){
    if(is_multiple){
      var value = values || [],
            filtered = options_data.filter(function (_result) {
                return ~value.indexOf(String(_result.id));
            });
      populateResultsView(filtered);
    }
  };

  function openNativeSelect(elem) {
      if (document.createEvent) {
          var e = document.createEvent("MouseEvents");
          e.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
          elem[0].dispatchEvent(e);
      } else if (element.fireEvent) {
          elem[0].fireEvent("onmousedown");
      }
  }

  var _resultsData = resultsToAutocomplete(options_data);

  var hideDropdown = function(dropdown) {
      setTimeout(function() {
          if (dropdown.next('.select2-container').find('.select2-search').css('visibility') == 'hidden') {
              dropdown.select2("close");
          } else {
              hideDropdown(dropdown);
          }
      }, 200);
  };

  input.select2({
      placeholder: placeholder,
      minimumResultsForSearch: 0,
      minimumInputLength: 0,
      dropdownParent: dropdownParent,
      allowClear: true,
      data: options_data,
      multiple: is_multiple,
      templateResult: formatResult
  }).on('select2:unselecting', function() {
      $(this).data('unselecting', true);
  }).on('select2:opening', function(e) {
      if ($(this).data('unselecting')) {
          $(this).removeData('unselecting');
          e.preventDefault();
      }
  }).on('select2:open', function() {
      hideDropdown($(this));
  });

  if (md.phone()) {
      input.select2('destroy');
  }
  // populate custom tags
  input.on('change', function () {
      var value = $(this).val() || [];
      if (!value.length) {
          dropdownParent.addClass('no-results');
      } else {
          dropdownParent.removeClass('no-results');
      }
      populateResultsViewFromData(value);
      rest_api_call(rest_url);
  });
  // input.val(getSelected(_resultsData)).trigger('change');
  if(is_multiple)
    input.val(getSelected(_resultsData));
  else
    input.val(selected_values.join(',')).trigger('change.select2');

  if (clearButton instanceof jQuery) {
      clearButton.on('click', function(event) {
          input.val(null).trigger('change');
          event.preventDefault();
      });
  }

  var updateFiltersCount = function(values, group) {
      var filtersCount = values ? values.length : 0;
      group.find('.ugf-header').find('.selected').text([filtersCount, 'selected'].join(' '));
  };

  var filterGroups = $('.ugf-filter');
  filterGroups.each(function() {
      var group = $(this);
      group.find('select').on('change', function() {
          var values = $(this).val();
          if (values && values[0] == '') values = null && $(this).val('');
          updateFiltersCount(values, group);
      });
  });

  var filtersWrapper = $('.ug-filters'),
        filters = filtersWrapper.find('.ugf-filter');
    // sticky filters

    filtersWrapper.sticky({
        offset: -290
    });

    filters.each(function() {
        var filter = $(this).find('.ugf-filter'),
            close = $(this).find('.ugf-done');

        $(this).find('.ugf-edit').ugToggle({
            container: $(this),
            showClass: 'ugff-open',
            closeButton: close,
            beforeToggle: function(current) {
                filters.not(filter).removeClass('ugff-open');
            },
            afterToggle: function(current) {
                filtersWrapper.find('.ugf-edit').not(current).removeClass('active');
            }
        })
    });
}
