<template>
    <div class="container">
        <router-link to="/">&larr; Back to home</router-link>
        <article class="article">
            <figure class="article-figure">
                <img class="article-img" v-bind:src="article.enclosure.link" alt="" width="200" />
            </figure>
            <h1 class="h1 article-heading">{{article.title}}</h1>
            <p class="article-paragraph">{{article.description}}</p>
        </article>
    </div>
</template>

<script>
    import ApiService from 'Services/api-service';

    const apiService = new ApiService();

    export default {
        name: 'newsArticle',
        props: ['id'],
        data() {
            return {
                article: {
                    enclosure: {}
                }
            }
        },
        created() { this.getArticle() },
        methods: {
            getArticle() {
                apiService.getArticleItem(this.id).then(({data}) => {
                    this.article = data;
                })
            }
        }
    }
</script>

<style lang="scss">
.article {
    &-figure {
        float: left;
        margin:0 20px 20px 0;
    }
}
</style>