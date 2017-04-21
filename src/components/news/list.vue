<template>
    <div class="container">
        <div class="news-items">
            <transition-group name="fade-in" tag="div">
                <news-item v-for="newsItem in newsItems" v-bind:key="newsItem.id" v-bind:item="newsItem"></news-item>
            </transition-group>
            
            <div class="text-center">
                <br />
                <button class="btn btn-lg btn-primary" v-on:click="loadMoreItems()" v-show="loadMoreLink">Load more</button>
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
                loadMoreLink: null
            }
        },
        created() { 
            this.loadMoreItems();
        },
        methods: {
            loadMoreItems() { 
                apiService.getArticlesByPage(this.loadMoreLink).then(({data, headers}) => {
                    let link = apiService.parseLinkHeader(headers.link);

                    this.newsItems = this.newsItems.concat(data);
                    this.loadMoreLink = link.next || null;
                });
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