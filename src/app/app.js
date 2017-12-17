/* root component starts here */
import 'assets/less/main.less'; // include general styles

import './components/header/header';
import './components/modal/modal';


import { renderReportTempl } from '../app/pages/report/report';
import { renderTimerTempl } from '../app/pages/timer/timer';
import { renderSettingsTempl } from '../app/pages/settings/settings';
import { renderTasksTempl } from '../app/pages/tasks/tasks';
import Router from './router';
import { eventBus } from './eventBus';

const router = new Router();

router.defaultRoute = '/tasks-list/';
router.add(/settings/,renderSettingsTempl);
router.add(/timer/,renderTimerTempl);
router.add(/report/,renderReportTempl);
router.add(/tasks-list/, renderTasksTempl);
router.add(renderTasksTempl);

router.listen();
