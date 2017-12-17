import timerTempl from './timer.hbs';

export function renderTimerTempl(){
  let main = document.getElementsByTagName("main")[0];
  main.innerHTML = timerTempl();
}
