/* root component starts here */
import 'assets/less/main.less'; // include general styles

import './components/header/header';
import './components/modal/modal';

import { renderReportTempl } from '../app/pages/report/report';
// import { renderTimerTempl } from '../app/pages/timer/timer';
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
  fireBase.getDataFromFirebase().then( data => {
    const taskListCollectionModel = new TasksCollectionModel(data);
    const tasksCollectionView = new TasksCollectionView(taskListCollectionModel);
    tasksCollectionView.render();
  });
});
router.add(() => {
  fireBase.getDataFromFirebase().then( data => {
    const taskListCollectionModel = new TasksCollectionModel(data);
    const tasksCollectionView = new TasksCollectionView(taskListCollectionModel);
    tasksCollectionView.render();

  });
});

router.listen();
