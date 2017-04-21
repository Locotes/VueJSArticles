<template>
    <div class="media news-item">
        <figure class="media-left">
            <router-link :to="`/article/${item.id}`">
                <img class="media-object" v-bind:src="item.enclosure.link" alt="" width="100" />
            </router-link>
        </figure>
        <div class="media-body">
            <h4 class="media-heading">
                <router-link :to="`/article/${item.id}`">{{item.title}}</router-link>
            </h4>
            <p>
                {{item.description}} <router-link :to="`/article/${item.id}`">Read more &rarr;</router-link>
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