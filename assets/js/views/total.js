import View from 'lib/view';

export default class TotalCount extends View {
    render(data) {
        super.render();
        var item = document.createElement("div");
        item.innerHTML = "Total Results: " + data.total;
        this.el.appendChild(item);
    }
}