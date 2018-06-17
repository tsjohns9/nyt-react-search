import axios from 'axios';

export default {
  // Gets all books
  scrapeArticles: function(searchParams) {
    return axios
      .get(process.env.URL + searchParams + process.env.KEY)
      .then(data => console.log(data))
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
