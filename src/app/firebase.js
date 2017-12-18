import * as firebase from 'firebase';
import { EventBus } from './eventBus';
import TasksCollectionModel from '../app/pages/tasks/tasks-collection/tasks-collection-model';

export default class Firebase {
  constructor(config) {
      this.config = {
      apiKey: "AIzaSyBT3vWX8OzyYeXfXvGEOGjmSbFP4NakKJ8",
      authDomain: "pomodoros-19210.firebaseapp.com",
      databaseURL: "https://pomodoros-19210.firebaseio.com",
      projectId: "pomodoros-19210",
      storageBucket: "pomodoros-19210.appspot.com",
      messagingSenderId: "396525315508"
    };
    firebase.initializeApp(this.config);
    EventBus.subscribe('createTask', this.createTask.bind(this));
  }

  createTask(data){
    const task = new TaskModel(data);
    firebase.database().ref('tasks/' + task.id).set(task);

    this.getDataFromFirebase().then( data => {
      const taskListCollectionModel = new TasksCollectionModel(data);
      const taskListCollectionView = new TasksCollectionView(taskListCollectionModel);
      tasksCollectionView.render();
    })
  }

  getTasks(){
    return firebase.database().ref('tasks').once('value').then((snap) => {return snap.val();}
    );
  }
}
const firik = new Firebase();
firik.createTask();
