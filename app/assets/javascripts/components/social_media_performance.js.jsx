var SocialMediaPerformance = React.createClass({
  render: function(){
    var chart_data = this.props.data;
    generate_basic_data(chart_data);
    generateLeftChart(chart_data);
    generateRightChart(chart_data);
    return null;
  }
});

var tags_count = 0;
var avg_engagement = 0;
var tagging_metrics;

function generate_basic_data(chart_data){
  for (var key in chart_data) {
    if (chart_data.hasOwnProperty(key)) {
      if(key == "avg_engagement")
        avg_engagement = chart_data[key];
      if(key == "tags_count")
        tags_count = chart_data[key];
      if(key == "tags"){
        tagging_metrics =  chart_data[key];
      }
    }
  }
}

function generateLeftChart(chart_data){

  var xAxisData = [];
  var yAxisData = [];

  for(var key in tagging_metrics){
    if (tagging_metrics.hasOwnProperty(key)) {
      var datum = tagging_metrics[key];
      xAxisData.push(key)
      yAxisData.push({
        y: -(datum.tags_count),
        color: datum.color,
        name: datum.name,
        text: datum.definition
      })
    }
  }

  $('[data-esmp-left-chart]').highcharts({
      chart: {
          type: 'bar',
          height: 2000,
          marginRight: md.phone() ? 50 : 236,
          style: {
              fontFamily: 'SourceSansPro'
          },
          events: {
              load: function () {
                  remove_loaders();
              }
          }
      },
      credits: {
          enabled: false
      },
      title: false,
      subtitle: false,
      xAxis: [{
          categories: xAxisData,
          opposite: true,
          labels: {
              step: 1,
              useHTML: true,
              style: {
                  fontSize: '14px',
                  whiteSpace: 'normal',
                  "padding-left": "0px",
                  height: "50px",
                  fontWeight: "300",
                  "line-height": "1.2"
              }
          },
          lineWidth: 0,
          minorGridLineWidth: 0,
          lineColor: 'transparent',
          minorTickLength: 0,
          tickLength: 1,
          zIndex: 1
      }],
      yAxis: {
          title: {
              text: null
          },
          labels: {
              enabled: false,
              overflow: 'justify',
              zIndex: 1
          },
          tickLength: 0,
          gridLineColor: '#fff',
          gridLineWidth: 1,
          lineWidth: 0,
          minorGridLineWidth: 0,
          lineColor: 'transparent',
          minorTickLength: 0,
          zIndex: 1
      },

      plotOptions: {
          series: {

              stickyTracking: false,
              pointPadding: 0,
              groupPadding: 0,
              borderWidth: 0,
              shadow: false,
              dataLabels: {
                  enabled: true,
                  style: {
                      fontWeight: '400'
                  }
              },
              zIndex: 2
          },
          bar: {
              dataLabels: {
                  enabled: true,
                  formatter: function () {
                      let num = Math.abs(this.y);
                      return num > 999 ? (num/1000).toFixed(1) + 'k' : num
                  },
                  style: {
                      fontSize: '13px',
                      fontWeight: '400',
                      marginRight: '10px'
                  }
              }
          }
      },
      tooltip: {
          enabled: true,
          useHTML: true,
          backgroundColor: 'none',
          borderWidth: 0,
          shadow: false,
          padding: 0,
          hideDelay: 2000,
          formatter: function () {
              return generate_tooltip(this.point);
          },
          positioner: function(labelWidth, labelHeight, point) {
              let tooltipX, tooltipY;
              tooltipX = (this.chart.plotWidth - labelWidth - point.h / 2);
              if (md.phone())
                  tooltipX = this.chart.plotWidth - labelWidth - 12;

              tooltipY = point.plotY + this.chart.plotTop - 20;
              return {
                  x: tooltipX,
                  y: tooltipY
              };
          }
      },

      legend: {
          enabled: false
      },

      series: [{
          name: 'Posts',
          data: yAxisData
      }]
  });
}

function generateRightChart(chart_data){
  var avg = avg_engagement;
  var series = [];

  for(var key in tagging_metrics){
    if (tagging_metrics.hasOwnProperty(key)) {
      var datum = tagging_metrics[key];
      series.push({
        y: datum.avg_engagement,
        color: datum.avg_engagement < avg ? '#39589A' : '#223B71'
      })
    }
  }

  $('[data-esmp-right-chart]').highcharts({
      chart: {
          type: 'bar',
          height: 2000,
          marginLeft: 0,
          style: {
              fontFamily: 'SourceSansPro'
          }
      },
      title: false,
      subtitle: false,
      tooltip: {
          enabled: false
      },
      credits: {
          enabled: false
      },
      yAxis: {
          title: {
              text: null
          },
          gridLineColor: '#fff',
          gridLineWidth: 0,
          lineWidth: 0,
          minorGridLineWidth: 0,
          lineColor: 'transparent',
          minorTickLength: 0,
          tickLength: 0,
          pointWidth: 0,
          pointInterval: 0,
          labels: { enabled: false },
          min:0,
          plotLines: [{
              label: {
                  align: 'left',
                  style: {
                      color: '#ffffff',
                      backgroundColor: 'rgba(216, 148, 255, .9)',
                      borderColor: 'rgba(216, 148, 255, .9)',
                      borderRadius: '4',
                      fontWeight: '300',
                      textShadow: "none"
                  },
                  verticalAlign: 'top',
                  useHTML: true,
                  rotation: 0,
                  text: '<span class="hc-plotband-label">Average post engagement - All Companies ('+(Math.round(avg * 100) / 100)+'%)</span>',
                  x: 0,
                  y: 415
              },
              color: 'rgba(216, 148, 255, .95)',
              value: avg,
              width: 1,
              zIndex: 6
          }
              // ,
              //     {
              //         label: {
              //             align: 'left',
              //             style: {
              //                 color: '#ffffff',
              //                 backgroundColor: 'rgba(129, 218, 211, .9)',
              //                 borderColor: 'rgba(129, 218, 211, .9)',
              //                 borderRadius: '4',
              //                 fontWeight: '300',
              //                 textShadow: "none"
              //             },
              //             verticalAlign: 'top',
              //             useHTML: true,
              //             rotation: 0,
              //             text: '<span class="hc-plotband-label">Average post engagement - Selected Company (1.36%)</span>',
              //             x: 0,
              //             y: 500
              //         },
              //         color: 'rgba(129, 218, 211, .95)',
              //         value: "1.36",
              //         width: 1,
              //         zIndex: 6
              //     }
          ]
      },


      plotOptions: {
          series: {
              pointPadding: 0,
              groupPadding: 0,
              borderWidth: 0,
              shadow: false
          },
          bar: {
              groupPadding: 0,
              pointPadding: 0,
              dataLabels: {
                  enabled: true,
                  color: '#565656',
                  format: '{point.y:.1f}%',
                  style: {
                      fontSize: '15px',
                      fontWeight: '400'
                  }
              }
          }
      },

      xAxis: {
          lineWidth: 0,
          minorGridLineWidth: 0,
          lineColor: 'transparent',
          minorTickLength: 0,
          tickLength: 1,
          labels: { enabled: false },
          min: 0,
          max: 37
      },
      legend: {
          enabled: false
      },

      series: [{
          name: 'Post Engagement',
          data: series
      }]
  });
}

function generate_tooltip(point){
  var ret_string = "<div class='tc-tooltip on-pie-chart' style='background: "+point.color+"'><div class='header'><h4><b>"+point.category+"</b><span>"+point.name+"</span></h4></div><div class='ugc-last-month-growth ugc-decrease'><p class='ugcf-info'>"+point.text+"</p></div><a href='http://www.google.com' class='btn' style='color: "+point.color+"'>Zoom-in</a><a href='http://www.google.com' class='btn'>View posts</a></div>"
  return ret_string;
}
