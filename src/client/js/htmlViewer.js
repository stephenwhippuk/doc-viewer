// this is the simplest viewer to provide the basis for the other types

class HtmlViewer{
    constructor(url, parentElement){
        this.url = url;
        this.content = '';
        this.parentElement = parentElement;
        this.dataLoaded = false;
        this.render();
        this.configureEventHandlers();
    }

    configureEventHandlers(){
        this.parentElement.addEventListener('refresh', () => this.refresh())
        this.parentElement.addEventListener('print', () => this.print())
    }

    refresh(){
        this.dataLoaded = false;
        this.loadContent(this.url, (data) => this.setContent(data));
    }

    print(){
        window.print();
    }

    changeUrl(url){
        if(url !== this.url){
            this.url = url;
            this.refresh();
        }
    }

    render(){
        // clear existing
        this.parentElement.innerHTML = '';

        // create iframe for our content
        let iframe = document.createElement('iframe');

        // assemble
        this.parentElement.appendChild(iframe);

        // style
        iframe.classList.add('html-viewer');

        // load content
        if(!this.dataLoaded){
            this.loadContent(this.url, (data) => this.setContent(data));       
        }
    }

    loadContent(url, callback){
        fetch(`api/loadContent/${url}`)
        .then(response => response.text())
        .then(data => {
            callback(data)
            this.dataLoaded = true;
        })
    }

    setContent(content){
        this.content = content;
        this.parentElement.querySelector('iframe').contentWindow.document.open();
        this.parentElement.querySelector('iframe').contentWindow.document.write('');
        this.parentElement.querySelector('iframe').contentWindow.document.write(content);
    }

}