import timerTempl from './timer.hbs';
import timerStartedTempl from './timerStarted.hbs';
import eventbus from '../../eventBus';

export function renderTimerTempl(){
  const main = document.getElementsByTagName("main")[0];
  main.innerHTML = timerTempl();
  eventbus.emit('hideTrashIcon');
}

  const main = document.getElementsByTagName("main")[0];
  main.addEventListener('click',(e) => {
    if(e.target.className === 'btn start-btn green-btn'){
      e.preventDefault();
      renderStartTimer();
    }
  });


let workTime = 60;
let breakTime = 2;

function renderStartTimer() {
  main.innerHTML = timerStartedTempl();
  startTimer();

  document.querySelectorAll('.timer-redir-btn .btn')[0].addEventListener('click',(e) => {
    e.preventDefault();
    failPomodoro();
  });

  document.querySelectorAll('.timer-redir-btn .btn')[1].addEventListener('click',(e) => {
    e.preventDefault();
    finishPomodoro();
  });

  document.querySelectorAll('.timer-redir-btn .btn')[2].addEventListener('click',(e) => {
    e.preventDefault();
    startTimer();
  });

  document.querySelectorAll('.timer-redir-btn .btn')[3].addEventListener('click',(e) => {
    e.preventDefault();
    finishTask();
  });

}



function startTimer() {
  resetAnimation();
  document.querySelector('.timer .hand:first-child span').style.animationName = 'spin1';
  document.querySelector('.timer .hand:last-child span').style.animationName = 'spin2';
  document.querySelector('.timer-group .face .text').innerText = '';
  document.querySelector('.timer-group .face .num').innerText = '5';
  document.querySelector('.timer-group .face .time-text').innerText = 'min';
  document.querySelectorAll('.timer-redir-btn .btn')[0].classList.remove('hide');
  document.querySelectorAll('.timer-redir-btn .btn')[1].classList.remove('hide');
  document.querySelectorAll('.timer-redir-btn .btn')[2].classList.add('hide');
  document.querySelectorAll('.timer-redir-btn .btn')[3].classList.add('hide');

  const spans = document.querySelectorAll('.timer .hand span');
  for(let item of spans){
    item.style.animationDuration = 10+'s';
  }


  document.querySelector('.timer .hand:last-child span').addEventListener('animationend',(e) =>{

      if(document.querySelector('.timer-group .face .text').innerText == ''){
        finishPomodoro();
      }

      else{
        document.querySelector('.timer-group .face .text').innerText = 'Break is over';
        document.querySelector('.timer-group .face .num').innerText = '';
        document.querySelector('.timer-group .face .time-text').innerText = '';
        const spans = document.querySelectorAll('.timer .hand span');
        for(let item of spans) {
          item.style.animationFillMode = 'forwards';
        }
      }
    }
  );
}

function failPomodoro() {
  document.querySelector('.timer-group .face .text').innerText = 'Break';
  document.querySelector('.timer-group .face .num').innerText = '3';
  document.querySelector('.timer-group .face .time-text').innerText = 'min';
  document.querySelector('.tomato-list img[src="/empty-tomato.svg"]').src = '/tomato-failed.svg';

  if(document.querySelector('.tomato-list img[src="/empty-tomato.svg"]')){
    document.querySelectorAll('.timer-redir-btn .btn')[0].classList.add('hide');
    document.querySelectorAll('.timer-redir-btn .btn')[1].classList.add('hide');
    document.querySelectorAll('.timer-redir-btn .btn')[2].classList.remove('hide');
    document.querySelectorAll('.timer-redir-btn .btn')[3].classList.add('hide');
    breakTimer();
  }
  else {
    document.querySelectorAll('.timer-redir-btn .btn')[0].classList.add('hide');
    document.querySelectorAll('.timer-redir-btn .btn')[1].classList.add('hide');
    document.querySelectorAll('.timer-redir-btn .btn')[2].classList.add('hide');
    document.querySelectorAll('.timer-redir-btn .btn')[3].classList.remove('hide');
    breakTimer();
  }
}

function finishPomodoro() {
  document.querySelector('.timer-group .face .text').innerText = 'Break';
  document.querySelector('.timer-group .face .num').innerText = '3';
  document.querySelector('.timer-group .face .time-text').innerText = 'min';

  document.querySelector('.tomato-list img[src="/empty-tomato.svg"]').src = '/fill-tomato.svg';

  if(document.querySelector('.tomato-list img[src="/empty-tomato.svg"]')){
    document.querySelectorAll('.timer-redir-btn .btn')[0].classList.add('hide');
    document.querySelectorAll('.timer-redir-btn .btn')[1].classList.add('hide');
    document.querySelectorAll('.timer-redir-btn .btn')[2].classList.remove('hide');
    document.querySelectorAll('.timer-redir-btn .btn')[3].classList.remove('hide');
    breakTimer();
  }
  else{
    document.querySelectorAll('.timer-redir-btn .btn')[0].classList.add('hide');
    document.querySelectorAll('.timer-redir-btn .btn')[1].classList.add('hide');
    document.querySelectorAll('.timer-redir-btn .btn')[2].classList.add('hide');
    document.querySelectorAll('.timer-redir-btn .btn')[3].classList.remove('hide');
    breakTimer();
  }

}

function breakTimer() {
  resetAnimation();

  document.querySelector('.timer .hand:first-child span').style.animationName = 'spin1';
  document.querySelector('.timer .hand:last-child span').style.animationName = 'spin2';

  const spans = document.querySelectorAll('.timer .hand span');
  for(let item of spans){
    item.style.animationDuration = breakTime+'s';
  }
}

function resetAnimation() {
  const firstHalf = document.querySelector('.timer .hand:first-child span');
  const secondHalf = document.querySelector('.timer .hand:last-child span');
  firstHalf.style.animationName = '';
  secondHalf.style.animationName = '';
  void firstHalf.offsetWidth;
  void secondHalf.offsetWidth;
}

function finishTask() {
  const filled = document.querySelectorAll('.tomato-list img[src="/fill-tomato.svg"]').length;
  const failed = document.querySelectorAll('.tomato-list img[src="/tomato-failed.svg"]').length;
  resetAnimation();
  if(filled>=failed){
    document.querySelector('.timer-group .face .text').innerText = 'You Completed Task';
    document.querySelector('.timer-group .face .num').innerText = '';
    document.querySelector('.timer-group .face .time-text').innerText = '';
  }
  else {
    document.querySelector('.timer-group .face .text').innerText = 'You Failed Task';
    document.querySelector('.timer-group .face .num').innerText = '';
    document.querySelector('.timer-group .face .time-text').innerText = '';
  }
  document.querySelectorAll('.timer-redir-btn .btn')[2].classList.add('hide');
  document.querySelectorAll('.timer-redir-btn .btn')[3].classList.add('hide');
  document.querySelector('.icon-arrow-left').classList.remove('hide');
  document.querySelector('.icon-arrow-right').classList.remove('hide');
}
