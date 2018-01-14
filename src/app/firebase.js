import * as firebase from 'firebase';
import eventbus from './eventBus';
import TasksCollectionModel from '../app/pages/tasks/tasks-collection/tasks-collection-model';
import TaskModel from '../app/pages/tasks/tasks_model';
import TasksCollectionView from '../app/pages/tasks/tasks_view';


class Firebase {
  constructor() {
    this.config = {
      apiKey: 'AIzaSyBT3vWX8OzyYeXfXvGEOGjmSbFP4NakKJ8',
      authDomain: 'pomodoros-19210.firebaseapp.com',
      databaseURL: 'https://pomodoros-19210.firebaseio.com',
      projectId: 'pomodoros-19210',
      storageBucket: 'pomodoros-19210.appspot.com',
      messagingSenderId: '396525315508'
    };

    eventbus.subscribe('createTask', this.createTask.bind(this));
    eventbus.subscribe('updateTask', this.updateTask.bind(this));
    eventbus.subscribe('deleteTask', this.deleteTask.bind(this));
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

  deleteTask(taskId){
    firebase.database().ref('tasks/' + taskId).remove();
    this.getTasks();
  }
  
  updateTask(taskId,data){
    firebase.database().ref('tasks/' + taskId).update(data);
    this.getTasks();
  }

  getTasks(){
    this.getDataFromFirebase().then( data => {
      console.log(data);
      const taskListCollectionModel = new TasksCollectionModel(data);
      const tasksCollectionView = new TasksCollectionView(taskListCollectionModel);
      tasksCollectionView.render();
    });
  }
}

const fireBase = new Firebase();
export default fireBase;

