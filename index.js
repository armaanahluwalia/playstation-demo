import getData from 'getData';
import ListView from 'views/list';
import TotalCountView from 'views/total';
import SearchView from 'views/searchView';
import PaginationView from 'views/pagination';

/*
 * CONSTANTS
 */
let CONSTANTS = {
    PAGE_LIMIT: 5
};

/*
 * APPLICATION STATE
 */
let state = {
    currentPageIndex: 0,
    searchQuery: ''
};
let loader = {
    show: () => {
        document.getElementById("loader").className = "show";
    },
    hide: () => {
        document.getElementById("loader").className = "";
    }
};

/*
 * VIEW INSTANCES
 */
let list = new ListView({
    el: document.getElementById("list")
});
let totalCount = new TotalCountView({
    el: document.getElementById("total-count")
});
let pagination = new PaginationView({
    el: document.getElementById("pagination")
});

/*
 * APPLICATION LOGIC
 */

/**
 * Takes data and callback functions and renders it to the DOM
 * @param data
 * @param onPrevious
 * @param onNext
 */
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

/**
 * Fetches Data from the server and calls a callback function
 */
let fetchData = (callback) => {
    loader.show();
    var buildUrl = (query) => {
        let limit = (state.currentPageIndex+1) * CONSTANTS.PAGE_LIMIT;
        return 'https://api.twitch.tv/kraken/search/streams?'
            // + 'limit=' + limit
            + 'q='+ query
            + '&offset=' + state.currentPageIndex * CONSTANTS.PAGE_LIMIT;
    };
    getData(buildUrl(state.searchQuery), function(data) {
       let streams = [];
        for(var i = 0; i < CONSTANTS.PAGE_LIMIT; i++ ) {
            if(!data.streams[i]) break;
            streams.push(data.streams[i]);
        }
       callback({
           total: data._total,
           streams: streams
       });
       loader.hide();
    });
};

/**
 * Callback function that handles data fetches
 * @param data
 */
let onFetch = function(data) {
    let totalResults = data.total;
    let currentPage = state.currentPageIndex + 1;
    let totalPages = Math.ceil(totalResults / CONSTANTS.PAGE_LIMIT);
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
            fetchData(onFetch);
        },
        onNext: () => {
            if(totalPages > 1 && (currentPage < totalPages)) {
                state.currentPageIndex++;
            }
            fetchData(onFetch);
        }
    });
};

/**
 * Search View that triggers data fetch
 */
let search = new SearchView({
    el: document.getElementById("search-container"),
    onSubmit: function(searchString) {
        if(!searchString) return;
        state.currentPageIndex = 0;
        state.searchQuery = searchString;
        fetchData(onFetch);
    }
});

search.render();