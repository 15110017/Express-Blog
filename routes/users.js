var express = require('express');
var router = express.Router();
var Users = require('../models/Users');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect('/')
});
router.get('/signup', (req, res) => {
  res.render('signup',{ title: 'Sign Up','error':'' })
});
router.post('/signup', (req, res) => {
  username = req.body.username;
  email = req.body.email;
  password1 = req.body.password1;
  password2 = req.body.password2;
  if (!/^[a-zA-Z0-9]*$/.test(username))
    return res.render('signup',{ title: 'Sign Up','error':'Tài khoản có kí tự đặc biệt'})
  if (password1 !== password2)
    return res.render('signup',{ title: 'Sign Up','error':'Mật khẩu không trùng nhau'})
  if (!/\S+@\S+[\.\S+]*/.test(email))
    return res.render('signup',{ title: 'Sign Up','error':'Email không hợp lệ'})
    
  var userData = {
    username: username,
    email: email,
    password: password1
  }
  Users.create(userData);
  res.redirect('/blog');
})
router.get('/login', (req, res) => {
  console.log(req.session)
  if (req.session.user)
    return res.redirect('/blog')
  res.render('login',{ title: 'Login','error':'' })
})
router.post('/login', (req, res) => {
  email = req.body.email;
  password = req.body.password;
  Users.findOne({where: {email: email}}).then(user => {
    isMatch = user.comparePassword(password);
    if (isMatch) {
      //save user in session
      req.session.user = user;
      res.redirect('/blog')
    } else res.render('login',{ title: 'Login','error':'Mật khẩu không chính xác' })
  }).catch(err => {
    res.render('login',{ title: 'Login','error':'Tài khoản hoặc mật khẩu không đúng' })
  })
});
router.get('/logout', (req, res) => {
  req.session.user = null;
  res.redirect('/blog')
})
module.exports = router;