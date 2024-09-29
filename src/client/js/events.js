

class EventDispatcher {
    constructor() {
        this.registry = {};
    }

    registerEvent(eventName, element, mapping) {
        if (!this.registry[eventName]) {
            this.registry[eventName] = [];
        }
        this.registry[eventName].push([element, mapping]);
    }

    dispatchEvent(eventName, detail) {
        if (this.registry[eventName]) {
            this.registry[eventName].forEach(element => {
                const [targetElement, mapping] = element;
                let event = null;
                if(mapping){
                    let [newEventName, newDetails] = mapping(eventName, detail);
                    event = new CustomEvent(newEventName, { detail: newDetails });
                }
                else{
                    event = new CustomEvent(eventName, { detail });
                }
                targetElement.dispatchEvent(event);
            });
        }
    }
    static dispatchEventToTargetAndDescendents(target, eventName, detail)
    {
        let elementList = target.querySelectorAll('*');
        target.dispatchEvent(new CustomEvent(eventName, { detail }));
        elementList.forEach(element => {
            element.dispatchEvent(new CustomEvent(eventName, { detail }));
        });
    }


}