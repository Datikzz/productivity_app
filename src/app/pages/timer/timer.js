import timerTempl from './timer.hbs';
import { EventBus } from '../../eventBus';

export function renderTimerTempl(){
  let main = document.getElementsByTagName("main")[0];
  main.innerHTML = timerTempl();
  EventBus.emit('hideTrashIcon');
}
