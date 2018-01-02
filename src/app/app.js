/* root component starts here */
import 'assets/less/main.less'; // include general styles

import './components/header/header';
import './components/modal/modal';



import { renderReportTempl } from '../app/pages/report/report';
import { renderTimerTempl } from '../app/pages/timer/timer';
import { renderTasksTempl } from '../app/pages/tasks/tasks';
import Settings from '../app/pages/settings/settings';
import Router from './router';
import { EventBus } from './eventBus';
import Firebase from './firebase';

const router = new Router();
const settings = new Settings();


router.defaultRoute = '/tasks-list/';
router.add(/settings/,settings.renderSettingsTempl);
router.add(/timer/,renderTimerTempl);
router.add(/report/,renderReportTempl);
router.add(/tasks-list/, renderTasksTempl);
router.add(renderTasksTempl);

router.listen();


