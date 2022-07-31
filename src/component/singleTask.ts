/* eslint-disable @typescript-eslint/triple-slash-reference */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-mixed-spaces-and-tabs */

import { Draggable } from '../interfaces/drag-drop.js'
import AppComponent from './baseClass.js'
import { TaskType} from '../models/taskFormat.js'

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
  		this.viewSection.addEventListener('dragend', this.dragEndHandler.bind(this))
  	}
  	renderContent(): void {		
      this.viewSection.querySelector('#text')!.textContent = this.task.taskContent
      this.viewSection.querySelector('#time')!.append(this.task.createdAt)
  	}  
  	dragStartHandler(event: DragEvent): void {
      event.dataTransfer!.setData('text/plain', this.task.id)
      event.dataTransfer!.effectAllowed = 'move'
  	}

  	dragEndHandler(event: DragEvent): void {
      
  	}    
}