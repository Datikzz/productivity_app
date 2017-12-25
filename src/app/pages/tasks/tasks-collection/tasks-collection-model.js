export default class TasksCollectionModel {
  constructor(){
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
      switch(this.data[i][category]){
        case 'work':
          context['work'].push(this.data[i]);
          break;
        case 'hobby':
          context['hobby'].push(this.data[i]);
          break;
        case 'education':
          context['education'].push(this.data[i]);
          break;
        case 'sport':
          context['sport'].push(this.data[i]);
          break;
        case 'other':
          context['other'].push(this.data[i]);
          break;
        default:
          return null;
      }
    }
    return context;
  }
}
