class Folder{
    constructor(name, children = []){
        this.name = name;
        this.children = children;
    }
}

class FolderContent{
    constructor(name, type, reference){
        this.name = name;
        this.type = type;
        this.reference = reference;
    }
}

class TreeViewNode{
    constructor(content){
        this.content = content;
        this.isExpanded = false;
        if(content instanceof Folder){
            this.children = content.children.map(child => new TreeViewNode(child));
            this.canExpand = true;
        }
        else{
            this.children = [];
            this.canExpand = false;
        }

    }
    get type () {
        return this.content instanceof Folder ? 'folder' : 'content';
    }

    toggle(){
        this.isExpanded = !this.isExpanded;
    }

    expandAll(){
        if(this.canExpand)
            this.isExpanded = true;
        if(this.children.length > 0)
            this.children.forEach(child => child.expandAll());
    }

    collapseAll(){
        this.isExpanded = false;
        if(this.children.length > 0)
            this.children.forEach(child => child.collapseAll());
    }
}

class TreeView{
    constructor(name, element, content, dispatcher){
        this.name = name;
        this.element = element;
        this.rootNode = new TreeViewNode(content);
        this.contentCallback = null;
        this.dispatcher = dispatcher;
        this.render();
        element.addEventListener('expand-all', () => this.expandAll());
        element.addEventListener('collapse-all', () => this.collapseAll());
    }

    render(){

        this.element.innerHTML = '';

        this.renderNode(this.rootNode, this.element, 0);
    }

    // NOTE: this is not restuctured because the structure is already good
    renderNode(node, parentElement, indent){

        let indentScale = this.element.getAttribute("data-indent") || 10;
        let spacing = this.element.getAttribute("data-spacing") || "5px";

        const nodeElement = document.createElement('div');
        nodeElement.classList.add('treeview-node');
       

        // setup this node
        if(node.canExpand){
            nodeElement.classList.add('folder');
            if(node.children.length > 0)
                nodeElement.addEventListener('click', () => {
                    node.toggle();
                    this.render();
                });
        }
        else{
            nodeElement.classList.add('content');
            let self = this;
            nodeElement.addEventListener('click', () => {
                    self.dispatcher.dispatchEvent('content-selected', node.content);
            });
        }
        let icon = document.createElement('span');
        icon.classList.add('content-icon');
        icon.classList.add('fa')
        icon.classList.add(node.type === 'folder' ? 'fa-book' : 'fa-file');

        let caret = document.createElement('span');
        caret.classList.add('caret');
        caret.classList.add('fa');
        caret.classList.add(node.isExpanded ? 'fa-caret-down' : 'fa-caret-right');

        nodeElement.appendChild(icon);
        nodeElement.innerHTML += node.content.name;
        if(node.canExpand){
            if (node.children.length > 0){
                nodeElement.appendChild(caret);
            }
            else {
                nodeElement.classList.add('muted');
            }
        }
        
        nodeElement.style.marginLeft = (indent * indentScale) + "px";
        nodeElement.style.marginTop = spacing;

        parentElement.appendChild(nodeElement);

        if(node.canExpand && node.isExpanded){
            // sort the children so that folders are first
            const sortedChildren = node.children.sort((a, b) => {
                if(a.type === 'folder' && b.type === 'content') return -1;
                if(a.type === 'content' && b.type === 'folder') return 1;
                return 0;
            });
            sortedChildren.forEach(child => this.renderNode(child, parentElement, indent + 1));
        }
    }

    expandAll(){
        // search trough all nodes and expand them
        this.rootNode.expandAll();
        this.render();
    }

    collapseAll(){
        // search trough all nodes and collapse them
        this.rootNode.collapseAll();
        this.render();
    }

    static createTreeViewNodeFromData(data){
        if(data.nodetype === 'topic'){
            let children = data.children.map(TreeView.createTreeViewNodeFromData);
            return new Folder(data.name, children);
        }else{
            return new FolderContent(data.name, data.type, data.reference);
        }
    }
    
}