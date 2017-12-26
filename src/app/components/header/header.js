import './header.less';
import headerTempl from './header.hbs';
import { EventBus } from '../../eventBus';

window.addEventListener('scroll',(e) => {
  const top  = document.getElementById("header"),
      main = document.getElementsByTagName("main")[0],
      addBtn = document.querySelector('a.icon-add'),
      prevPosition = window.pageYOffset;
  if (prevPosition > 1) {
    top.className = 'fixed-header';
    addBtn.className = 'icon-add';
    main.style.paddingTop = 96+"px";
  } else {
    top.className = '';
    addBtn.className = 'icon-add hide';
    main.style.paddingTop = 0+"px";
  }
});

const header = document.querySelector("header");
header.innerHTML = headerTempl();

const addBtn = document.querySelector('.icon-add');
addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  EventBus.emit('renderAddModal');
});

const trashBtn = document.querySelector('.icon-trash');
trashBtn.addEventListener('click',(e) => {
  e.preventDefault();
  EventBus.emit('renderTrashMode');
} );

let selectedBtn;

const nav = document.getElementsByClassName('nav-buttons')[0];
nav.addEventListener('click',(e) =>{
  let target = e.target;
  if(target.classList.contains('nav-link')) {
    highlight(target);
  }
});

function highlight(el){
  if(selectedBtn){
    selectedBtn.classList.remove('active');
  }
  selectedBtn = el;
  selectedBtn.classList.add('active');
}
