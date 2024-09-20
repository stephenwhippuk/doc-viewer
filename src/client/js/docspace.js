// doc space is the simplest workspace object

class DocSpace {
    constructor(element) {
        this.element = element;
        this.content = null;    
        this.displayType = ''    
        element.addEventListener('load-content', (event) => {
            this.loadContent(event.detail);
        })
    }

    loadContent(content) {
        this.render();        
        if(content.type === 'html'){
            if(this.displayType != 'html'){
                this.content = new Widget(this.element.querySelector('.docspace-content'), '', [
                    new ActionButton('Reload', 'refresh fa fa-refresh', 'refresh'),
                    new ActionButton('Print', 'print fa fa-print', 'print')
                ]); 
                let viewer = new HtmlViewer(content.reference, this.content.contentElement);
                this.content.addContentObject(viewer);
                this.displayType = 'html';
            }
            else{
                this.content.setContent('');
                let viewer = new HtmlViewer(content.reference, this.content.contentElement);
                this.content.addContentObject(viewer);
            }
        }
    }

    render() {
        let contentDiv = document.createElement('div');
        contentDiv.classList.add('docspace-content');
        this.element.appendChild(contentDiv);
    }
}