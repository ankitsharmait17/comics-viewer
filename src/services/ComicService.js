// import { getApi } from './serviceUtils';
import { convertToQueryParams } from '../common/utils';
import { generateAuthParams } from './serviceUtils';

export class ComicsService {
    constructor(config) {
        this.config = config;
        this.servicePathV1 = '/v1/public';
    }

    getComics(queryParams = {}) {
        const authDetails = generateAuthParams();
        const queryParamsString = convertToQueryParams(queryParams ? { ...authDetails, ...queryParams } : authDetails);
        const completePath = `${this.config.baseUrl}${this.servicePathV1}/comics${queryParamsString}`;
        return fetch(completePath, {
            method: 'GET',
        }).then((response) => {
            if (response.ok) return response.json();
            return Promise.reject(new Error('Error while fetching'));
        });
    }

    getCharacters() {
        const authDetails = generateAuthParams();
        const queryParamsString = convertToQueryParams(authDetails);
        const completePath = `${this.config.baseUrl}${this.servicePathV1}/characters${queryParamsString}`;
        return fetch(completePath, {
            method: 'GET',
        }).then((response) => {
            if (response.ok) return response.json();
            return Promise.reject(new Error('Error while fetching'));
        });
    }
}
