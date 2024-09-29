# Widget Component
Widget is a wrapper around other component providing a entry point and the ability to
add specific actions to be dispatched to the child component. communication is downward only 
unless an event dispatcher has been created for the child. and configured to send messages to the widget

## Specifcation

## Methods

**setContent** (content : HtmlElement) - changes the child content of the widget

**render** () -> renders the HTML Container for the widget

## Emits

none

## Consumes

none 

## Data Attributes

none

## Structure

```
    widget
        widget-header(DIV)
            widgit-title(H1)
            widget-action(DIV)
                widget-action(BUTTON)
                ...
        widget-content(DIV)
```

## Road Map

- add in facility to have more than buttons in actions 
- use event dispatcher for handling events between widget and child (child may be anything so may need to handle local or broadcast channel messages)

## Examples of Use

### setup widget

```html

    <script>
        this.content = new Widget(this.element.querySelector('.docspace-content'), '', [
                new ActionButton('btn-html-refresh', 'Reload', 'refresh fa fa-refresh', 'refresh'),
                new ActionButton('btn-html-print','Print', 'print fa fa-print', 'print')
            ]); 
            let viewer = new HtmlViewer(content.reference, this.content.contentElement);
        ...
```






