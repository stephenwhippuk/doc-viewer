// this is a standard wrapper for some functional compoent to add consistent top menu

class ActionButton{
    constructor(name, classList, event){
        this.name = name;
        this.action = event;
        this.classList = classList;
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

    addContentObject(content) {
        this.content = content;
    }

    setContent(content) {
        this.contentElement.innerHTML = content;
    }

    render(){
        const header = document.createElement('div');
        header.classList.add('header');

        let title = document.createElement('h1');
        title.classList.add('widget-title');
        title.innerText = this.name;
        header.appendChild(title);

        let contentDiv = document.createElement('div');
        contentDiv.classList.add('widget-content');

        // add expand all button
        if(this.actionButtons.length > 0){
            let buttonsDiv = document.createElement('div');
            buttonsDiv.classList.add('widget-actions');
            this.actionButtons.forEach(button => {
                const actionButton = document.createElement('span');
                let classList = button.classList.split(' ');
                classList.forEach(cls => actionButton.classList.add(cls));
                actionButton.title = button.name;
                actionButton.addEventListener('click', function(){
                    let evt = new CustomEvent(button.action, {detail : ""});
                    contentDiv.dispatchEvent(evt);
                });
                buttonsDiv.appendChild(actionButton);
            });    
            header.appendChild(buttonsDiv);
        }
        this.element.appendChild(header);

        this.element.appendChild(contentDiv);
        this.contentElement = contentDiv;
    }
}