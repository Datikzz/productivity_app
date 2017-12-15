let timerTempl = require('./timer.hbs');
let main = document.getElementsByTagName("main")[0];

export function renderTimerTempl(){
  main.innerHTML = timerTempl();
}

