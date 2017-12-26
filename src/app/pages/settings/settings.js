import { renderGraph } from './settings_graph';
import  settingsTempl   from './settings.hbs';
import categoriesTempl  from './categories.hbs';
import { EventBus } from '../../eventBus';

let main = document.getElementsByTagName("main")[0];

export default class Settings {
  renderSettingsTempl(){
    main.innerHTML = settingsTempl();
    renderGraph();
    EventBus.emit('hideTrashIcon');
    const categoriesBtn = document.querySelectorAll('.tabs-item')[1];
    categoriesBtn.addEventListener('click', (e) => {
      e.preventDefault();
      settings.renderCategoriesTempl();
    });
  }

  renderCategoriesTempl(){
    main.innerHTML = categoriesTempl();
    EventBus.emit('hideTrashIcon');
    const pomodorosBtn = document.querySelectorAll('.tabs-item')[0];
    pomodorosBtn.addEventListener('click',(e) => {
      e.preventDefault();

      settings.renderSettingsTempl();
    });
  }
}
//
const settings = new Settings();
EventBus.subscribe('renderSettingsTempl', settings.renderSettingsTempl.bind(settings));
EventBus.subscribe('renderCategoriesTempl', settings.renderCategoriesTempl.bind(settings));
