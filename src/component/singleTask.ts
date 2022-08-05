/* eslint-disable @typescript-eslint/triple-slash-reference */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-mixed-spaces-and-tabs */

import { Draggable } from '../interfaces/drag-drop.js'
import AppComponent from './baseClass.js'
import { TaskType} from '../models/taskFormat.js'

/**
 * Class Single Task inherits Base class - AppComponent
 * To get UL element as template and render Li elements to it * 
 * The class implements interface for drag and drop events
 */
export default class SingleTask extends AppComponent<HTMLUListElement, HTMLLIElement> implements Draggable{
  	private task: TaskType
  	constructor(hostID: string, singletask: TaskType){
  		super('task-display-template', hostID, false, singletask.id)
  		this.task = singletask

  		this.configure()
  		this.renderContent()
  	}

  	configure(): void {
  		this.viewSection.addEventListener('dragstart', this.dragStartHandler.bind(this))
  		// this.viewSection.addEventListener('dragend', this.dragEndHandler.bind(this))
  	}

	/**
	 * Public method to render Li element with task content and created date
	 */
  	renderContent(): void {		
      this.viewSection.querySelector('#text')!.textContent = this.task.taskContent
      this.viewSection.querySelector('#time')!.append(this.task.createdAt)
  	}  

	/**
	 * Public method to transfer data on dragging the Li element
	 * @param event 
	 */
  	dragStartHandler(event: DragEvent): void {
      event.dataTransfer!.setData('text/plain', this.task.id)
      event.dataTransfer!.effectAllowed = 'move'
  	}	

  	// dragEndHandler(event: DragEvent): void {      
  	// }    
}