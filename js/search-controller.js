var SearchController = SearchController || {}
SearchController.searchIndex = false;

SearchController.setup = function() {
    $('.search-input').on('keyup', function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            SearchController.handleSearchClick(e);
        }
    });

    $('.search-btn').on('click', SearchController.handleSearchClick);

    if (SearchController.isSearchPage()) {
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('query');
        $('.search-input').val(query);
        SearchController.performSearch(query);
    }
}

SearchController.handleSearchClick = function(e) {
    e.preventDefault();
    var query = SearchController.getSearchQuery();
    if (query) {
        if (SearchController.isSearchPage()) {
            SearchController.performSearch(query);
        } else {
            window.location.href = "./search.html?query=" + query;
        }
    }
}

SearchController.isSearchPage = function() {
    return $('.search-container').length > 0;
}

SearchController.getSearchQuery = function() {
    return $('.search-input').val();
}

SearchController.performSearch = function(query) {
    $('.search-results').html('<div class="main-descr mt-25">Searching...</div>');
    $('.search-result-statistic').hide();
    if (!SearchController.searchIndex) {
        SearchController.loadSearchIndex(function(error) {
            if (!error) {
                SearchController.performSearch(query);
            } else {
                // TODO: show error
            }
        });
    } else {
        console.log("perform search");
        var result = SearchController.doSearch(query);
        SearchController.renderSearchResult(query, result);
    }
}

SearchController.loadSearchIndex = function (done) {
    $.getJSON( "search/index.json", function(data) {
        SearchController.searchIndex = data;
        console.log("search index", data)
        done();
    }).fail(function() {
        console.error("Unable to load search index file");
        done("Unable to load search index file")
    })
}

SearchController.doSearch = function(query) {
    let reg = new RegExp(query, 'gi');
	let priority1 = [];
	let priority2 = [];
    let priority3 = [];

	SearchController.searchIndex.forEach(function (article) {
		if (reg.test(article.title)) return priority1.push(article);
		if (reg.test(article.contentKeywords)) return priority2.push(article);
        if (reg.test(article.summary)) return priority2.push(article);
	});

	return [].concat(priority1, priority2, priority3);
}

SearchController.renderSearchResult = function(query, result) {
    $('.search-query').text(query);
    var html = '';

    if (result.length == 0) {
        $('.search-result-statistic').text('Your search returned no results. Please modify your search parameters.')
    } else {
        $('.search-result-statistic').text('Showing 1 to ' + result.length + ' of ' + result.length + ' results');

        result.forEach(function (article) {
            html += `<div class="search-result-item">
                        <a href="${article.url}" class="news-link mb-0">${article.title}</a>
                        <div class="main-subtitle mt-0">${article.summary}</div>
                    </div>`;
        });

    }
    $('.search-results').html(html);
    if (query) {
        $('.search-title').show();
        $('.search-result-statistic').show();
    } else {
        $('.search-title').hide();
        $('.search-result-statistic').hide();
    }
}

$(function() {
    SearchController.setup();
})