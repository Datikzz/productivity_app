import addModalTempl from './addTask.hbs';
import editModalTempl from './editTask.hbs';
import removeModalTempl from './removeTask.hbs';
import eventbus from '../../eventBus';
import 'jquery-ui/ui/widgets/datepicker';
import 'webpack-jquery-ui/css';
import 'jquery-ui/themes/base/base.css';

class Modal {
  renderAddModal(){
    const modal = document.querySelector('.modal-wrapper');
    modal.style.position = 'fixed';
    modal.innerHTML = addModalTempl();
    $('#taskDeadline').datepicker();
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
  }
}

export const modal = new Modal();

eventbus.subscribe('renderAddModal', modal.renderAddModal.bind(modal));
eventbus.subscribe('renderEditModal', modal.renderEditModal.bind(modal));
eventbus.subscribe('renderRemoveModal', modal.renderRemoveModal.bind(modal));
