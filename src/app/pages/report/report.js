import reportTempl from './report.hbs';
import eventbus from '../../eventBus';
import Highcharts from 'highcharts';
require('highcharts/modules/exporting')(Highcharts);

export default class Reports {
  constructor(data) {
    this.data = data;
    this.dataArr;
    this.today = new Date().toDateString();
    this.day;
    this.date;
    this.week = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    this.categories = ['urgent', 'high', 'middle', 'low', 'failed'];
  }

  render() {
    const main = document.getElementsByTagName('main')[0];
    main.innerHTML = reportTempl();
    eventbus.emit('hideTaskIcons');
    const tasksBtn = document.getElementsByClassName('tasks-btn')[0];
    const pomodorosBtn = document.getElementsByClassName('pomodoros-btn')[0];
    $('.icon-arrow-left').tooltip();
    this.tasksEventListeners();
    tasksBtn.classList.add('active');

    pomodorosBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.pomodorosEventListeners();
      pomodorosBtn.classList.add('active');
      tasksBtn.classList.remove('active');
    });

    tasksBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.tasksEventListeners();
      tasksBtn.classList.add('active');
      pomodorosBtn.classList.remove('active');
    });

  }

  highlight(el){
    if(this.selectedBtn){
      this.selectedBtn.classList.remove('active');
    }
    this.selectedBtn = el;
    this.selectedBtn.classList.add('active');
  }

  pomodorosEventListeners() {
    const dayTaskBtn = document.getElementsByClassName('day-btn')[0];
    dayTaskBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.renderUsedPomodorosToday();
      this.highlight(dayTaskBtn);
    });

    const weekTaskBtn = document.getElementsByClassName('week-btn')[0];
    weekTaskBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.renderUsedWeeklyPomodoros();
      this.highlight(weekTaskBtn);
    });

    const monthTaskBtn = document.getElementsByClassName('month-btn')[0];
    monthTaskBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.renderUsedMonthlyPomodoros();
      this.highlight(monthTaskBtn);
    });
    this.renderUsedPomodorosToday();
    this.highlight(dayTaskBtn);
  }

  tasksEventListeners() {

    const dayTaskBtn = document.getElementsByClassName('day-btn')[0];
    dayTaskBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.renderCompletedTodayTasks();
      this.highlight(dayTaskBtn);
    });

    const weekTaskBtn = document.getElementsByClassName('week-btn')[0];
    weekTaskBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.renderCompletedWeeklyTasks();
      this.highlight(weekTaskBtn);
    });

    const monthTaskBtn = document.getElementsByClassName('month-btn')[0];
    monthTaskBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.renderCompletedMonthlyTasks();
      this.highlight(monthTaskBtn);
    });


    this.renderCompletedTodayTasks();
    this.highlight(dayTaskBtn);
  }

  renderUsedPomodorosToday() {
    this.dataArr = this.getUsedPomodorosToday();
    const option = {
      xaxis: this.categories,
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
      }],
      tooltip: {
        formatter: function () {
        return '<b>' + this.series.name.toUpperCase() + '</b><br/>Pomodoros: ' + this.y;
        }
      }
    };
    this.renderChart(option);
  }

  renderCompletedTodayTasks() {
    this.dataArr = this.getCompletedTodayTasks();
    const option = {
      xaxis: this.categories,
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
      }],
      tooltip: {
        formatter: function () {
          return '<b>' + this.series.name.toUpperCase() + '</b><br/>Tasks: ' + this.y;
        }
      }
    };
    this.renderChart(option);
  }

  renderUsedWeeklyPomodoros() {
    const dataForChart = this.getWeeklyTasks();
    const dataArr = this.sortWeeklyPomodoros(dataForChart);
    const option = {
      xaxis: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
      series: this.getSeriesWeek(dataArr, this.categories),
      tooltip: {
        formatter: function () {
          return '<b>' + this.series.name.toUpperCase() + '</b><br/>Pomodoros: ' + this.y;
        }
      }
    };
    this.renderChart(option);
  }

  renderCompletedWeeklyTasks() {
    const dataForChart = this.getWeeklyTasks();

    this.dataArr = this.sortWeeklyTasks(dataForChart);

    const option = {
      xaxis: this.week,
      series: this.getSeriesWeek(this.dataArr, this.categories),
      tooltip: {
        formatter: function () {
          return '<b>' + this.series.name.toUpperCase() + '</b><br/>Tasks: ' + this.y;
        }
      }
    };
    this.renderChart(option);
  }

  renderUsedMonthlyPomodoros() {
    const dataForChart = this.getMonthlyTasks();
    this.dataArr = this.sortMonthlyPomodoros(dataForChart);
    const month = [];

    const today = new Date();
    const count = (new Date(today.getFullYear(), today.getMonth() + 1, 0)).getDate();

    for (let i = 0; i < count; i++) {
      month.push(i + 1);
    }
    const option = {

      xaxis: month,
      series: this.getSeriesMonth(this.dataArr, this.categories),
      tooltip: {
        formatter: function () {
          return '<b>' + this.series.name.toUpperCase() + '</b><br/>Pomodoros: ' + this.y;
        }
      }
    };
    this.renderChart(option);
  }

  renderCompletedMonthlyTasks() {
    const dataForChart = this.getMonthlyTasks();
    this.dataArr = this.sortMonthlyTasks(dataForChart);
    const month = [];

    const today = new Date();
    const count = (new Date(today.getFullYear(), today.getMonth() + 1, 0)).getDate();

    for (let i = 0; i < count; i++) {
      month.push(i + 1);
    }
    const option = {

      xaxis: month,
      series: this.getSeriesMonth(this.dataArr, this.categories),
      tooltip: {
        formatter: function () {
          return '<b>' + this.series.name.toUpperCase() + '</b><br/>Tasks: ' + this.y;
        }
      }
    };
    this.renderChart(option);
  }

  getSeriesWeek(tasks, categories) {
    const data = [];

    for (let i = 0; i < categories.length; i++) {
      data.push({
        name: categories[i],
        data: tasks[categories[i]],
        borderColor: 'transparent',
        stack: 'completed'
      });
    }
    data[4].stack = 'failed';
    return data;
  }

  getSeriesMonth(tasks, categories) {
    const data = [];

    for (let i = 0; i < categories.length; i++) {
      data.push({
        name: categories[i],
        data: tasks[categories[i]],
        borderColor: 'transparent',
        stack: 'completed'
      });
    }
    return data;
  }

  getUsedPomodorosToday() {
    const dataForCharts = Array(5).fill(0);
    for(let i in this.data) {
      this.dateFinished = new Date(this.data[i].dateFinished).toDateString();
      if(this.today === this.dateFinished && this.data[i].isDone) {
          dataForCharts[4] += this.data[i].estimationFailed;
          switch(this.data[i].priorityType) {
            case 'priority-urgent':
              dataForCharts[0] += this.data[i].estimationUsed;
              break;
            case 'priority-high':
              dataForCharts[1] += this.data[i].estimationUsed;
              break;
            case 'priority-middle':
              dataForCharts[2] += this.data[i].estimationUsed;
              break;
            case 'priority-low':
              dataForCharts[3] += this.data[i].estimationUsed;
              break;
            default:
              break;
          }
        }
      }
    return dataForCharts;
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
          default:
            break;
          }
        }
      }
    }
    return dataForCharts;
  }

  sortWeeklyTasks(data) {

    const dataForCharts = {
      urgent: Array(7).fill(0),
      high: Array(7).fill(0),
      middle: Array(7).fill(0),
      low: Array(7).fill(0),
      failed: Array(7).fill(0)
    };

    for(let i in data) {
        this.date = new Date(data[i].dateFinished);
        this.day = this.date.getDay() - 1;

        if (data[i].isFailed) {
          dataForCharts.failed[this.day]++;
        } else {
          switch(data[i].priorityType) {
            case 'priority-urgent':
              dataForCharts.urgent[this.day]++;
              break;
            case 'priority-high':
              dataForCharts.high[this.day]++;
              break;
            case 'priority-middle':
              dataForCharts.middle[this.day]++;
              break;
            case 'priority-low':
              dataForCharts.low[this.day]++;
              break;
            default:
              break;
        }
      }
    }
    return dataForCharts;
  }

  sortWeeklyPomodoros(data) {

    const dataForCharts = {
      urgent: Array(7).fill(0),
      high: Array(7).fill(0),
      middle: Array(7).fill(0),
      low: Array(7).fill(0),
      failed: Array(7).fill(0)
    };

    for(let i in data) {
      this.date = new Date(data[i].dateFinished);
      this.day = this.date.getDay() - 1;

        dataForCharts.failed[this.day] += data[i].estimationFailed;
        switch (data[i].priorityType) {
          case 'priority-urgent':
            dataForCharts.urgent[this.day] += data[i].estimationUsed;
            break;
          case 'priority-high':
            dataForCharts.high[this.day] += data[i].estimationUsed;
            break;
          case 'priority-middle':
            dataForCharts.middle[this.day] += data[i].estimationUsed;
            break;
          case 'priority-low':
            dataForCharts.low[this.day] += data[i].estimationUsed;
            break;
          default:
            break;
        }
      }
    return dataForCharts;
  }

  getWeeklyTasks() {
    const tasks = [];
    const today = new Date();
    const day = today.getDay();

    let taskDate;
    let mondayOfWeek;
    let sundayOfWeek;

    for (let i in this.data) {
        mondayOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate()
          + ((day === 0 ? -6 : 1) - day));
        sundayOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() +
          ((day === 0 ? 0 : 7) - day));
        taskDate = new Date(this.data[i].dateFinished);

        if (taskDate <= sundayOfWeek && taskDate >= mondayOfWeek) {
          tasks.push(this.data[i]);
        }
    }
    return tasks;
  }

  getMonthlyTasks() {
    const tasks = [];
    const today = new Date();
    for (let i in this.data) {
      let month = new Date(this.data[i].dateFinished);
        if (month.getMonth() === today.getMonth()
          && month.getFullYear() === today.getFullYear()) {
          tasks.push(this.data[i]);
        }
    }
    return tasks;
  }

  sortMonthlyTasks(data) {
    const today = new Date();
    const count = (new Date(today.getFullYear(), today.getMonth() + 1, 0)).getDate();
    const dataForCharts = {
      urgent: Array(count).fill(0),
      high: Array(count).fill(0),
      middle: Array(count).fill(0),
      low: Array(count).fill(0),
      failed: Array(count).fill(0)
    };

    for(let i in data) {
      this.date = new Date(data[i].dateFinished);
      this.day = this.date.getDate() - 1;

      if (data[i].isFailed) {
        dataForCharts.failed[this.day]++;
      } else {
        switch(data[i].priorityType) {
          case 'priority-urgent':
            dataForCharts.urgent[this.day]++;
            break;
          case 'priority-high':
            dataForCharts.high[this.day]++;
            break;
          case 'priority-middle':
            dataForCharts.middle[this.day]++;
            break;
          case 'priority-low':
            dataForCharts.low[this.day]++;
            break;
          default:
            break;
        }
      }
    }
    return dataForCharts;
  }

  sortMonthlyPomodoros(data) {
    const today = new Date();
    const count = (new Date(today.getFullYear(), today.getMonth() + 1, 0)).getDate();
    const dataForCharts = {
      urgent: Array(count).fill(0),
      high: Array(count).fill(0),
      middle: Array(count).fill(0),
      low: Array(count).fill(0),
      failed: Array(count).fill(0)
    };

    for(let i in data) {
      this.date = new Date(data[i].dateFinished);
      this.day = this.date.getDate() - 1;
      dataForCharts.failed[this.day] += data[i].estimationFailed;
      switch(data[i].priorityType) {
        case 'priority-urgent':
          dataForCharts.urgent[this.day] += data[i].estimationUsed;
          break;
        case 'priority-high':
          dataForCharts.high[this.day] += data[i].estimationUsed;
          break;
        case 'priority-middle':
          dataForCharts.middle[this.day] += data[i].estimationUsed;
          break;
        case 'priority-low':
          dataForCharts.low[this.day] += data[i].estimationUsed;
          break;
        default:
          break;
      }
    }

    return dataForCharts;
  }

  renderChart(option) {

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
        categories: option.xaxis,
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
          color: '#fff',
          textTransform: "capitalize"
        }
      },

      tooltip: option.tooltip,

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

      series: option.series,

      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          }
        }]
      }
    });
  }
}


