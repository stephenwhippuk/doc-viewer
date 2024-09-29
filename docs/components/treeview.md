# TreeView Component

A Tree view takes a tree sturcture of nodes (Folders and FolderContent), renders them to a tree of Treeview Nodes and then recursively moves through the nodes with an indent based upon how many levels the node is down. The final structure in HTML is a flat list of content elements

## Specification 

### Methods

**constructor** (name : *string*, element : *HTMLElement*, content: *TreeViewNode*, dispatcher : *EventDispatcher*)-> sets up and then renders content into element. name is currently for reference

**render** ( ) ->  clears and begins the recursive building of treeview nodes 

**renderNode** (node : *TreeViewNode*, parentElement : *HTMLElement*, indent : *number*) 
-> a recursive function that will construct the node passed in and any children etc. Only children of expanded folders are rendered. ultimately these will be the innerHtml of the parentElement. Each recursion increases the indent 

**expandAll** ( ) -> triggers all folder nodes in the tree to be expanded and renders the tree again

**collapseAll** ( ) -> triggers all folder nodes in the tree to be collapsed and renders the tree again

### Emits

**content-selected** (content : *FolderContent*) -> emited into dispatcher when a file content is clicked

### Consumes 

**expand-all** () -> triggers call to expandAll method

**collapse-all** () -> triggers call to collapseAll  method

### Data Attributes

**data-indent** -> a number that determines the basic pixel size of the indentation per tree level default is 10

**data-spacing** -> a string setting for the margin-bottom of each node

### Structure
```
    parent
        'icon text caret' WHERE (folder) OR 'icon text' WHERE (File or empty folder)
        ...
```

icon and caret are spans holding icons (currently from font awesome)

### Classes
**.treeview-node** -> all treeview nodes have this class

**.folder** ->  added when the node is a Folder

**.content** -> added when the node is Content

**.content-icon** -> the class added to the initial icon for the Node

**.caret** -> the clas added for the caret 

**.muted** -> added when a folder has no children 

## Road Map
- a folder type view may be created as an alterative way of viewing the tree on smaller screens or by aesthetic choice

## Examples of Use

### simple treeview
```html
    <nav id="treeview" data-indent="12" data-spacing="10px" />
    ...
    <div id="consumer"></div>
    ...

    <script>
    ...
    let parent = document.getElementById('#treeview')
    let rawContent = FetchContent(); // method to get raw json data for the nodes (not included)
    let folderTree = TreeView.createTreeViewNodeFromData(rawContent);
    let dispatcher = new EventDispatcher();

    let treeView = new TreeView('sample', parent, folderTree, dispatcher);
    ...
    // setup event handling for dispatcher
   

```

### setup event handling
```html
    ...

    <div id="consumer"></div>

    ...

    <script>
        ...
        
        let consumer = document.getElementById('#consumer')
        dispatcher.registerEvent('content-selected', consumer);
        
        ...

```


