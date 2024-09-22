# HTMLViewer Component

The HTML Viewer is a wrapper around an IFrame to display  HTML Content. It will call an api function to the server and provides event handling for print and refresh commands. It also provides an interface to allow the url to be modified and content relaoded

## Specification

## Methods

**constructor** (url : *string*, parentElement : *HTMLElement*) -> sets up the Viewer properties, renders it and sets up event handling

**render** ( ) -> renders the iframe into parentElement, ensuring it has a unique id

**configureEventHandlers** ( ) -> sets up handlers that link refresh and print events to their respective methods

**refresh** ( ) -> causes content to be reloaded from server

**print** ( ) -> prints the contents of the reference iframe only

**changeUrl** (url: *string*) -> changes the url of the content and causes this to be loaded into the iframe

**loadContent** (url :*string*, callBack : *(content : string) -> void* ) -> loads the content from the server and then sends this to the callBack, which is currently just setContent

**setContent** (content : *string*) -> sets the HTML content of the IFrame

## Emits

none 

## Consumes 

**refresh** -> cuases refresh to be called

**print** -> causes print to be called

## structure
```
parent
    iFrame
```

## Classes
 **.html-viewer** -> the class of the iframe

## RoadMap
- generalisation to free the viewer from having to use a specific endpoint for the content.  

## Examples of Use


Creating a Viewer
```html
    <div id="contentViewer">

    ...

    <script>
        ...
        let contentDiv = document.getElementById('#contentViewer')
        let viewer = new HtmlViewer('myFile.html', contentDiv)
        ...    

```

modifying the existing viewer to a new page

```html
    <script>
        let contentDiv = document.getElementById('#contentViewer')
        let viewer = new HtmlViewer('myFile.html', contentDiv)
        
        ...
        let newUrl = 'myFile2.html'
        viewer.changeUrl(newUrl);
```