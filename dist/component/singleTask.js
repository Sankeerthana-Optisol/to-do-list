import AppComponent from './baseClass.js';
export default class SingleTask extends AppComponent {
    constructor(hostID, singletask) {
        super('task-display-template', hostID, false, singletask.id);
        this.task = singletask;
        this.configure();
        this.renderContent();
    }
    configure() {
        this.viewSection.addEventListener('dragstart', this.dragStartHandler.bind(this));
        this.viewSection.addEventListener('dragend', this.dragEndHandler.bind(this));
    }
    renderContent() {
        this.viewSection.querySelector('#text').textContent = this.task.taskContent;
        this.viewSection.querySelector('#time').append(this.task.createdAt);
    }
    dragStartHandler(event) {
        event.dataTransfer.setData('text/plain', this.task.id);
        event.dataTransfer.effectAllowed = 'move';
    }
    dragEndHandler(event) {
    }
}
