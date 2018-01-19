import { renderGraph } from './settings_graph';
import  settingsTempl   from './settings.hbs';
import categoriesTempl  from './categories.hbs';
import eventbus from '../../eventBus';
import Router from '../../router';

/**
 * Class representing settings page
 * @namespace  Settings
 */
class Settings {
  /**
   * constructor of Settings
   * @constructs Settings
   * @memberOf Settings
   */
  constructor(){
    eventbus.subscribe('renderSettingsTempl', this.renderSettingsTempl.bind(this));
    eventbus.subscribe('renderCategoriesTempl', this.renderCategoriesTempl.bind(this));
    eventbus.subscribe('saveSettings', this.saveSettings.bind(this));
  }

  /**
   * Render settings template
   * @memberOf Settings
   */
  renderSettingsTempl(){
    const main = document.getElementsByTagName('main')[0];
    main.innerHTML = settingsTempl();
    if(localStorage.getItem('settings') !== null) {
      const settings = JSON.parse(localStorage.getItem('settings'));
      document.getElementById('workTime-value').innerText =  settings.workTime;
      document.getElementById('shortBreak-value').innerText = settings.shortBreak;
      document.getElementById('longBreak-value').innerText = settings.longBreak;
      //document.getElementById('iteration-value').innerText = settings.iteration;
    }
    renderGraph();
    eventbus.emit('hideTrashIcon');

    const categoriesBtn = document.querySelectorAll('.tabs-item')[1];
    categoriesBtn.addEventListener('click', (e) => {
      e.preventDefault();
      eventbus.emit('renderCategoriesTempl');
    });

    const saveBtn = document.getElementsByClassName('save-btn')[0];
    saveBtn.addEventListener('click', (e) => {
      e.preventDefault();
      eventbus.emit('saveSettings');
      const router = new Router();
      eventbus.emit('renderNotif', 'info', 'Settings saved');
      router.navigate('/tasks-list/');
    })
  }
  /**
   * Render categories template
   * @memberOf Settings
   */
  renderCategoriesTempl() {
    const main = document.getElementsByTagName('main')[0];
    main.innerHTML = categoriesTempl();
    eventbus.emit('hideTrashIcon');
    const pomodorosBtn = document.querySelectorAll('.tabs-item')[0];
    pomodorosBtn.addEventListener('click',(e) => {
      e.preventDefault();
      eventbus.emit('renderSettingsTempl');
    });
  }

  /**
   * Set settings values to local storage
   * @memberOf Settings
   */
  saveSettings() {
    const workTimeValue = document.getElementById('workTime-value');
    const iterationValue = document.getElementById('iteration-value');
    const shortBreakValue = document.getElementById('shortBreak-value');
    const longBreakValue = document.getElementById('longBreak-value');
    let settingsObject;
    if(workTimeValue && iterationValue && shortBreakValue && longBreakValue){
      settingsObject = {
        workTime: +workTimeValue.innerText,
        iteration: +iterationValue.innerText,
        shortBreak: +shortBreakValue.innerText,
        longBreak: +longBreakValue.innerText
      };
    } else {
      settingsObject = {
        workTime: 25,
        iteration: 5,
        shortBreak: 5,
        longBreak: 30
      };
    }
    localStorage.setItem('currentIteration', 0);
    localStorage.setItem('settings', JSON.stringify(settingsObject));
  }
}


export const settings = new Settings();
