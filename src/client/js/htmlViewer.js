// this is the simplest viewer to provide the basis for the other types

class HtmlViewer{
    constructor(url, parentElement){
        this.url = url;
        this.content = '';
        this.parentElement = parentElement;
        this.dataLoaded = false;
        this.frameId = null;
        this.render();
        this.configureEventHandlers();
    }

    configureEventHandlers(){
        this.parentElement.addEventListener('refresh', () => this.refresh())
        this.parentElement.addEventListener('print', () => this.print())
        this.parentElement.addEventListener('change-url', (event) => this.changeUrl(event.detail))
    }

    refresh(){
        this.dataLoaded = false;
        this.loadContent(this.url, (data) => this.setContent(data));
    }

    print(){
        if(this.frameId){
            let frame = document.getElementById(this.frameId);
            frame.contentWindow.print();
        }
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

        // create a unique id for the frame 
        let randomeId = 0
        do{
            randomeId = Math.floor(Math.random() * 1000);
            iframe.id = `iframe-${randomeId}`;
        }while (document.getElementById(`iframe-${randomeId}`));

        this.frameId = iframe.id;

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