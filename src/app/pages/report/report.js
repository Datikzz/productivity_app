let reportTempl = require('./report.hbs');

export function renderReportTempl(){
  const main = document.getElementsByTagName("main")[0];

  console.log('wewew');

  main.innerHTML = reportTempl();
}
