import View from 'lib/view';

export default class List extends View {
    render(data) {
        super.render();
        for(var i in data) {
            if(data.hasOwnProperty( i )) {
                var item = document.createElement("div");
                item.innerHTML = "foooo";
                this.el.appendChild(item);
            }
        }
    }
}