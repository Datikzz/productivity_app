window.onload = function () {
  render();
  function Voter(options){
    var elem = options.elem;
    var step = options.step;
    var min = options.min;
    var max = options.max;
    var voteElem = options.voteElem;
    var graphElem = options.graphElem;
    elem.onclick = function(event){
      if(event.target.closest('.minus-btn')){
        voteDecrease();
      }
      else if(event.target.closest('.plus-btn')){
        voteIncrease();
      }
      render();
    };
    elem.onmousedown = function(){
      return false;
    };

    function voteDecrease(){
      if(+voteElem.innerHTML < step) return;
      if(+voteElem.innerHTML > min){
        voteElem.innerHTML  = parseInt(voteElem.innerHTML, 10) - step;
      }
    }

    function voteIncrease(){
      if(+voteElem.innerHTML < max){
        voteElem.innerHTML  = parseInt(voteElem.innerHTML, 10) + step;
      }
    }
  }
  function render() {
    var ctnWidth = document.getElementsByClassName("graph-ctn")[0];

    var workTimeVal = parseInt(document.getElementById("workTime-value").innerHTML,10);
    var shortBreakVal = parseInt(document.getElementById("shortBreak-value").innerHTML,10);
    var longBreakVal = parseInt(document.getElementById("longBreak-value").innerHTML,10);
    var iterVal = parseInt(document.getElementById("iteration-value").innerHTML,10);
    var time = (workTimeVal*(iterVal*2))+(shortBreakVal*((iterVal*2)-2))+longBreakVal;
    var firstCycle = (workTimeVal*iterVal)+(shortBreakVal*(iterVal-1))+longBreakVal;
    var timePoint = document.getElementsByClassName("timePoint");
    var workTimeLine = document.getElementsByClassName("workTime-line");
    var shortBreakLine = document.getElementsByClassName("shortBreak-line");
    var longBreakLine = document.getElementsByClassName("longBreak-line");
    var iterationLine = document.getElementsByClassName("iteration-line");
    for (var i = 0; i < workTimeLine.length; i++) {
      workTimeLine[i].style.width = ((ctnWidth.offsetWidth * workTimeVal)) / time + "px";
    }
    for (var i = 0; i < shortBreakLine.length; i++) {
      shortBreakLine[i].style.width = ((ctnWidth.offsetWidth*shortBreakVal))/time+"px";
    }
    for (var i = 0; i < timePoint.length; i++) {
      timePoint[i].style.marginLeft = ((ctnWidth.offsetWidth*30))/time+"px";
    }
    longBreakLine[0].style.width = ((ctnWidth.offsetWidth*longBreakVal)/time)+"px";

    var endTime = document.getElementsByClassName('endTime')[0];
    var phaseTime = document.getElementsByClassName('phaseTime')[0];
    endTime.innerText= convertMinsToHrsMins(time);
    phaseTime.innerText= "First cycle: "+convertMinsToHrsMins(firstCycle);
    phaseTime.style.left = iterationLine[iterationLine.length/2].offsetLeft+"px";
  }

  function convertMinsToHrsMins(time) {
    var h = Math.floor(time / 60);
    var m = time % 60;
    m = m < 10 ? '0' + m : m;
    return h+"h:"+m+'m';
  }

  var workTime = new Voter({
    elem: document.getElementById("workTime-voter"),
    step: 5,
    min: 15,
    max: 25,
    voteElem: document.getElementById("workTime-value"),
    graphElem: document.getElementsByClassName("workTime-line")
  });

  var shortBreak = new Voter({
    elem: document.getElementById("shortBreak-voter"),
    step: 1,
    min: 3,
    max: 5,
    voteElem: document.getElementById("shortBreak-value"),
    graphElem: document.getElementsByClassName("shortBreak-line")
  });

  var longBreak = new Voter({
    elem: document.getElementById("longBreak-voter"),
    step: 5,
    min: 15,
    max: 30,
    voteElem: document.getElementById("longBreak-value"),
    graphElem: document.getElementsByClassName("longBreak-line")
  });

  function VoterIter(options) {
    var elem = options.elem;
    var step = options.step;
    var min = options.min;
    var max = options.max;
    var voteElem = options.voteElem;
    var graphElem = options.graphElem;

    elem.onclick = function (event) {
      if (event.target.closest('.minus-btn')) {
        voteDecrease();
      }
      else if (event.target.closest('.plus-btn')) {
        voteIncrease();
      }
      render();
    };
    elem.onmousedown = function () {
      return false;
    };
    var graphCtn = document.getElementsByClassName('graph-ctn')[0];
    function voteDecrease() {

      var listLength = graphElem.length;
      if (+voteElem.innerHTML < step) return;
      if (+voteElem.innerHTML > min) {
        voteElem.innerHTML = parseInt(voteElem.innerHTML, 10) - step;
        graphCtn.removeChild(graphElem[listLength-1]);
        graphCtn.removeChild(graphElem[0]);
      }
    }

    function voteIncrease() {
      var listLength = graphElem.length;
      if (+voteElem.innerHTML < max) {
        voteElem.innerHTML = parseInt(voteElem.innerHTML, 10) + step;
        var newIter = document.createElement('div');
        newIter.className = 'iteration-line';
        newIter.innerHTML+="<div class='workTime-line'></div><div class='shortBreak-line'></div>"
        var newIterLast = document.createElement('div');
        newIterLast.className = 'iteration-line';
        newIterLast.innerHTML+="<div class='shortBreak-line'></div><div class='workTime-line'></div>"
        graphCtn.appendChild(newIterLast);
        graphCtn.insertBefore(newIter,graphCtn.firstChild);
      }
    }
  }
  var iteration = new VoterIter({
    elem: document.getElementById("iteration-voter"),
    step: 1,
    min: 2,
    max: 5,
    voteElem: document.getElementById("iteration-value"),
    graphElem: document.getElementsByClassName("iteration-line")
  });
};
