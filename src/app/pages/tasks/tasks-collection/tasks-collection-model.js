export default class TasksCollectionModel {
  constructor(data){
    this.data = data;
  }

  getTasksData(){
    const context = {
      work: [],
      hobby: [],
      education: [],
      sport: [],
      other: []
    };
    for(let i in this.data){

      switch(this.data[i]['taskType']){
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
    return context;
  }
}
