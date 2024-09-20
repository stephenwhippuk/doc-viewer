// doc space is the simplest workspace object

class DocSpace {
    constructor(element) {
        this.element = element;
        this.content = null;        
        element.addEventListener('load-content', (event) => {
            this.loadContent(event.detail);
        })
    }

    loadContent(content) {
        this.render();        
        fetch(`api/loadContent/${content.reference}`)
            .then(response => response.text())
            .then(data => {
                this.content = data;
                this.element.querySelector('.docspace-content').innerHTML = data;
            });
    }

    render() {
        let contentDiv = document.createElement('div');
        contentDiv.classList.add('docspace-content');
        this.element.appendChild(contentDiv);
    }
}