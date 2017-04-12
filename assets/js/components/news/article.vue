<template>
    <div class="container">
        <router-link to="/">&larr; Back to home</router-link>
        <article class="article">
            <figure class="article-figure">
                <img class="article-img" v-bind:src="article.image" alt="" width="200" />
            </figure>
            <h1 class="h1 article-heading">{{article.title}}</h1>
            <p class="article-paragraph">{{article.description}}</p>
        </article>
    </div>
</template>

<script>
    import ApiService from '../../services/ApiService';

    const apiService = new ApiService();

    export default {
        name: 'newsArticle',
        props: ['url'],
        data: () => {
            return {
                article: {}
            }
        },
        created: function() { this.getArticle() },
        methods: {
            getArticle() {
                var vm = this; 
                apiService.getNewsItem(this.url).then(function(item) {
                    vm.article = item;
                });
            }
        }
    }
</script>