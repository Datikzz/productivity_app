export default class TasksCollectionModel {
  constructor(){
    this.data = data;
  }
  getTasksData(){
    const context = {
      task-work: [],
      task-hobby: [],
      task-education: [],
      task-sport: [],
      task-other: []
    };
    for(let i in this.data){
      switch(this.data[i][category]){
        case 'task-work':
          context['task-work'].push(this.data[i]);
          break;
        case 'task-hobby':
          context['task-hobby'].push(this.data[i]);
          break;
        case 'task-education':
          context['task-education'].push(this.data[i]);
          break;
        case 'task-sport':
          context['task-sport'].push(this.data[i]);
          break;
        case 'task-other':
          context['task-other'].push(this.data[i]);
          break;
        default:
          return null;
      }
    }
    return context;
  }
}
