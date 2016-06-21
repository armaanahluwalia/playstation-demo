import View from 'lib/view';

export default class SearchView extends View {
    render(data) {
        var searchBox = document.createElement("input");
        searchBox.setAttribute('type', 'search');
        searchBox.setAttribute('id', 'searchBox');

        var submitBtn = document.createElement("input");
        submitBtn.setAttribute('type', 'submit');
        submitBtn.setAttribute('id', 'submitSearch');
        submitBtn.addEventListener('click', function() {
            this.options.onSubmit(searchBox.value);
        }.bind(this));


        this.el.appendChild(searchBox);
        this.el.appendChild(submitBtn);
    }
}