import tasksTempl from './tasks.hbs';
import globalListTempl from './global-tasks.hbs';
import firstEntranceTempl  from './first_entrance.hbs';
import eventbus from '../../eventBus';




export default class TasksCollectionView {
  constructor(model) {
    this.model = model;
    eventbus.subscribe('renderTasksTempl', this.render.bind(this));
    eventbus.subscribe('renderTrashMode', this.renderTrashMode.bind(this));
    eventbus.subscribe('hideTrashIcon', this.hideTrashIcon.bind(this));
    eventbus.subscribe('showTrashIcon', this.showTrashIcon.bind(this));
  }

  render() {
    const context = this.model.getTasksData();
    const main = document.getElementsByTagName('main')[0];
    if(sessionStorage.getItem('newUser')){




      main.innerHTML = tasksTempl(context);
      const addBtn = document.getElementsByClassName('addTask-btn')[0];
      const tasksList = document.getElementsByClassName('tasks-list')[0];
      const globalListCtn = document.getElementsByClassName('globalList-ctn')[0];
      const globalListBtn = document.getElementsByClassName('globalList-btn')[0];
      eventbus.emit('showTrashIcon');
      addBtn.addEventListener('click', (e) => {
          e.preventDefault();
          eventbus.emit('renderAddModal');
        }
      );

      tasksList.addEventListener('click',(e)=>{
        const target = e.target;
        if(target.classList.contains('edit-btn')){
          eventbus.emit('renderEditModal');
        }
      });
      console.log(context);
      globalListCtn.innerHTML = globalListTempl(context);
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
        }
      );

      document.querySelector('.settings-btn').addEventListener('click', (e) => {
        e.preventDefault();
        eventbus.emit('renderSettingsTempl')}
      );
    }
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
    const globalListCtn = document.getElementsByClassName("globalList-ctn")[0];
    const globalListBtn = document.querySelector(".globalList-btn span");
    if(!open){
      globalListCtn.className = 'globalList-ctn';
      globalListBtn.className = 'icon-global-list-arrow-down';
      open = true;
    }
    else{
      globalListCtn.className = 'globalList-ctn hide';
      globalListBtn.className = 'icon-global-list-arrow-right';
      open = false;
    }
  }

  renderTrashMode(){
    const trashBtn = document.getElementsByClassName('tasks-list');
    const selectTabs = document.getElementsByClassName('select-tabs');
    const selectBtn = document.querySelector('.selectAll');
    const deselectBtn = document.querySelector('.deselectAll');

    for(let i=0;i < trashBtn.length; i++){
      trashBtn[i].classList.toggle('deleteMode');//add
    }

    for(let i=0;i < selectTabs.length; i++){
      selectTabs[i].classList.toggle('hide');
    }

    selectBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.selectAll()}
    );

    deselectBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.deselectAll()}
    );
  }

  selectAll() {
    let items = document.getElementsByName('commonTask');
    for(let i = 0; i < items.length; i++){
      items[i].checked = true;
    }
    countRemoves();
  }

  deselectAll() {
    let items = document.getElementsByName('commonTask');
    for(let i = 0; i < items.length; i++){
      items[i].checked = false;
    }
    recountRemoves();
    document.querySelector('.trashCounter').style.display = 'none';
  }
}

let removesCounter = 0;
let items = document.getElementsByName('commonTask');
let open = false;

function countRemoves() {
  for(let i = 0; i < items.length; i++){
    if(items[i].checked === true){
      removesCounter++;
    }
  }
  document.querySelector('.trashCounter').style.display = 'block';
  document.querySelector('.trashCounter').innerText = removesCounter;
}

function recountRemoves() {
  for(let i = 0; i < items.length; i++){
    if(items[i].checked === false){
      removesCounter--;
    }
  }
  document.querySelector('.trashCounter').style.display = 'block';
  document.querySelector('.trashCounter').innerText = removesCounter;
}

export function renderTasksTempl(context){

  const main = document.getElementsByTagName("main")[0];

  if(sessionStorage.getItem('newUser')){
    main.innerHTML = tasksTempl();
    eventbus.emit('showTrashIcon');
    const addBtn = document.querySelector('.addTask-btn');
    addBtn.addEventListener('click', (e) => {
      e.preventDefault();
      eventbus.emit('renderAddModal');
    }
    );

    const tasksList = document.querySelector('.tasks-list');
    tasksList.addEventListener('click',(e)=>{
      const target = e.target;
      if(target.classList.contains('edit-btn')){
        eventbus.emit('renderEditModal');
      }
    });

    const globalListCtn = document.querySelector(".globalList-ctn");
    globalListCtn.innerHTML = globalListTempl(context);
    const globalListBtn = document.querySelector('.globalList-btn');
    globalListBtn.addEventListener('click', (e) => {
      e.preventDefault();
      //renderGlobalList();
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
    }
    );

    document.querySelector('.settings-btn').addEventListener('click', (e) => {
      e.preventDefault();
      eventbus.emit('renderSettingsTempl')}
    );
  }
}

//const tasksCollectionView = new TasksCollectionView();
//export default tasksCollectionView;
