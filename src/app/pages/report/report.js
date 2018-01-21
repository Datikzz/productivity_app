import reportTempl from './report.hbs';
import eventbus from '../../eventBus';
import Highcharts from 'highcharts';
require('highcharts/modules/exporting')(Highcharts);

export default class Reports {
  constructor(data) {
    this.data = data;
    this.dataArr;
    this.today = new Date().toDateString();
  }

  render() {
    const main = document.getElementsByTagName('main')[0];
    main.innerHTML = reportTempl();
    eventbus.emit('hideTrashIcon');
    this.renderChart();
    this.getCompletedTodayTasks();
  }

  getCompletedTodayTasks() {
    const dataForCharts = Array(5).fill(0);
    for(let i in this.data) {
      this.dateFinished = new Date(this.data[i].dateFinished).toDateString();
      if(this.today === this.dateFinished && this.data[i].isDone) {
        if(this.data[i].isFailed) {
          dataForCharts[4]++;
        } else {
          switch(this.data[i].priorityType) {
          case 'priority-urgent':
            dataForCharts[0]++;
            break;
          case 'priority-high':
            dataForCharts[1]++;
            break;
          case 'priority-middle':
            dataForCharts[2]++;
            break;
          case 'priority-low':
            dataForCharts[3]++;
            break;
          }
        }
      }
    }
    return dataForCharts;
  }

  renderChart() {
    this.dataArr = this.getCompletedTodayTasks();
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
  
      exporting: {
        enabled: false
      },

      credits: {
        enabled: false
      },

      plotOptions: {
        column: {
          stacking: 'normal'
        }
      },
  
      series: [{
        name: 'Urgent',
        data: [this.dataArr[0], 0, 0, 0, 0],
        stack: 'tasks'
      }, {
        name: 'High',
        data: [0, this.dataArr[1], 0, 0, 0],
        stack: 'tasks'
      }, {
        name: 'Middle',
        data: [0, 0, this.dataArr[2], 0, 0],
        stack: 'tasks'
      }, {
        name: 'Low',
        data: [0, 0, 0, this.dataArr[3], 0],
        stack: 'tasks'
      }, {
        name: 'Failed',
        data: [0, 0, 0, 0, this.dataArr[4]],
        stack: 'tasks'
      }]
    });
  }
}


