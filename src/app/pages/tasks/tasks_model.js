/**
 * Class representing task model
 * @namespace  TaskModel
 */
export default class TaskModel {
  /**
   * constructor of TaskModel
   * @constructs TaskModel
   * @memberOf TaskModel
   * @param {object} data - task values
   */
  constructor(data){
    this.taskId = data.taskId || Date.now();
    this.taskType = data.taskType;
    this.createDate = Date.now();
    this.startDate = 0;
    this.deadline = data.deadline;
    this.dateFinished = 0;
    this.taskTitle = data.taskTitle;
    this.taskDesc = data.taskDesc;
    this.priorityType = data.priorityType;
    this.isActive = data.isActive || false;
    this.isFailed = data.isFailed || false;
    this.isDone = data.isDone || false;
    this.estimationTotal = data.estimationTotal;
    this.estimationUsed = 0;
    this.estimationFailed = 0;
  }
}
