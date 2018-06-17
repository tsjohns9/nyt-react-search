const router = require('express').Router();
const articleController = require('../controllers/articleController');

router.route('/api/articles').post(articleController.create);

module.exports = router;
