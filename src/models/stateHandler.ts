/* eslint-disable no-mixed-spaces-and-tabs */

import { TaskType, TaskStatus } from './taskFormat.js'
/* Function type definition that takes array of TaskType as parameter and returns nothing */
export type Listener = (toDo: TaskType[])=> void

/* Class to Hanlde state of the task
    Listen to task submission and move task to active state
    This class should be instantiated only once in the run-time
  */
class TaskStateHandler{
  	private listeners: Listener[] = []
  	private tasks: TaskType[] = []
  	private static instance: TaskStateHandler

  	// eslint-disable-next-line @typescript-eslint/no-empty-function
  	private constructor(){}

  	static getInstance(){
  		if(this.instance)
  			return this.instance
  		this.instance = new TaskStateHandler()
  		return this.instance
  	}

  	addListener(listenerFn: Listener){
  		this.listeners.push(listenerFn)
  	}

  	addTask(taskContent: string){
  		const date = new Date()
  		const timeStamp = `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()<10 ? '0'+date.getDate() : date.getDate()}, ${date.getFullYear()}`

  		const taskObj = new TaskType(
  			Math.random().toString(),
  			taskContent,
  			TaskStatus.Active,
  			timeStamp
  		)
  		this.tasks.push(taskObj)
  		this.updateListeners()
  	}

  	moveTask(taskID: string, newStatus: TaskStatus){
  		const findtask = this.tasks.find(task=> task.id === taskID)
  		if(findtask && findtask.taskStatus !== newStatus){
  			findtask.taskStatus = newStatus
  			this.updateListeners()
  		}
  	}

  	private updateListeners(){
  		for( const listenerFn of this.listeners){   
  			//pass a copy of list of tasks to the function
  			listenerFn(this.tasks.slice())                  
  		}
  	}
}
export const taskStatehandler = TaskStateHandler.getInstance()
