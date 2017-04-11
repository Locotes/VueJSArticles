import Vue from 'vue';
import store from './store/index';

import newsList from './components/news/list';

import '../scss/main.scss';

var app = new Vue({
  el: '#app',
  store,
  data: {
  },
  computed: {
   
  },
  components: {
    'newsList': newsList
  },
  methods: {
    
  }
});