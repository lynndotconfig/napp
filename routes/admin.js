var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/news', function(req, res, next) {
  res.render('admin', { title: 'news input' });
});

module.exports = router;
