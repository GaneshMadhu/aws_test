var FilterSelect = React.createClass({
  render: function(){
    var filter_options = this.props;
    var filter_group   = filter_options.filter_group;
    var placeholder    = filter_options.placeholder;
    var select_wrapper = ["ugf-select"];
    select_wrapper.push("ugff-"+filter_group);
    window.requestAnimationFrame(function() {
      custom_select(filter_options);
    });
    return (
      <div className="ugf-filter">
        <header className="ugf-header">
          <a href={"#ugff-"+filter_group} className="btn ugf-edit">Edit</a>
          <h4>{filter_options.filter_title}
            <span className="tooltip-trigger">
              <i className="ug-icon i-info"></i>
              <span className="tooltip">{filter_options.tooltip}</span>
            </span>
          </h4>
          <a href="!#close" className="clear-values"><span>Clear All</span> <i className="ug-icon i-remove"></i></a>
          <span className="selected">0 selected</span>
        </header>
        <div id={"#ugff-"+filter_group} className={select_wrapper.join(" ")}>
          <div className={"ugf-"+filter_group+"-results"}></div>
          <select name={"ugf-"+filter_group} className={"ugf-"+filter_group} placeholder={filter_group} multiple="multiple"></select>
        </div>
        <a href="#!" className="btn ugf-done"><i className="icon-arrow"></i></a>
      </div>
    )
  }
});
