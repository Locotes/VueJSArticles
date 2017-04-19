export const mutations = {
	addNewsItems(state, newsItems) {
		state.newsItems = state.newsItems.concat(newsItems);
	},
    setTotalItems(state, totalItems) {
        state.totalItems = totalItems;
    }
}
