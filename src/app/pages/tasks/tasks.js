import tasksTempl from './tasks.hbs';
import { renderAddModal,renderEditModal,renderRemoveModal } from '../../../app/components/modal/modal';

let context = {tasks: [
  {taskType: "task-hobby", priorityType: "priority-urgent", dateNum: null, dateDay: "Today", taskTitle: "Lorem ipsum sit amet",taskDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",priority: 3},
  {taskType: "task-hobby", priorityType: "priority-urgent", dateNum: null, dateDay: "Today", taskTitle: "Lorem ipsum sit amet",taskDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",priority: 3},
  {taskType: "task-hobby", priorityType: "priority-urgent", dateNum: null, dateDay: "Today", taskTitle: "Lorem ipsum sit amet",taskDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",priority: 3},
  {taskType: "task-hobby", priorityType: "priority-urgent", dateNum: null, dateDay: "Today", taskTitle: "Lorem ipsum sit amet",taskDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",priority: 3},
  {taskType: "task-hobby", priorityType: "priority-urgent", dateNum: 23, dateDay: "November", taskTitle: "Lorem ipsum sit amet",taskDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",priority: 3},
  {taskType: "task-hobby", priorityType: "priority-urgent", dateNum: null, dateDay: "Today", taskTitle: "Lorem ipsum sit amet",taskDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",priority: 3}]};

let body = document.getElementsByTagName("body")[0];
let main = document.getElementsByTagName("main")[0];

export function renderTasksTempl(){
  main.innerHTML = tasksTempl(context);

  let addBtn = document.querySelector('.addTask-btn');
  addBtn.addEventListener('click', renderAddModal);

  let tasksList = document.querySelector('.tasks-list');
  tasksList.addEventListener('click',(e)=>{
    const target = e.target;
    if(target.classList.contains('edit-btn')){
      renderEditModal();
    }
  });
}
