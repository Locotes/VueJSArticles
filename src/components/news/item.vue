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
            <time class="time">{{item.pubDate | format('YYYY-MM-DD')}}</time>
            <p>
                {{item.description}} <router-link :to="`/article/${item.id}`">Read more &rarr;</router-link>
            </p>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    export default {
        name: 'newsItem',
        props: ['item'],
        methods: {
            moment: () => moment()
        },
        filters: {
            format: (value, options) => moment(value).format(options)
        }
    }
</script>

<style lang="scss">
.news-item {
    padding: 10px;
    background-color: #EEE;
    transition: opacity .5s ease;

    .time {
        display: block;
        opacity: .7;
        font-size: 12px;
        margin-bottom: 5px;
    }

    .media-body {
        vertical-align: middle;
    }
}

</style>