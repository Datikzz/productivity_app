import addModalTempl from './addTask.hbs';
import editModalTempl from './editTask.hbs';
import removeModalTempl from './removeTask.hbs';

import { EventBus } from '../../eventBus';

export class ModalView {
  constructor() {
    EventBus.subscribe('renderAddModal', renderAddModal.bind(this));
    EventBus.subscribe('renderEditModal',
    renderEditModal.bind(this));
    EventBus.subscribe('renderRemoveModal', renderRemoveModal.bind(this));
  }
  renderAddModal() {
    const modal = document.querySelector('.modal-wrapper');
    modal.style.position = 'fixed';
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
    modal.style.position = 'fixed';
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
  }

  submitForm(e){
    e.preventDefault();
    console.log('blah blah data sent');
    let taskType = document.querySelector('input[name="categoryOptions"]:checked').value;
    let priorityType = document.querySelector('input[name="priorityOptions"]:checked').value;
    let deadline = document.getElementById('taskDeadline').value;
    let taskTitle = document.getElementById('taskTitle').value;
    let taskDesc = document.getElementById('taskDesc').value;
    let estimationTotal = document.querySelector('input[name="estimation"]:checked').value;

    return{
      taskType: taskType,
      priorityType: priorityType,
      deadline: deadline,
      taskTitle: taskTitle,
      taskDesc: taskDesc,
      estimationTotal: estimationTotal,
    };
  }
}
