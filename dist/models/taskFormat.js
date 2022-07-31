export var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["Active"] = 0] = "Active";
    TaskStatus[TaskStatus["Completed"] = 1] = "Completed";
})(TaskStatus || (TaskStatus = {}));
export class TaskType {
    constructor(id, taskContent, taskStatus, createdAt) {
        this.id = id;
        this.taskContent = taskContent;
        this.taskStatus = taskStatus;
        this.createdAt = createdAt;
    }
}
