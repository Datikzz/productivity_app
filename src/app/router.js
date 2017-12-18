export const Router = {
  routes: [],
  root: '/',
  defaultRoute: {},

  getFragment() {
    let fragment = '';
    let match = window.location.href.match(/#(.*)$/);
    fragment = match ? match[1] : '';

    return this.clearSlashes(fragment);
  },

  clearSlashes(path) {
    return path.toString().replace(/\/$/, '').replace(/^\//, '');
  },

  add(re, handler) {
    this.routes.push({re: re, handler: handler});
    return this;
  },

  check(f) {
    let fragment = f || this.getFragment();

    for (let i = 0; i < this.routes.length; i++) {
      let match = fragment.match(this.routes[i].re);

      if (match) {
        match.shift();
        this.routes[i].handler.apply({}, match);
        return this;
      }
    }
    this.defaultRoute();
    return this;
  },

  listen() {
    let self = this;
    let current = self.getFragment();
    let fn = () => {
      if (current !== self.getFragment()) {
        current = self.getFragment();
        self.check(current);
      }
    };

    clearInterval(this.interval);
    this.interval = setInterval(fn, 50);
    return this;
  },

  navigate(path) {
    path = path ? path : '';
    window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
    for (let i = 0; i < this.routes.length; i++) {

      if(this.routes[i].re == path) {
        this.routes[i].handler();
      }
    }
    return this;
  },
};


let context = {tasks: [
  {taskType: "task-hobby", priorityType: "priority-urgent", dateNum: null, dateDay: "Today", taskTitle: "Lorem ipsum sit amet",taskDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",priority: 3},
  {taskType: "task-hobby", priorityType: "priority-urgent", dateNum: null, dateDay: "Today", taskTitle: "Lorem ipsum sit amet",taskDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",priority: 3},
  {taskType: "task-hobby", priorityType: "priority-urgent", dateNum: null, dateDay: "Today", taskTitle: "Lorem ipsum sit amet",taskDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",priority: 3},
  {taskType: "task-hobby", priorityType: "priority-urgent", dateNum: null, dateDay: "Today", taskTitle: "Lorem ipsum sit amet",taskDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",priority: 3},
  {taskType: "task-hobby", priorityType: "priority-urgent", dateNum: 23, dateDay: "November", taskTitle: "Lorem ipsum sit amet",taskDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",priority: 3},
  {taskType: "task-hobby", priorityType: "priority-urgent", dateNum: null, dateDay: "Today", taskTitle: "Lorem ipsum sit amet",taskDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",priority: 3}]};

let tasksTempl = require('../app/components/task-list/task-list.hbs');
let settingsTempl = require('../app/components/settings-pomodoro/settings_pomodoros.hbs');

let firstEntranceTempl = require('../app/components/first_entrance/first_entrance.hbs');
let reportTempl = require('../app/components/report/report.hbs');
let timerTempl = require('../app/components/timer/timer.hbs');
let body = document.getElementsByTagName("body")[0];
let headerTempl = require('../app/components/header/header.hbs');
  body.innerHTML = headerTempl();

let main = document.getElementsByTagName("main")[0];


Router.add(/settings-pomodoro/,renderSettingsTempl);
Router.add(/timer/,renderTimerTempl);
Router.add(/report/,renderReportTempl);
Router.add(/first-entrance/,renderFirstEntranceTempl);
Router.add(/tasks-list/,renderTasksTempl);
Router.navigate('/first-entrance/');
function renderSettingsTempl(){
  main.innerHTML += settingsTempl();
}

function renderFirstEntranceTempl(){
  main.innerHTML += firstEntranceTempl();
}

function renderTimerTempl(){
  main.innerHTML += timerTempl();
}

function renderReportTempl(){
  main.innerHTML += reportTempl();
}

function renderTasksTempl(){
  main.innerHTML += tasksTempl();
}

let skipBtn = document.querySelector('.skip-btn');
skipBtn.addEventListener('click', Router.navigate('/tasks-list/'));
