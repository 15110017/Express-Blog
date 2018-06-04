var express = require('express');
var router = express.Router();
var Posts = require('../models/Posts.js');
var isAuthorized = require('./auth'); //check user is authorized (logined)
/* GET home page. */
router.get('/', function(req, res) {
    let isLogin = false
    if (req.session.user)
        isLogin = true
    Posts.findAll().then(posts => {
        res.render('blog', { title: 'Blog', posts: posts.reverse(), isLogin: isLogin });
    })
});
router.get('/create',isAuthorized, (req, res) => {
    let isLogin = true
    res.render('create', { title: 'Create', 'error': '', isLogin: isLogin })
});
router.post('/create',isAuthorized , (req, res) => {
    let item = {
        title: req.body.title,
        body: req.body.body
    };
    Posts.create(item).then(post => res.redirect('/blog'))
});
router.get('/:slug', (req, res) => {
    let isLogin = false
    if (req.session.user)
        isLogin = true
    let slug = req.params.slug
    Posts.findOne({
        where: {slug: slug}
    }).then(post => {
        res.render('detail', { title: slug, post: post, isLogin: isLogin });
    });      
});
router.get('/:slug/update',isAuthorized, (req, res) => {
    let isLogin = true
    let slug = req.params.slug
    Posts.findOne({
        where: {slug: slug}
    }).then(post => {
        res.render('update', { title: 'Update', post: post, isLogin: isLogin });
    });
});
router.post('/:slug/update', (req, res) => {
    let slug = req.params.slug
    Posts.findOne({
        where: {slug: slug}
    }).then(post => {
        post.body = req.body.body;
        post.save();
        res.redirect('/blog/'+slug);
    });
});
router.get('/:slug/delete',isAuthorized , (req, res) => {
    let isLogin = true
    let slug = req.params.slug
    Posts.findOne({
        where: {slug: slug}
    }).then(post => {
        res.render('delete', { title: 'Delete', post: post, isLogin: isLogin })
    });
});
router.post('/:slug/delete', (req, res) => {
    let slug = req.params.slug
    Posts.findOne({
        where: {slug: slug}
    }).then(post => {
        post.destroy().then(()=>res.redirect('/blog'));
    });
});
module.exports = router;