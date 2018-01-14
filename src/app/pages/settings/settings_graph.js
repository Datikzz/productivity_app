export function renderGraph() {
  const workTimeItem = document.getElementById('workTime-value');
  const shortBreakItem = document.getElementById('shortBreak-value');
  const longBreakItem = document.getElementById('longBreak-value');
  const iterItem = document.getElementById('iteration-value');
  
  if(workTimeItem && shortBreakItem && longBreakItem && iterItem){
    render();
    window.addEventListener('resize', render);
  }
  
  function Voter(options){
    let elem = options.elem;
    let step = options.step;
    let min = options.min;
    let max = options.max;
    let voteElem = options.voteElem;
    let graphElem = options.graphElem;
    elem.addEventListener('click',(event) => {
      if(event.target.closest('.minus-btn')){
        voteDecrease();
      }
      else if(event.target.closest('.plus-btn')){
        voteIncrease();
      }
      render();
    });
    elem.addEventListener('mousedown', () => {
      return false;
    });

    function voteDecrease(){
      if(+voteElem.innerText < step) return;
      if(+voteElem.innerText > min){
        voteElem.innerText  = parseInt(voteElem.innerText, 10) - step;
      }
    }

    function voteIncrease(){
      if(+voteElem.innerHTML < max){
        voteElem.innerText  = parseInt(voteElem.innerText, 10) + step;
      }
    }
  }
  
  function render() {
    const ctnWidth = document.getElementsByClassName('graph-ctn')[0];
    const settings = JSON.parse(localStorage.getItem('settings'));
    let workTimeVal = +workTimeItem.innerText;
    let shortBreakVal = +shortBreakItem.innerText;
    let longBreakVal = +longBreakItem.innerText;
    let iterVal = +iterItem.innerText;
    let time = (workTimeVal*(iterVal*2))+(shortBreakVal*((iterVal*2)-2))+longBreakVal;
    let firstCycle = (workTimeVal*iterVal)+(shortBreakVal*(iterVal-1))+longBreakVal;
    const timePoint = document.getElementsByClassName('timePoint');
    const workTimeLine = document.getElementsByClassName('workTime-line');
    const shortBreakLine = document.getElementsByClassName('shortBreak-line');
    const longBreakLine = document.getElementsByClassName('longBreak-line');
    const iterationLine = document.getElementsByClassName('iteration-line');

    for (let i = 0; i < workTimeLine.length; i++) {
      workTimeLine[i].style.width = ((ctnWidth.offsetWidth * workTimeVal)) / time + 'px';
    }
    for (let i = 0; i < shortBreakLine.length; i++) {
      shortBreakLine[i].style.width = ((ctnWidth.offsetWidth*shortBreakVal))/time+'px';
    }
    for (let i = 0; i < timePoint.length; i++) {
      timePoint[i].style.marginLeft = ((ctnWidth.offsetWidth*30))/time+'px';
    }
    longBreakLine[0].style.width = ((ctnWidth.offsetWidth*longBreakVal)/time)+'px';

    const endTime = document.getElementsByClassName('endTime')[0];
    const phaseTime = document.getElementsByClassName('phaseTime')[0];
    endTime.innerText= convertMinsToHrsMins(time);
    endTime.innerHTML+=`<br><span class='marker'>.</span>`;
    phaseTime.innerText= 'First cycle: '+convertMinsToHrsMins(firstCycle);
    phaseTime.innerHTML+=`<br><span class='marker'>.</span>`;
    phaseTime.style.left = iterationLine[iterationLine.length/2].offsetLeft+'px';
  }

  function convertMinsToHrsMins(time) {
    let h = Math.floor(time / 60);
    let m = time % 60;
    m = m < 10 ? '0' + m : m;
    return h+'h:'+m+'m';
  }

  let workTime = new Voter({
    elem: document.getElementById('workTime-voter'),
    step: 5,
    min: 15,
    max: 25,
    voteElem: document.getElementById('workTime-value'),
    graphElem: document.getElementsByClassName('workTime-line')
  });

  let shortBreak = new Voter({
    elem: document.getElementById('shortBreak-voter'),
    step: 1,
    min: 3,
    max: 5,
    voteElem: document.getElementById('shortBreak-value'),
    graphElem: document.getElementsByClassName('shortBreak-line')
  });

  let longBreak = new Voter({
    elem: document.getElementById('longBreak-voter'),
    step: 5,
    min: 15,
    max: 30,
    voteElem: document.getElementById('longBreak-value'),
    graphElem: document.getElementsByClassName('longBreak-line')
  });

  function VoterIter(options) {
    let elem = options.elem;
    let step = options.step;
    let min = options.min;
    let max = options.max;
    let voteElem = options.voteElem;
    let graphElem = options.graphElem;

    elem.addEventListener('click', (event) => {
      if (event.target.closest('.minus-btn')) {
        voteDecrease();
      }
      else if (event.target.closest('.plus-btn')) {
        voteIncrease();
      }
      render();
    });
    elem.addEventListener('mousedown', () => {
      return false;
    });
    let graphCtn = document.getElementsByClassName('graph-ctn')[0];
    function voteDecrease() {

      let listLength = graphElem.length;
      if (+voteElem.innerHTML < step) return;
      if (+voteElem.innerHTML > min) {
        voteElem.innerHTML = parseInt(voteElem.innerHTML, 10) - step;
        graphCtn.removeChild(graphElem[listLength-1]);
        graphCtn.removeChild(graphElem[0]);
      }
    }

    function voteIncrease() {
      let listLength = graphElem.length;
      if (+voteElem.innerHTML < max) {
        voteElem.innerHTML = parseInt(voteElem.innerHTML, 10) + step;
        const newIter = document.createElement('div');
        newIter.className = 'iteration-line';
        newIter.innerHTML+=`<div class='workTime-line'></div><div class='shortBreak-line'></div>`;
        const newIterLast = document.createElement('div');
        newIterLast.className = 'iteration-line';
        newIterLast.innerHTML+=`<div class='shortBreak-line'></div><div class='workTime-line'></div>`;
        graphCtn.appendChild(newIterLast);
        graphCtn.insertBefore(newIter,graphCtn.firstChild);
      }
    }
  }

  let iteration = new VoterIter({
    elem: document.getElementById('iteration-voter'),
    step: 1,
    min: 2,
    max: 5,
    voteElem: document.getElementById('iteration-value'),
    graphElem: document.getElementsByClassName('iteration-line')
  });
};
