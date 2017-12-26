import reportTempl from './report.hbs';
import { EventBus } from '../../eventBus';

export function renderReportTempl(){
  const main = document.getElementsByTagName("main")[0];
  main.innerHTML = reportTempl();
  EventBus.emit('hideTrashIcon');
}
