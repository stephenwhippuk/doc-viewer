// this is the simplest viewer to provide the basis for the other types

class HtmlViewer{
    constructor(url, parentElement){
        this.url = url;
        this.content = '';
        this.parentElement = parentElement;
        this.dataLoaded = false;
        this.render();
        this.parentElement.addEventListener('refresh', () => {
            this.dataLoaded = false;
            this.render();
        })
        this.parentElement.addEventListener('print', () => {
            // this needs sorting to only print the content
            window.print();
        })
    }

    render(){
        if(!this.dataLoaded){
            fetch(`api/loadContent/${this.url}`)
                .then(response => response.text())
                .then(data => {
                    this.content = data;
                    this.parentElement.innerHTML = this.content;
                    this.dataLoaded = true;
                });            
        }
        else{
            this.parentElement.innerHTML = this.content;
        }

    }
}