var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    let isLogin = false
    if (req.session.user)
        isLogin = true
    res.render('contact', { title: 'Contact', isLogin: isLogin })
});
module.exports = router;