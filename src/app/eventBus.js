/**
 * Class representing EventBus service
 * @namespace  EventBus
 */
class EventBus {
  /**
   * constructor of EventBus
   * @constructs EventBus
   * @memberOf EventBus
   */
  constructor() {
    this.handlers = [];
  }

  /**
   * Emit events
   * @param {string} eventName - name of subscribed event
   * @param {any} arg - arguments for events
   * @memberOf EventBus
   */
  emit(eventName, ...arg) {
    for(let i in this.handlers){
      if(this.handlers[i].eventName === eventName){
        this.handlers[i].handlerFn(...arg);
      }
    }
  }

  /**
   * Subscribe events to eventBus
   * @param {string} eventName - name of subscribed event
   * @param {function} handlerFn - function
   * @memberOf EventBus
   */
  subscribe(eventName, handlerFn) {
    this.handlers.push(
      {
        'eventName': eventName,
        'handlerFn': handlerFn
      });
  }
}
const eventbus = new EventBus();
export default eventbus;
