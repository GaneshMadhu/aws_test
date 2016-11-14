function custom_select(filter_options){
  var input            = $(filter_options.class_name);
  var clearButton      = input.parents('.ugf-filter').find('.clear-values');
  var resultsContainer = $(filter_options.results_containter);
  var options_data     = filter_options.traits;
  var dropdownParent   = $(filter_options.dropdown_parent);
  var placeholder      = filter_options.placeholder;

  var resultsToAutocomplete = function(results) {
    var data = [];
    $.map(results,function(result) {
        data.push({
            id: result.id,
            text: result.text,
            selected: 'selected' in result ? result.selected : false
        });
    });
    return data;
  }

  var populateResultsView = function (_results) {
      resultsContainer.html('');
      _results.map(function (_result) {
          // TODO: _result should be replaced with resultsToAutocomplete to have better consistency
          var resultCard = $.parseHTML("<div class='card mini-card'><span class='mcard-remove'><i class='ug-icon i-close'></i></span><span>"+_result.text+"</span></div>");
          resultsContainer.append(resultCard);
          $(resultCard).find('.mcard-remove').on('click', function () {
              removeResult(_result);
          });
      })
  };

  var removeResult = function (_result) {
      var value = input.val();
      input.val(value.filter(function (val) {
          return val != String(_result.id);
      })).trigger('change');
  };

  //var formatResult = function (_result) {
    //  return $($.templates(autocompleteRow).render(_result));
  //};

  var getSelected = function (results) {
      var selected = [];
      results.map(function(result) {
          if (result.selected) {
              selected.push(result.id);
          }
      });
      return selected;
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
      multiple: true
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
      var value = $(this).val() || [],
          filtered = options_data.filter(function (_result) {
              return ~value.indexOf(String(_result.id));
          });
      if (!value.length) {
          dropdownParent.addClass('no-results');
      } else {
          dropdownParent.removeClass('no-results');
      }
      populateResultsView(filtered);
  });
  input.val(getSelected(_resultsData)).trigger('change');

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
}
