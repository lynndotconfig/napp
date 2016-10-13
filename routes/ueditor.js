var express = require('express');
var path = require('path');
var router = express.Router();

var ueditor = require('ueditor')

/* GET home page. */
router.post('/ue', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/ue', ueditor(path.join(__dirname, 'public'), function(req, res){
	if (req.query.action === 'uploadimage'){
		var foo = req.ueditor;
		var imgmane = req.ueditor.filename;
		var img_url = '/images';
		res.ue_up(img_url);
		res.setHeader('Content-Type', 'text/html');
	}
	else if(req.query.action === 'listimage'){
		var dir_url = '/images/ueditor';
		res.ue_list(dir_url);
	}
	else {
		res.setHeader('Content-Type', 'application/json');
		res.redirect('/ueditor/nodejs/config.json');
	}
}));

module.exports = router;
