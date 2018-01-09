import addModalTempl from './addTask.hbs';
import editModalTempl from './editTask.hbs';
import removeModalTempl from './removeTask.hbs';
import eventbus from '../../eventBus';
import 'jquery-ui/ui/widgets/datepicker';
import 'webpack-jquery-ui/css';
import 'jquery-ui/themes/base/base.css';
import fireBase from '../../firebase';

import TasksCollectionView from '../../pages/tasks/tasks_view';

class Modal {
  constructor() {
    eventbus.subscribe('renderAddModal', this.renderAddModal.bind(this));
    eventbus.subscribe('renderEditModal', this.renderEditModal.bind(this));
    eventbus.subscribe('renderRemoveModal', this.renderRemoveModal.bind(this));
  }

  renderAddModal(){
    const modal = document.getElementsByClassName('modal-wrapper')[0];

    modal.style.position = 'fixed';
    modal.innerHTML = addModalTempl();
    $('#taskDeadline').datepicker({dateFormat: 'd MM, yy', minDate: 0}).val();
    const closeBtn = document.getElementsByClassName('icon-close')[0];
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.closeModal();
    });

    document.querySelector('.icon-check').addEventListener('click', (e) => {
      e.preventDefault();
      this.saveTasks(this.submitForm(e));
      this.closeModal();
    });
  }

  renderEditModal(data) {
    const modal = document.getElementsByClassName('modal-wrapper')[0];
    modal.style.position = 'fixed';
    modal.innerHTML = editModalTempl(data);

    const form = document.forms.editModal;

    for (let elem of form) {
      elem.checked = elem.value === data.taskType || elem.value === data.priorityType || elem.value === data.estimationTotal;
    }

    $('#taskDeadline').datepicker({dateFormat: 'd MM, yy', minDate: 0}).val();
    const closeBtn = document.getElementsByClassName('icon-close')[0];
    closeBtn.addEventListener('click', (e)=>{
      e.preventDefault();
      this.closeModal()});

    document.querySelector('.icon-check').addEventListener('click', (e) => {
      e.preventDefault();
      this.editTasks(data.taskId,this.submitForm(e));
      this.closeModal();
    });

    const trashBtn = document.getElementsByClassName('remove-btn')[0];
    trashBtn.addEventListener('click', (e)=>{
      e.preventDefault();
      this.renderRemoveModal(data.taskId);
    });

  }

  renderRemoveModal(taskId) {
    const modal = document.getElementsByClassName('modal-wrapper')[0];
    modal.style.position = 'fixed';
    modal.innerHTML = removeModalTempl();

    const closeBtn = document.querySelector('.icon-close');
    closeBtn.addEventListener('click', (e)=>{
      e.preventDefault();
      this.closeModal()});

    const deleteBtn = document.getElementsByClassName('remove-btn')[0];
    deleteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if(Array.isArray(taskId)){
        for(let i in taskId){
          eventbus.emit('deleteTask', taskId[i]);
          TasksCollectionView.removesCounter = 0;
          TasksCollectionView.removesGlobalCounter = 0;
          document.getElementsByClassName('trashCounter')[0].innertext = 0;
          document.getElementsByClassName('trashCounter')[0].style.display = 'none';
        }
      }
      else{
        eventbus.emit('deleteTask', taskId);
      }

      this.closeModal();
    })
  }

  closeModal() {
    const modal = document.querySelector('.modal-wrapper');
    modal.style.position = 'initial';
    modal.innerHTML = '';
  }

  submitForm(e){
    e.preventDefault();
    console.log('blah blah data sent');
    const taskType = document.querySelector('input[name="categoryOptions"]:checked').value;
    const priorityType = document.querySelector('input[name="priorityOptions"]:checked').value;
    const deadline = document.getElementById('taskDeadline').value;
    const taskTitle = document.getElementById('taskTitle').value;
    const taskDesc = document.getElementById('taskDesc').value;
    const estimation = document.querySelector('input[name="estimation"]:checked').value;

    return {
      taskType: taskType,
      priorityType: priorityType,
      deadline: deadline,
      taskTitle: taskTitle,
      taskDesc: taskDesc,
      estimationTotal: estimation
    };
  }

  editTasks(taskId, data){
    fireBase.updateTask(taskId, data);
    fireBase.getTasks();
  }

  saveTasks(data){
    eventbus.emit('createTask', data);
  }
}

export const modal = new Modal();

