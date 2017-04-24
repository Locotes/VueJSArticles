export const mutations = {
	setSearchQuery(state, query) {
		state.searchQuery = query;
	},
    setSorting(state, sorting) {
        state.sorting = sorting;
    },
    setCurrentPage(state, page) {
        state.currentPage = page;
    }
}
