// doc space is the simplest workspace object

class DocSpace {
    constructor(element) {
        this.element = element;
        this.content = null;    
        this.displayType = ''    
        element.addEventListener('load-content', (event) => {
            this.loadContent(event.detail);
        })
        this.render();
    }

    loadContent(content) {    
        if(content.type === 'html'){
            if(this.displayType != 'html'){
                this.content = new Widget(this.element.querySelector('.docspace-content'), '', [
                    new ActionButton('btn-html-refresh', 'Reload', 'refresh fa fa-refresh', 'refresh'),
                    new ActionButton('btn-html-print','Print', 'print fa fa-print', 'print')
                ]); 
                let viewer = new HtmlViewer(content.reference, this.content.contentElement);
                this.content.setContentObject(viewer);
                this.displayType = 'html';
            }
            else{
                // we know that if we hit here the HTML viewer is already created,
                // so we just need to change the URL its pointing to
                this.content.callOnContentObject('changeUrl', content.reference);
            }
        }
    }

    render() {
        // clear existing 
        this.element.innerHTML = '';

        // create elements
        let contentDiv = document.createElement('div');

        // assemble
        this.element.appendChild(contentDiv);

        // style
        contentDiv.classList.add('docspace-content');
    }
}