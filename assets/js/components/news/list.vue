<template>
    <div class="news-items">
        <transition-group name="news-items-complete">
            <news-item v-for="newsItem in newsItems" v-bind:key="newsItem.url" v-bind:item="newsItem"></news-item>
        </transition-group>
        <button class="btn" v-on:click="loadMoreItems()" v-show="moreItemsToLoad()">Load more</button>
    </div>
</template>

<script>
    import newsItem from './item';
    import axios from 'axios';
    import Q from 'q';

    const itemsToLoad = 5;
    var newsCache = [];

    export default {
        name: 'newsList',
        components: {
            'newsItem': newsItem
        },
        data: () => {
            return {
                newsItems: [],
                totalItems: 0,
                totalShownItems: 0                
            }
        },
        created: function() { this.getItems(itemsToLoad, 0) },
        methods: {
            fetchData() {
                var defer = Q.defer();

                if (!newsCache.length){
                    axios.get('/data/items.json').then((response) => {
                        newsCache = response.data;
                        defer.resolve(newsCache);
                    });
                } else {
                    defer.resolve(newsCache);
                }

                return defer.promise;
            },
            getItems(total, start) {
                var vm = this;

                this.fetchData().then((data) => {
                    vm.newsItems = vm.newsItems.concat(data.slice(start, vm.totalShownItems + total));
                    vm.totalShownItems = vm.newsItems.length;
                    vm.totalItems = data.length;
                });
            },
            loadMoreItems() {
                if (this.moreItemsToLoad()) {
                    this.getItems(itemsToLoad, this.totalShownItems);
                }
            },
            moreItemsToLoad() {
                return this.totalShownItems < this.totalItems;
            }
        }
    }
</script>