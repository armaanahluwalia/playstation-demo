(function () {
    'use strict';

    var babelHelpers = {};

    babelHelpers.classCallCheck = function (instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    };

    babelHelpers.createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();

    babelHelpers.get = function get(object, property, receiver) {
      if (object === null) object = Function.prototype;
      var desc = Object.getOwnPropertyDescriptor(object, property);

      if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);

        if (parent === null) {
          return undefined;
        } else {
          return get(parent, property, receiver);
        }
      } else if ("value" in desc) {
        return desc.value;
      } else {
        var getter = desc.get;

        if (getter === undefined) {
          return undefined;
        }

        return getter.call(receiver);
      }
    };

    babelHelpers.inherits = function (subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }

      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    };

    babelHelpers.possibleConstructorReturn = function (self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    };

    babelHelpers;

    function getData(url, callback) {
        window.searchDataLoaded = function (resp) {
            if (callback) callback(resp);
        };
        var target = document.getElementsByTagName('script')[0] || document.head;
        var script = document.createElement('script');
        script.src = url + '&callback=searchDataLoaded';
        target.parentNode.insertBefore(script, target);
    }

    var View = function () {
        function View(options) {
            babelHelpers.classCallCheck(this, View);

            this.options = options;
            if (!this.options.el) throw new Error("Missing element for view");
            this.el = this.options.el;
        }

        babelHelpers.createClass(View, [{
            key: "render",
            value: function render() {
                while (this.el.childNodes.length) {
                    this.options.el.removeChild(this.el.childNodes[0]);
                }
            }
        }]);
        return View;
    }();

    var List = function (_View) {
        babelHelpers.inherits(List, _View);

        function List() {
            babelHelpers.classCallCheck(this, List);
            return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(List).apply(this, arguments));
        }

        babelHelpers.createClass(List, [{
            key: 'render',
            value: function render(data) {
                babelHelpers.get(Object.getPrototypeOf(List.prototype), 'render', this).call(this);
                for (var i in data) {
                    if (data.hasOwnProperty(i)) {
                        var stream = data[i];

                        // Container for content
                        var itemContainer = document.createElement("div");
                        itemContainer.setAttribute('class', 'item');

                        //Img
                        var img = document.createElement("img");
                        img.setAttribute('class', 'preview-image');
                        img.setAttribute('src', stream.preview.small);

                        // Container for content
                        var infoContainer = document.createElement("div");
                        infoContainer.setAttribute('class', 'info-container');

                        //Name
                        var h3 = document.createElement("h3");
                        h3.setAttribute('class', 'display-name');
                        h3.innerHTML = stream.channel.display_name;

                        //Game name
                        var gameName = document.createElement("h4");
                        gameName.setAttribute('class', 'game-name');
                        gameName.innerHTML = stream.game;

                        //Stream name
                        var streamName = document.createElement("h4");
                        streamName.setAttribute('class', 'stream-name');
                        gameName.innerHTML = stream.channel.name;

                        //Stream description
                        var streamDescription = document.createElement("h5");
                        streamName.setAttribute('class', 'stream-description');
                        gameName.innerHTML = stream.channel.status;

                        //Clearfix
                        var clearfix = document.createElement("div");
                        clearfix.setAttribute('class', 'clearfix');

                        // Append to DOM
                        itemContainer.appendChild(img);
                        infoContainer.appendChild(h3);
                        infoContainer.appendChild(gameName);
                        infoContainer.appendChild(streamName);
                        infoContainer.appendChild(streamDescription);
                        itemContainer.appendChild(infoContainer);
                        itemContainer.appendChild(clearfix);
                        this.el.appendChild(itemContainer);
                    }
                }
            }
        }]);
        return List;
    }(View);

    var TotalCount = function (_View) {
        babelHelpers.inherits(TotalCount, _View);

        function TotalCount() {
            babelHelpers.classCallCheck(this, TotalCount);
            return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(TotalCount).apply(this, arguments));
        }

        babelHelpers.createClass(TotalCount, [{
            key: "render",
            value: function render(data) {
                babelHelpers.get(Object.getPrototypeOf(TotalCount.prototype), "render", this).call(this);
                var item = document.createElement("div");
                item.innerHTML = "Total Results: " + data.total;
                this.el.appendChild(item);
            }
        }]);
        return TotalCount;
    }(View);

    var SearchView = function (_View) {
        babelHelpers.inherits(SearchView, _View);

        function SearchView() {
            babelHelpers.classCallCheck(this, SearchView);
            return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(SearchView).apply(this, arguments));
        }

        babelHelpers.createClass(SearchView, [{
            key: 'render',
            value: function render(data) {
                var searchForm = document.createElement("form");
                searchForm.setAttribute('class', 'search-form');

                var searchBox = document.createElement("input");
                searchBox.setAttribute('type', 'search');
                searchBox.setAttribute('id', 'searchBox');

                var submitBtn = document.createElement("input");
                submitBtn.setAttribute('type', 'submit');
                submitBtn.setAttribute('id', 'submitSearch');
                submitBtn.addEventListener('click', function (e) {
                    e.preventDefault();
                    this.options.onSubmit(searchBox.value);
                }.bind(this));

                searchForm.appendChild(searchBox);
                searchForm.appendChild(submitBtn);
                this.el.appendChild(searchForm);
            }
        }]);
        return SearchView;
    }(View);

    var Pagination = function (_View) {
        babelHelpers.inherits(Pagination, _View);

        function Pagination() {
            babelHelpers.classCallCheck(this, Pagination);
            return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Pagination).apply(this, arguments));
        }

        babelHelpers.createClass(Pagination, [{
            key: 'render',
            value: function render(data) {
                babelHelpers.get(Object.getPrototypeOf(Pagination.prototype), 'render', this).call(this);

                //Previous Button
                var prevBtn = document.createElement("button");
                prevBtn.setAttribute('class', 'prev-btn fa fa-arrow-left');
                prevBtn.addEventListener('click', data.onPrevious);

                //Next Button
                var nextBtn = document.createElement("button");
                nextBtn.setAttribute('class', 'next-btn fa fa-arrow-right');
                nextBtn.addEventListener('click', data.onNext);

                //Display Count
                var displayCount = document.createElement('div');
                displayCount.setAttribute('class', 'display-count');
                displayCount.innerHTML = data.page + '/' + data.total;

                this.el.appendChild(prevBtn);
                this.el.appendChild(displayCount);
                this.el.appendChild(nextBtn);
            }
        }]);
        return Pagination;
    }(View);

    /*
     * CONSTANTS
     */
    var CONSTANTS = {
        PAGE_LIMIT: 5
    };

    /*
     * APPLICATION STATE
     */
    var state = {
        currentPageIndex: 0,
        searchQuery: ''
    };
    var loader = {
        show: function show() {
            document.getElementById("loader").className = "show";
        },
        hide: function hide() {
            document.getElementById("loader").className = "";
        }
    };

    /*
     * VIEW INSTANCES
     */
    var list = new List({
        el: document.getElementById("list")
    });
    var totalCount = new TotalCount({
        el: document.getElementById("total-count")
    });
    var pagination = new Pagination({
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
    var populateData = function populateData(_ref) {
        var data = _ref.data;
        var onPrevious = _ref.onPrevious;
        var onNext = _ref.onNext;
        var streams = data.streams;
        var total = data.total;
        var currentPage = data.currentPage;
        var totalPages = data.totalPages;

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
    var fetchData = function fetchData(callback) {
        loader.show();
        var buildUrl = function buildUrl(query) {
            var limit = (state.currentPageIndex + 1) * CONSTANTS.PAGE_LIMIT;
            return 'https://api.twitch.tv/kraken/search/streams?'
            // + 'limit=' + limit
            + 'q=' + query + '&offset=' + state.currentPageIndex * CONSTANTS.PAGE_LIMIT;
        };
        getData(buildUrl(state.searchQuery), function (data) {
            var streams = [];
            for (var i = 0; i < CONSTANTS.PAGE_LIMIT; i++) {
                if (!data.streams[i]) break;
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
    var onFetch = function onFetch(data) {
        var totalResults = data.total;
        var currentPage = state.currentPageIndex + 1;
        var totalPages = Math.ceil(totalResults / CONSTANTS.PAGE_LIMIT);
        totalPages = Math.max(1, totalPages);
        populateData({
            data: {
                total: totalResults,
                currentPage: currentPage,
                totalPages: totalPages,
                streams: data.streams
            },
            onPrevious: function onPrevious() {
                if (state.currentPageIndex > 0) state.currentPageIndex--;
                fetchData(onFetch);
            },
            onNext: function onNext() {
                if (totalPages > 1 && currentPage < totalPages) {
                    state.currentPageIndex++;
                }
                fetchData(onFetch);
            }
        });
    };

    /**
     * Search View that triggers data fetch
     */
    var search = new SearchView({
        el: document.getElementById("search-container"),
        onSubmit: function onSubmit(searchString) {
            if (!searchString) return;
            state.currentPageIndex = 0;
            state.searchQuery = searchString;
            fetchData(onFetch);
        }
    });

    search.render();

}());