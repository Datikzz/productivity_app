import addModalTempl from './addTask.hbs';
import editModalTempl from './editTask.hbs';
import removeModalTempl from './removeTask.hbs';
import eventbus from '../../eventBus';
import 'jquery-ui/ui/widgets/datepicker';
import 'webpack-jquery-ui/css';
import 'jquery-ui/themes/base/base.css';
import fireBase from '../../firebase';
import TasksCollectionView from '../../pages/tasks/tasks_view';

/**
 * Class representing modal view
 * @namespace  Modal
 */
class Modal {
  /**
   * constructor of Modal
   * @constructs Modal
   * @memberOf Modal
   */
  constructor() {
    eventbus.subscribe('renderAddModal', this.renderAddModal.bind(this));
    eventbus.subscribe('renderEditModal', this.renderEditModal.bind(this));
    eventbus.subscribe('renderRemoveModal', this.renderRemoveModal.bind(this));
  }

  /**
   * Render 'Add' modal block
   * @memberOf Modal
   */
  renderAddModal(){
    const modal = document.getElementsByClassName('modal-wrapper')[0];

    modal.style.position = 'fixed';
    modal.innerHTML = addModalTempl();
    const body = document.getElementsByTagName('body')[0];
    body.style.overflowY = 'hidden';
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
      eventbus.emit('renderNotif', 'info', 'Task added');
    });
  }

  /**
   * Render 'Edit' modal block
   * @memberOf Modal
   * @param {object} data - The data of selected task to edit
   */
  renderEditModal(data) {
    const modal = document.getElementsByClassName('modal-wrapper')[0];
    modal.style.position = 'fixed';
    modal.innerHTML = editModalTempl(data);
    const body = document.getElementsByTagName('body')[0];
    body.style.overflowY = 'hidden';
    const form = document.forms.editModal;

    if(data){
      for (let elem of form) {
        elem.checked = elem.value === data.taskType || elem.value === data.priorityType || elem.value === data.estimationTotal;
      }
    }


    $('#taskDeadline').datepicker({dateFormat: 'd MM, yy', minDate: 0}).val();
    const closeBtn = document.getElementsByClassName('icon-close')[0];
    closeBtn.addEventListener('click', (e)=>{
      e.preventDefault();
      this.closeModal();});

    document.querySelector('.icon-check').addEventListener('click', (e) => {
      e.preventDefault();
      this.editTasks(data.taskId,this.submitForm(e));
      this.closeModal();
      eventbus.emit('renderNotif', 'info', 'Task edited');
    });

    const trashBtn = document.getElementsByClassName('remove-btn')[0];
    trashBtn.addEventListener('click', (e)=>{
      e.preventDefault();
      this.renderRemoveModal(data.taskId);
    });

  }

  /**
   * Render 'Edit' modal block
   * @memberOf Modal
   * @param {number} taskId - The id of selected task to remove
   */
  renderRemoveModal(taskId) {
    const modal = document.getElementsByClassName('modal-wrapper')[0];
    modal.style.position = 'fixed';
    modal.innerHTML = removeModalTempl();
    const body = document.getElementsByTagName('body')[0];
    body.style.overflowY = 'hidden';

    const closeBtn = document.querySelector('.icon-close');
    closeBtn.addEventListener('click', (e)=>{
      e.preventDefault();
      this.closeModal();
    });

    const cancelBtn = document.getElementsByClassName('cancelRemove')[0];
    cancelBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.closeModal();
    });

    const deleteBtn = document.getElementsByClassName('remove-btn')[0];
    deleteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if(Array.isArray(taskId)){
        for(let i in taskId){
          eventbus.emit('deleteTask', taskId[i]);
          eventbus.emit('renderNotif', 'info', `${taskId.length} selected tasks deleted`);
        }
      }
      else{
        eventbus.emit('deleteTask', taskId);
        eventbus.emit('renderNotif', 'info', 'Selected task deleted');
      }
      TasksCollectionView.removesCounter = 0;
      TasksCollectionView.removesGlobalCounter = 0;
      document.getElementsByClassName('trashCounter')[0].style.display = 'none';
      document.getElementsByClassName('trashCounter')[0].innerText = 0 ;
      this.closeModal();
    });
  }

  /**
   * Hide modal block
   * @memberOf Modal
   */
  closeModal() {
    const modal = document.querySelector('.modal-wrapper');
    modal.style.position = 'initial';
    modal.innerHTML = '';
    const body = document.getElementsByTagName('body')[0];
    body.style.overflowY = 'auto';
  }

  /**
   * Get values from form fields
   * @memberOf Modal
   * @param {Event} e
   * @returns {object} The object
   */
  submitForm(e){
    e.preventDefault();
    const taskType = document.querySelector('input[name="categoryOptions"]:checked').value ;
    const priorityType = document.querySelector('input[name="priorityOptions"]:checked').value;
    const deadline = Date.parse(document.getElementById('taskDeadline').value) || Date.now();
    const taskTitle = document.getElementById('taskTitle').value || 'Add Title';
    const taskDesc = document.getElementById('taskDesc').value || 'Add Description';
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

  /**
   * Edit tasks values
   * @memberOf Modal
   * @param {number} taskId - Id of selected task to edit
   * @param {object} data - Values of selected task to edit
   */
  editTasks(taskId, data){
    eventbus.emit('updateTask', taskId, data);
    fireBase.getTasks();
  }

  /**
   * Create new task
   * @memberOf Modal
   * @param {object} data - Values of new task
   */
  saveTasks(data){
    eventbus.emit('createTask', data);
  }
}

export const modal = new Modal();

