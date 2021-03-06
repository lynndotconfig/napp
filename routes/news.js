var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var News = require('../models/news');
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');

mongoose.connect('mongodb://localhost/news')

/* GET news listing. */
router.get('/', function(req, res) {
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

router.post('/', function(req, res){
    res.send('post sucess.');
});

/* admin news */

router.get('/admin', function(req, res) {
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

router.post('/create', function(req, res) {
    var form = new multiparty.Form({uploadDir: './public/images/'});
    form.parse(req, function (err, fields, files) {
        var filesTmp = JSON.stringify(files, null, 2);
        if (err) {
            console.log('parse error: ' + err);
        } else {
            console.log('req: ' + req);
            console.log('parse files: ' + filesTmp);
            console.log('files' + files);
            var inputFile = files.answer_pic[0];
            var uploadedPath = inputFile.path;
            var dstPath = './public/images/' + inputFile.originalFilename;
            var imagePath = '/images/' + inputFile.originalFilename;
            fs.rename(uploadedPath, dstPath, function(err) {
                if (err){
                    console.log('rename error' + err);
                } else {
                    console.log('rename ok');
                }
            });

            var temp = fields;
            console.log(temp);
            var _news;
            _news = new News({
                        type_name:temp.type_name,
                        question:temp.question,
                        answer_pic:imagePath,
                        answer_info:temp.answer_info,
                        answer_solution:temp.editorValue,
                    })
            _news.save(function(err,news){
                if(err){
                    console.log(err)
                }
            });
            res.redirect('/news/'+_news.id)
        };
    });
});
/* GET news detail. */
router.get('/:id', function(req, res) {
    var id = req.params.id

    News.findById(id,function(err,news){
        res.render('detail',{
                title:'new detail',
                news:news
        })
    })
});

/* update news. */

router.get('/:id/update', function(req, res){
    var id = req.params.id

    if(id){
        News.findById(id, function(err, news){
            res.render('admin', {
                title: 'news update',
                news: news
            })
        })
    }
})
router.get
module.exports = router;
