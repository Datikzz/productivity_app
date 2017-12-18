export const EventBus = {
  handlers: [],

  emit: function(eventName) {
    // console.log('blah1');
    // this.handlers.filter((handler) => {
    //   handler.eventName === eventName;
    // }).forEach((handler) => {
    //   handler.handlerFn();
    //   console.log('blah2');
    // });
    for(let i in this.handlers){
      if(this.handlers[i].eventName === eventName){
        this.handlers[i].handlerFn();
      }
    }
  },

  subscribe: function(eventName, handlerFn) {
    this.handlers.push(
      {
      'eventName': eventName,
      'handlerFn': handlerFn
      });
  }
}

console.log(EventBus.handlers);
