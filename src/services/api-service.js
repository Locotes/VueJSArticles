import axios from 'axios'

const api = axios.create({
	baseURL: 'http://localhost:3000'
})

export default class ApiService {
	constructor() {
		this.pageSize = 5
	}

	getArticles() {
		return api.get('/articles')
	}

	getArticlesByPage(page) {
		page = page || `/articles?_page=1&_limit=${this.pageSize}`;

		return api.get(page)
	}

	getArticleItem(id) {
		return api.get(`/articles/${id}`);
	}


	parseLinkHeader(header) {
		if (header.length == 0) {
			throw new Error("input must not be of zero length");
		}

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
