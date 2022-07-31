import AppComponent from './baseClass.js';
import { taskStatehandler } from '../models/stateHandler.js';
export default class AddTask extends AppComponent {
    constructor() {
        var _a;
        super('add-new-task', 'app', true, 'task-adder-form');
        this.taskContent = (_a = this.viewSection.firstElementChild) === null || _a === void 0 ? void 0 : _a.querySelector('#task-content');
        this.configure();
    }
    configure() {
        this.viewSection.addEventListener('submit', this.formSubmitter.bind(this));
    }
    renderContent() { }
    clearInputBox() {
        this.taskContent.value = '';
    }
    collectTasks() {
        const task = this.taskContent.value;
        if (task.length == 0) {
            alert('Add some content to the task');
            return null;
        }
        else if (task.length < 10) {
            alert('This doesn\'t looks like a complete task\n\nIt can be more descriptive right!');
            return null;
        }
        return task;
    }
    formSubmitter(event) {
        event.preventDefault();
        const addedTaskContent = this.collectTasks();
        if (typeof addedTaskContent === 'string') {
            taskStatehandler.addTask(addedTaskContent);
            this.clearInputBox();
        }
    }
}
