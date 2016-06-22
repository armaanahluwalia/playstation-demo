import View from 'lib/view';

export default class SearchView extends View {
    render(data) {
        var searchForm = document.createElement("form");
        searchForm.setAttribute('class', 'search-form');

        var searchBox = document.createElement("input");
        searchBox.setAttribute('type', 'search');
        searchBox.setAttribute('id', 'searchBox');

        var submitBtn = document.createElement("input");
        submitBtn.setAttribute('type', 'submit');
        submitBtn.setAttribute('id', 'submitSearch');
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            this.options.onSubmit(searchBox.value);
        }.bind(this));


        searchForm.appendChild(searchBox);
        searchForm.appendChild(submitBtn);
        this.el.appendChild(searchForm);
    }
}