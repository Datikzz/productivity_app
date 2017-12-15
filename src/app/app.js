/* root component starts here */
import 'assets/less/main.less'; // include general styles

import './components/header/header';
import './components/modal/modal';


import { renderReportTempl } from '../app/pages/report/report';
import { renderTimerTempl } from '../app/pages/timer/timer';
import { renderSettingsTempl } from '../app/pages/settings/settings';
import { renderTasksTempl } from '../app/pages/tasks/tasks';
import Router from './router';

import  firstEntranceTempl  from '../app/components/first_entrance/first_entrance.hbs';

const router = new Router();


router.defaultRoute = '/tasks-list/';
router.add(/settings/,renderSettingsTempl);
router.add(/timer/,renderTimerTempl);
router.add(/report/,renderReportTempl);
router.add(/first-entrance/,renderFirstEntranceTempl);
router.add(/tasks-list/, renderTasksTempl);
router.add(renderTasksTempl);

router.listen();

function renderFirstEntranceTempl(){
  let body = document.getElementsByTagName("body")[0];
  let main = document.getElementsByTagName("main")[0];
  main.innerHTML = firstEntranceTempl();
}



