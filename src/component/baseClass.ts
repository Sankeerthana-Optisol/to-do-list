/* eslint-disable no-mixed-spaces-and-tabs */

/**
 * Base class - App component
 * To get template component and update rendering component
 */
export default abstract class AppComponent <T extends HTMLDivElement | HTMLUListElement, U extends HTMLElement | HTMLLIElement>{
  	template: HTMLTemplateElement
  	renderTemplate: T
  	viewSection: U

  	constructor(
  		templateID: string, 
  		renderTemplateID: string, 
  		insertAtStart: boolean,
  		newSectionID?: string
  	){    
  		this.template = <HTMLTemplateElement> document.getElementById(templateID)
  		this.renderTemplate = <T> document.getElementById(renderTemplateID)

  		const importTemplateNode = document.importNode(this.template.content, true)
  		this.viewSection = <U> importTemplateNode.firstElementChild
  		if(newSectionID){      
  			this.viewSection.id = newSectionID
  		}
  		this.attachComponents(insertAtStart)
  	}

	/**
		 * method to include the template to the redenering component
		 * addTask component included 'afterbegin'
		 * taskList components included 'beforeend'
		 * @param insertAtStart 
		 */
  	private attachComponents(insertAtStart: boolean){
  		this.renderTemplate.insertAdjacentElement(
  			insertAtStart ? 'afterbegin' : 'beforeend', 
  			this.viewSection
  		)
  	}

  abstract configure(): void
  abstract renderContent(): void
}