import addModalTempl from './addTask.hbs';
import editModalTempl from './editTask.hbs';
import removeModalTempl from './removeTask.hbs';
import * as firebase from 'firebase';
import eventbus from '../../eventBus';


class Modal {
  renderAddModal(){
    const modal = document.querySelector('.modal-wrapper');
    modal.style.position = 'absolute';
    modal.innerHTML = addModalTempl();

    const closeBtn = document.querySelector('.icon-close');
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.closeModal();
    });

    document.querySelector('.icon-check').addEventListener('click', (e) => {
      e.preventDefault();
      this.submitForm(e);
      this.closeModal();
    });
  }

  renderEditModal() {
    const modal = document.querySelector('.modal-wrapper');
    modal.style.position = 'absolute';
    modal.innerHTML = editModalTempl();

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
    modal.style.position = 'absolute';
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
  }

  submitForm(e){
    e.preventDefault();
    console.log('blah blah data sent');
    let taskType = document.querySelector('input[name="categoryOptions"]:checked').value;
    let priorityType = document.querySelector('input[name="priorityOptions"]:checked').value;
    let deadline = document.getElementById('taskDeadline').value;
    let taskTitle = document.getElementById('taskTitle').value;
    let taskDesc = document.getElementById('taskDesc').value;
    let estimation = document.querySelector('input[name="estimation"]:checked').value;

    this.saveTasks({
      taskType: taskType,
      priorityType: priorityType,
      deadline: deadline,
      taskTitle: taskTitle,
      taskDesc: taskDesc,
      estimation: estimation
    });
  }

  saveTasks(data){
    eventbus.emit('createTask', data);
    // let newTask = database.push();
    // newTask.set(data);
  }
}


//
// let database = firebase.database().ref("tasks");
//
// let printRef = firebase.database().ref("tasks");
// printRef.on('value', function (snapshot) {
//   console.log(snapshot.val());
// });

export let modal = new Modal();

eventbus.subscribe('renderAddModal', modal.renderAddModal.bind(modal));
eventbus.subscribe('renderEditModal', modal.renderEditModal.bind(modal));
eventbus.subscribe('renderRemoveModal', modal.renderRemoveModal.bind(modal));
