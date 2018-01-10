import tasksTempl from './tasks.hbs';
import globalListTempl from './global-tasks.hbs';
import completedListTempl from './done_tasks.hbs';
import firstEntranceTempl  from './first_entrance.hbs';
import Timer from  '../timer/timer'
import eventbus from '../../eventBus';
import fireBase from '../../firebase';

export default class TasksCollectionView {
  constructor(model) {
    this.model = model;
    this.removesCounter = 0;
    this.removesGlobalCounter = 0;
    this.dailyItems = document.getElementsByName('commonTask');
    this.globalItems = document.getElementsByName('deleteGlobalTask');
    this.globalOpened = false;
    this.commonChecked = false;
    this.globalChecked = false;
    this.selectedBtn;
    eventbus.subscribe('renderTasksTempl', this.render.bind(this));
    eventbus.subscribe('renderTrashMode', this.renderTrashMode.bind(this));
    eventbus.subscribe('showTrashIcon', this.showTrashIcon.bind(this));
    eventbus.subscribe('hideTrashIcon', this.hideTrashIcon.bind(this));
  }

  render() {
    const globalTasks = this.model.getGlobalTasksData();
    const dailyTasks = this.model.getDailyTasksData();
    const main = document.getElementsByTagName('main')[0];
    if(sessionStorage.getItem('newUser')) {

      main.innerHTML = tasksTempl(dailyTasks);
      const addBtn = document.getElementsByClassName('addTask-btn')[0];
      const doneBtn = document.getElementsByClassName('done')[0];
      const tasksList = document.getElementsByClassName('tasks-list')[0];
      const globalListCtn = document.getElementsByClassName('globalList-ctn')[0];
      const globalListBtn = document.getElementsByClassName('globalList-btn')[0];

      eventbus.emit('showTrashIcon');

      addBtn.addEventListener('click', (e) => {
          e.preventDefault();
          eventbus.emit('renderAddModal');
        }
      );

      doneBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.renderCompletedTasks();
      });

      if(main){
        main.addEventListener('click',(e)=> {
          e.stopImmediatePropagation();
          const target = e.target;

          if(target.classList.contains('edit-btn')) {
            const taskId = target.parentElement.parentElement.dataset.attribute;
            eventbus.emit('renderEditModal', this.model.data[taskId]);
          }

          if(target.classList.contains('priority-ctn')) {
            const taskId = target.parentElement.dataset.attribute;
            console.log(this.model.data[taskId]);
            localStorage.setItem('taskId', JSON.stringify(this.model.data[taskId]));
          }
        });
      }

      console.log(dailyTasks);
      console.log(globalTasks);
      globalListCtn.innerHTML = globalListTempl(globalTasks);
      globalListBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.renderGlobalList();
        }
      );
    }

    else {
      sessionStorage.setItem('newUser','U');
      main.innerHTML = firstEntranceTempl();
      eventbus.emit('hideTrashIcon');
      document.querySelector('.addTask-btn').addEventListener('click', (e) => {
          e.preventDefault();
          eventbus.emit('renderAddModal');
        }
      );
      document.querySelector('.skip-btn').addEventListener('click', (e) => {
          e.preventDefault();
          eventbus.emit('renderTasksTempl');
          eventbus.emit('saveSettings');
        }
      );
    }
  }

  renderCompletedTasks() {
    const completedTasks = this.model.getCompletedTasksData();
    const tasksList = document.getElementsByClassName('tasks-ctn')[0];
    const globalListCtn = document.getElementsByClassName('globalList-wrapper')[0];
    const globalListBtn = document.getElementsByClassName('globalList-btn')[0];
    globalListBtn.classList.add('hide');
    globalListCtn.classList.add('hide');
    tasksList.innerHTML = completedListTempl(completedTasks);
  }

  moveToDaily() {
    const moveBtns = document.getElementsByClassName('globalList-ctn')[0];
    const main = document.getElementsByTagName('main')[0];
    moveBtns.addEventListener('click',(e)=>{
      const target = e.target;
      if(target.classList.contains('icon-arrows-up')) {
        const taskId = target.parentElement.parentElement.childNodes[1].childNodes[1].value;
        fireBase.updateTask(taskId, { isActive: true });
        fireBase.getTasks();
      }
    });
  }

  hideTrashIcon() {
    const trashIcon = document.getElementsByClassName('icon-trash')[0];
    trashIcon.parentElement.classList.add('hide');
  }

  showTrashIcon() {
    const trashIcon = document.getElementsByClassName('icon-trash')[0];
    trashIcon.parentElement.classList.remove('hide');
  }

  renderGlobalList() {
    const globalListWrapper = document.getElementsByClassName("globalList-wrapper")[0];
    const globalListBtn = document.querySelector(".globalList-btn span");
    const globalListCtn = document.getElementsByClassName("globalList-ctn")[0];

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
      });

      urgent.addEventListener('click', (e) => {
        e.preventDefault();
        globalListCtn.innerHTML = globalListTempl(filterUrgent);
      });

      high.addEventListener('click', (e) => {
        e.preventDefault();
        globalListCtn.innerHTML = globalListTempl(filterHigh);
      });

      middle.addEventListener('click', (e) => {
        e.preventDefault();
        globalListCtn.innerHTML = globalListTempl(filterMiddle);
      });

      low.addEventListener('click', (e) => {
        e.preventDefault();
        globalListCtn.innerHTML = globalListTempl(filterLow);
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

  highlight(el){
    if(this.selectedBtn){
      this.selectedBtn.classList.remove('active');
    }
    this.selectedBtn = el;
    this.selectedBtn.classList.add('active');
  }

  renderTrashMode(){
    const trashBtn = document.getElementsByClassName('tasks-list');
    const selectTabs = document.getElementsByClassName('select-tabs');
    const selectBtn = document.getElementsByClassName('selectAll')[0];
    const deselectBtn = document.getElementsByClassName('deselectAll')[0];
    const selectGlobalBtn = document.getElementsByClassName('selectAllGlobal')[0];
    const deselectGlobalBtn = document.getElementsByClassName('deselectAllGlobal')[0];


    for(let i=0; i < trashBtn.length; i++){
      trashBtn[i].classList.toggle('deleteMode');//add
    }

    for(let i=0; i < selectTabs.length; i++){
      selectTabs[i].classList.toggle('hide');//remove
    }

    selectBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.selectAll()}
    );

    deselectBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.deselectAll()}
    );

    selectGlobalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.selectAllGlobal()}
    );

    deselectGlobalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.deselectAllGlobal()}
    );
  }

  selectAll() {
    for(let i=0; i < this.dailyItems.length; i++){
      this.dailyItems[i].checked = true;
    }
    this.countRemoves();
  }

  deselectAll() {
    const counter = document.getElementsByClassName('trashCounter')[0];
    for(let i=0; i < this.dailyItems.length; i++){
      this.dailyItems[i].checked = false;
    }
    this.recountRemoves();
    if(counter.innerText==='0') {
      counter.style.display = 'none';
    }
  }

  selectAllGlobal() {
    for(let i = 0; i < this.globalItems.length; i++){
      this.globalItems[i].checked = true;
    }
    this.countGlobalRemoves();
  }

  deselectAllGlobal() {
    const counter = document.getElementsByClassName('trashCounter')[0];
    //for(let i in arr)//ask this
    for(let i = 0; i < this.globalItems.length; i++){
      this.globalItems[i].checked = false;
    }
    this.recountGlobalRemoves();
    if(counter.innerText==='0') {
      counter.style.display = 'none';
    }
  }

  countRemoves() {
    if(!this.commonChecked){
      for(let i in this.dailyItems) {
        if(this.dailyItems[i].checked === true) {
          this.removesCounter++;
        }
      }
    document.querySelector('.trashCounter').style.display = 'block';
    document.querySelector('.trashCounter').innerText = this.removesGlobalCounter + this.removesCounter;
    this.commonChecked=true;
    }
  }

  recountRemoves() {
    if(this.removesCounter!=0) {
      for(let i in this.dailyItems) {
        if(this.dailyItems[i].checked === false) {
          this.removesCounter--;
        }
      }
    document.querySelector('.trashCounter').innerText = this.removesGlobalCounter + this.removesCounter;
    this.commonChecked=false;
    }
  }

  countGlobalRemoves() {
    if(!this.globalChecked){
      for(let i in this.globalItems) {
        if(this.globalItems[i].checked === true) {
          this.removesGlobalCounter++;
        }
      }
    document.querySelector('.trashCounter').style.display = 'block';
    document.querySelector('.trashCounter').innerText = this.removesGlobalCounter + this.removesCounter;
    this.globalChecked=true;
    }

  }

  recountGlobalRemoves() {
    if(this.removesGlobalCounter!=0) {
      for(let i in this.globalItems) {
        if(this.globalItems[i].checked === false) {
          this.removesGlobalCounter--;
        }
      }
    document.querySelector('.trashCounter').innerText = this.removesGlobalCounter + this.removesCounter;
    this.globalChecked=false;
    }
  }
}

