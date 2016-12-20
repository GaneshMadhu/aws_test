var Attributes = React.createClass({
  getInitialState: function(){
    return {
      attributes: this.props.attributes
    }
  },
  getCategories: function(){
    var all_category = {
      id: 999999,
      name: "All Attributes",
      properties: {
        color: "#38589b"
      }
    }
    return (
      <div className="sp-results mvpsp-results">
        <nav className="spr-tabs">
          <div id="mobile-attributes-filters">
            <select name="m-attributes-filters" id="m-attributes-filters" data-color="*"></select>
          </div>
          <ul id="attributes-filters">
            <TraitGroup category={all_category} key={all_category.id} index={0} filter="*" />
            {this.state.attributes.map(function(category,index){
              return <TraitGroup category={category} key={category.id} index={index+1} filter={"."+category.id} />
            })}
            <li>
              <div className="spr-sort-filter">
                <input type="text" name="attribute-filter" id="attribute-filter" placeholder="Find attribute"/>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    )
  },
  getScroll: function(){
    return (
      <div className="scroll-top-wrapper mvp">
        <span className="scroll-top-inner"><i className="icon-arrow"></i></span>
      </div>
    )
  },
  getAttributes: function(){
    return (
      <section className="page-content">
        <div className="attribute-grid clearfix" id="attributes-container">
          {this.state.attributes.map(function(category,index){
            return <TraitWrapper category={category} index={index} key={index} />
          })}
        </div>
      </section>
    )
  },
  render: function(){
    var attributes = this.state.attributes;
    window.requestAnimationFrame(function() {
      apply_effects(attributes);
    });
    return(
      <span>
        {this.getCategories()}
        {this.getScroll()}
        {this.getAttributes()}
      </span>
    )
  }
});

var TraitGroup = React.createClass({
  render: function(){
    var index  = this.props.index;
    var active = (index == 0) ? "active" : "";
    return (
      <li className={active}>
          <input type='hidden' class='driver_color' value={this.props.category.properties.color} />
          <a href="#" data-filter={this.props.filter}>
              {this.props.category.name.replace(" ","\n")}
          </a>
      </li>
    )
  }
});

var Trait = React.createClass({
  render: function(){
    var trait    = this.props.trait;
    var index    = this.props.index;
    var category = this.props.category;
    var style    = {
      background: category.properties.color
    }
    var classnames = ['attribute']
    classnames.push(category.id)
    return (
      <div className={classnames.join(" ")} data-driver-id={category.id}>
        <div className="wrapper" style={style}>
          <div>
            <div className="attribute-title">
                <h3>{trait.code}</h3>
                <h5><span>{trait.name}</span></h5>
                <h4>{category.name}</h4>
            </div>
            <div className="attribute-definition">
                <h4>Definition</h4>
                <p>{trait.definition}</p>
                <a href="#!" className="atr-close">&times;</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var TraitWrapper = React.createClass({
  render: function(){
    var category = this.props.category;
    return (
      <span>
        {category.traits.map(function(trait,idx){
            return <Trait trait={trait} category={category} index={idx} key={idx} />
        })}
      </span>
    )
  }
});

function apply_effects(attributes){
  masonry();
  bindFilters();
  var filtersContainer  = $('#attributes-container');
  var attribute_objects = $('#attributes-container .attribute');
  var attribute_drivers = $('#attributes-filters li');
  var searchRegex;
  var autocompleteAttributes = []

  attribute_objects.each(function(){
    var attribute = $(this);
    attribute.on('click', function(event) {
      if (!attribute.hasClass('opened') && !$(event.target).hasClass('atr-close')) {
          $('#attributes-container').find('.attribute .atr-close').trigger('click');
          attribute.addClass('opened');
          refreshLayout(attribute.data('driver-id'));
      }
    });
    attribute.find('.atr-close').on('click', function(event) {
        attribute.removeClass('opened');
        refreshLayout(attribute.data('driver-id'));
        event.preventDefault();
    });
  });

  attribute_drivers.on('click mouseenter mouseleave', function(event) {
    var color = $(this).find('input').val();
    if($(this).find('a').length>0){
      if(event.type == "click"){
        $('#attributes-filters li a').css({"color":"hsla(0,0%,60%,.5)","border-bottom-color": "transparent"});
        $(this).find('a').css({"color": color,"border-bottom-color": color});
      }
      if(event.type == "mouseenter"){
        $(this).find('a').css({"color": color,"border-bottom-color": color});
      }
      if(event.type == "mouseleave"){
        if($(this).hasClass('active'))
          $(this).find('a').css({"color": color,"border-bottom-color": color});
        else
          $('#attributes-filters li').not('.active').find('a').css({"color":"hsla(0,0%,60%,.5)","border-bottom-color": "transparent"});
      }
    }
  });


  var mobileAttributes = $('#m-attributes-filters');
  attributes.map(function(category){
    mobileAttributes.prepend($('<option></option>', {
        text: category.name,
        'data-filter': category.id,
        value: category.id
    }));
    category.traits.map(function(trait){
      autocompleteAttributes.push(trait.name);
    })
  });
  mobileAttributes.prepend($('<option></option>', {
      text: 'All Attributes',
      'data-filter': '*',
      value: '*',
      selected: 'selected'
  }));

  auto_suggestion();

  let debounce = (fn, threshold) => {
      let timeout;
      return function debounced() {
          if (timeout) {
              clearTimeout(timeout);
          }
          function delayed() {
              fn();
              timeout = null;
          }

          timeout = setTimeout(delayed, threshold || 100);
      }
  };

  let refreshLayout = (category) => {
      let container = $('.attribute-grid');
      container.isotope({
          masonry: {
              columnWidth: category ? $('.attribute.'+category).not('.opened')[0] : $('.attribute').not('.opened')[0]
          }
      });
  };

  function masonry() {
      let container = $('.attribute-grid'),
          grid = container.isotope({
              itemSelector: '.attribute',
              percentPosition: true,
              resizable: false,
              masonry: {
                  columnWidth: $('.attribute').not('.opened')[0]
              },
              filter: function () {
                  return searchRegex ? $(this).find('.attribute-title h5 span').text().match(searchRegex) : true;
              }
          });
  };

  function bindFilters(){
      let container = $('.attribute-grid');
      $('#attributes-filters a').on('click', function (event) {
          $('#attributes-filters').find('.active').removeClass('active');
          $(this).parent().addClass('active');
          let filterValue = $(this).attr('data-filter');
          container.isotope({filter: filterValue});
          event.preventDefault();
      });

      $('#m-attributes-filters').on('change', function(event) {
          $(this).attr('data-color', $(this).val());
          var filterValue = '.' + $(this).val();
          if (filterValue == '.*')
              filterValue = '';
          container.isotope({filter: filterValue});
      });
  };

  function auto_suggestion(){
    if(autocompleteAttributes != undefined){
      let container = $('.attribute-grid');

      let quicksearch = $('#attribute-filter');

      if (quicksearch.length) {
         let autocomplete = new Awesomplete(quicksearch[0], {
             minChars: 1,
             list: autocompleteAttributes,
             maxItems: 5
         });
      }

      quicksearch.on('keydown keypress keyup', (e) => {
          if ($('#attributes-filters').find('.active a').attr('data-filter') !== '*') {
              $('#attributes-filters [data-filter="*"]').trigger('click');
          }
          searchRegex = new RegExp(quicksearch.val(), 'gi');
          container.isotope({
              filter: function () {
                  return searchRegex ? (($(this).find('.attribute-title h5 span').text().match(searchRegex)) || ($(this).find('.attribute-title h3').html().match(searchRegex))) : true;
              }
          });
      });
    }
  }

}
