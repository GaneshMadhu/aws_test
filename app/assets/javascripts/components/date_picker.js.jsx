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
            $('.dateclear').removeClass('hide');
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
            if (typeof dates[0] !== "undefined") {
                $('#calendar-start').addClass('calendar-highlighted').removeClass('calendar-highlight');
                $('.dateclear').removeClass('hide');
            }
            if (typeof dates[1] !== "undefined") {
                $('#calendar-end').addClass('calendar-highlighted').removeClass('calendar-highlight');
            }
            timeElFilter.find('.start').text(dates[0]);
            timeElFilter.find('.end').text(dates[1]);
            timeInputFilter.trigger('change');
            timeInputFilter.data('datepicker').hide();
        }
    });


   /* $(document).on('click', function(event) {
        if (!$(event.target).is('#ugff-time-id, #ugff-time-id *, #datepickers-container, #datepickers-container *'))
            if (timeInputFilter.length)
                timeInputFilter.data('datepicker').hide();
    });*/
    timeElFilter.on('click', function(event) {
        event.preventDefault();
        if(!$(event.target).hasClass('dateclear')){
            timeInputFilter.data('datepicker').show();
        }
        else{
            if(timeElFilter.find('.start').text()!=""){
                timeElFilter.find('.end').html('');
                timeInputFilter.data('datepicker').clear();
                $('#calendar-start').addClass('calendar-highlight').removeClass('calendar-highlighted');
                $('#calendar-end').addClass('calendar-highlight').removeClass('calendar-highlighted');
                $('.dateclear').addClass('hide');
                timeInputFilter.data('datepicker').hide();
            }
            else{
                timeInputFilter.data('datepicker').hide();
            }
        }
    });
  },500);

}
