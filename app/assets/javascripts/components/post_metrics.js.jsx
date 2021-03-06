var PostMetrics = React.createClass({
  render: function(){
    var chart_data = this.props.data;
    initiliaze_data(chart_data);
    generate_chart(chart_data);
    return null;
  }
});

var avg_engagement = 0, tags_count = 0;
var post_metrics;
var legend_color    = "#F3622B";
var trait_props     = {};
function initiliaze_data(chart_data){
  for (var key in chart_data) {
    if (chart_data.hasOwnProperty(key)) {
      if(key == "avg_engagement")
        avg_engagement = Math.round(chart_data[key]);
      if(key == "tags_count")
        tags_count = chart_data[key];
      if(key == "avg_time"){
        post_metrics =  chart_data[key];
      }
    }
  }
}

function generate_chart(chart_data){
  var areaspline_data = [],column_data = [], categories = [];
  var index = 0;
  var min_length = 1, max_length = post_metrics.length;

  for(var key in post_metrics){
    if (post_metrics.hasOwnProperty(key)) {
      var datum = post_metrics[key];
      categories.push(datum.time);
      areaspline_data.push({y: datum.avg_engagement});
      legend_color = datum.trait_color;
      column_data.push({
        y: datum.posts_count,
        original_color: datum.trait_color,
        color: ((index%2==0) ? hexToRgbA(datum.trait_color,.5) : hexToRgbA(datum.trait_color,.7)),
        areaSplineValue: datum.avg_engagement,
        borderColor: "transparent",
        view_posts: datum.view_posts
      });
      if((index == 0) || (index == (max_length - 1)))
        add_start_end_dummy(areaspline_data,column_data,categories,datum,index);
    }
    index += 1;
  }

  var legend_light = hexToRgbA(legend_color,.5);
  var legend_dark  = hexToRgbA(legend_color,.7);
  var areaspline_color  = hexToRgbA(legend_color,.3);

  var chart = $('[data-zoom-in-chart]').highcharts({
      chart: {
          backgroundColor: 'transparent',
          style: {
              fontFamily: 'SourceSansPro'
          },
          events: {
              load: function () {
                  remove_loaders();
                  //this.myTooltip = new Highcharts.Tooltip(this, this.options.tooltip);
              }
          }
      },
      credits: {
          enabled: false
      },
      title: false,
      subtitle: false,
      legend: {
          /*layout: 'vertical', //to fix the legends to the horizontal format*/
          backgroundColor: 'none',
          shadow: false,
          align: 'left',
          verticalAlign: 'top',
          x: 0,
          y: -30,
          useHTML: true,
          floating: true,
          padding: 2,
          symbolHeight: 0,
          symbolWidth: 0,
          itemMarginBottom: 10,
          itemStyle: {
              lineHeight: '14px',
              fontSize: '14px',
              fontWeight: '300'
          }
      },

      tooltip: {
          enabled: true,
          shared: false,
          useHTML: true,
          borderRadius: 5,
          borderWidth: 1,
          shadow: false,
          followPointer: false,
          hideDelay: 1000,
          formatter: function () {
              return chart_tooltip(this.point)
          },
          positioner: function (boxWidth, boxHeight, point) {
              let chart = this.chart,
                  plotLeft = chart.plotLeft,
                  plotTop = chart.plotTop,
                  plotWidth = chart.plotWidth,
                  plotHeight = chart.plotHeight,
                  distance = 5,
                  pointX = point.plotX,
                  pointY = point.plotY,
                  x = pointX - (boxWidth / 2),
                  y = pointY - (boxHeight) - plotTop - 5,
                  alignedRight;

              if (x < 0) {
                  x = 5;
              }

              if ((x + boxWidth) > plotWidth) {
                  x = pointX - (boxWidth / 1.2);
              }
              if (y < plotTop) {
                  y = pointY + 30;

                  // If the tooltip is still covering the point, move it below instead
                  if (alignedRight && pointY >= y && pointY <= (y + boxHeight)) {
                      y = Math.max(plotTop, plotTop + plotHeight - boxHeight - distance); // below
                  }
              }
              if (y + boxHeight > plotTop + plotHeight) {
                  y = Math.max(plotTop, plotTop + plotHeight - boxHeight - distance); // below
              }
              return {
                  x: x,
                  y: y
              };
          }
      },

      plotOptions: {
          series: {
              stickyTracking: false,
              events: {
                  click: function (evt) {
                      //this.chart.options.tooltip.enabled = true;
                  },
                  mouseOut: function () {
                      //this.chart.tooltip.hide();
                  }
              }
          },
          column: {
              groupPadding: 0,
              pointPadding: 0,
              colorByPoint: false,
              borderWidth: 2,
              borderColor: "transparent",
              color: "transparent",
              dataLabels: {
                  color: legend_color,
                  enabled: true,
                  format: '{point.y}',
                  style: {
                      "fontWeight": "bold", "fontSize": "14px", "textShadow": "none"
                  }
              }

          },
          areaspline: {
              tooltip: {
                  enabled: false
              },
              enableMouseTracking: false,
              cursor: 'pointer',
              followPointer: false
          }
      },

      xAxis: {
          tickAmount: 8,
          categories: categories,
          type: 'category',
          labels: {
              rotation: -45,
              style: {
                  fontSize: '13px',
                  fontFamily: 'Verdana, sans-serif'
              }
          },
          title: {
              text: 'Date Range'
          },
          lineWidth: 0,
          minorGridLineWidth: 0,
          lineColor: 'transparent',
          minorTickLength: 0,
          min: min_length,
          max: max_length,
          tickLength: 0,
          plotBands: [{
              from: 0,
              to: 100,
              color: '#fff'
          }]
      },


      yAxis: [{
          opposite: true,
          title: {
              text: 'Engagement Score',
              offset: 0,
              x: 55,
              rotation: -90
          },
          labels: {
              enabled: false
          },
          min: 0.8
      }, {
          title: false,
          opposite: true,
          gridLineColor: '#fff',
          gridLineWidth: 1,
          lineWidth: 0,
          minorGridLineWidth: 0,
          lineColor: 'transparent',
          minorTickLength: 0,
          min: 0,
          tickLength: 1,
          plotLines: [{
              label: {
                  align: 'right',
                  style: {
                      color: 'rgba(0, 0, 0, .8)',
                      fontWeight: '400',
                      textShadow: "none"
                  },
                  verticalAlign: 'bottom',
                  useHTML: false,
                  text: "Average Engagement Score - "+avg_engagement,
                  x: -10,
                  y: 16
              },
              color: 'rgba(0, 0, 0, .5)',
              value: avg_engagement,
              width: 2,
              zIndex: 4
          }],
          plotBands: [{
              from: 0,
              to: 100,
              color: '#fff'
          }],
          labels: {
              format: '{value}',
              x: 18
          }
      }],
      series: [{
          type: 'column',
          color: "transparent",
          name: '<div class="tooltip-inline"><svg id="svg-icon_pv-container" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" height="24" width="24" version="1.1" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" viewBox="0 0 24.000001 24.000001"><metadata id="metadata3345"><rdf:RDF><cc:Work rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/><dc:title/></cc:Work> </rdf:RDF></metadata><g id="svg-icon_pv" transform="translate(0 -1028.4)"><g id="g4180" transform="matrix(.49566 0 0 .50501 -300.21 582.84)"><rect id="rect3359" fill-rule="evenodd" class="svg-icon_pv-rect1" width="15.784" y="899.45" x="605.71" height="30.431" fill='+legend_light+' /><rect id="rect4161" class="svg-icon_pv-rect2" width="16.794" y="882.15" x="621.52" height="47.73" fill='+legend_dark+' /><rect id="rect3359-1" fill-rule="evenodd" class="svg-icon_pv-rect1" width="15.91" y="889.68" x="638.24" height="40.175" fill='+legend_light+' /></g></g></svg> <span class="tooltip-hide"> Post Volume</span></div>',
          zIndex: 2,
          enableMouseTracking: true,
          data: column_data
      },
          {
              type: 'areaspline',
              color: areaspline_color,
              lineWidth: 0,
              name: '<div class="tooltip-inline"><svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.1" id="svg-icon_ape-container" viewBox="0 0 24.000001 24.000001" height="24" width="24"><defs id="defs4431" /><metadata id="metadata4434"><rdf:RDF><cc:Work rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" /><dc:title></dc:title></cc:Work></rdf:RDF></metadata><g transform="translate(0,-1028.3622)" id="svg-icon_ape"><path id="svg-icon_ape-fill" class="svg-icon_ape-fill" d="m -0.00167413,1046.951 c 0.00492642,-1.8083 1.37745123,-3.8279 2.75000003,-4.8215 1.0145371,-0.7345 1.9103992,-1.1658 2.9642857,-1.1116 0.9477389,0.049 1.7842207,0.7061 2.5491071,1.2678 0.9780611,0.7183 1.5632966,1.8815 2.5223213,2.625 0.35698,0.2768 0.729512,0.6363 1.180246,0.6658 0.750853,0.049 1.509749,-0.3693 2.09375,-0.8438 1.001659,-0.8138 1.442386,-2.1406 2.151785,-3.2187 0.799078,-1.2144 1.395301,-2.5826 2.370536,-3.6607 0.786243,-0.8692 1.702347,-1.6623 2.745536,-2.1965 0.883836,-0.4526 1.53956,-0.6134 2.687203,-0.6943 -9.43e-4,0.9834 -0.0067,2.3202 -0.007,3.3896 -9.23e-4,4.668 0.0073,14.0234 0.0073,14.0234 l -24.03125014,0 c 0,0 0.01095725,-3.5079 0.01617901,-5.4245 z" style="fill-opacity:1;fill-rule:evenodd;stroke:#B2B2B2;stroke-width:0;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1" fill='+areaspline_color+' /></g></svg> <span class="tooltip-hide">Average Engagement Score<span" class="tooltip-trigger"><i class="ug-icon i-info"></i><span class="tooltip">The average engagement score per attribute, which is calculated by taking into account Likes, Comments, Shares, and Audience Reception Rate. The engagement scores can range from 0 - 1000. For more detailed information check out the How Iris Works section.</span></span></span></div>',
              data: areaspline_data,
              zIndex: 1,
              yAxis: 1,
              marker: {
                  enabled: false
              },
              labels: {
                  format: '{value} mb',
                  style: {
                      color: legend_color
                  }
              },
              tooltip: {
                  valueSuffix: ' °C'
              }
          }]
  });
}

function chart_tooltip(point){
  var ret_string = "<div class='tc-tooltip on-pie-chart tooltip-zoom-in' style='background: "+point.original_color+"'><div class='header' style='background: "+point.original_color+"'><h4 style='color: #fff'>"+point.category+"</h4></div><div class='ugc-split'><p class='ugcs'><span>"+point.y+"</span>Volume of posts</p><p class='ugcs'><span>"+Math.round(point.areaSplineValue)+"</span>Avg engagement score</p></div><a href="+point.view_posts+" target='_blank' class='btn' style='color: "+point.original_color+"'>View posts</a></div>";
  return ret_string;
}

function hexToRgbA(hex,opacity){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+opacity+')';
    }
    throw new Error('Bad Hex');
}

function add_start_end_dummy(areaspline,column,category,data,index){
  areaspline.push({y: data.avg_engagement});
  category.push(data.time)
  column.push({
    y: data.posts_count,
    original_color: data.trait_color,
    color: ((index%2==0) ? hexToRgbA(data.trait_color,.5) : hexToRgbA(data.trait_color,.7)),
    areaSplineValue: data.avg_engagement,
    borderColor: "transparent",
    view_posts: data.view_posts
  });
}
