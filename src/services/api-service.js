import axios from 'axios'

export default class ApiService {
	fetchData(url, options) {
		return new Promise((resolve, reject) => {
			axios.get(url).then((response) => { 
				resolve(response.data)
			})
		})
	}

	getNewsItems(from, max) {
		return new Promise((resolve, reject) => {
			this.fetchData('/static/data/items.json').then((data) => {
				var to = max ? from + max : data.totalItems;

				resolve({ newsItems: data.items.slice(from, to), totalItems: data.totalItems })
			})
		});
	}

	getNewsItem(url) {
		return new Promise((resolve, reject) => {
			this.getNewsItems().then(({newsItems}) => {
				resolve(newsItems.find((i) => i.url === url))
			})
		})
	}
}