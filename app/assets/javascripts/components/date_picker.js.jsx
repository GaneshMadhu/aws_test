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

    var startDate = new Date(),endDate = new Date();
    var startPreSelect,endPreSelect;

    if(selected_options instanceof Object){
        if('post_time' in selected_options){
            if('min' in selected_options['post_time']){
                start_date = selected_options['post_time']['min'];
                startDate  = new Date(start_date);
                startPreSelect = true;
            }
            if('max' in selected_options['post_time']){
                end_date = selected_options['post_time']['max'];
                endDate  = new Date(end_date);
                endPreSelect = true; 
            }
        }
    }

    var timeInputFilterStart = $('#ugf-time-start'),
        timeInputFilterEnd = $('#ugf-time-end'),
        timeFilterConStart = $('#ugf-time-formatted-start'),
        timeFilterConEnd = $('#ugf-time-formatted-end');

    var trigClrStart=true,trigClrEnd=true;

    timeFilterConStart.find('.start-date').text(start_date);
    timeFilterConEnd.find('.end-date').text(end_date);


    timeInputFilterStart.datepicker({
        date: new Date(),
        language: 'en',
        dateFormat: '',
        startDate: startDate,
        classes: 'customdatepicker',
        onSelect: function(formatted, date, inst) {
            timeFilterConStart.find('.start-date').text(formatted);
            if(formatted!=""){
                trigClrStart=true;
                $('#calendar-start').addClass('calendar-highlighted').removeClass('calendar-highlight');
                if(startPreSelect!=true){
                    timeInputFilterStart.trigger('change');
                }
                else{
                    startPreSelect = false;
                }
            }
            else{
                if(trigClrStart==true){
                trigClrStart=false;
                timeInputFilterStart.trigger('change');
                }
                $('#calendar-start').addClass('calendar-highlight').removeClass('calendar-highlighted');
            }
            $(window).scrollTop(100)
            setTimeout(function(){
                timeInputFilterStart.data('datepicker').hide();
            },500);
        }
    });

    timeFilterConStart.on('click', function(event) {
        event.preventDefault();
        timeInputFilterEnd.data('datepicker').hide();
        if(timeFilterConStart.find('.start-date').html().length>0)
            timeInputFilterStart.data('datepicker').update({clearButton:true});
        else{
            timeInputFilterStart.data('datepicker').date = new Date();
        }
        if(timeFilterConEnd.find('.end-date').html().length>0){
            var maxdate=new Date(new Date(timeFilterConEnd.find('.end-date').html()).getTime() - (24 * 60 * 60 * 1000));
            timeInputFilterStart.data('datepicker').update({maxDate:maxdate});
        }
        else{
            timeInputFilterStart.data('datepicker').update({maxDate:0});
        }
        timeInputFilterStart.data('datepicker').view = 'days';
        timeInputFilterStart.data('datepicker').show();
    });

    timeInputFilterEnd.datepicker({
        date: new Date(),
        language: 'en',
        dateFormat: '',
        startDate: endDate,
        onSelect: function(formatted, date, inst) {
            timeFilterConEnd.find('.end-date').text(formatted);
            if(formatted!=""){
                trigClrEnd=true;
                $('#calendar-end').addClass('calendar-highlighted').removeClass('calendar-highlight');
                if(endPreSelect!=true){
                    timeInputFilterEnd.trigger('change');
                }
                else{
                    endPreSelect = false;
                }
            }
            else{
                if(trigClrEnd==true){
                trigClrEnd=false;
                timeInputFilterEnd.trigger('change');
                }
                $('#calendar-end').addClass('calendar-highlight').removeClass('calendar-highlighted');
            }
            $(window).scrollTop(100)
            setTimeout(function(){
                timeInputFilterEnd.data('datepicker').hide();
            },500);
        }
    });

    timeFilterConEnd.on('click', function(event) {
        event.preventDefault();
        timeInputFilterStart.data('datepicker').hide();
        if(timeFilterConEnd.find('.end-date').html().length>0)
            timeInputFilterEnd.data('datepicker').update({clearButton:true});
        else{
            timeInputFilterEnd.data('datepicker').date = new Date();
        }
        if(timeFilterConStart.find('.start-date').html().length>0){
            var mindate=new Date(new Date(timeFilterConStart.find('.start-date').html()).getTime() + (24 * 60 * 60 * 1000));
            timeInputFilterEnd.data('datepicker').update({minDate:mindate});
        }
        else{
            timeInputFilterEnd.data('datepicker').update({minDate:0});
        }
        timeInputFilterEnd.data('datepicker').view = 'days';
        timeInputFilterEnd.data('datepicker').show();
    });

    if(selected_options instanceof Object){
        if('post_time' in selected_options){
            timeInputFilterStart.data('datepicker').selectDate(startDate);
            timeInputFilterEnd.data('datepicker').selectDate(endDate);
        }
    }

  },500);
}
