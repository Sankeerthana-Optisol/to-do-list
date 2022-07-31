/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-empty-function */

import AppComponent from './baseClass.js'
import { taskStatehandler } from '../models/stateHandler.js'

// class to add a new task
export default class AddTask extends AppComponent<HTMLDivElement, HTMLFormElement>{
  	taskContent: HTMLInputElement

  	constructor(){
  		super('add-new-task', 'app', true, 'task-adder-form')		
  		this.taskContent = <HTMLInputElement> this.viewSection.firstElementChild?.querySelector('#task-content')
  		this.configure()
  	}

  	configure(){
  		this.viewSection.addEventListener('submit', this.formSubmitter.bind(this))
  	}

  	// eslint-disable-next-line @typescript-eslint/no-empty-function
  	renderContent(): void {}

  	private clearInputBox(){
  		this.taskContent.value = ''
  	}

  	private collectTasks(): string | null{
  		const task = this.taskContent.value
  		if(task.length == 0){
  			alert('Add some content to the task')
  			return null
  		}
  		else if(task.length < 10){
  			alert('This doesn\'t looks like a complete task\n\nIt can be more descriptive right!')
  			return null
  		}
  		return task
  	}

  	private formSubmitter(event: Event){
  		event.preventDefault()
  		const addedTaskContent = this.collectTasks() 
  		if(typeof addedTaskContent === 'string'){
  			taskStatehandler.addTask(addedTaskContent)
  			this.clearInputBox()
  		}
  	}

}