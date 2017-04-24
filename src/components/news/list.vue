<template>
    <div class="container">
        <div class="news-items">
            <div class="filter-row">
                <div class="form-inline">
                    <div class="form-group">
                        <label>Categories</label>
                        <button class="btn btn-default" v-on:click="showCategoriesModal = true">Pick</button>
                    </div>
                    <div class="form-group">
                        <label>Sort by</label>
                        <select class="form-control" v-model="sorting" v-on:change="changeSorting()">
                            <option value="pubDate-DESC">Date (desc)</option>
                            <option value="pubDate-ASC">Date (asc)</option>
                            <option value="title-DESC">Title (desc)</option>
                            <option value="title-ASC">Title (asc)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Search</label>
                        <input type="text" class="form-control" placeholder="Search query..." v-model="searchQuery" v-on:input="changeSearchQuery()" />
                    </div>
                </div>
            </div>

            <news-item v-for="newsItem in newsItems" v-bind:key="newsItem.id" v-bind:item="newsItem"></news-item>

            <div class="well" v-if="!newsItems.length">
                <p><strong>Unforunately peanutbutter</strong><br>No results found!</p>
            </div>
            
            <div class="text-center">
                <br />
                <nav>
                    <ul class="pagination">
                        <li v-show="page.prev">
                            <span v-on:click="getPage(page.prev)" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </span>
                        </li>
                        <li v-bind:class="{active: page.current === n}" v-for="n in page.total"><span v-on:click="getPage(n)">{{n}}</span></li>
                        <li v-show="page.next">
                            <span v-on:click="getPage(page.next)" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </span>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

        <category-modal 
            v-if="showCategoriesModal" 
            v-on:close="showCategoriesModal = false"
            v-on:update="updateCategories($event)"
            v-bind:categories="categories"
        ></category-modal>
    </div>
</template>

<script>
    import ApiService from 'Services/api-service';
    import newsItem from './item';
    import categoryModal from '../modal/category-modal';
    import debounce from 'lodash/debounce';

    const apiService = new ApiService();

    export default {
        name: 'newsList',
        components: {
            newsItem: newsItem,
            categoryModal: categoryModal
        },
        data: () => {
            return {
                newsItems: [],
                categories: {
                    available: [],
                    selected: []
                },
                showCategoriesModal: false,
                requestUrl: {
                    base: apiService.getArticlesBaseUrl(),
                    query: {
                        _page: 1,
                        _limit: 5
                    }
                },
                page: {
                    prev: null,
                    next: null,
                    total: 1,
                    current: 1
                },
                sorting: 'pubDate-DESC',
                searchQuery: ''
            }
        },
        created() { 
            this.restoreState();
            this.loadMoreItems();
            this.setAvailableCategories();
        },
        methods: {
            restoreState() {
                // Restore search query
                if (this.$store.state.searchQuery){
                    this.searchQuery = this.$store.state.searchQuery;
                    this.changeSearchQuery();
                }

                // Restore currentPage
                if (this.$store.state.currentPage) {
                    this.getPage(this.$store.state.currentPage);
                }

                // // Restore sorting
                if (this.$store.state.sorting) {
                    this.sorting = this.$store.state.sorting;
                    this.changeSorting();
                }
            },
            loadMoreItems() {
                // If first request, use the default request url
                let queryString = apiService.objectToQueryString(this.requestUrl.query);
                let requestUrl =  `${this.requestUrl.base}?${queryString}`;

                apiService.getArticles(requestUrl).then(({data, headers, config}) => {
                    this.requestUrl.query = apiService.queryStringToObject(config.url.split('?')[1]);

                    this.newsItems = data;

                    this.generatePagination(headers.link);
                });
            },
            generatePagination(headersLink) {
                let link = apiService.parseLinkHeader(headersLink);

                this.page.total = link ? this.getPageNumber(link.last) : 1;
                this.page.prev = link && link.prev ? this.getPageNumber(link.prev) : null;
                this.page.next = link && link.next ? this.getPageNumber(link.next) : null;  
            },
            getPage(number) {
                this.page.current = number;
                this.requestUrl.query._page = number;

                this.loadMoreItems();
                this.$store.commit('setCurrentPage', number);
            },
            getPageNumber(link) {
                return Number(link.match(/page=\d+/g)[0].replace('page=', ''))
            },
            changeSorting() {
                this.requestUrl.query._sort = this.sorting.split('-')[0];
                this.requestUrl.query._order = this.sorting.split('-')[1];

                this.loadMoreItems();
                this.$store.commit('setSorting', this.sorting);
            },
            changeSearchQuery: debounce(function() {
                if (this.searchQuery !== '') {
                    this.requestUrl.query.q = this.searchQuery;
                    this.requestUrl.query._page = 1; // Otherwise if _page=3, it will also show the 3rd resultpage

                    this.loadMoreItems();
                } else {
                    if (this.requestUrl.query.q) {
                        delete this.requestUrl.query.q;
                        this.loadMoreItems();
                    }
                }

                this.$store.commit('setSearchQuery', this.searchQuery);
            }, 200),
            setAvailableCategories() {
                apiService.getCategories().then(({data}) => {
                    this.categories.available = data;
                })
            },
            updateCategories(categories) {
                console.log('Ever to be implemented');
            }
        }
    }
</script>

<style lang="scss">
.news-items {
    padding: 10px 0;
}

.filter-row {
    margin-bottom: 15px;
}

.pagination span {cursor:pointer;}

.well > p {
    margin-bottom: 0;
}
</style>