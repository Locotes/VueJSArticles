<template>
    <div class="container">
        <div class="news-items">
            <div class="filter-row">
                <div class="form-inline">
                    <div class="form-group">
                        <label>Sort by</label>
                        <select class="form-control" v-model="sorting" v-on:change="changeSorting()">
                            <option value="pubDate-DESC">Date (desc)</option>
                            <option value="pubDate-ASC">Date (asc)</option>
                            <option value="title-DESC">Title (desc)</option>
                            <option value="title-ASC">Title (asc)</option>
                        </select>
                    </div>
                </div>
            </div>

            <news-item v-for="newsItem in newsItems" v-bind:key="newsItem.id" v-bind:item="newsItem"></news-item>
            
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
    </div>
</template>

<script>
    import ApiService from 'Services/api-service';
    import newsItem from './item';

    const apiService = new ApiService();

    export default {
        name: 'newsList',
        components: {
            'newsItem': newsItem
        },
        data: () => {
            return {
                newsItems: [],
                requestUrl: {
                    base: '',
                    query: {}
                },
                page: {
                    list: [],
                    prev: null,
                    next: null,
                    total: 1,
                    current: 1,
                    urlTemplate: ''
                },
                sorting: 'pubDate-DESC'
            }
        },
        created() { 
            this.loadMoreItems();
        },
        methods: {
            loadMoreItems() {
                let queryString = apiService.objectToQueryString(this.requestUrl.query);
                let requestUrl = this.requestUrl.base ? `${this.requestUrl.base}?${queryString}` : null

                apiService.getArticlesByPage(requestUrl).then(({data, headers, config}) => {
                    this.requestUrl.base = config.url.split('?')[0];
                    this.requestUrl.query = apiService.queryStringToObject(config.url.split('?')[1]);

                    let link = apiService.parseLinkHeader(headers.link);

                    //this.page.urlTemplate = link.first.replace(/page=\d+/g, 'page={0}');
                    this.newsItems = data;

                    this.generatePagination(link);
                });
            },
            generatePagination(link) {
                this.page.total =  this.getPageNumber(link.last);
                this.page.prev = link.prev ? this.getPageNumber(link.prev) : null;
                this.page.next = link.next ? this.getPageNumber(link.next) : null;  
            },
            getPage(number) {
                this.page.current = number;
                this.requestUrl.query._page = number;

                this.loadMoreItems();
            },
            getPageNumber(link) {
                return Number(link.match(/page=\d+/g)[0].replace('page=', ''))
            },
            changeSorting() {
                this.requestUrl.query._sort = this.sorting.split('-')[0];
                this.requestUrl.query._order = this.sorting.split('-')[1];

                this.loadMoreItems();
            }
        }
    }
</script>

<style lang="scss">
.news-items {
    padding: 10px 0;
}

.pagination span {cursor:pointer;}
</style>