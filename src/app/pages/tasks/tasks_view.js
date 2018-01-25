import tasksTempl from './tasks.hbs';
import globalListTempl from './global-tasks.hbs';
import dailyListTempl from './daily_tasks.hbs';
import completedListTempl from './done_tasks.hbs';
import completedGlobalListTempl from './done_global_tasks.hbs';
import firstEntranceTempl  from './first_entrance.hbs';
import eventbus from '../../eventBus';
import fireBase from '../../firebase';
import '../../tooltip';
$('.nav-link').tooltip();
/**
 * Class representing Tasks Collection View
 * @namespace  TaskView
 */
export default class TasksCollectionView {
  /**
   * Create a model.
   * @param {object} model - model for task page
   * @memberOf TaskView
   * constructor of TaskView
   * @constructs TaskView
   */
  constructor(model) {
    this.model = model;
    this.removesCounter = 0;
    this.removesGlobalCounter = 0;
    this.dailyItems = document.getElementsByName('commonTask');
    this.globalItems = document.getElementsByName('deleteGlobalTask');
    this.globalOpened = false;
    this.trashMode = false;
    this.selectedBtn;
    eventbus.subscribe('renderTasksTempl', this.render.bind(this));
    eventbus.subscribe('renderTrashMode', this.renderTrashMode.bind(this));
    eventbus.subscribe('showTaskIcons', this.showTaskIcons.bind(this));
    eventbus.subscribe('hideTaskIcons', this.hideTaskIcons.bind(this));
  }

  /**
   * Render the tasks list page
   * @memberOf TaskView
   */
  render() {
    const globalTasks = this.model.getGlobalTasksData();
    const main = document.getElementsByTagName('main')[0];

    if(sessionStorage.getItem('newUser')) {

      main.innerHTML = tasksTempl();
      this.renderDailyTasks();
      $('.globalList-btn').tooltip();
      $('.edit-btn').tooltip();
      const tasktabs = document.getElementsByClassName('tasks-tabs')[0];
      const toDoBtn = document.getElementsByClassName('toDo-btn')[0];
      const doneBtn = document.getElementsByClassName('done')[0];
      this.highlight(toDoBtn);

      tasktabs.addEventListener('click',(e) =>{
        let target = e.target;
        if(target.classList.contains('filter-item')) {
          this.highlight(target);
        }
      });


      if(this.trashMode){
        this.trashMode=false;
        this.renderTrashMode();
      }

      const addBtn = document.getElementsByClassName('addTask-btn')[0];
      const globalListCtn = document.getElementsByClassName('globalList-ctn')[0];
      const globalListBtn = document.getElementsByClassName('globalList-btn')[0];
      eventbus.emit('showTaskIcons');

      const taskHeaderBtn = document.getElementsByClassName('icon-list')[0];
      taskHeaderBtn.addEventListener('click', () => {
        if(this.trashMode){
          this.renderTrashMode();
        }
      });

      toDoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.renderDailyTasks();
      });

      addBtn.addEventListener('click', (e) => {
        e.preventDefault();
        eventbus.emit('renderAddModal');
      });

      doneBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.renderCompletedTasks();
      });

      if(main){
        main.addEventListener('click',(e)=> {

          const target = e.target;

          if(target.classList.contains('edit-btn')) {
            e.preventDefault();
            const taskId = target.parentElement.parentElement.dataset.attribute;
            eventbus.emit('renderEditModal', this.model.data[taskId]);
          }

          if(target.classList.contains('priority-ctn')) {
            const taskId = target.parentElement.dataset.attribute;
            localStorage.setItem('taskId', JSON.stringify(this.model.data[taskId]));
          }

          if(target.classList.contains('td-btn')) {
            if(target.previousElementSibling.name === 'commonTask') {
              if (target.previousElementSibling.checked === false) {
                this.removesCounter++;
              } else {
                this.removesCounter--;
              }
            }
            if(target.previousElementSibling.name === 'deleteGlobalTask') {
              if (target.previousElementSibling.checked === false) {
                this.removesGlobalCounter++;
              } else {
                this.removesGlobalCounter--;
              }
            }
            document.getElementsByClassName('trashCounter')[0].innerText = this.removesGlobalCounter + this.removesCounter;
            this.renderCounter();
          }

          if(target.classList.contains('global-timer')) {
            eventbus.emit('renderNotif', 'error', 'To start timer, move task to daily list');
          }
        });
      }

      globalListCtn.innerHTML = globalListTempl(globalTasks);
      globalListBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.renderGlobalList();
      });
    }

    else {
      sessionStorage.setItem('newUser','U');
      main.innerHTML = firstEntranceTempl();
      eventbus.emit('hideTaskIcons');
      document.querySelector('.addTask-btn').addEventListener('click', (e) => {
        e.preventDefault();
        eventbus.emit('renderAddModal');
      }
      );
      document.querySelector('.skip-btn').addEventListener('click', (e) => {
        e.preventDefault();
        eventbus.emit('renderTasksTempl');
        eventbus.emit('saveSettings');
      });
    }
  }

  /**
   * Render the daily tasks list
   * @memberOf TaskView
   */
  renderDailyTasks() {
    const tasksList = document.getElementsByClassName('tasks-ctn')[0];
    const globalListCtn = document.getElementsByClassName('globalList-ctn')[0];
    const dailyTasks = this.model.getDailyTasksData();
    const globalTasks = this.model.getGlobalTasksData();
    tasksList.innerHTML = dailyListTempl(dailyTasks);
    globalListCtn.innerHTML = globalListTempl(globalTasks);

    if(this.trashMode){
      this.trashMode=false;
      this.renderTrashMode();
    }
  }

  /**
   * Render the completed tasks list
   * @memberOf TaskView
   */
  renderCompletedTasks() {
    const completedTasks = this.model.getCompletedTasksData();
    const completedGlobalTasks = this.model.getCompletedGlobalTasksData();
    const tasksList = document.getElementsByClassName('tasks-ctn')[0];
    const globalListCtn = document.getElementsByClassName('globalList-ctn')[0];
    tasksList.innerHTML = completedListTempl(completedTasks);

    globalListCtn.innerHTML = completedGlobalListTempl(completedGlobalTasks);
    if(this.trashMode){
      this.trashMode=false;
      this.renderTrashMode();
    }
  }

  /**
   * Change status of global task to daily
   * @memberOf TaskView
   */
  moveToDaily() {
    const moveBtns = document.getElementsByClassName('globalList-ctn')[0];
    const dailyTasks = this.model.getDailyTasksData();
    moveBtns.addEventListener('click',(e)=>{
      const target = e.target;
      if(target.classList.contains('icon-arrows-up')) {
        if(dailyTasks.tasks.length < 5) {
          const taskId = target.parentElement.parentElement.childNodes[1].childNodes[1].value;
          fireBase.updateTask(taskId, {isActive: true});
          fireBase.getTasks();
          eventbus.emit('renderNotif', 'info', 'Task is daily now');
        }  else {
          eventbus.emit('renderNotif', 'error', 'Daily limit of tasks has been reached');
        }
      }
    });
  }

  /**
   * Hide trash icon from header
   * @memberOf TaskView
   */
  hideTaskIcons() {
    const trashIcon = document.getElementsByClassName('icon-trash')[0];
    trashIcon.parentElement.classList.add('hide');
    const addIcon = document.getElementsByClassName('icon-add')[0];
    addIcon.parentElement.classList.add('hide');
  }

  /**
   * Show trash icon from header
   * @memberOf TaskView
   */
  showTaskIcons() {
    const trashIcon = document.getElementsByClassName('icon-trash')[0];
    trashIcon.parentElement.classList.remove('hide');
    const addIcon = document.getElementsByClassName('icon-add')[0];
    addIcon.parentElement.classList.remove('hide');
  }

  /**
   * Render global tasks list
   * @memberOf TaskView
   */
  renderGlobalList() {
    const globalListWrapper = document.getElementsByClassName('globalList-wrapper')[0];
    const globalListBtn = document.querySelector('.globalList-btn span');
    const globalListCtn = document.getElementsByClassName('globalList-ctn')[0];

    const all = document.getElementsByClassName('all')[0];
    const urgent = document.getElementsByClassName('urgent')[0];
    const high = document.getElementsByClassName('high')[0];
    const middle = document.getElementsByClassName('middle')[0];
    const low = document.getElementsByClassName('low')[0];

    const filterAll = this.model.getGlobalTasksData();
    const filterUrgent = this.model.getFilteredGlobalTasksData('priority-urgent');
    const filterHigh = this.model.getFilteredGlobalTasksData('priority-high');
    const filterMiddle = this.model.getFilteredGlobalTasksData('priority-middle');
    const filterLow = this.model.getFilteredGlobalTasksData('priority-low');
    const filterNav = document.getElementsByClassName('filter-tabs')[0];
    $('.priority-ctn').tooltip();
    $('.edit-btn').tooltip();
    if(!this.globalOpened){
      globalListWrapper.classList.remove('hide');
      globalListBtn.className = 'icon-global-list-arrow-down';

      this.highlight(all);

      filterNav.addEventListener('click',(e) =>{
        let target = e.target;
        if(target.classList.contains('filter-item')) {
          this.highlight(target);
        }
      });

      all.addEventListener('click', (e) => {
        e.preventDefault();
        globalListCtn.innerHTML = globalListTempl(filterAll);
        if(this.trashMode){
          this.trashMode=false;
          this.renderTrashMode();
        }
      });

      urgent.addEventListener('click', (e) => {
        e.preventDefault();
        globalListCtn.innerHTML = globalListTempl(filterUrgent);
        if(this.trashMode){
          this.trashMode=false;
          this.renderTrashMode();
        }
      });

      high.addEventListener('click', (e) => {
        e.preventDefault();
        globalListCtn.innerHTML = globalListTempl(filterHigh);
        if(this.trashMode){
          this.trashMode=false;
          this.renderTrashMode();
        }
      });

      middle.addEventListener('click', (e) => {
        e.preventDefault();
        globalListCtn.innerHTML = globalListTempl(filterMiddle);
        if(this.trashMode){
          this.trashMode=false;
          this.renderTrashMode();
        }
      });

      low.addEventListener('click', (e) => {
        e.preventDefault();
        globalListCtn.innerHTML = globalListTempl(filterLow);
        if(this.trashMode){
          this.trashMode=false;
          this.renderTrashMode();
        }
      });

      this.globalOpened = true;
      this.moveToDaily();
    }
    else{
      globalListWrapper.classList.add('hide');
      globalListBtn.className = 'icon-global-list-arrow-right';
      this.globalOpened = false;
    }
  }

  /**
   * Toggle class 'active' of selected element
   * @param {HTMLElement} el - selected DOM element
   * @memberOf TaskView
   */
  highlight(el){
    if(this.selectedBtn){
      this.selectedBtn.classList.remove('active');
    }
    this.selectedBtn = el;
    this.selectedBtn.classList.add('active');
  }

  /**
   * Render trash mode for tasks
   * @memberOf TaskView
   */
  renderTrashMode() {
    const trashBtn = document.getElementsByClassName('tasks-list');
    const selectTabs = document.getElementsByClassName('select-tabs');
    if(!this.trashMode){

      for(let i=0; i < trashBtn.length; i++){
        trashBtn[i].classList.add('deleteMode');
      }
      for(let i=0; i < selectTabs.length; i++){
        selectTabs[i].classList.remove('hide');
      }

      this.trashModeEventListeners();
      this.trashMode = true;
    } else {
      for(let i=0; i < trashBtn.length; i++){
        trashBtn[i].classList.remove('deleteMode');
      }
      for(let i=0; i < selectTabs.length; i++){
        selectTabs[i].classList.add('hide');
      }
      this.trashMode = false;
    }
  }

  /**
   * Render counter of selected tasks to delete
   * @memberOf TaskView
   */
  renderCounter() {
    const counter = document.getElementsByClassName('trashCounter')[0];
    if(counter.innerText==='0') {
      counter.style.display = 'none';
      counter.innerText = '';
    } else {
      counter.style.display = 'block';
    }
  }

  /**
   * Add eventlisteners to elements, when 'trash mode' is active
   * @memberOf TaskView
   */
  trashModeEventListeners() {
    const selectBtn = document.getElementsByClassName('selectAll')[0];
    const deselectBtn = document.getElementsByClassName('deselectAll')[0];
    const selectGlobalBtn = document.getElementsByClassName('selectAllGlobal')[0];
    const deselectGlobalBtn = document.getElementsByClassName('deselectAllGlobal')[0];
    selectBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.selectAll();}
    );

    deselectBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.deselectAll();}
    );

    selectGlobalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.selectAllGlobal();}
    );

    deselectGlobalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.deselectAllGlobal();}
    );
  }

  /**
   * Select all daily/completed tasks
   * @memberOf TaskView
   */
  selectAll() {
    for(let i=0; i < this.dailyItems.length; i++){
      if(this.dailyItems[i].checked === false){
        this.dailyItems[i].checked = true;
        this.removesCounter++;
      }
    }
    document.getElementsByClassName('trashCounter')[0].innerText = this.removesGlobalCounter + this.removesCounter;
    this.renderCounter();
  }

  /**
   * Deselect all daily/completed tasks
   * @memberOf TaskView
   */
  deselectAll() {
    for(let i=0; i < this.dailyItems.length; i++){
      if(this.dailyItems[i].checked === true){
        this.dailyItems[i].checked = false;
        this.removesCounter--;
      }
    }
    document.getElementsByClassName('trashCounter')[0].innerText = this.removesGlobalCounter + this.removesCounter;
    this.renderCounter();
  }

  /**
   * Select all global tasks
   * @memberOf TaskView
   */
  selectAllGlobal() {
    for(let i=0; i < this.globalItems.length; i++){
      if(this.globalItems[i].checked === false){
        this.globalItems[i].checked = true;
        this.removesGlobalCounter++;
      }
    }
    document.getElementsByClassName('trashCounter')[0].innerText = this.removesGlobalCounter + this.removesCounter;
    this.renderCounter();
  }

  /**
   * Deselect all global tasks
   * @memberOf TaskView
   */
  deselectAllGlobal() {
    for(let i=0; i < this.globalItems.length; i++){
      if(this.globalItems[i].checked === true){
        this.globalItems[i].checked = false;
        this.removesGlobalCounter--;
      }
    }
    document.getElementsByClassName('trashCounter')[0].innerText = this.removesGlobalCounter + this.removesCounter;
    this.renderCounter();
  }
}


