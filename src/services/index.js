import { ComicsService } from './ComicService';

const comicsServiceManager = new ComicsService({
    baseUrl: 'https://gateway.marvel.com:443',
});

export { comicsServiceManager };
