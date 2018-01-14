import timerTempl from './timer.hbs';
import timerStartedTempl from './timerStarted.hbs';
import eventbus from '../../eventBus';

export default class Timer{
  constructor(model) {
    this.model = JSON.parse(model);
    this.settings = JSON.parse(localStorage.getItem('settings'));
    this.iteration = localStorage.getItem('currentIteration');
    this.id = null;
  }

  render() {
    const main = document.getElementsByTagName('main')[0];
    const header = document.getElementById('header');
    main.innerHTML = timerTempl(this.model);
    eventbus.emit('hideTrashIcon');
    const startBtn = document.getElementsByClassName('start-btn')[0];
    const estimation = this.model.estimationTotal;
    
    const tomatos = document.getElementsByClassName('tomato');
    for(let i = 0; i<estimation; i++){
      tomatos[i].classList.remove('hide');
    }
    startBtn.addEventListener('click',(e) => {
      e.preventDefault();
      

      main.innerHTML = timerStartedTempl(this.model);
      header.style.display = 'none';
      const timerTitle = document.getElementsByClassName('timer-title')[0];
      timerTitle.classList.add('headless');
      const tomatoList = document.getElementsByClassName('tomato-list')[0];

      for(let i = 0; i<estimation; i++){
        const newTomato = document.createElement('li');
        newTomato.classList.add('tomato');
        newTomato.innerHTML = '<img src="/empty-tomato.svg" alt="tomato">';
        tomatoList.appendChild(newTomato);
      }

      if(estimation < 5){
        const addTomatoBtn = document.createElement('button');
        const tomatos = document.getElementsByClassName('tomato');
  

        addTomatoBtn.classList.add('addTomato-btn');
        addTomatoBtn.classList.add('addTask-btn');
        addTomatoBtn.classList.add('icon-add');
        tomatoList.appendChild(addTomatoBtn);
        addTomatoBtn.addEventListener('click', (e) =>{
          e.preventDefault();
          if(tomatos.length < 5) {
            const newTomato = document.createElement('li');
            newTomato.classList.add('tomato');
            newTomato.innerHTML = '<img src="/empty-tomato.svg" alt="tomato">';
            tomatoList.insertBefore(newTomato, addTomatoBtn);
          }
          if(tomatos.length === 5) {
            addTomatoBtn.classList.add('hide');
          }        
        });
      }        
      // this.iteration++;
      // if(localStorage.getItem('currentIteration')>=this.settings.iteration){
      //   localStorage.setItem('currentIteration', 0);
      //   this.clearCountdown();
      //   this.longBreakTimer();
      // }
      //localStorage.setItem('currentIteration', this.iteration);

      this.clearCountdown();
      this.startTimer();
      document.querySelectorAll('.timer-redir-btn .btn')[0].addEventListener('click',(e) => {
        e.preventDefault();
        this.clearCountdown();
        this.failPomodoro();
      });

      document.querySelectorAll('.timer-redir-btn .btn')[1].addEventListener('click',(e) => {
        e.preventDefault();
        this.clearCountdown();
        this.finishPomodoro();
      });

      document.querySelectorAll('.timer-redir-btn .btn')[2].addEventListener('click',(e) => {
        e.preventDefault();
        this.clearCountdown();
        this.iteration++;
        localStorage.setItem('currentIteration', this.iteration);
        this.startTimer();
      });

      document.querySelectorAll('.timer-redir-btn .btn')[3].addEventListener('click',(e) => {
        e.preventDefault();
        this.clearCountdown();
        this.finishTask();
        header.style.display = 'block';
      });
    });
  }

  countdownTime(value) {
    let duration = value;
    this.id = setInterval(() => {
      duration--;
      document.querySelector('.timer-group .face .num').innerText = duration;
      if(duration === 0) {
        document.querySelector('.timer-group .face .num').innerText = '';
        this.clearCountdown();
      }
    }, 1000);
  }

  clearCountdown() { 
    clearInterval(this.id);
  }

  startTimer() {
    this.resetAnimation();
    this.countdownTime(this.settings.workTime);

    document.querySelector('.timer .hand:first-child span').style.animationName = 'spin1';
    document.querySelector('.timer .hand:last-child span').style.animationName = 'spin2';
    document.querySelector('.timer-group .face .text').innerText = '';
    document.querySelector('.timer-group .face .num').innerText = this.settings.workTime;
    document.querySelector('.timer-group .face .time-text').innerText = 'min';
    document.querySelectorAll('.timer-redir-btn .btn')[0].classList.remove('hide');
    document.querySelectorAll('.timer-redir-btn .btn')[1].classList.remove('hide');
    document.querySelectorAll('.timer-redir-btn .btn')[2].classList.add('hide');
    document.querySelectorAll('.timer-redir-btn .btn')[3].classList.add('hide');

    
    const spans = document.querySelectorAll('.timer .hand span');
    for(let item of spans){
      item.style.animationDuration = this.settings.workTime +'s';
    }

    document.querySelector('.timer .hand:last-child span').addEventListener('animationend', () =>{

      if(document.querySelector('.timer-group .face .text').innerText == ''){
        this.finishPomodoro();
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

  failPomodoro() {
    document.querySelector('.timer-group .face .text').innerText = 'Break';
    document.querySelector('.timer-group .face .num').innerText = this.settings.shortBreak;
    document.querySelector('.timer-group .face .time-text').innerText = 'min';
    document.querySelector('.tomato-list img[src="/empty-tomato.svg"]').src = '/tomato-failed.svg';

    if(document.querySelector('.tomato-list img[src="/empty-tomato.svg"]')) {
      this.breakTimer();
      document.querySelectorAll('.timer-redir-btn .btn')[0].classList.add('hide');
      document.querySelectorAll('.timer-redir-btn .btn')[1].classList.add('hide');
      document.querySelectorAll('.timer-redir-btn .btn')[2].classList.remove('hide');
      document.querySelectorAll('.timer-redir-btn .btn')[3].classList.add('hide');
      
    } else {
      this.breakTimer();
      document.querySelectorAll('.timer-redir-btn .btn')[0].classList.add('hide');
      document.querySelectorAll('.timer-redir-btn .btn')[1].classList.add('hide');
      document.querySelectorAll('.timer-redir-btn .btn')[2].classList.add('hide');
      document.querySelectorAll('.timer-redir-btn .btn')[3].classList.remove('hide');
      
    }
  }

  finishPomodoro() {
    document.querySelector('.timer-group .face .text').innerText = 'Break';
    document.querySelector('.timer-group .face .num').innerText = this.settings.shortBreak;
    document.querySelector('.timer-group .face .time-text').innerText = 'min';
    document.querySelector('.tomato-list img[src="/empty-tomato.svg"]').src = '/fill-tomato.svg';

    if(document.querySelector('.tomato-list img[src="/empty-tomato.svg"]')){
      document.querySelectorAll('.timer-redir-btn .btn')[0].classList.add('hide');
      document.querySelectorAll('.timer-redir-btn .btn')[1].classList.add('hide');
      document.querySelectorAll('.timer-redir-btn .btn')[2].classList.remove('hide');
      document.querySelectorAll('.timer-redir-btn .btn')[3].classList.remove('hide');
      this.breakTimer();
    }
    else{
      document.querySelectorAll('.timer-redir-btn .btn')[0].classList.add('hide');
      document.querySelectorAll('.timer-redir-btn .btn')[1].classList.add('hide');
      document.querySelectorAll('.timer-redir-btn .btn')[2].classList.add('hide');
      document.querySelectorAll('.timer-redir-btn .btn')[3].classList.remove('hide');
      this.breakTimer();
    }
  }

  longBreakTimer() {
    this.resetAnimation();
    document.querySelector('.timer-group .face .text').innerText = 'Long Break';
    document.querySelector('.timer-group .face .num').innerText = this.settings.longBreak;
    document.querySelector('.timer-group .face .time-text').innerText = 'min';
    document.querySelector('.timer .hand:first-child span').style.animationName = 'spin1';
    document.querySelector('.timer .hand:last-child span').style.animationName = 'spin2';

    this.countdownTime(this.settings.longBreak);
    const spans = document.querySelectorAll('.timer .hand span');
    for(let item of spans){
      item.style.animationDuration = this.settings.longBreak +'s';
    }
  }

  breakTimer() {
    this.resetAnimation();
    document.querySelector('.timer .hand:first-child span').style.animationName = 'spin1';
    document.querySelector('.timer .hand:last-child span').style.animationName = 'spin2';

    this.countdownTime(this.settings.shortBreak);
    const spans = document.querySelectorAll('.timer .hand span');
    for(let item of spans){
      item.style.animationDuration = this.settings.shortBreak +'s';
    }
  }

  resetAnimation() {
    const firstHalf = document.querySelector('.timer .hand:first-child span');
    const secondHalf = document.querySelector('.timer .hand:last-child span');
    firstHalf.style.animationName = '';
    secondHalf.style.animationName = '';
    void firstHalf.offsetWidth;
    void secondHalf.offsetWidth;
  }

  finishTask() {
    const filled = document.querySelectorAll('.tomato-list img[src="/fill-tomato.svg"]').length;
    const failed = document.querySelectorAll('.tomato-list img[src="/tomato-failed.svg"]').length;
    this.resetAnimation();
    if(filled>=failed){
      document.querySelector('.timer-group .face .text').innerText = 'You Completed Task';
      document.querySelector('.timer-group .face .num').innerText = '';
      document.querySelector('.timer-group .face .time-text').innerText = '';
      //change status to done
    }
    else {
      document.querySelector('.timer-group .face .text').innerText = 'You Failed Task';
      document.querySelector('.timer-group .face .num').innerText = '';
      document.querySelector('.timer-group .face .time-text').innerText = '';
      //change status to failed
    }
    document.querySelectorAll('.timer-redir-btn .btn')[2].classList.add('hide');
    document.querySelectorAll('.timer-redir-btn .btn')[3].classList.add('hide');
    document.querySelector('.icon-arrow-left').classList.remove('hide');
    document.querySelector('.icon-arrow-right').classList.remove('hide');
  }
}
