export default class TasksCollectionModel {
  constructor(data) {
    this.data = data;
  }
  
  getDailyTasksData() {
    const dailyData = {
      tasks: []
    };
    for(let i in this.data){
      if(this.data[i]['isActive']===true){
        dailyData['tasks'].push(this.data[i]);
      }
    }
    return dailyData;
  }

  getCompletedTasksData() {
    const completedData = {
      tasks: []
    };
    for(let i in this.data) {
      if(this.data[i]['isDone']===true) {
        completedData['tasks'].push(this.data[i]);
      }
    }
    return completedData;
  }

  getFilteredGlobalTasksData(priorityType) {
    const data = this.getGlobalTasksData();
    Object.keys(data).forEach((key) => {
      for(let i = data[key].length - 1; i >= 0; i-- ) {
        if(data[key][i].priorityType !== priorityType){
          data[key].splice(i,1);
        }
      }
    });
    return data;
  }

  getGlobalTasksData() {
    const context = {
      work: [],
      hobby: [],
      education: [],
      sport: [],
      other: []
    };
    for(let i in this.data) {
      if(this.data[i].isActive === false && this.data[i].isDone === false) {
        switch(this.data[i]['taskType']) {
          case 'task-work':
            context['work'].push(this.data[i]);
            break;
          case 'task-hobby':
            context['hobby'].push(this.data[i]);
            break;
          case 'task-education':
            context['education'].push(this.data[i]);
            break;
          case 'task-sport':
            context['sport'].push(this.data[i]);
            break;
          case 'task-other':
            context['other'].push(this.data[i]);
            break;
          default:
            return null;
        }
      } 
    }
    return context;
  }
}
