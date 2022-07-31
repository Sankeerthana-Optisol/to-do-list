import { taskStatehandler } from '../models/stateHandler.js';
import { TaskStatus } from '../models/taskFormat.js';
import AppComponent from './baseClass.js';
import SingleTask from './singleTask.js';
export default class TaskList extends AppComponent {
    constructor(type) {
        super('list-of-tasks', 'app', false, `${type}-tasks`);
        this.type = type;
        this.assignedTasks = [];
        this.configure();
        this.renderContent();
    }
    configure() {
        this.viewSection.addEventListener('dragover', this.dragOverHandler.bind(this));
        this.viewSection.addEventListener('dragleave', this.dragLeaveHandler.bind(this));
        this.viewSection.addEventListener('drop', this.drophandler.bind(this));
        taskStatehandler.addListener((listOfTasks) => {
            const clustertasks = listOfTasks.filter(task => {
                if (this.type === 'Active') {
                    return task.taskStatus === TaskStatus.Active;
                }
                return task.taskStatus === TaskStatus.Completed;
            }).reverse();
            this.assignedTasks = clustertasks;
            this.renderTasks();
        });
    }
    renderContent() {
        this.viewSection.querySelector('ul').id = this.type;
        this.viewSection.querySelector('h4').textContent = this.type + ' Tasks';
    }
    dragOverHandler(event) {
        var _a;
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            (_a = this.viewSection) === null || _a === void 0 ? void 0 : _a.classList.add('drags');
        }
    }
    dragLeaveHandler(event) {
        var _a;
        (_a = this.viewSection) === null || _a === void 0 ? void 0 : _a.classList.remove('drags');
    }
    drophandler(event) {
        const taskID = event.dataTransfer.getData('text/plain');
        taskStatehandler.moveTask(taskID, this.type === 'Active' ? TaskStatus.Active : TaskStatus.Completed);
    }
    renderTasks() {
        const listElement = document.getElementById(this.type);
        listElement.innerHTML = '';
        for (const task of this.assignedTasks) {
            new SingleTask(this.viewSection.querySelector('ul').id, task);
        }
    }
}
