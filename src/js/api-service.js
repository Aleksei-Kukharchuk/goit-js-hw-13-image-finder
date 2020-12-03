const BASE_URL = 'https://pixabay.com/api';

export default class ImgApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    const url = `${BASE_URL}/?key=19267719-9b47d05d33b3fa392544db2d5&image_type=photo&orientation=horizontal&q=${this.searchQuery}&per_page=12&page=${this.page}`;

    return fetch(url)
      .then(response => response.json())
      .then( ({ hits }) => {
        this.incrementPage();
        return hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}