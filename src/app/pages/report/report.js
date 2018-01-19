import reportTempl from './report.hbs';
import eventbus from '../../eventBus';
import Highcharts from 'highcharts';
require('highcharts/modules/exporting')(Highcharts);
/**
 * render report template
 */
export function renderReportTempl(){
  const main = document.getElementsByTagName('main')[0];
  main.innerHTML = reportTempl();
  eventbus.emit('hideTrashIcon');
  renderChart();
}
/**
 * render chart
 */
function renderChart() {
  Highcharts.chart('reportGraph', {

    colors: ['#F75C4C', '#FFA841', '#FDDC43', '#1ABC9C', '#9F9F9F'],

    chart: {
      type: 'column',
      backgroundColor: '#2a3f50',
    },

    title: {
      text: ''
    },

    xAxis: {
      categories: ['Urgent', 'High', 'Middle', 'Low', 'Failed'],
      labels: {
        style: {
          color: '#fff'
        }
      }
    },

    yAxis: {
      gridLineColor: '#345168',
      allowDecimals: false,
      min: 0,
      title: {
        text: ''
      },
      labels: {
        style: {
          color: '#fff'
        }
      }
    },

    legend: {
      itemStyle: {
        color: '#fff'
      }
    },

    tooltip: {
      formatter: function () {
        return '<b>' + this.x + '</b><br/>' +
          this.series.name + ': ' + this.y + '<br/>' +
          'Total: ' + this.point.stackTotal;
      }
    },

    plotOptions: {
      column: {
        stacking: 'normal'
      }
    },

    series: [{
      name: 'Urgent',
      data: [5, 0, 0, 0, 0],
      stack: 'tasks'
    }, {
      name: 'High',
      data: [0, 4, 0, 0, 0],
      stack: 'tasks'
    }, {
      name: 'Middle',
      data: [0, 0, 6, 0, 0],
      stack: 'tasks'
    }, {
      name: 'Low',
      data: [0, 0, 0, 4, 0],
      stack: 'tasks'
    }, {
      name: 'Failed',
      data: [0, 0, 0, 0, 3],
      stack: 'tasks'
    }]
  });
}
