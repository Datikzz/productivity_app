import addModalTempl from './addTask.hbs';
import editModalTempl from './editTask.hbs';
import removeModalTempl from './removeTask.hbs';
import * as firebase from 'firebase';
import { EventBus } from '../../eventBus';


class Modal {
  renderAddModal(){
    const modal = document.querySelector('.modal-wrapper');
    modal.style.position = 'fixed';
    modal.innerHTML = addModalTempl();

    //document.querySelector('body').style.overflow = 'hidden';

    const closeBtn = document.querySelector('.icon-close');
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.closeModal();
    });

    document.querySelector('.icon-check').addEventListener('click', (e) => {
      e.preventDefault();
      this.submitForm(e);
    });
  }

  renderEditModal() {
    const modal = document.querySelector('.modal-wrapper');
    modal.style.position = 'fixed';
    modal.innerHTML = editModalTempl();

    //document.querySelector('body').style.overflow = 'hidden';

    const closeBtn = document.querySelector('.icon-close');
    closeBtn.addEventListener('click', (e)=>{
      e.preventDefault();
      this.closeModal()});

    const trashBtn = document.querySelector('.remove-btn');
    trashBtn.addEventListener('click', (e)=>{
      e.preventDefault();
      this.renderRemoveModal()});
  }

  renderRemoveModal() {
    const modal = document.querySelector('.modal-wrapper');
    modal.style.position = 'fixed';
    modal.innerHTML = removeModalTempl();

    const closeBtn = document.querySelector('.icon-close');
    closeBtn.addEventListener('click', (e)=>{
      e.preventDefault();
      this.closeModal()});
  }

  closeModal() {
    const modal = document.querySelector('.modal-wrapper');
    modal.style.position = 'initial';
    modal.innerHTML = '';
    //document.querySelector('body').style.overflow = 'auto';
  }


  submitForm(e){
    e.preventDefault();
    console.log('blah blah data sent');
    let taskType = document.querySelector('input[name="categoryOptions"]:checked').value;
    let priorityType = document.querySelector('input[name="priorityOptions"]:checked').value;
    let date = document.getElementById('taskDeadline').value;
    let taskTitle = document.getElementById('taskTitle').value;
    let taskDesc = document.getElementById('taskDesc').value;
    let estimation = document.querySelector('input[name="estimation"]:checked').value;

    this.saveTasks({
      taskType: taskType,
      priorityType: priorityType,
      date: date,
      taskTitle: taskTitle,
      taskDesc: taskDesc,
      estimation: estimation
    });
  }

  saveTasks(data){
    // database.set(tasks);
    // send as single object
    let newTask = database.push();
    newTask.set(data);
  }
}

let config = {
  apiKey: "AIzaSyBT3vWX8OzyYeXfXvGEOGjmSbFP4NakKJ8",
  authDomain: "pomodoros-19210.firebaseapp.com",
  databaseURL: "https://pomodoros-19210.firebaseio.com",
  projectId: "pomodoros-19210",
  storageBucket: "pomodoros-19210.appspot.com",
  messagingSenderId: "396525315508"
};

firebase.initializeApp(config);

let database = firebase.database().ref('tasks');

let printRef = firebase.database().ref("tasks");
printRef.on('value', function (snapshot) {
  console.log(snapshot.val());
});

export let modal = new Modal();

EventBus.subscribe('renderAddModal', modal.renderAddModal.bind(modal));
EventBus.subscribe('renderEditModal', modal.renderEditModal.bind(modal));
EventBus.subscribe('renderRemoveModal', modal.renderRemoveModal.bind(modal));
