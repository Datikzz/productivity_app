export default class DataService{
  getTask: (id) => {
    return this.firebaseRef.once('value').then((snap) => {
      return snap.val();
    }
  },
  createTask: () => {

  },
  removeTask: (id) => {

  },
  editTask(id) => {

  }
}
