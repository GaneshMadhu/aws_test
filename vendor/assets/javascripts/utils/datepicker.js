setTimeout(function(){
  var timeInputFilter = $('#ugf-time'),
      timeElFilter = $('#ugf-time-formatted');

  var startDate = new Date(),
      endDate = new Date();

  timeElFilter.find('.start').text('');
  timeElFilter.find('.end').text('');

  timeInputFilter.datepicker({
      range: true,
      date: new Date(),
      language: 'en',
      dateFormat: '',
      startDate: startDate,
      onSelect: function(formatted, date, inst) {
          var dates = formatted.split(',');
          timeElFilter.find('.start').text(dates[0]);
          timeElFilter.find('.end').text(dates[1]);
          timeInputFilter.trigger('change');
      }
  });

  $(document).on('click', function(event) {
      if (!$(event.target).is('#ugff-time-id, #ugff-time-id *, #datepickers-container, #datepickers-container *'))
          if (timeInputFilter.length)
              timeInputFilter.data('datepicker').hide();
  });
  timeElFilter.on('click', function(event) {
      event.preventDefault();
      timeInputFilter.data('datepicker').show();
  });
},200);
