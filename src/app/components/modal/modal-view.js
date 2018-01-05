import addModalTempl from './addTask.hbs';
import editModalTempl from './editTask.hbs';
import removeModalTempl from './removeTask.hbs';

import eventbus from '../../eventBus';

export class ModalView {
  constructor() {
    eventbus.subscribe('renderAddModal', renderAddModal.bind(this));
    eventbus.subscribe('renderEditModal', renderEditModal.bind(this));
    eventbus.subscribe('renderRemoveModal', renderRemoveModal.bind(this));
  }
  renderAddModal() {
    const modal = document.getElementsByClass('.modal-wrapper')[0];
    modal.style.position = 'fixed';
    modal.innerHTML = addModalTempl();

    const closeBtn = document.getElementsByClass('.icon-close')[0];
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.closeModal();
    });

    document.getElementsByClass('.icon-check')[0].addEventListener('click', (e) => {
      e.preventDefault();
      this.submitForm(e);
      this.closeModal();
    });
  }

  renderEditModal() {
    const modal = document.getElementsByClass('.modal-wrapper')[0];
    modal.style.position = 'fixed';
    modal.innerHTML = editModalTempl();

    const closeBtn = document.getElementsByClass('.icon-close')[0];
    closeBtn.addEventListener('click', (e)=>{
      e.preventDefault();
      this.closeModal()});

    const trashBtn = document.getElementsByClass('.remove-btn')[0];
    trashBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.renderRemoveModal()});
  }

  renderRemoveModal() {
    const modal = document.getElementsByClass('.modal-wrapper')[0];
    modal.style.position = 'fixed';
    modal.innerHTML = removeModalTempl();

    const closeBtn = document.getElementsByClass('.icon-close')[0];
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.closeModal()});
  }

  closeModal() {
    const modal = document.getElementsByClass('.modal-wrapper')[0];
    modal.style.position = 'initial';
    modal.innerHTML = '';
  }

  submitForm(e){
    e.preventDefault();
    console.log('blah blah data sent');
    const taskType        = document.querySelector('input[name="categoryOptions"]:checked').value;
    const priorityType    = document.querySelector('input[name="priorityOptions"]:checked').value;
    const deadline        = document.getElementById('taskDeadline').value;
    const taskTitle       = document.getElementById('taskTitle').value;
    const taskDesc        = document.getElementById('taskDesc').value;
    const estimationTotal = document.querySelector('input[name="estimation"]:checked').value;

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
