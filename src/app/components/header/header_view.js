import './header.less';
import headerTempl from './header.hbs';
import eventbus from '../../eventBus';


window.addEventListener('scroll',() => {
  const top  = document.getElementById('header'),
    main = document.getElementsByTagName('main')[0],
    addBtn = document.querySelector('a.icon-add'),
    prevPosition = window.pageYOffset;
  if(top){
    if (prevPosition > 1) {
      top.className = 'fixed-header';
      addBtn.className = 'icon-add';
      main.style.paddingTop = 96+'px';
    } else {
      top.className = '';
      addBtn.className = 'icon-add hide';
      main.style.paddingTop = 0+'px';
    }
  }
});

const header = document.getElementById('header');
header.innerHTML = headerTempl();

const addBtn = document.querySelector('.icon-add');
addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  eventbus.emit('renderAddModal');
});

const trashBtn = document.querySelector('.icon-trash');

trashBtn.addEventListener('click', (e) => {
  const trashCounter = document.getElementsByClassName('trashCounter')[0];
  const checkedDaily = document.getElementsByName('commonTask');
  const checkedGlobal = document.getElementsByName('deleteGlobalTask');
  const listOfChecked = [];
  e.preventDefault();
  if(+trashCounter.innerText > 0){

    for(let i in checkedDaily) {
      if(checkedDaily[i].checked === true) {
        listOfChecked.push(checkedDaily[i].value);
      }
    }

    for(let i in checkedGlobal) {
      if(checkedGlobal[i].checked === true) {
        listOfChecked.push(checkedGlobal[i].value);
      }
    }
    eventbus.emit('renderRemoveModal',listOfChecked);
  } else {
    eventbus.emit('renderTrashMode');
  }
});

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
