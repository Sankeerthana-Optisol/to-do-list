
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-mixed-spaces-and-tabs */

import { taskStatehandler } from '../models/stateHandler.js'
import { TaskType, TaskStatus } from '../models/taskFormat.js'
import { DragTarget } from '../interfaces/drag-drop.js'
import AppComponent from './baseClass.js'
import SingleTask from './singleTask.js'

export default class TaskList extends AppComponent<HTMLDivElement, HTMLElement> implements DragTarget{
  	assignedTasks: TaskType[]

  	constructor(private type: 'Active' | 'Completed'){
  		super('list-of-tasks', 'app', false, `${type}-tasks`)
  		this.assignedTasks = []
      
  		this.configure()
  		this.renderContent()
  	}
    
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
  	renderContent(){  
      this.viewSection.querySelector('ul')!.id = this.type
      this.viewSection.querySelector('h4')!.textContent = this.type + ' Tasks'
  	}

  	dragOverHandler(event: DragEvent): void {
  		if(event.dataTransfer && event.dataTransfer.types[0] === 'text/plain'){
  			event.preventDefault()
  			this.viewSection?.classList.add('drags')
  		}
  	}

  	dragLeaveHandler(event: DragEvent): void {
  		this.viewSection?.classList.remove('drags')
      
  	}

  	drophandler(event: DragEvent): void {    
  		const taskID = event.dataTransfer!.getData('text/plain')
  		taskStatehandler.moveTask(
  			taskID, 
  			this.type === 'Active' ? TaskStatus.Active : TaskStatus.Completed
  		)
      
  	}
  	private renderTasks(){
  		const listElement = <HTMLUListElement> document.getElementById(this.type)
  		listElement.innerHTML = ''
  		for (const task of this.assignedTasks){      
  			new SingleTask(this.viewSection.querySelector('ul')!.id, task)
  			// const taskTile = document.createElement('li')
  			// taskTile.textContent = task.taskContent
  			// listElement.appendChild(taskTile)
  		}
  	}
}