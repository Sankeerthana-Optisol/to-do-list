/* eslint-disable no-mixed-spaces-and-tabs */

/* Enum to maintain state values for tasks (Active, Completed) */
export enum TaskStatus {Active, Completed}

/* Class to structure the type of the task 
    - Task Content - a string
    - Task status  - TaskStatus enum
  */
export class TaskType {
  	constructor(
        public id: string, 
        public taskContent: string, 
        public taskStatus: TaskStatus, 
        public createdAt: string
  	){}
}