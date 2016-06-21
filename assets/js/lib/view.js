export default class View {
    constructor(options) {
        this.options = options;
        if(!this.options.el) throw new Error("Missing element for view");
        this.el = this.options.el;
    }
    render() {
        var children = this.el.childNodes;
        for (var i = 0; i < children.length; i++) {
            this.options.el.removeChild(children[i]);
        }
    }
}