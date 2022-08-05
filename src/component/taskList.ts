
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-mixed-spaces-and-tabs */

import { taskStatehandler } from '../models/stateHandler.js'
import { TaskType, TaskStatus } from '../models/taskFormat.js'
import { DragTarget } from '../interfaces/drag-drop.js'
import AppComponent from './baseClass.js'
import SingleTask from './singleTask.js'

/**
 * Class to manage Active and Completed tasks list, 
 * inheriting base class, and 
 * implementing interfaces of drag and drop events function
 */
export default class TaskList extends AppComponent<HTMLDivElement, HTMLElement> implements DragTarget{
  	assignedTasks: TaskType[]

  	constructor(private type: 'Active' | 'Completed'){
  		super('list-of-tasks', 'app', false, `${type}-tasks`)
  		this.assignedTasks = []
      
  		this.configure()
  		this.renderContent()
  	}
    
	/**
		 * method listening for drag and drop between active and completed task lists
		 * Add task to the active or completed list based on it's status captured during drag and drop
		 */
  	configure(): void {
  		this.viewSection.addEventListener('dragover', this.dragOverHandler.bind(this))
  		this.viewSection.addEventListener('dragleave', this.dragLeaveHandler.bind(this))
  		this.viewSection.addEventListener('drop', this.drophandler.bind(this))

  		taskStatehandler.addListener((listOfTasks: TaskType[])=>{
  			const clustertasks = listOfTasks.filter(task => {
  				if(this.type === 'Active'){
  					return task.taskStatus === TaskStatus.Active
  				}
  				return task.taskStatus === TaskStatus.Completed
  			}).reverse()
  			this.assignedTasks = clustertasks 
  			this.renderTasks()        
  		})
  	}

	/**
		 * rendering method set heading content on run time
		 */
  	renderContent(){  
      this.viewSection.querySelector('ul')!.id = this.type
      this.viewSection.querySelector('h4')!.textContent = this.type + ' Tasks'
  	}

	/**
		 * method to transfer data while dragging the task and add stylings to lists accordingly
		 * @param event 
		 */
  	dragOverHandler(event: DragEvent): void {
  		if(event.dataTransfer && event.dataTransfer.types[0] === 'text/plain'){
  			event.preventDefault()
  			this.viewSection?.classList.add('drags')
  		}
  	}


	/**
		 * method to remove stylings from the previous list after dragging the task to another list
		 * @param event 
		 */
  	dragLeaveHandler(event: DragEvent): void {
  		this.viewSection?.classList.remove('drags')
      
  	}

	/**
		 * method to update the task status on droping the task in a task list
		 * @param event 
		 */
  	drophandler(event: DragEvent): void {    
  		const taskID = event.dataTransfer!.getData('text/plain')
  		taskStatehandler.moveTask(
  			taskID, 
  			this.type === 'Active' ? TaskStatus.Active : TaskStatus.Completed
  		)
      
  	}

	/**
		 * method to instantiate the Single Task class to add a task in the relevant task list
		 */
  	private renderTasks(){
  		const listElement = <HTMLUListElement> document.getElementById(this.type)
  		listElement.innerHTML = ''
  		for (const task of this.assignedTasks){      
  			new SingleTask(this.viewSection.querySelector('ul')!.id, task)
  		}
  	}
}