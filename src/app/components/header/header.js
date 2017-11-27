require('./header.less');

var top      = document.getElementById("header"),
    main = document.getElementsByTagName("main")[0];
var prevPosition = window.pageYOffset;
window.onscroll = function (e) {
  this.e = e;
  var currentPosition = document.documentElement.scrollTop;
  if (currentPosition >= prevPosition) {
    top.className = 'fixed-header';
    main.style.paddingTop = 100+"px";
  } else {
    top.className = '';
    main.style.paddingTop = 0+"px";
  }
  prevPosition=currentPosition;
}
