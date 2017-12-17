import reportTempl from './report.hbs';

export function renderReportTempl(){
  const main = document.getElementsByTagName("main")[0];
  main.innerHTML = reportTempl();
}
