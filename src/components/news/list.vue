<template>
    <div class="container">
        <div class="news-items">
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
                        <li v-bind:class="{active: page.current === thisPage.number}" v-for="thisPage in page.list"><span v-on:click="getPage(thisPage)">{{thisPage.number}}</span></li>
                        <li v-show="page.next">
                            <span  v-on:click="getPage(page.next)" aria-label="Next">
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
                page: {
                    list: [],
                    prev: null,
                    next: null,
                    total: 1,
                    current: 1,
                    urlTemplate: ''
                }
            }
        },
        created() { 
            this.loadMoreItems();
        },
        methods: {
            loadMoreItems(url) { 
                apiService.getArticlesByPage(url).then(({data, headers}) => {
                    let link = apiService.parseLinkHeader(headers.link);

                    this.page.urlTemplate = link.first.replace(/page=\d+/g, 'page={0}');
                    this.newsItems = data;

                    this.generatePagination(link);
                });
            },
            generatePagination(link) {
                this.page.total =  this.getPageNumber(link.last);
                this.page.prev = link.prev ? { 
                    number: this.getPageNumber(link.prev),
                    url: link.prev
                 } : null;
                this.page.next = link.next ? { 
                    number: this.getPageNumber(link.next),
                    url: link.next
                 } : null;  

                if (!this.page.list.length){ 
                    for (let i = 1; i <= this.page.total; i++) {
                        this.page.list.push({
                            number: i,
                            url: this.page.urlTemplate.replace('{0}', i)
                        });
                    }
                }
            },
            getPage(page) {
                this.loadMoreItems(page.url);
                this.page.current = page.number;
            },
            getPageNumber(link) {
                return Number(link.match(/page=\d+/g)[0].replace('page=', ''))
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