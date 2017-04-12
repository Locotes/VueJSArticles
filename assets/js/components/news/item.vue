<template>
    <div class="media news-item">
        <figure class="media-left">
            <router-link :to="`/article/${item.url}`">
                <img class="media-object" v-bind:src="item.image" alt="" width="100" />
            </router-link>
        </figure>
        <div class="media-body">
            <h4 class="media-heading">
                <router-link :to="`/article/${item.url}`">{{item.title}}</router-link>
            </h4>
            <p>
                {{item.intro}} <router-link :to="`/article/${item.url}`">Read more &rarr;</router-link>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'newsItem',
        props: ['item']
    }
</script>