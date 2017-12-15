let addModalTempl = require('./addTask.hbs');
let editModalTempl = require('./editTask.hbs');
let removeModalTempl = require('./removeTask.hbs');


export function renderAddModal() {
  let modal = document.querySelector('.modal-wrapper');
  modal.style.position = 'fixed';
  modal.innerHTML = addModalTempl();

  let closeBtn = document.querySelector('.icon-close');
  closeBtn.addEventListener('click', closeModal);

  document.querySelector('.icon-check').addEventListener('click', submitForm);
}


export function renderEditModal() {
  let modal = document.querySelector('.modal-wrapper');
  modal.style.position = 'fixed';
  modal.innerHTML = editModalTempl();

  let closeBtn = document.querySelector('.icon-close');
  closeBtn.addEventListener('click', closeModal);

  let trashBtn = document.querySelector('.icon-trash');
  trashBtn.addEventListener('click', renderRemoveModal);
}

export function renderRemoveModal() {
  let modal = document.querySelector('.modal-wrapper');
  modal.style.position = 'fixed';
  modal.innerHTML = removeModalTempl();

  let closeBtn = document.querySelector('.icon-close');
  closeBtn.addEventListener('click', closeModal);
}


function closeModal() {
  let modal = document.querySelector('.modal-wrapper');
  modal.style.position = 'initial';
  modal.innerHTML = '';
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
