var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var News = require('../models/news')

mongoose.connect('mongodb://localhost/news')

/* GET news listing. */
router.get('/', function(req, res, next) {
	News.fetch(function(err, news) {
		if(err){
			console.log(err);
		}

		res.render('list', {
			title: 'News List',
			news: news
		})
	})
});

router.post('/', function(req, res, next){
	res.send('post sucess.');
});

/* GET news detail. */
router.get('/:id', function(req, res, next) {
	var id = req.params.id

	News.findById(id,function(err,news){
		res.render('detail',{
				title:movie.title,
				news:news
		})
	})
});

router.get('/admin', function(req, res, next) {
  // res.send('welcome to news.');
  res.render('admin', {
  	title: 'news 录入页'
  });
});


module.exports = router;