/* root component starts here */
import 'assets/less/main.less'; // include general styles

import './components/header/header_view';
import './components/modal/modal';

import './helpers';

import { renderReportTempl } from '../app/pages/report/report';
import { settings }  from '../app/pages/settings/settings';
import TasksCollectionView from '../app/pages/tasks/tasks_view';
import TasksCollectionModel from '../app/pages/tasks/tasks-collection/tasks-collection-model';
import Timer from '../app/pages/timer/timer';
import Router from './router';
import fireBase from './firebase';

const router = new Router();


router.defaultRoute = '/tasks-list/';
router.add(/settings/, settings.renderSettingsTempl);
router.add(/timer/, () => {
  const timer = new Timer(localStorage.getItem('taskId'));
  timer.render();
});
router.add(/report/,renderReportTempl);
router.add(/tasks-list/, () => {
  fireBase.getTasks();
});
router.add(() => {
  fireBase.getTasks();
});

router.listen();
