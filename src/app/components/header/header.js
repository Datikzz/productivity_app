require('./header.less');


window.onscroll = function (e) {
  var top  = document.getElementById("header"),
      main = document.getElementsByTagName("main")[0],
      prevPosition = window.pageYOffset;
  this.e = e;
  if (prevPosition > 1) {
    top.className = 'fixed-header';
    main.style.paddingTop = 100+"px";
  } else {
    top.className = '';
    main.style.paddingTop = 0+"px";
  }
}
