const Article = require('../models/Article');

module.exports = {
  create: function(req, res) {
    Article.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => console.log(err));
  },

  findAll: function(req, res) {
    Article.find({})
      .then(allArticles => res.send(allArticles))
      .catch(err => console.log(err));
  },

  delete: function(req, res) {
    Article.deleteOne(req.body)
      .then(removedArticle => res.send(removedArticle))
      .catch(err => console.log(err));
  }
};
