import axios from 'axios';

export const ENDPOINT = "https://api.punkapi.com/v2/beers";

/**
 * Brewdog API client
 */
export default class BrewdogAPI {

    /**
     * @param page
     * @param perPage
     * @returns {V}
     */
    static getBrewList(page, perPage) {
        return axios.get(ENDPOINT, {
            params: {
                page: page,
                per_page: perPage,
            },
            transformResponse: (data) => {
                return JSON.parse(data);
            },
        });
    }

    /**
     * @param id
     * @returns {V}
     */
    static getBrewDetails(id) {
        return axios.get(`${ENDPOINT}/${id}`, {
            transformResponse: (data) => {
                return JSON.parse(data)[0];
            },
        });
    }
}