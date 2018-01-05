class EventBus {

  constructor() {
    this.handlers = [];
  }

  emit(eventName, arg) {
    // console.log('blah1');
    // this.handlers.filter((handler) => {
    //   handler.eventName === eventName;
    // }).forEach((handler) => {
    //   handler.handlerFn();
    //   console.log('blah2');
    // });
    for(let i in this.handlers){
      if(this.handlers[i].eventName === eventName){
        this.handlers[i].handlerFn(arg);
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
