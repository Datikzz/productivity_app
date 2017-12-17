class EventBus {
  constructor(){
    this.handlers = [];
  }

  emit(eventName) {
    this.handlers.filter((handler) => {
      handler.eventName === eventName;
    }).forEach((eventName) => {
      handler.handlerFn();
    });

  }

  subscribe(eventName, handlerFn) {
    this.handlers.push(
      {
      'eventName': eventName,
      'handlerFn': handlerFn
    });
  }
}

export const eventBus = new EventBus();
