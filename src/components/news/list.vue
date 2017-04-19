<template>
    <div class="container">
        <div class="news-items">
            <transition-group name="fade-in" tag="div">
                <news-item v-for="newsItem in newsItems" v-bind:key="newsItem.url" v-bind:item="newsItem"></news-item>
            </transition-group>
            
            <div class="text-center">
                <br />
                <button class="btn btn-lg btn-primary" v-on:click="loadMoreItems()" v-show="moreItemsToLoad()">Load more</button>
            </div>
        </div>
    </div>
</template>

<script>
    import newsItem from './item';
    import ApiService from '../../services/ApiService';

    const apiService = new ApiService();
    const itemsToLoad = 5;

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
            getItems(total, start) {
                var vm = this;

                apiService.getNewsItems().then((data) => {
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

<style lang="scss">
.news-items {
    padding: 10px 0;
}

.news-item {
    padding: 10px;
    background-color: #EEE;
    transition: opacity .5s ease;

    .media-body {
        vertical-align: middle;
    }
}
</style>