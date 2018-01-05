import { renderGraph } from './settings_graph';
import  settingsTempl   from './settings.hbs';
import categoriesTempl  from './categories.hbs';
import eventbus from '../../eventBus';


class Settings {
  renderSettingsTempl(){
    const main = document.getElementsByTagName("main")[0];
    main.innerHTML = settingsTempl();
    renderGraph();
    eventbus.emit('hideTrashIcon');
    const categoriesBtn = document.querySelectorAll('.tabs-item')[1];
    categoriesBtn.addEventListener('click', (e) => {
      e.preventDefault();
      eventbus.emit('renderCategoriesTempl');
    });
  }

  renderCategoriesTempl(){
    const main = document.getElementsByTagName("main")[0];
    main.innerHTML = categoriesTempl();
    eventbus.emit('hideTrashIcon');
    const pomodorosBtn = document.querySelectorAll('.tabs-item')[0];
    pomodorosBtn.addEventListener('click',(e) => {
      e.preventDefault();
      eventbus.emit('renderSettingsTempl');
    });
  }
}


export const settings = new Settings();
eventbus.subscribe('renderSettingsTempl', settings.renderSettingsTempl.bind(settings));
eventbus.subscribe('renderCategoriesTempl', settings.renderCategoriesTempl.bind(settings));
