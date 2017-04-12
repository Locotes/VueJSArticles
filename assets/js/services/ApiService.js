import axios from 'axios';
import Q from 'q';

export default class ApiService {
    constructor() {
        this.apiCache = {};
    }

    fetchData(url) {
        var defer = Q.defer();
        var self = this;

        if (!self.apiCache[url] || !self.apiCache[url].length){
            axios.get(url).then((response) => {
                self.apiCache[url] = response.data;
                defer.resolve(self.apiCache[url]);
            });
        } else {
            defer.resolve(self.apiCache[url]);
        }

        return defer.promise;
    }
    
    getNewsItems() {
        return this.fetchData('../data/items.json');
    }

    getNewsItem(url) {
        var defer = Q.defer();

        this.getNewsItems().then(function(items) {
            defer.resolve(items.find((i) => i.url === url));
        });

        return defer.promise;
    }
}