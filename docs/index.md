# Document Viewer Technical Specification

The document viewer is designed to be a collection of decoupled components communicating primarilly through messaging. It is configured to have a ReST server at the backend that can load both the topic/content structure and any content this refers to.  

## Components
- DocSpace
- HTMLViewer
- TreeView
- Widget

## Utilities
- EventDispatcher

## Data Types
- ActionButton
- Folder
- FolderContent
- TreeViewNode

