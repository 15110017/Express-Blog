var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let isLogin = false
  if (req.session.user)
    isLogin = true
  res.render('index', { title: 'Express', isLogin: isLogin});
});

module.exports = router;
