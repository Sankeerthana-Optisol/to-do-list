export default class AppComponent {
    constructor(templateID, renderTemplateID, insertAtStart, newSectionID) {
        this.template = document.getElementById(templateID);
        this.renderTemplate = document.getElementById(renderTemplateID);
        const importTemplateNode = document.importNode(this.template.content, true);
        this.viewSection = importTemplateNode.firstElementChild;
        if (newSectionID) {
            this.viewSection.id = newSectionID;
        }
        this.attachComponents(insertAtStart);
    }
    attachComponents(insertAtStart) {
        this.renderTemplate.insertAdjacentElement(insertAtStart ? 'afterbegin' : 'beforeend', this.viewSection);
    }
}
