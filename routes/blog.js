var express = require('express');
var router = express.Router();
var Posts = require('../models/Posts.js');
var isAuthorized = require('./auth');
/* GET home page. */
router.get('/', function(req, res) {
    console.log(req.session)
    Posts.find((err, Posts) => {
        if (err) return console.log(err);
        res.render('blog', { title: 'Blog', posts: Posts });
    })
});
router.get('/create',isAuthorized, (req, res) => {
    res.render('create', { title: 'Create', 'error': '' })
});
router.post('/create',isAuthorized , (req, res) => {
    var item = {
        title: req.body.title,
        body: req.body.body,
        date: new Date()
    };
    var data = new Posts(item);
    data.save((err, product) => {
        if (err) {
            if (err.message != null && err.message.includes('duplicate key error collection'))
                return res.render('create', { title: 'Create', 'error':'Trùng tiêu đề'});
            return console.log(err)
        } 
        res.redirect('/blog');
    })
});
router.get('/:title', (req, res) => {
    var title = req.params.title
    Posts.findOne({'title':title}, (err, post) => {
        if (err) return console.log(err);
        res.render('detail', { title: title, post: post });
    });
});
router.get('/:title/update', (req, res) => {
    var title = req.params.title
    Posts.findOne({'title':title}, (err, post) => {
        if (err) return console.log(err);
        res.render('update', { title: 'Update', post: post })
    });
});
router.post('/:title/update', (req, res) => {
    var title = req.params.title
    Posts.findOne({'title':title}, (err, post) => {
        if (err) return console.log(err);
        post.body = req.body.body;
        post.save();
        res.redirect('/blog/'+title);
    });
});
router.get('/:title/delete', (req, res) => {
    var title = req.params.title
    Posts.findOne({'title':title}, (err, post) => {
        if (err) return console.log(err);
        res.render('delete', { title: 'Delete', post: post })
    });
});
router.post('/:title/delete', (req, res) => {
    var title = req.params.title
    Posts.findOneAndRemove({'title':title}, (err, result) => {
        if (err) return console.log(err);
        res.redirect('/blog');
    });
});
module.exports = router;