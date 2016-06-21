import getData from 'getData';
import ListView from 'views/list';
import TotalCountView from 'views/total';
import SearchView from 'views/searchView';
import PaginationView from 'views/pagination';

let list = new ListView({
    el: document.getElementById("list")
});
let totalCount = new TotalCountView({
    el: document.getElementById("total-count")
});
let pagination = new PaginationView({
    el: document.getElementById("pagination")
});

let populateData = ({ data, onPrevious, onNext }) => {
    let { streams, total, currentPage, totalPages} = data;
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
    var buildUrl = (query) => {
        return 'https://api.twitch.tv/kraken/search/streams?limit=5&q='
            + query
            + '&offset='
            + state.currentPageIndex * constants.pageLimit;
    };
    getData(buildUrl(state.searchQuery), function(data) {
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
                if(state.currentPageIndex > 0) state.currentPageIndex--;
                fetchData();
            },
            onNext: () => {
                if(totalPages > 1 && (currentPage < totalPages)) {
                    state.currentPageIndex++;
                }
                fetchData();
            }
        });
    });
};
let search = new SearchView({
    el: document.getElementById("search-container"),
    onSubmit: function(searchString) {
        state.currentPageIndex = 0;
        state.searchQuery = searchString;
        fetchData();
    }
});

search.render();