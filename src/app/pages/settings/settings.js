import { renderGraph } from './settings_graph';
import  settingsTempl   from './settings.hbs';
import categoriesTempl  from './categories.hbs';
import eventbus from '../../eventBus';

let main = document.getElementsByTagName("main")[0];

export default class Settings {
  renderSettingsTempl(){
    main.innerHTML = settingsTempl();
    renderGraph();
    eventbus.emit('hideTrashIcon');
    const categoriesBtn = document.querySelectorAll('.tabs-item')[1];
    categoriesBtn.addEventListener('click', (e) => {
      e.preventDefault();
      settings.renderCategoriesTempl();
    });
  }

  renderCategoriesTempl(){
    main.innerHTML = categoriesTempl();
    eventbus.emit('hideTrashIcon');
    const pomodorosBtn = document.querySelectorAll('.tabs-item')[0];
    pomodorosBtn.addEventListener('click',(e) => {
      e.preventDefault();

      settings.renderSettingsTempl();
    });
  }
}
//
const settings = new Settings();
eventbus.subscribe('renderSettingsTempl', settings.renderSettingsTempl.bind(settings));
eventbus.subscribe('renderCategoriesTempl', settings.renderCategoriesTempl.bind(settings));
