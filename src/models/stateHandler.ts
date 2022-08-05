/* eslint-disable @typescript-eslint/no-empty-function */
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
	
	/**
	 * Private constructor to maintain static function to achieve singleton 
	 */
  	private constructor(){}

	/**
	 * static method to instantiate the class and maintain singleton.
	 * @returns instance of the class
	 */
  	static getInstance(){
  		if(this.instance)
  			return this.instance
  		this.instance = new TaskStateHandler()
  		return this.instance
  	}

	/**
	 * public method to add the events to the listerner funtion list on every add task event
	 * @param listenerFn 
	 */
  	addListener(listenerFn: Listener){
  		this.listeners.push(listenerFn)
  	}

	/**
	 * public method to add tasks in the Active list
	 * @param taskContent 
	 */
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

	/**
	 * public method to move a task between Active and completed list of tasks
	 * @param taskID 
	 * @param newStatus 
	 */
		  moveTask(taskID: string, newStatus: TaskStatus){
  		const findtask = this.tasks.find(task=> task.id === taskID)
  		if(findtask && findtask.taskStatus !== newStatus){
  			findtask.taskStatus = newStatus
  			this.updateListeners()
  		}
  	}

	/**
	 * method to update the listener function list with updated task list for each listener function
	 */
  	private updateListeners(){
  		for( const listenerFn of this.listeners){   
  			//pass a copy of list of tasks to the function
  			listenerFn(this.tasks.slice())                  
  		}
  	}
}
export const taskStatehandler = TaskStateHandler.getInstance()
