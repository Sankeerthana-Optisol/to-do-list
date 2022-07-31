import { TaskType, TaskStatus } from './taskFormat.js';
class TaskStateHandler {
    constructor() {
        this.listeners = [];
        this.tasks = [];
    }
    static getInstance() {
        if (this.instance)
            return this.instance;
        this.instance = new TaskStateHandler();
        return this.instance;
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
    addTask(taskContent) {
        const date = new Date();
        const timeStamp = `${date.toLocaleString('default', { month: 'short' })} ${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}, ${date.getFullYear()}`;
        const taskObj = new TaskType(Math.random().toString(), taskContent, TaskStatus.Active, timeStamp);
        this.tasks.push(taskObj);
        this.updateListeners();
    }
    moveTask(taskID, newStatus) {
        const findtask = this.tasks.find(task => task.id === taskID);
        if (findtask && findtask.taskStatus !== newStatus) {
            findtask.taskStatus = newStatus;
            this.updateListeners();
        }
    }
    updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.tasks.slice());
        }
    }
}
export const taskStatehandler = TaskStateHandler.getInstance();
