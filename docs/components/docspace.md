# DocSpace Component

a work space area for diplaying a Single Document Interface. Currently specialised for 
the doc viewer it creates a widgit and its associated ContentViewer based upon the type of content
being provided. 

## specification 

### Methods:

**constructor** (element : *HTMLElement*) -> setups and then calls render, clearing and creating the DocSpace into the innerHTML of element

**render** ( ) -> Called on construction this sets up the docspace content object and assembles it to the parent element 

### Emits

none

### Consumes

**loadContent** (contentObject: *FolderContent*) -> renders the content object reusing existing viewer or cerating a new one if the content type differs to current 

### Structure
```
parent [el]
    content [div]
```

### Classes
**.docspace-content** - the content area of the docspace

## road map
- extension of component to allow it to function as a stand alone general component 