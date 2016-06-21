import View from 'lib/view';

export default class Pagination extends View {
    render(data) {
        super.render();
        var prevBtn = document.createElement("button");
        prevBtn.setAttribute('id', 'prevBtn');
        prevBtn.addEventListener('click', data.onPrevious);

        var nextBtn = document.createElement("button");
        nextBtn.setAttribute('id', 'nextBtn');
        nextBtn.addEventListener('click', data.onNext);

        var displayCount = document.createElement('div');
        displayCount.innerHTML = data.page + '/' + data.total;

        this.el.appendChild(prevBtn);
        this.el.appendChild(displayCount);
        this.el.appendChild(nextBtn);
    }
}