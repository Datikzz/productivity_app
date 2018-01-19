import * as firebase from 'firebase';
import eventbus from './eventBus';
import TasksCollectionModel from '../app/pages/tasks/tasks-collection/tasks-collection-model';
import TaskModel from '../app/pages/tasks/tasks_model';
import TasksCollectionView from '../app/pages/tasks/tasks_view';

/**
 * Class representing Firebase service
 * @namespace  Firebase
 */
class Firebase {
  /**
   * constructor of Firebase
   * @constructs Firebase
   * @memberOf Firebase
   */
  constructor() {
    this.config = {
      apiKey: 'AIzaSyBT3vWX8OzyYeXfXvGEOGjmSbFP4NakKJ8',
      authDomain: 'pomodoros-19210.firebaseapp.com',
      databaseURL: 'https://pomodoros-19210.firebaseio.com',
      projectId: 'pomodoros-19210',
      storageBucket: 'pomodoros-19210.appspot.com',
      messagingSenderId: '396525315508'
    };
    this.connectionChecked = false;
    eventbus.subscribe('createTask', this.createTask.bind(this));
    eventbus.subscribe('updateTask', this.updateTask.bind(this));
    eventbus.subscribe('deleteTask', this.deleteTask.bind(this));
    eventbus.subscribe('updateStatus', this.updateStatus.bind(this));
    firebase.initializeApp(this.config);
    this.firebaseRef = firebase.database().ref('tasks');
  }
  /**
   * Retrieve data from database
   * @memberOf Settings
   */
  getDataFromFirebase() {
    return this.firebaseRef.once('value').then((snap) => {
      if(!this.connectionChecked){
        if(snap.val()) {
          eventbus.emit('renderNotif', 'success', 'Firebase connected');
          this.connectionChecked = true;
        } else {
          eventbus.emit('renderNotif', 'error', 'Firebase not connected');
        }
      }
      return snap.val();
    });
  }

  /**
   * Create new field on database
   * @memberOf Settings
   * @param {object} data - values of new field
   */
  createTask(data){
    const task = new TaskModel(data);
    firebase.database().ref('tasks/' + task.taskId).set(task);
    this.getTasks();
  }

  /**
   * Delete selected field on database
   * @memberOf Settings
   * @param {number} taskId - id of selected field
   */
  deleteTask(taskId){
    firebase.database().ref('tasks/' + taskId).remove();
    this.getTasks();
  }

  /**
   * Update selected task with new values on database
   * @memberOf Settings
   * @param {number} taskId - id of selected field
   * @param {object} data - values of selected field
   */
  updateTask(taskId,data){
    firebase.database().ref('tasks/' + taskId).update(data);
    this.getTasks();
  }

  /**
   * Update status of task on database
   * @memberOf Settings
   * @param {number} taskId - id of selected field
   * @param {object} data - values of selected field
   */
  updateStatus(taskId,data) {
    firebase.database().ref('tasks/' + taskId).update(data);
  }

  /**
   * Retrieve data from database and render them
   * @memberOf Settings
   */
  getTasks(){
    this.getDataFromFirebase().then( data => {
      const taskListCollectionModel = new TasksCollectionModel(data);
      const tasksCollectionView = new TasksCollectionView(taskListCollectionModel);
      tasksCollectionView.render();
    });
  }
}

const fireBase = new Firebase();
export default fireBase;

