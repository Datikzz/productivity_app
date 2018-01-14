class EventBus {

  constructor() {
    this.handlers = [];
  }

  emit(eventName, ...arg) {
    for(let i in this.handlers){
      if(this.handlers[i].eventName === eventName){
        this.handlers[i].handlerFn(...arg);
      }
    }
  }

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
