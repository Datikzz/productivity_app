import * as firebase from 'firebase';
import eventbus from './eventBus';
import TasksCollectionModel from '../app/pages/tasks/tasks-collection/tasks-collection-model';
import TaskModel from '../app/pages/tasks/tasks_model';
//import tasksCollectionView from '../app/pages/tasks/tasks';
import TasksCollectionView from '../app/pages/tasks/tasks';
import { renderTasksTempl } from '../app/pages/tasks/tasks';


class Firebase {
  constructor(config) {
      this.config = {
      apiKey: "AIzaSyBT3vWX8OzyYeXfXvGEOGjmSbFP4NakKJ8",
      authDomain: "pomodoros-19210.firebaseapp.com",
      databaseURL: "https://pomodoros-19210.firebaseio.com",
      projectId: "pomodoros-19210",
      storageBucket: "pomodoros-19210.appspot.com",
      messagingSenderId: "396525315508"
    };

    eventbus.subscribe('createTask', this.createTask.bind(this));
    firebase.initializeApp(this.config);
    this.firebaseRef = firebase.database().ref('tasks');
  }

  getDataFromFirebase() {
    return this.firebaseRef.once('value').then((snap) => {
      return snap.val();
    });
  }

  createTask(data){
    const task = new TaskModel(data);
    firebase.database().ref('tasks/' + task.taskId).set(task);

    this.getTasks();
  }

  getTasks(){
    console.log('asd');
    this.getDataFromFirebase().then( data => {
      const taskListCollectionModel = new TasksCollectionModel(data);
      // renderTasksTempl(taskListCollectionModel.getTasksData());//function
      const tasksCollectionView = new TasksCollectionView(taskListCollectionModel);
      tasksCollectionView.render();

      //eventbus.emit('renderTasksTempl',taskListCollectionModel.getTasksData());
    });
    //return firebase.database().ref('tasks').once('value').then((snap) => {return snap.val();});
  }
}

const fireBase = new Firebase();
export default fireBase;

