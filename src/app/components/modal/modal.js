import addModalTempl from './addTask.hbs';
import editModalTempl from './editTask.hbs';
import removeModalTempl from './removeTask.hbs';
import * as firebase from 'firebase';
//import { eventBus } from '../../eventBus';

// eventBus.subscribe('renderAddModal', renderAddModal);
// eventBus.subscribe('renderEditModal', renderEditModal);
// eventBus.subscribe('renderRemoveModal', renderRemoveModal);

export function renderAddModal() {
  let modal = document.querySelector('.modal-wrapper');
  modal.style.position = 'fixed';
  modal.innerHTML = addModalTempl();

  //document.querySelector('body').style.overflow = 'hidden';

  let closeBtn = document.querySelector('.icon-close');
  closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal();
  });

  document.querySelector('.icon-check').addEventListener('click', (e) => {
    e.preventDefault();
    submitForm();
  });
}

export function renderEditModal() {
  let modal = document.querySelector('.modal-wrapper');
  modal.style.position = 'fixed';
  modal.innerHTML = editModalTempl();

  //document.querySelector('body').style.overflow = 'hidden';

  let closeBtn = document.querySelector('.icon-close');
  closeBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    closeModal()});

  let trashBtn = document.querySelector('.remove-btn');
  trashBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    renderRemoveModal()});
}

function renderRemoveModal() {
  let modal = document.querySelector('.modal-wrapper');
  modal.style.position = 'fixed';
  modal.innerHTML = removeModalTempl();

  let closeBtn = document.querySelector('.icon-close');
  closeBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    closeModal()
  });
}

function closeModal() {
  let modal = document.querySelector('.modal-wrapper');
  modal.style.position = 'initial';
  modal.innerHTML = '';
  //document.querySelector('body').style.overflow = 'auto';
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

// let tasks = [];

function submitForm(e){
  e.preventDefault();
  console.log('blah');
  let taskType = document.querySelector('input[name="categoryOptions"]:checked').value;
  let priorityType = document.querySelector('input[name="priorityOptions"]:checked').value;
  let date = document.getElementById('taskDeadline').value;
  let taskTitle = document.getElementById('taskTitle').value;
  let taskDesc = document.getElementById('taskDesc').value;
  let estimation = document.querySelector('input[name="estimation"]:checked').value;

  // tasks.push({taskType: taskType,priorityType: priorityType,date: date,taskTitle: taskTitle, taskDesc: taskDesc,estimation: estimation});

  saveTasks({
    taskType: taskType,
    priorityType: priorityType,
    date: date,
    taskTitle: taskTitle,
    taskDesc: taskDesc,
    estimation: estimation
  });
}

function saveTasks(data){
  // database.set(tasks);
  // send as single object
  let newTask = database.push();
  newTask.set(data);
}
