import './header.less';
import headerTempl from './header.hbs';
import { renderAddModal } from '../../../app/components/modal/modal';
import { renderTrashmode } from '../../../app/pages/tasks/tasks';
//import { eventBus } from '../../eventBus';
window.addEventListener('scroll',(e) => {
  let top  = document.getElementById("header"),
      main = document.getElementsByTagName("main")[0],
      addBtn = document.querySelector('a.icon-add'),
      prevPosition = window.pageYOffset;
  if (prevPosition > 1) {
    top.className = 'fixed-header';
    addBtn.className = 'icon-add';
    main.style.paddingTop = 100+"px";
  } else {
    top.className = '';
    addBtn.className = 'icon-add hide';
    main.style.paddingTop = 0+"px";
  }
});

let header = document.querySelector("header");

header.innerHTML = headerTempl();

let addBtn = document.querySelector('.icon-add');
console.log(addBtn);
addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('blah');
  //eventBus.emit('renderAddModal')
  renderAddModal();
});

let trashBtn = document.querySelector('.icon-trash');
trashBtn.addEventListener('click',(e) => {
  e.preventDefault();
  renderTrashmode();
} );
