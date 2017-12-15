import './header.less';


window.addEventListener('scroll',(e) => {
  let top  = document.getElementById("header"),
      main = document.getElementsByTagName("main")[0],
      addBtn = document.querySelector('a.icon-add'),
      prevPosition = window.pageYOffset;
  this.e = e;
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
let headerTempl = require('./header.hbs');
header.innerHTML = headerTempl();
