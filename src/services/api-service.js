import axios from 'axios'

const api = axios.create({
	baseURL: 'http://localhost:3000'
})

export default class ApiService {
	constructor() {
	}

	getArticlesBaseUrl() {
		return `${api.defaults.baseURL}/articles`;
	}

	getArticles(url) {
		return api.get(url)
	}

	getArticleItem(id) {
		return api.get(`/articles/${id}`);
	}

	getCategories() {
		return api.get('/categories');
	}

	parseLinkHeader(header) {
		if (!header || header.length == 0) 
			return null
		
		// Split parts by comma
		let parts = header.split(',');
		let links = {};
		// Parse each part into a named link
		parts.forEach(p => {
			let section = p.split(';');
			if (section.length != 2) {
				throw new Error("section could not be split on ';'");
			}
			let url = section[0].replace(/<(.*)>/, '$1').trim();
			let name = section[1].replace(/rel="(.*)"/, '$1').trim();
			links[name] = url;
		});

		return links;
	}

	queryStringToObject(str) {
		let items = str.split('&');
		let returnObj = {};

		for (let i = 0; i < items.length; i++) {
			let item = items[i].split('=');
			returnObj[item[0]] = item[1];
		}

		return returnObj;
	}

	objectToQueryString(obj) {
		let returnStr = '';

		for (let key in obj) {
			if (returnStr !== '') {
				returnStr += '&';
			}
			returnStr += key + '=' + encodeURIComponent(obj[key]);
		}

		return returnStr;
	}
}
