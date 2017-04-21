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
		var parts = header.split(',');
		var links = {};
		// Parse each part into a named link
		parts.forEach(p => {
			var section = p.split(';');
			if (section.length != 2) {
				throw new Error("section could not be split on ';'");
			}
			var url = section[0].replace(/<(.*)>/, '$1').trim();
			var name = section[1].replace(/rel="(.*)"/, '$1').trim();
			links[name] = url;
		});

		return links;
	}
}
