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
    const itemsToLoad = 5;

    export default {
        name: 'newsList',
        components: {
            'newsItem': newsItem
        },
        data: () => {
            return {
                totalShownItems: 0                
            }
        },
        created() { 
            this.$store.dispatch('addNewsItems', { from: 0, max: itemsToLoad }) 
        },
        computed: {
            newsItems() {
                this.totalShownItems = this.$store.state.newsItems.length;

                return this.$store.state.newsItems;
            },
            totalItems() {
                return this.$store.state.totalItems;
            }
        },
        methods: {
            loadMoreItems() {
                this.$store.dispatch('addNewsItems', { from: this.totalShownItems, max: itemsToLoad }) 
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