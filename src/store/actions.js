import ApiService from 'Services/api-service';

const api = new ApiService();

export const actions = {
    addNewsItems({commit}, options) {
        api.getNewsItems(options.from, options.max).then(({newsItems, totalItems}) => {
            commit('addNewsItems', newsItems);
            commit('setTotalItems', totalItems);
        })
    }
}