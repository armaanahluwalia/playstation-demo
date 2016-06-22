import View from 'lib/view';

export default class Pagination extends View {
    render(data) {
        super.render();

        //Previous Button
        let prevBtn = document.createElement("button");
        prevBtn.setAttribute('class', 'prev-btn fa fa-arrow-left');
        prevBtn.addEventListener('click', data.onPrevious);

        //Next Button
        let nextBtn = document.createElement("button");
        nextBtn.setAttribute('class', 'next-btn fa fa-arrow-right');
        nextBtn.addEventListener('click', data.onNext);

        //Display Count
        let displayCount = document.createElement('div');
        displayCount.setAttribute('class', 'display-count');
        displayCount.innerHTML = data.page + '/' + data.total;

        this.el.appendChild(prevBtn);
        this.el.appendChild(displayCount);
        this.el.appendChild(nextBtn);
    }
}