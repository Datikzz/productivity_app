import eventbus from '../../eventBus';
import notifTempl from './notification.hbs';

class Notification {
  constructor(){
    eventbus.subscribe('renderNotif', this.render.bind(this));
    this.timer = {};
  }

  render(type, message){
    clearInterval(this.timer);
    const notifWrapper = document.getElementsByClassName('notif-wrapper')[0];
    const wrapper = document.getElementsByClassName('wrapper')[0].offsetLeft;
    notifWrapper.style.right = `${wrapper}px`;

    window.addEventListener('resize', () => {
      const wrapper = document.getElementsByClassName('wrapper')[0].offsetLeft;
      notifWrapper.style.right = `${wrapper}px`;
    });
    notifWrapper.innerHTML = notifTempl({type: type, message: message});

    const closeBtn = document.getElementsByClassName('close-notif')[0];
    closeBtn.addEventListener('click', () => {
      this.closeNotif();
    })

    this.timer = setInterval(() => {this.closeNotif()}, 1000*5);
  }

  closeNotif() {
    clearInterval(this.timer);
    const wrapper = document.getElementsByClassName('notif-wrapper')[0];
    wrapper.style.position = 'none';
    wrapper.innerHTML = '';
  }
}

const notification = new Notification();
export default notification;
