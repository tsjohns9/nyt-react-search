import axios from 'axios';
require('dotenv').config();

export default {
  // gets articles from nytimes
  scrapeArticles: function(searchParams) {
    const { searchTerm, startYear, endYear } = searchParams;
    const fields = '&fl=headline,web_url,pub_date,snippet';
    const query =
      startYear && endYear
        ? `${searchTerm}&begin_date=${startYear}0101&end_date=${endYear}0101${fields}`
        : startYear && !endYear
          ? `${searchTerm}&begin_date=${startYear}0101${fields}`
          : !startYear && endYear
            ? `${searchTerm}&end_date=${endYear}0101${fields}`
            : searchTerm + fields;

    return axios.get(
      'https://api.nytimes.com/svc/search/v2/articlesearch.json' +
        '?api-key=3b279b386eb14499b1441b9cf5cb6ae0&q=' +
        query
    );
  },

  // Gets all saved articles
  getSavedArticles: function() {
    return axios.get('/api/articles/');
  },

  // Saves an article
  saveArticle: function(article) {
    return axios.post('/api/articles', article);
  },

  // Deletes an article
  nukeArticle: function(id) {
    return axios.delete('/api/articles/' + id);
  }
};
