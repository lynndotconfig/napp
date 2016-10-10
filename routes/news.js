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

/* admin news */

router.get('/admin', function(req, res, next) {
  // res.send('welcome to news.');
  res.render('admin', {
    title: 'news 录入页',
    news: {
        type_name: '',
        question: '',
        answer_pic: '',
        answer_info: '',
        answer_solution: ''
    }
  });
});

router.post('/admin', function(req, res) {
  var id = req.body.news._id
    var newsObj = req.body.news

    var _news

    if(id !=='undefined'){
        News.findById(id,function(err,news){
            if(err){
                console.log(err)
            }

            _news = _.extend(news,newsObj)
            _news.save(function(err,news){
                if(err){
                    console.log(err)
                }

                res.redirect('/news/'+_news.id)
            })

        })
    }else{
        _news = new News({
            type_name:newsObj.type_name,
            question:newsObj.question,
            answer_pic:newsObj.answer_pic,
            answer_info:newsObj.answer_info,
            answer_solution:newsObj.answer_solution,
        })

        _news.save(function(err,news){
                if(err){
                    console.log(err)
                }

                res.redirect('/news/'+_news.id)
            })
    }
})

/* GET news detail. */
router.get('/:id', function(req, res, next) {
    var id = req.params.id

    News.findById(id,function(err,news){
        res.render('detail',{
                title:'new detail',
                news:news
        })
    })
});

module.exports = router;
