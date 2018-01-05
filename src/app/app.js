/* root component starts here */
import 'assets/less/main.less'; // include general styles

import './components/header/header';
import './components/modal/modal';

import fireBase from './firebase';
import { renderReportTempl } from '../app/pages/report/report';
import { renderTimerTempl } from '../app/pages/timer/timer';
import { renderTasksTempl } from '../app/pages/tasks/tasks';
import TasksCollectionView from '../app/pages/tasks/tasks';
import TasksCollectionModel from '../app/pages/tasks//tasks-collection/tasks-collection-model';
import globalListTempl from '../app/pages/tasks/global-tasks.hbs';
import { settings }  from '../app/pages/settings/settings';
import Router from './router';

import eventbus from './eventBus';

const router = new Router();


router.defaultRoute = '/tasks-list/';
router.add(/settings/, settings.renderSettingsTempl);
router.add(/timer/,renderTimerTempl);
router.add(/report/,renderReportTempl);
//router.add(/tasks-list/, renderTasksTempl);
router.add(/tasks-list/, () => {
  fireBase.getDataFromFirebase().then( data => {
    const taskListCollectionModel = new TasksCollectionModel(data);
    const tasksCollectionView = new TasksCollectionView(taskListCollectionModel);
    tasksCollectionView.render();
    //globalListTempl(taskListCollectionModel.getTasksData());
  });
});
router.add(() => {
  fireBase.getDataFromFirebase().then( data => {
    const taskListCollectionModel = new TasksCollectionModel(data);
    const tasksCollectionView = new TasksCollectionView(taskListCollectionModel);
    tasksCollectionView.render();
    //globalListTempl(taskListCollectionModel.getTasksData());
  });
});

router.listen();
