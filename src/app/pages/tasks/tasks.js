import tasksTempl from './tasks.hbs';
import globalListTempl from './global-tasks.hbs';
import firstEntranceTempl  from './first_entrance.hbs';
//import { renderSettingsTempl } from '../../../app/pages/settings/settings';

import { EventBus } from '../../eventBus';

let context = {tasks: [
  {taskId: 1, taskType: "task-hobby", priorityType: "priority-urgent", dateNum: null, dateDay: "Today", taskTitle: "Lorem ipsum sit amet",taskDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",priority: 3},
  {taskId: 2, taskType: "task-work", priorityType: "priority-urgent", dateNum: null, dateDay: "Today", taskTitle: "Lorem ipsum sit amet",taskDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",priority: 3},
  {taskId: 3, taskType: "task-sport", priorityType: "priority-urgent", dateNum: null, dateDay: "Today", taskTitle: "Lorem ipsum sit amet",taskDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",priority: 3},
  {taskId: 4, taskType: "task-hobby", priorityType: "priority-urgent", dateNum: null, dateDay: "Today", taskTitle: "Lorem ipsum sit amet",taskDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",priority: 3},
  {taskId: 5, taskType: "task-hobby", priorityType: "priority-urgent", dateNum: 23, dateDay: "November", taskTitle: "Lorem ipsum sit amet",taskDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",priority: 3},
  {taskId: 6, taskType: "task-hobby", priorityType: "priority-urgent", dateNum: null, dateDay: "Today", taskTitle: "Lorem ipsum sit amet",taskDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",priority: 3}]};


EventBus.subscribe('renderTasksTempl', renderTasksTempl);
EventBus.subscribe('renderTrashMode', renderTrashMode);

export function renderTasksTempl(){
  let main = document.getElementsByTagName("main")[0];

  if(sessionStorage.getItem('newUser')){
    main.innerHTML = tasksTempl(context);
    let addBtn = document.querySelector('.addTask-btn');
    addBtn.addEventListener('click', (e) => {
      e.preventDefault();
      EventBus.emit('renderAddModal');
    }
    );

    let tasksList = document.querySelector('.tasks-list');
    tasksList.addEventListener('click',(e)=>{
      const target = e.target;
      if(target.classList.contains('edit-btn')){
        EventBus.emit('renderEditModal');
      }
    });

    let globalListCtn = document.querySelector(".globalList-ctn");
    globalListCtn.innerHTML = globalListTempl(context);
    let globalListBtn = document.querySelector('.globalList-btn');
    globalListBtn.addEventListener('click', (e) => {
      e.preventDefault();
      renderGlobalList();
    }
    );
  }

  else {
    sessionStorage.setItem('newUser','U');
    main.innerHTML = firstEntranceTempl();

    document.querySelector('.addTask-btn').addEventListener('click', (e) => {
      e.preventDefault();
      EventBus.emit('renderAddModal');
   }
    );
    document.querySelector('.skip-btn').addEventListener('click', (e) => {
      e.preventDefault();
      renderTasksTempl()}
    );

    document.querySelector('.settings-btn').addEventListener('click', (e) => {
      e.preventDefault();
      EventBus.emit('renderSettingsTempl')}
    );
  }
}

function renderTrashMode(){
  let trashBtn = document.getElementsByClassName('tasks-list');
  for(let i=0;i < trashBtn.length; i++){
    trashBtn[i].classList.toggle('deleteMode');//add
  }

  let selectTabs = document.getElementsByClassName('select-tabs');
  for(let i=0;i < selectTabs.length; i++){
    selectTabs[i].classList.toggle('hide');
  }

  let selectBtn = document.querySelector('.selectAll');
  selectBtn.addEventListener('click', (e) => {
    e.preventDefault();
    selectAll()}
  );

  let deselectBtn = document.querySelector('.deselectAll');
  deselectBtn.addEventListener('click', (e) => {
    e.preventDefault();
    deselectAll()}
  );

}

function selectAll() {
  let items = document.getElementsByName('commonTask');
  for(let i = 0; i < items.length; i++){
    items[i].checked = true;
  }
  countRemoves();
}

function deselectAll() {
  let items = document.getElementsByName('commonTask');
  for(let i = 0; i < items.length; i++){
    items[i].checked = false;
  }
  recountRemoves();
  document.querySelector('.trashCounter').style.display = 'none';
}

let removesCounter = 0;
let items = document.getElementsByName('commonTask');

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

let open = false;

function renderGlobalList(){
  let globalListCtn = document.querySelector(".globalList-ctn");
  let globalListBtn = document.querySelector(".globalList-btn span");
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


