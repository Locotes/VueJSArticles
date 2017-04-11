<template>
    <div class="news-item">
        <router-link to="item.url" class="news-item-link">
            <figure class="news-item-figure">
                <img class="news-item-img" v-bind:src="item.image" alt="">
            </figure>
            <article class="news-item-content">
                <h5 class="h5 news-item-heading">{{item.title}}</h5>
                <p class="news-item-paragraph">{{item.description}}</p>
            </article>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: 'newsItem',
        props: ['item']
    }
</script>