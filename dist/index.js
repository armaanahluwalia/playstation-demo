(function () {
    'use strict';

    function getData(url, callback) {
        window.searchDataLoaded = function (resp) {
            if (callback) callback(resp);
        };
        var target = document.getElementsByTagName('script')[0] || document.head;
        var script = document.createElement('script');
        script.src = url + '&callback=searchDataLoaded';
        target.parentNode.insertBefore(script, target);
    }

    class View {
        constructor(options) {
            this.options = options;
            if (!this.options.el) throw new Error("Missing element for view");
            this.el = this.options.el;
        }
        render() {
            var children = this.el.childNodes;
            for (var i = 0; i < children.length; i++) {
                this.options.el.removeChild(children[i]);
            }
        }
    }

    class List extends View {
        render(data) {
            super.render();
            for (var i in data) {
                if (data.hasOwnProperty(i)) {
                    var item = document.createElement("div");
                    item.innerHTML = "foooo";
                    this.el.appendChild(item);
                }
            }
        }
    }

    class TotalCount extends View {
        render(data) {
            super.render();
            var item = document.createElement("div");
            item.innerHTML = "Total Results: " + data.total;
            this.el.appendChild(item);
        }
    }

    class SearchView extends View {
        render(data) {
            var searchBox = document.createElement("input");
            searchBox.setAttribute('type', 'search');
            searchBox.setAttribute('id', 'searchBox');

            var submitBtn = document.createElement("input");
            submitBtn.setAttribute('type', 'submit');
            submitBtn.setAttribute('id', 'submitSearch');
            submitBtn.addEventListener('click', function () {
                this.options.onSubmit(searchBox.value);
            }.bind(this));

            this.el.appendChild(searchBox);
            this.el.appendChild(submitBtn);
        }
    }

    class Pagination extends View {
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

    let list = new List({
        el: document.getElementById("list")
    });
    let totalCount = new TotalCount({
        el: document.getElementById("total-count")
    });
    let pagination = new Pagination({
        el: document.getElementById("pagination")
    });

    let populateData = ({ data, onPrevious, onNext }) => {
        let { streams, total, currentPage, totalPages } = data;
        totalCount.render({
            total: total
        });
        pagination.render({
            page: currentPage,
            total: totalPages,
            onPrevious: onPrevious,
            onNext: onNext
        });
        list.render(streams);
    };
    let constants = {
        pageLimit: 5
    };
    let state = {
        currentPageIndex: 0,
        searchQuery: ''
    };

    let fetchData = () => {
        var buildUrl = query => {
            return 'https://api.twitch.tv/kraken/search/streams?limit=5&q=' + query + '&offset=' + state.currentPageIndex * constants.pageLimit;
        };
        getData(buildUrl(state.searchQuery), function (data) {
            let totalResults = data._total;
            let currentPage = state.currentPageIndex + 1;
            let totalPages = Math.floor(totalResults / constants.pageLimit);
            totalPages = Math.max(1, totalPages);
            populateData({
                data: {
                    total: totalResults,
                    currentPage: currentPage,
                    totalPages: totalPages,
                    streams: data.streams
                },
                onPrevious: () => {
                    if (state.currentPageIndex > 0) state.currentPageIndex--;
                    fetchData();
                },
                onNext: () => {
                    if (totalPages > 1 && currentPage < totalPages) {
                        state.currentPageIndex++;
                    }
                    fetchData();
                }
            });
        });
    };
    let search = new SearchView({
        el: document.getElementById("search-container"),
        onSubmit: function (searchString) {
            state.currentPageIndex = 0;
            state.searchQuery = searchString;
            fetchData();
        }
    });

    search.render();

}());