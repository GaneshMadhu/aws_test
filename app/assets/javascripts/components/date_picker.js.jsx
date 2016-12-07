var DatePicker = React.createClass({
  render: function(){
    var selected_options = this.props.selected_options;
    apply_date_picker(selected_options);
    return null;
  }
});

function apply_date_picker(selected_options){
  setTimeout(function(){
     var start_date = "";
     var end_date   = "";

     var startDate = new Date(),
        endDate = new Date();

     if(selected_options instanceof Object){
        if('post_time' in selected_options){
            if('min' in selected_options['post_time']){
                start_date = selected_options['post_time']['min'];
                startDate  = new Date(start_date);
            }
            if('max' in selected_options['post_time']){
                end_date = selected_options['post_time']['max'];
                endDate  = new Date(end_date);
            }
        }
     }

    var timeInputFilter = $('#ugf-time'),
        timeElFilter = $('#ugf-time-formatted');

    timeElFilter.find('.start').text(start_date);
    timeElFilter.find('.end').text(end_date);

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
  },500);
}
