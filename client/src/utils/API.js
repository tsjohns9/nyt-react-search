import axios from 'axios';
require('dotenv').config();

export default {
  // Gets all books
  scrapeArticles: function(searchParams) {
    const { searchTerm, searchQuantity, startYear, endYear } = searchParams;
    const query =
      startYear && endYear
        ? `{searchTerm}&begin_date=${startYear}&end_date=${endYear}`
        : startYear && !endYear
          ? `{searchTerm}&begin_date=${startYear}`
          : !startYear && endYear
            ? `{searchTerm}&end_date=${endYear}`
            : searchTerm;

    return axios
      .get(
        'https://api.nytimes.com/svc/search/v2/articlesearch.json' +
          '?api-key=3b279b386eb14499b1441b9cf5cb6ae0&q=' +
          query
      )
      .then(res => console.log(res.data.response.docs))
      .catch(err => console.log(err));
  },
  // Gets the book with the given id
  getSavedArticles: function(id) {
    return axios.get('/api/articles/' + id);
  },
  // Saves a book to the database
  saveArticle: function(bookData) {
    return axios.post('/api/articles', bookData);
  },
  // Deletes the book with the given id
  nukeArticle: function(id) {
    return axios.delete('/api/articles/' + id);
  }
};
