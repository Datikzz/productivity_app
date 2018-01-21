/**
 * Class representing Tasks Collection Model
 * @namespace  TaskCollectionModel
 */
export default class TasksCollectionModel {
  /**
   * constructor of TaskCollectionModel
   * @constructs TaskCollectionModel
   * @memberOf TaskCollectionModel
   * @param {object} data - data to form model 
   */
  constructor(data) {
    this.data = data;
    this.today = new Date().toDateString();
    this.dateFinished;
  }

  /**
   * Get tasks for daily list
   * @memberOf TaskCollectionModel
   */
  getDailyTasksData() {
    const dailyData = {
      tasks: []
    };
    for(let i in this.data){
      if(this.data[i]['isActive']===true && this.data[i]['isDone']===false){
        dailyData['tasks'].push(this.data[i]);
      }
    }
    return dailyData;
  }

  /**
   * Get completed tasks for daily list
   * @memberOf TaskCollectionModel
   */
  getCompletedTasksData() {
    const completedData = {
      tasks: []
    };
    for(let i in this.data) {
      this.dateFinished = new Date(this.data[i].dateFinished).toDateString();
      if(this.today === this.dateFinished && this.data[i]['isDone']===true) {
        completedData['tasks'].push(this.data[i]);
      }
    }
    return completedData;
  }

  /**
   * Get filtered tasks by priority
   * @param {string} priorityType - priority type of task
   * @memberOf TaskCollectionModel
   */
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

  /**
   * Get tasks for global list
   * @memberOf TaskCollectionModel
   */
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

  /**
   * Get completed tasks for global list
   * @memberOf TaskCollectionModel
   */
  getCompletedGlobalTasksData() {
    const context = {
      work: [],
      hobby: [],
      education: [],
      sport: [],
      other: []
    };
    
    for(let i in this.data) {
      this.dateFinished = new Date(this.data[i].dateFinished).toDateString();
      if(this.today !== this.dateFinished && this.data[i].isDone === true) {
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
