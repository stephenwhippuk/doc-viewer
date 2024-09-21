// this is a standard wrapper for some functional compoent to add consistent top menu

class ActionButton{
    constructor(id, name, classList, event, showText= false){
        this.id = id;
        this.name = name;
        this.action = event;
        this.classList = classList;
        this.showText = showText;
    }
}

class Widget {
    constructor(element, title, actionButtons) {
        this.element = element;
        this.contentElement = null;
        this.content = null;
        this.name = title;
        this.actionButtons = actionButtons;
        this.render();
    }

    setContentObject(content) {
        this.content = content;
    }

    setContent(content) {
        this.contentElement.innerHTML = content;
    }

    callOnContentObject(func, args){
        this.content[func](args);
    }

    render(){
        // clear existing content
        this.element.innerHTML = '';

        // create elements
        const header = document.createElement('div');
        let title = document.createElement('h1');
        let contentDiv = document.createElement('div');
        let actionDiv = null;
        let actionButtonElements = [];
        if(this.actionButtons.length > 0){
            actionDiv = document.createElement('div');
            this.actionButtons.forEach((button) => {
                actionButtonElements.push(document.createElement('span'));
                // give each an id so we can reference them later
                actionButtonElements[actionButtonElements.length - 1].id = button.id;
            });
        }

        // assemble
        if(actionDiv){
            actionButtonElements.forEach((button) => {
                actionDiv.appendChild(button);
            })
        }
        header.appendChild(title);
        if(actionDiv){
            header.appendChild(actionDiv);
        }
        this.element.appendChild(header);
        this.element.appendChild(contentDiv);

        // style
        this.element.classList.add('widget');
        header.classList.add('header');
        title.classList.add('widget-title');
        contentDiv.classList.add('widget-content');
        if(actionDiv){
            actionDiv.classList.add('widget-actions');
            actionButtonElements.forEach((button) => {
                button.classList.add('widget-action');                   
            });
            this.actionButtons.forEach((button, index) => {
                var classList = button.classList.split(' ');
                classList.forEach(cls => actionButtonElements[index].classList.add(cls));
            })
        }

        // set content of elements
        title.innerText = this.name;
        actionButtonElements.forEach((button, index) => {
            if(this.actionButtons[index].showText){
                button.setAttribute('data-showText', this.actionButtons[index].showText);
                button.innerText = this.actionButtons[index].name;
            }
            else
                button.title = this.actionButtons[index].name;
        })
        this.contentElement = contentDiv;

        // add event listeners
        actionButtonElements.forEach((button, index) => {
            button.addEventListener('click', () => {
                let evt = new CustomEvent(this.actionButtons[index].action, {detail : ""});
                contentDiv.dispatchEvent(evt);
            });
        })
        
    }
}