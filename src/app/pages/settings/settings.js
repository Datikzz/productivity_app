import { renderGraph } from './settings_graph';
import  settingsTempl   from './settings.hbs';
import categoriesTempl  from './categories.hbs';

let main = document.getElementsByTagName("main")[0];

export function renderSettingsTempl(){
  main.innerHTML = settingsTempl();
  renderGraph();

  let categoriesBtn = document.querySelectorAll('.tabs-item')[1];
  categoriesBtn.addEventListener('click', renderCategoriesTempl);
}

function renderCategoriesTempl(){
  main.innerHTML = categoriesTempl();

  let pomodorosBtn = document.querySelectorAll('.tabs-item')[0];
  pomodorosBtn.addEventListener('click', renderSettingsTempl);
}
