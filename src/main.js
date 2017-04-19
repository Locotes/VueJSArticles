import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/index'

import newsList from './components/news/list'
import newsItem from './components/news/item'
import newsArticle from './components/news/article'

import './assets/scss/main.scss'

Vue.use(VueRouter)

const routes = [{
		path: '/',
		component: newsList
	},
	{
		path: '/article/:url',
		component: newsArticle,
		props: true
	}
]

const router = new VueRouter({
	routes
})

var app = new Vue({
	el: '#app',
	store,
	router,
	data: {},
	computed: {

	},
	components: {
		'newsList': newsList,
		'newsItem': newsItem,
		'newsArticle': newsArticle
	},
	methods: {

	}
});
