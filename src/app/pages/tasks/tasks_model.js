export default class TaskModel {
  constructor(data){
    this.taskId = Date.now();
    this.taskType = data.taskType;
    this.createDate = Date.now();
    this.startDate = 0;
    this.deadline = data.deadline;
    this.taskTitle = data.taskTitle;
    this.taskDesc = data.taskDesc;
    this.priorityType = data.priorityType;
    this.isActive = false;
    this.estimationTotal = data.estimation;
    this.estimationUsed = 0;
  }
}
