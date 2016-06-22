export default class View {
    constructor(options) {
        this.options = options;
        if(!this.options.el) throw new Error("Missing element for view");
        this.el = this.options.el;
    }
    render() {
        while (this.el.childNodes.length) {
            this.options.el.removeChild(this.el.childNodes[0]);
        }
    }
}